import { useTranslation } from "react-i18next";
import ErrorMessage from "../components/ErrorMessage";
import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow";
import Root from "./Root";
import { useUsersPage } from "../hooks/useUsersPage";
import ActionButton from "../components/button/ActionButton";

const UsersPage = () => {
    const { t } = useTranslation('users-page');
    const { columns, users, pageMessage, handleUpdate, handleDelete } = useUsersPage();
    return (
        <Root>
            <ErrorMessage message={pageMessage.message} type={pageMessage.type} />
            <table className="table table-hover table-dark">
                <TableHeader columns={columns} />
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <TableRow
                                key={user.id}
                                values={[user.id ?? 0, user.username, user.email, `${user.budget} $`]}
                                actions={
                                    <>
                                        <ActionButton label={t('btn.edit')} color="info" onClick={() => handleUpdate(user.id ?? 0)} />
                                        <ActionButton label={t('btn.delete')} color="danger" onClick={() => handleDelete(user.id ?? 0)} />
                                    </>
                                }
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>{t('messages.no_users_available')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Root>
    );
};


export default UsersPage;