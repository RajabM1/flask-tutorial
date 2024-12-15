import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginForm, loginSchema } from "../schemas/loginSchema";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useLoginForm = () => {
    const { t } = useTranslation("login-page");
    const { handleLogin } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<loginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<loginForm> = async (data) => {
        setLoginError(null);
        try {
            await handleLogin(data);
        } catch {
            setLoginError(t("messages.invalid_data"));
        }
    };

    return {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        loginError,
    };
};
