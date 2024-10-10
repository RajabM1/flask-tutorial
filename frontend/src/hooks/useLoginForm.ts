import { useState, FormEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "./useAuth";
import { LoginFormData, LoginFormError } from "../types/loginForm";

export const useLoginForm = () => {
    const { t } = useTranslation("login-page");
    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
    });
    const [formError, setFormError] = useState<LoginFormError>({});
    const [loginError, setLoginError] = useState("");
    const { handleLogin } = useAuth();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setFormError((prevState) => ({
            ...prevState,
            [name]: "",
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoginError("");

        const errors: LoginFormError = {};
        if (!formData.username) errors.username = t("username_required");
        if (!formData.password) errors.password = t("password_required");

        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        await handleLogin(formData);
    };
    return {
        formData,
        formError,
        handleInputChange,
        handleSubmit,
        loginError,
    };
};
