import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import HttpService from "../service/HttpService";
import { errorFormatter } from "../utils/errorFormatter";

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
    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: 0,
        barcode: "",
        description: ""
    });
    const [formError, setFormError]= useState<FormError>({})
    const [createItemError, setCreateItemError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setFormError((prevState)=>({
            ...prevState,
            [name]: ""
        }));
    };

    const validateForm = (data: FormData) : FormError => {
        const errors: FormError = {};
        if (!data.name) errors.name = "Item name is required";
        if (!data.price) errors.price = "Price is required";
        if (!data.barcode) errors.barcode = "Barcode is required";
        if (!data.description) errors.description = "Description is required";
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
            setCreateItemError(error.response?.data?.message || "Error while creating item.");
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
