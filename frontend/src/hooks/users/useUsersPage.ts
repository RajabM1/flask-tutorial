import { useTranslation } from "react-i18next";
import { User } from "../../types/user";
import { useEffect, useState } from "react";
import HttpService from "../../service/HttpService";

export const useUsersPage = () => {
    const { t } = useTranslation('users-page');
    const columns = [
        t('columns.id'),
        t('columns.username'),
        t('columns.email'),
        t('columns.budget'),
        t('columns.options')
    ];
    const [users, setUsers] = useState<User[]>([]);
    const [pageMessage, setPageMessage] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        const fetchItems = async () => {
            setPageMessage({ message: "", type: "" });
            try {
                const response = await HttpService.getRequest('users');
                setUsers(response.data);
            } catch {
                setPageMessage({ message: t('messages.error_fetching_users'), type: "danger" });
            }
        };
        fetchItems();
    }, [t]);

    const handleUpdate = async (id: number) => {
        setPageMessage({ message: `${t('messages.feature_not_available')} ${id}`, type: "danger" });
    };

    const handleDelete = async (id: number) => {
        setPageMessage({ message: `${t('messages.feature_not_available')} ${id}`, type: "danger" });
    };
    return {
        columns,
        users,
        pageMessage,
        handleUpdate,
        handleDelete
    }
}