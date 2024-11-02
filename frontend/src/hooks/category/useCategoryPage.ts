import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HttpService from "../../service/HttpService";
import { Category } from "../../types/category";
import { Item } from "../../types/item";

export const useCategoryPage = (category?: string) => {
    const { t } = useTranslation("category-page");
    const columns = [
        t("columns.id"),
        t("columns.image"),
        t("columns.name"),
        t("columns.options"),
    ];
    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    const [pageMessage, setPageMessage] = useState({
        message: "",
        type: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            setPageMessage({ message: "", type: "" });
            try {
                const response = await HttpService.getRequest("categories");
                setCategories(response);
            } catch {
                setPageMessage({
                    message: t("messages.error_fetching_categories"),
                    type: "danger",
                });
            }
        };
        fetchCategories();
    }, [t]);

    useEffect(() => {
        if (category) {
            const fetchItems = async () => {
                setPageMessage({ message: "", type: "" });
                try {
                    const response = await HttpService.getRequest(`items/${category}`);
                    setItems(response);
                } catch {
                    setPageMessage({
                        message: t("messages.error_fetching_categories"),
                        type: "danger",
                    });
                }
            };
            fetchItems();
        }
    }, [category, t]);

    return {
        columns,
        pageMessage,
        categories,
        items,
    };
};
