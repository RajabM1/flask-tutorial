import { ChangeEvent, useEffect, useState } from "react";
import HttpService from "../../service/HttpService";
import { Item, ItemFormError } from "../../types/item";
import { useNavigate } from "react-router-dom";
import { errorFormatter } from "../../utils/errorFormatter";

export const useUpdateItemForm = (id: number) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Item | null>(null);
    const [formError, setFormError] = useState<ItemFormError>({});
    const [updatedData, setUpdatedData] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await HttpService.getRequest(`items/${id}`);
                setFormData(response.data);
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
            navigate('/admin/market');
            return
        };

        try {
            await HttpService.patchRequest(`items/${id}`, updatedData);
            navigate('/admin/market');
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
