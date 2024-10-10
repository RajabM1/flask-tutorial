import { createContext, PropsWithChildren, useState } from "react";
import HttpService from "../service/HttpService";
import { User } from "../types/user";
import { LoginFormData } from "../types/loginForm";
import { RegisterFormData } from "../types/registerForm";
import { router } from "../routes/routes";
import { getAccessToken, removeTokens, setTokens } from "../utils/jwtHelpers";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleRegister: (formData: RegisterFormData) => Promise<void>;
    handleLogin: (formData: LoginFormData) => Promise<void>;
    handleLogout: () => Promise<void>;
};

type Props = PropsWithChildren;

export const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
    const [authToken, setAuthToken] = useState<string | null>(getAccessToken());
    const [currentUser, setCurrentUser] = useState<User | null>();

    const handleLogin = async (formData: LoginFormData) => {
        try {
            const response = await HttpService.postRequest("auth/login", formData);
            setAuthToken(response.access_token);
            setCurrentUser(response.current_user);
            setTokens(response.access_token, response.refresh_token);
            router.navigate("/", { replace: true });
        } catch {
            console.error("Login Error");
        }
    };

    const handleRegister = async (formData: RegisterFormData) => {
        try {
            const response = await HttpService.postRequest("auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setAuthToken(response.access_token);
            setCurrentUser(response.current_user);            
            setTokens(response.access_token, response.refresh_token);
            router.navigate("/", { replace: true });
        } catch {
            console.error("Register Error");
        }
    };

    const handleLogout = async () => {
        try {
            await HttpService.deleteRequest("auth/logout");
            setAuthToken(null);
            setCurrentUser(null);
            removeTokens();
            router.navigate("/login", { replace: true });
        } catch {
            console.error("Failed to logout");
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