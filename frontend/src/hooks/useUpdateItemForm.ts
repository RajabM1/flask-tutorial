import { ChangeEvent, useEffect, useState } from "react";
import HttpService from "../service/HttpService";
import { Item, ItemFormError } from "../types/item";
import { useNavigate } from "react-router-dom";
import { errorFormatter } from "../utils/errorFormatter";

export const useUpdateItemForm = (id: number) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Item | null>(null);
    const [formError, setFormError] = useState<ItemFormError>({});
    const [updatedData, setUpdatedData] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await HttpService.getRequest(`item/${id}`);
                setFormData(response);
            } catch {
                console.log('Error fetching item');
            }
        };
        fetchItemData();
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState!,
            [name]: value
        }));
        setUpdatedData((prevState) => ({
            ...prevState!,
            [name]: value
        }));
        setFormError((prevState) => ({
            ...prevState,
            [name]: ""
        }));
    };

    const handleItemUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updatedData) {
            navigate('/market');
            return
        };

        try {
            await HttpService.patchRequest(`item/${id}`, updatedData);
            navigate('/market');
        } catch (error) {
            setFormError(errorFormatter(error));
        }
    };

    return {
        formData,
        formError,
        handleItemUpdate,
        handleInputChange
    };
};
