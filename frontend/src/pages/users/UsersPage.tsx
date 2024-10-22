import { useTranslation } from "react-i18next";
import Message from "../../components/feedback/Message";
import Root from "../Root";
import { useUsersPage } from "../../hooks/users/useUsersPage";
import ActionButton from "../../components/buttons/ActionButton";
import ItemList from "../../components/table/admin-management-table/ItemList";

const UsersPage = () => {
    const { t } = useTranslation('users-page');
    const { columns, users, pageMessage, handleUpdate, handleDelete } = useUsersPage();

    const tableData = users.map((user) => ({
        id: user.id ?? 0,
        values: [user.id ?? 0, user.username, user.email, `${user.budget} $`],
        actions: (
            <>
                <ActionButton label={t('btn.edit')} color="info" onClick={() => handleUpdate(user.id ?? 0)} />
                <ActionButton label={t('btn.delete')} color="danger" onClick={() => handleDelete(user.id ?? 0)} />
            </>
        )
    }));

    return (
        <Root>
            <Message message={pageMessage.message} type={pageMessage.type} />

            <ItemList
                columns={columns}
                data={tableData}
                noDataMessage={t('messages.no_users_available')}
            />
        </Root>
    );
};

export default UsersPage;
