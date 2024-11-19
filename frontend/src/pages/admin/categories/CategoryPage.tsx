import { useTranslation } from "react-i18next";
import ActionButton from "../../../components/shared/buttons/ActionButton";
import NavBar from "../../../components/admin/layout/navbar/NavBar";
// import Message from "../../../components/shared/feedback/Message";
import ItemList from "../../../components/admin/table/admin-management-table/ItemList";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../../hooks/category/useCategory";

const CategoryPage = () => {
    const { t } = useTranslation("category-page");
    const navigate = useNavigate();
    const { categories } = useCategory();
    const columns = [
        t("columns.id"),
        t("columns.image"),
        t("columns.name"),
        t("columns.options"),
    ];
    const tableData = categories.map((category) => ({
        id: category.id ?? 0,
        values: [category.id ?? 0, category.image, category.name],
        actions: (
            <>
                <ActionButton label={t("btn.edit")} color="info" />
                <ActionButton label={t("btn.delete")} color="danger" />
            </>
        ),
    }));

    return (
        <>
            <NavBar />
            {/* <Message message={pageMessage.message} type={pageMessage.type} /> */}

            <ItemList
                columns={columns}
                data={tableData}
                noDataMessage={t("messages.no_categories_available")}
            />

            <ActionButton
                label={t("btn.add")}
                color="primary"
                onClick={() => navigate("add")}
            />
        </>
    );
};

export default CategoryPage;
