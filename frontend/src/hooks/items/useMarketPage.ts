import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "../../types/item";
import HttpService from "../../service/HttpService";
import endpoints from "../../config/api";
import { PageMessageType } from "../../types/pageMessage";

export const useMarketPage = () => {
    const { t } = useTranslation("market-page");

    const [items, setItems] = useState<Item[]>([]);
    const [itemsOnDiscount, setItemsOnDiscount] = useState<Item[]>([]);
    const [pageMessage, setPageMessage] = useState<PageMessageType | null>(
        null
    );

    useEffect(() => {
        const fetchItems = async () => {
            setPageMessage(null);
            try {
                const responseItems = await HttpService.getRequest(
                    endpoints.PRODUCT.ALL
                );
                setItems(responseItems.data);

                const discountedItems = responseItems.data.filter(
                    (item: Item) => item.discount != null
                );
                setItemsOnDiscount(discountedItems);
            } catch {
                setPageMessage({
                    message: t("messages.error_fetching_items"),
                    type: "error",
                });
            }
        };

        fetchItems();
    }, [t]);

    return {
        items,
        pageMessage,
        itemsOnDiscount,
    };
};
