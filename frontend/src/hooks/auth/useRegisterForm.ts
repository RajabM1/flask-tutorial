import { useState, FormEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "./useAuth";
import { RegisterFormData, RegisterFormError } from "../../types/registerForm";
import { errorFormatter } from "../../utils/errorFormatter";

export const useRegisterForm = () => {
    const { t } = useTranslation("register-page");
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState<RegisterFormError>({});
    const [registerError, setRegisterError] = useState("");
    const { handleRegister } = useAuth();

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

    const validateForm = (data: RegisterFormData): RegisterFormError => {
        const errors: RegisterFormError = {};
        if (!data.username) errors.username = t("required.username");
        if (!data.email) errors.email = t("required.email");
        if (!data.password) errors.password = t("required.password");
        if (data.password !== data.confirmPassword)
            errors.confirmPassword = t("password_do_not_match");
        return errors;
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setRegisterError("");

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        const response = await handleRegister(formData);
        if (response) {
            setFormError(errorFormatter(response));
        }
    };

    return {
        formData,
        formError,
        handleInputChange,
        handleSubmit,
        registerError,
    };
};
