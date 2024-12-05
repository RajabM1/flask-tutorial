import { createContext, PropsWithChildren, useEffect, useState } from "react";
import HttpService from "../service/HttpService";
import { User } from "../types/user";
import { LoginFormData } from "../types/loginForm";
import { RegisterFormData } from "../types/registerForm";
import { router } from "../routes/routes";
import { getAccessToken, removeTokens, setTokens } from "../utils/jwtHelpers";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleRegister: (formData: RegisterFormData) => Promise<unknown | void>;
    handleLogin: (formData: LoginFormData) => Promise<unknown | void>;
    handleLogout: () => Promise<void>;
};

type Props = PropsWithChildren;

export const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
    const [authToken, setAuthToken] = useState<string | null>(getAccessToken());
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(() => {
        const fetchUser = async () => {
            if (!authToken) {
                setCurrentUser(null);
                return;
            }

            try {
                const response = await HttpService.getRequest("auth/me");
                setCurrentUser(response.data.current_user);
            } catch {
                setCurrentUser(null);
                setAuthToken(null);
                removeTokens();
            }
        };

        fetchUser();
    }, [authToken]);

    const handleLogin = async (formData: LoginFormData) => {
        try {
            const response = await HttpService.postRequest("auth/login", formData);
            setAuthToken(response.data.access_token);
            setCurrentUser(response.data.current_user);
            setTokens(response.data.access_token, response.data.refresh_token);
            router.navigate("/", { replace: true });
        } catch (error) {
            return error;
        }
    };

    const handleRegister = async (formData: RegisterFormData) => {
        try {
            const response = await HttpService.postRequest("auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setAuthToken(response.data.access_token);
            setCurrentUser(response.data.current_user);
            setTokens(response.data.access_token, response.data.refresh_token);
            router.navigate("/", { replace: true });
        } catch (error) {
            return error;
        }
    };

    const handleLogout = async () => {
        try {
            await HttpService.deleteRequest("auth/logout");
        } catch {
            console.error("Failed to logout");
        } finally {
            router.navigate("/login", { replace: true });
            setAuthToken(null);
            setCurrentUser(null);
            removeTokens();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                currentUser,
                handleRegister,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
