import { PropsWithChildren, useEffect, useState } from "react";
import {
    getAccessToken,
    removeTokens,
    setTokens,
} from "../../utils/jwtHelpers";
import { User } from "../../types/user";
import HttpService from "../../service/HttpService";
import { LoginFormData } from "../../types/loginForm";
import { router } from "../../app/routes/routes";
import { RegisterFormData } from "../../types/registerForm";
import AuthContext from "./AuthContext";
import endpoints from "../../config/api";
import { paths } from "../../config/paths";

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(getAccessToken());
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(() => {
        const fetchUser = async () => {
            if (!authToken) {
                setCurrentUser(null);
                return;
            }

            try {
                const response = await HttpService.getRequest(
                    endpoints.AUTH.ME
                );
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
        const response = await HttpService.postRequest(
            endpoints.AUTH.LOGIN,
            formData
        );
        setAuthToken(response.data.access_token);
        setCurrentUser(response.data.current_user);
        setTokens(response.data.access_token, response.data.refresh_token);
        router.navigate(paths.HOME, { replace: true });
    };

    const handleRegister = async (formData: RegisterFormData) => {
        const response = await HttpService.postRequest(
            endpoints.AUTH.REGISTER,
            {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }
        );
        setAuthToken(response.data.access_token);
        setCurrentUser(response.data.current_user);
        setTokens(response.data.access_token, response.data.refresh_token);
        router.navigate(paths.HOME, { replace: true });
    };

    const handleLogout = async () => {
        try {
            await HttpService.deleteRequest(endpoints.AUTH.LOGOUT);
        } catch {
            console.error("Failed to logout");
        } finally {
            router.navigate(paths.AUTH.LOGIN, { replace: true });
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
