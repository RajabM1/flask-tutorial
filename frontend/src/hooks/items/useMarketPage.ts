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
    const [marketMessage, setMarketMessage] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        const fetchItems = async () => {
            setMarketMessage({ message: "", type: "" });
            try {
                const response = await HttpService.getRequest('item');
                setItems(response);
            } catch {
                setMarketMessage({ message: t('messages.error_fetching_items'), type: "danger" });
            }
        };
        fetchItems();
    }, [t]);

    const handlePurchase = async (id: number) => {
        setMarketMessage({ message: `${t('messages.purchase_not_available')} ${id}`, type: "info" });
    };

    const handleDelete = async (id: number) => {
        setMarketMessage({ message: "", type: "" });
        try {
            await HttpService.deleteRequest(`item/${id}`);

            setItems((items) => items.filter((item) => item.id !== id));
            setMarketMessage({ message: t('messages.item_deleted_success'), type: "success" });
        } catch (error) {
            setMarketMessage({ message: t('messages.error_deleting_item', { id }), type: "danger" });
            console.error(`Error deleting item with ID ${id}:`, error);
        }
    };
    return {
        columns,
        items,
        marketMessage,
        handlePurchase,
        handleDelete
    }
}

