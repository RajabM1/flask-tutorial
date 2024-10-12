import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    is_admin?: boolean;
}

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

export const getUserRole = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        return "guest";
    }
    try {
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
        return decodedToken.is_admin ? "admin" : "user";
    } catch {
        return "guest";
    }
};
