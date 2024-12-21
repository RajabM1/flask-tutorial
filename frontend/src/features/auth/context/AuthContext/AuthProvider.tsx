import { PropsWithChildren } from "react";
import {
    getAccessToken,
    removeTokens,
    setTokens,
} from "../../../../utils/jwtHelpers";
import AuthContext from "./AuthContext";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import * as Services from "./services";

const AuthProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const authToken = getAccessToken();

    const { data: currentUser } = useQuery({
        initialData: null,
        enabled: !!authToken,
        queryKey: ["CurrentUser"],
        queryFn: () => Services.fetchCurrentUser(authToken),
    });

    const loginMutation = useMutation({
        mutationFn: Services.login,
        onSuccess: (data) => {
            setTokens(data.access_token, data.refresh_token);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });

    const registerMutation = useMutation({
        mutationFn: Services.register,
        onSuccess: (data) => {
            setTokens(data.access_token, data.refresh_token);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });

    const forgetPasswordMutation = useMutation({
        mutationFn: Services.forgetPassword,
    });

    const resetPasswordMutation = useMutation({
        mutationFn: Services.resetPassword,
    });

    const logoutMutation = useMutation({
        mutationFn: Services.logout,
        onSettled: () => {
            queryClient.clear();
            removeTokens();
        },
    });

    const valueToReturn = {
        authToken,
        currentUser,
        handleRegister: registerMutation.mutateAsync,
        handleLogin: loginMutation.mutateAsync,
        handleForgetPassword: forgetPasswordMutation.mutateAsync,
        handleResetPassword: resetPasswordMutation.mutateAsync,
        handleLogout: logoutMutation.mutateAsync,
    };

    return (
        <AuthContext.Provider value={valueToReturn}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
