import { useTranslation } from "react-i18next";
import Message from "../../../components/shared/feedback/Message";
import { useUsersPage } from "../../../hooks/users/useUsersPage";
import ActionButton from "../../../components/shared/buttons/ActionButton";
import ItemList from "../../../components/admin/table/admin-management-table/ItemList";
import NavBar from "../../../components/admin/layout/navbar/NavBar";

const UsersPage = () => {
    const { t } = useTranslation("users-page");
    const { columns, users, pageMessage, handleUpdate, handleDelete } =
        useUsersPage();

    const tableData = users.map((user) => ({
        id: user.id ?? 0,
        values: [user.id ?? 0, user.username, user.email, `${user.budget} $`],
        actions: (
            <>
                <ActionButton
                    label={t("btn.edit")}
                    color="info"
                    onClick={() => handleUpdate(user.id ?? 0)}
                />
                <ActionButton
                    label={t("btn.delete")}
                    color="danger"
                    onClick={() => handleDelete(user.id ?? 0)}
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
                noDataMessage={t("messages.no_users_available")}
            />
        </>
    );
};

export default UsersPage;
