import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../service/HttpService";
import { errorFormatter } from "../utils/errorFormatter";
import { useTranslation } from "react-i18next";

interface FormData {
    name: string;
    price: number;
    barcode: string;
    description: string;
}

interface FormError {
    name?: string;
    price?: string;
    barcode?: string;
    description?: string;
}

export const useCreateItemForm = () => {
    const { t } = useTranslation('create-item')
    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: 0,
        barcode: "",
        description: ""
    });
    const [formError, setFormError] = useState<FormError>({})
    const [createItemError, setCreateItemError] = useState("");
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

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};
        if (!data.name) errors.name = t("name_required");
        if (!data.price) errors.price = t("price_required");
        if (!data.barcode) errors.barcode = t("barcode_required");
        if (!data.description) errors.description = t("description_required");
        return errors;
    }

    const handleCreateItem = async (event: FormEvent) => {
        event.preventDefault();
        setCreateItemError("");

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormError(errors)
            return;
        }

        try {
            await HttpService.postRequest("item", formData);
            navigate("/market");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.status == 400) {
                const errors = errorFormatter(error);
                setFormError(errors);
            } else {
                setCreateItemError(error.response?.data?.message || t("create_item_error"));
            }
        }
    };

    return {
        formData,
        formError,
        handleInputChange,
        handleCreateItem,
        createItemError,
    };
};
