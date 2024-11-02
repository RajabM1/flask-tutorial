import { useTranslation } from "react-i18next";
import ActionButton from "../../../components/buttons/ActionButton";
import NavBar from "../../../components/layout/navbar/NavBar";
import Message from "../../../components/feedback/Message";
import ItemList from "../../../components/table/admin-management-table/ItemList";
import { useCategoryPage } from "../../../hooks/category/useCategoryPage";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { t } = useTranslation("category-page");
  const navigate = useNavigate();
  const { columns, categories, pageMessage } = useCategoryPage();

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
      <Message message={pageMessage.message} type={pageMessage.type} />

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
