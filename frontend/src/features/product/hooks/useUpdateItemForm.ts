import { useEffect, useState } from "react";
import HttpService from "../../../service/HttpService";
import endpoints from "../../../config/api";
import { Item } from "../schemas/itemSchema";

export const useUpdateItemForm = (id: number) => {
    const [formData, setFormData] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await HttpService.getRequest(
                    endpoints.PRODUCT.BY_ID(id)
                );
                setFormData(response.data);
            } catch {
                console.log("Error fetching item");
            }
        };
        fetchItemData();
    }, [id]);

    return {
        formData,
    };
};
