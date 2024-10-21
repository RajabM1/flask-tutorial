import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "../../types/item";
import HttpService from "../../service/HttpService";

export const useMarketPage = () => {
    const { t } = useTranslation('market-page');
    const columns = [
        t('columns.id'),
        t('columns.name'),
        t('columns.barcode'),
        t('columns.price'),
        t('columns.description'),
        t('columns.options')
    ];
    const [items, setItems] = useState<Item[]>([]);
    const [ownedItems, setOwnedItems] = useState<Item[]>([]);
    const [marketMessage, setMarketMessage] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        const fetchItems = async () => {
            setMarketMessage({ message: "", type: "" });
            try {
                const response = await HttpService.getRequest('items');
                setItems(response);
            } catch {
                setMarketMessage({ message: t('messages.error_fetching_items'), type: "danger" });
            }
        };
        const fetchOwnedItems = async () => {
            setMarketMessage({ message: "", type: "" });
            try {
                const response = await HttpService.getRequest('users/me/items');
                setOwnedItems(response);
            } catch {
                setMarketMessage({ message: t('messages.error_fetching_items'), type: "danger" });
            }
        };
        fetchItems();
        fetchOwnedItems();
    }, [t]);

    const handlePurchase = async (id: number) => {
        try {
            await HttpService.patchRequest(`items/${id}/buy`, {});
            setItems((items) => items.filter((item) => item.id !== id));
            const purchasedItem = items.find((item) => item.id === id);
            if (purchasedItem) {
                setOwnedItems((prevOwnedItems) => [...prevOwnedItems, purchasedItem]);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const message = error?.response?.data?.message || t('messages.error_purchase_item', { id });
            setMarketMessage({ message, type: "danger" });
        }
    };

    const handleDelete = async (id: number) => {
        setMarketMessage({ message: "", type: "" });
        try {
            await HttpService.deleteRequest(`items/${id}`);

            setItems((items) => items.filter((item) => item.id !== id));
            setMarketMessage({ message: t('messages.item_deleted_success'), type: "success" });
        } catch (error) {
            setMarketMessage({ message: t('messages.error_deleting_item', { id }), type: "danger" });
            console.error(`Error deleting item with ID ${id}:`, error);
        }
    };

    const handleSell =async (id: number) => {
        try{
            await HttpService.patchRequest(`items/${id}/sell`,{});
            setOwnedItems((items) => items.filter((item) => item.id !== id));
            const soldItem = ownedItems.find((item) => item.id === id);
            if (soldItem) {
                setItems((prevItems) => [...prevItems, soldItem]);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error:any){
            console.log("Error",error);
            
        }
    }

    return {
        columns,
        items,
        marketMessage,
        handlePurchase,
        handleDelete,
        ownedItems,
        handleSell
    }
}

