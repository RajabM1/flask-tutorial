import { User } from "../types/user";

export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

export const getUserRole = (currentUser: User | null): string => {
    if (!currentUser) return "guest";
    switch (currentUser.role) {
        case "ADMIN":
            return "admin";
        case "CUSTOMER":
            return "user";
        default:
            return "guest";
    }
};
