import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../service/HttpService";
import { setTokens } from "../utils/jwtHelpers";
import { useTranslation } from "react-i18next";

interface FormData {
    username: string;
    password: string;
}

interface FormError {
    username?: string;
    password?: string;
}

export const useLoginForm = () => {
    const { t } = useTranslation('login-page');
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: ""
    });
    const [formError, setFormError] = useState<FormError>({});
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setFormError((prevState) => ({
            ...prevState,
            [name]: ""
        }));
    };

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        setLoginError("");

        const errors: FormError = {};
        if (!formData.username) errors.username = t("username_required");
        if (!formData.password) errors.password = t("password_required");

        if (Object.keys(errors).length > 0) {
            setFormError(errors)
            return;
        }

        try {
            const response = await HttpService.postRequest("auth/login", formData);
            setTokens(response.access_token, response.refresh_token);
            navigate("/", { replace: true });
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoginError(error.response?.data?.message || t("invalid_data"));
        }
    };
    return {
        formData,
        formError,
        handleInputChange,
        handleLogin,
        loginError
    };
}
