import { useTranslation } from "react-i18next";
import ItemList from "../../components/table/admin-management-table/ItemList";
import ActionButton from "../../components/buttons/ActionButton";
import Root from "../Root";
import Message from "../../components/feedback/Message";
import { useMarketPage } from "../../hooks/items/useMarketPage";
import { useNavigate } from "react-router-dom";

const MarketDashboard = () => {
    const { t } = useTranslation("market-page");
    const { columns, items, marketMessage, handleDelete } = useMarketPage();
    const navigate = useNavigate();

    const tableData = items.map((item) => ({
        id: item.id ?? 0,
        values: [
            item.id ?? 0,
            <img
                src={item.image ?? ""}
                alt={item.name}
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />,
            item.name,
            item.barcode,
            `${item.price} $`,
            item.description,
            item.quantity
        ],
        actions: (
            <>
                <ActionButton
                    label={t("btn.edit")}
                    color="info"
                    onClick={() => navigate(`/market/edit/${item.id}`)}
                />
                <ActionButton
                    label={t("btn.delete")}
                    color="danger"
                    onClick={() => handleDelete(item.id ?? 0)}
                />
            </>
        ),
    }));

    return (
        <Root>
            <Message message={marketMessage.message} type={marketMessage.type} />

            <ItemList
                columns={columns}
                data={tableData}
                noDataMessage={t("messages.no_items_available")}
            />

            <ActionButton
                label={t("btn.add_item")}
                color="primary"
                onClick={() => navigate("/market/add")}
            />
        </Root>
    );
};

export default MarketDashboard;
