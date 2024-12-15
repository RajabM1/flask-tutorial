import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerForm, registerSchema } from "../schemas/registerSchema";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { errorFormatter } from "../../../utils/errorFormatter";
import { useTranslation } from "react-i18next";

export const useRegisterForm = () => {
    const { t } = useTranslation("register-page");
    const { handleRegister } = useAuth();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<registerForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<registerForm> = async (data) => {
        setRegisterError(null);
        try {
            await handleRegister(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.status == 400) {
                const validationErrors = errorFormatter(error);
                Object.keys(validationErrors).forEach((field) => {
                    setError(field as keyof registerForm, {
                        type: "server",
                        message: validationErrors[field][0],
                    });
                });
            } else {
                setRegisterError(t("messages.register_error"));
            }
        }
    };

    return {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        registerError,
    };
};
