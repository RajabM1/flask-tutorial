import { ChangeEvent, FormEvent, useState } from "react";
import HttpService from "../../service/HttpService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CategoryFormError } from "../../types/category";

export const useCreateCategoryPage = () => {
    const { t } = useTranslation("create-category");
    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });
    const [formError, setFormError] = useState<CategoryFormError>({});
    const [pageMessage, setPageMessage] = useState({
        message: "",
        type: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | string | null>(null);

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

    const handleCreateCategory = async (e: FormEvent) => {
        e.preventDefault();
        setPageMessage({ message: "", type: "" });

        if (!formData.name) {
            setFormError((prevState) => ({
                ...prevState,
                name: t("required.name"),
            }));
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

            await HttpService.postRequest("categories", formData);

            navigate("/admin/categories");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // if (error.status == 400) {
            //     const errors = errorFormatter(error);
            //     setFormError(errors);
            // } else {
            //     const message = error.response?.data?.message || t("error.create")
            //     setPageMessage({ message, type: "danger" });
            // }
            const message = error.response?.data?.message || t("error.create");
            setPageMessage({ message, type: "danger" });
        }
    };

    return {
        formData,
        formError,
        handleFileChange,
        handleInputChange,
        handleCreateCategory,
        pageMessage,
    };
};
