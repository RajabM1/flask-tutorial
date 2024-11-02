import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../../service/HttpService";
import { errorFormatter } from "../../utils/errorFormatter";
import { useTranslation } from "react-i18next";
import { Item, ItemFormError } from "../../types/item";
import { SelectChangeEvent } from "@mui/material/Select";

export const useCreateItemForm = () => {
    const { t } = useTranslation("create-item");
    const [formData, setFormData] = useState<Item>({
        name: "",
        price: 0,
        barcode: "",
        description: "",
        quantity: 0,
        image: "",
        category: 0,
    });
    const [formError, setFormError] = useState<ItemFormError>({});
    const [pageMessage, setPageMessage] = useState({
        message: "",
        type: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | string | null>(null);
    const [categories, setCategories] = useState<
        Array<{ id: number; name: string }>
    >([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await HttpService.getRequest("categories");
                setCategories(response);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setPageMessage({
                    message: t("error.fetch_categories"),
                    type: "danger",
                });
            }
        };

        fetchCategories();
    }, []);
    const navigate = useNavigate();

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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        };
        setSelectedFile(target.files[0]);
        setFormData((prevState) => ({
            ...prevState,
            image: e.target["value"],
        }));
    };

    const handleCategoryChange = (e: SelectChangeEvent<number>) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            category: Number(value),
        }));
        setFormError((prevState) => ({
            ...prevState,
            category: "",
        }));
    };

    const validateForm = (data: Item): ItemFormError => {
        const errors: ItemFormError = {};
        if (!data.name) errors.name = t("required.name");
        if (!data.price) errors.price = t("required.price");
        if (!data.barcode) errors.barcode = t("required.barcode");
        if (!data.description) errors.description = t("required.description");
        if (!data.quantity) errors.quantity = t("required.quantity");
        if (!data.category) errors.category = t("required.category");
        return errors;
    };

    const handleCreateItem = async (e: FormEvent) => {
        e.preventDefault();
        setPageMessage({ message: "", type: "" });

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        if (!selectedFile) {
            setFormError((prevState) => ({
                ...prevState,
                image: t("required.image"),
            }));
            return;
        }

        try {
            const data = new FormData();
            data.append("file", selectedFile);
            data.append("upload_preset", "react-app");
            data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

            const uploadResponse = await fetch(
                import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
                {
                    method: "POST",
                    body: data,
                }
            );

            if (!uploadResponse.ok) {
                setPageMessage({ message: t("error.image_upload"), type: "danger" });
            }

            const uploadResult = await uploadResponse.json();
            formData.image = uploadResult.secure_url;

            await HttpService.postRequest("items", formData);

            navigate("/admin/market");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.status == 400) {
                const errors = errorFormatter(error);
                setFormError(errors);
            } else {
                const message = error.response?.data?.message || t("error.create");
                setPageMessage({ message, type: "danger" });
            }
        }
    };

    return {
        formData,
        formError,
        handleInputChange,
        handleCreateItem,
        handleFileChange,
        handleCategoryChange,
        pageMessage,
        categories,
    };
};
