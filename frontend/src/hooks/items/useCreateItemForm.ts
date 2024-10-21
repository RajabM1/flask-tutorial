import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../../service/HttpService";
import { errorFormatter } from "../../utils/errorFormatter";
import { useTranslation } from "react-i18next";
import { Item, ItemFormError } from "../../types/item";

export const useCreateItemForm = () => {
    const { t } = useTranslation('create-item')
    const [formData, setFormData] = useState<Item>({
        name: "",
        price: 0,
        barcode: "",
        description: ""
    });
    const [formError, setFormError] = useState<ItemFormError>({})
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

    const validateForm = (data: Item): ItemFormError => {
        const errors: ItemFormError = {};
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
            await HttpService.postRequest("items", formData);
            navigate("/admin/market");
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
