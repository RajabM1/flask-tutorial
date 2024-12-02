import { useTranslation } from "react-i18next";
import ItemList from "../../../components/admin/table/admin-management-table/ItemList";
import ActionButton from "../../../components/shared/buttons/ActionButton";
import Message from "../../../components/shared/feedback/Message";
import { useMarketPage } from "../../../hooks/items/useMarketPage";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/admin/layout/navbar/NavBar";
import { useAdminMarketPage } from "../../../hooks/items/useAdminMarketPage";

const MarketDashboard = () => {
    const { t } = useTranslation("market-page");
    const { items } = useMarketPage();
    const { columns, pageMessage, handleDelete } = useAdminMarketPage();
    const navigate = useNavigate();

    const tableData = items.map((item) => ({
        id: item.id ?? 0,
        values: [
            item.id ?? 0,
            <img
                src={item.image ?? ""}
                alt={item.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />,
            item.name,
            item.barcode,
            `${item.price} $`,
            item.description,
            item.quantity,
            item.category,
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
        <>
            <NavBar />
            <Message message={pageMessage.message} type={pageMessage.type} />

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
        </>
    );
};

export default MarketDashboard;
