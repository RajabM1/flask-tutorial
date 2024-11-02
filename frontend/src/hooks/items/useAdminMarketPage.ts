import { useState } from "react";
import { useTranslation } from "react-i18next";
import HttpService from "../../service/HttpService";

export const useAdminMarketPage = () => {
    const { t } = useTranslation("admin-market-page");
    const [pageMessage, setPageMessage] = useState({
        message: "",
        type: "",
    });
    const columns = [
        t("columns.id"),
        t("columns.image"),
        t("columns.name"),
        t("columns.barcode"),
        t("columns.price"),
        t("columns.description"),
        t("columns.quantity"),
        t("columns.category"),
        t("columns.options"),
    ];

    const handleDelete = async (id: number) => {
        setPageMessage({ message: "", type: "" });
        try {
            await HttpService.deleteRequest(`items/${id}`);

            setPageMessage({
                message: t("messages.item_deleted_success"),
                type: "success",
            });
        } catch (error) {
            setPageMessage({
                message: t("messages.error_deleting_item", { id }),
                type: "danger",
            });
            console.error(`Error deleting item with ID ${id}:`, error);
        }
    };

    return {
        columns,
        pageMessage,
        handleDelete,
    };
};
