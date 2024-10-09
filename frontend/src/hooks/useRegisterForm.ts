import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../service/HttpService";
import { setTokens } from "../utils/jwtHelpers";
import { errorFormatter } from "../utils/errorFormatter";
import { useTranslation } from "react-i18next";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormError {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export const useRegisterForm = () => {
    const { t } = useTranslation('register-page');
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState<FormError>({});
    const [registerError, setRegisterError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setFormError((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};
        if (!data.username) errors.username = t("username_required");
        if (!data.email) errors.email = t("email_required");
        if (!data.password) errors.password = t("password_required");
        if (data.password !== data.confirmPassword)
            errors.confirmPassword = t("password_do_not_match");
        return errors;
    };

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        setRegisterError("");

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        try {
            const response = await HttpService.postRequest("auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setTokens(response.access_token, response.refresh_token);
            navigate("/", { replace: true });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.status == 400) {
                const errors = errorFormatter(error);
                setFormError(errors)
            } else {
                setRegisterError(error.response?.data?.message || t("register_error"));
            }
        }
    };

    return {
        formData,
        formError,
        handleInputChange,
        handleRegister,
        registerError
    };
}
