import { useEffect, useState } from "react";
import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow";
import HttpService from "../service/HttpService";
import Root from "./Root";
import ActionButton from "../components/button/ActionButton";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Item {
    id: number;
    name: string;
    barcode: string;
    price: number;
    description: string;
}

const MarketPage = () => {
    const { t } = useTranslation('market-page');
    const columns = [
        t('columns.id'),
        t('columns.name'),
        t('columns.barcode'),
        t('columns.price'),
        t('columns.description'),
        t('columns.options')
    ];
    const [items, setItems] = useState<Item[]>([]);
    const [marketError, setMarketError] = useState("");
    const [marketMessage, setMarketMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            setMarketError("");
            try {
                const response = await HttpService.getRequest('item');
                setItems(response);
            } catch {
                setMarketError("Error fetching items");
            }
        };
        fetchItems();
    }, [navigate]);

    const handleDelete = async (id: number) => {
        setMarketError("");
        try {
            await HttpService.deleteRequest(`item/${id}`);

            setItems((items) => items.filter((item) => item.id !== id));
            setMarketMessage(t('messages.item_deleted_success'))
        } catch (error) {
            setMarketError(t('messages.error_deleting_item', { id }))
            console.error(`Error deleting item with ID ${id}:`, error);
        }
    };

    return (
        <Root>
            <ErrorMessage message={marketError} type="danger" />
            <ErrorMessage message={marketMessage} type="success" />
            <table className="table table-hover table-dark">
                <TableHeader columns={columns} />
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <TableRow
                                key={item.id}
                                values={[item.id, item.name, item.barcode, `${item.price} $`, item.description]}
                                actions={
                                    <>
                                        <ActionButton label={t('btn.purchase')} color="info" onClick={() => setMarketMessage(t('messages.purchase_not_available'))} />
                                        <ActionButton label={t('btn.delete')} color="danger" onClick={() => handleDelete(item.id)} />
                                    </>
                                }
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>{t('messages.no_items_available')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ActionButton label={t('btn.add_item')} color="primary" onClick={() => navigate('/market/add')} />
        </Root>
    );
};


export default MarketPage;
