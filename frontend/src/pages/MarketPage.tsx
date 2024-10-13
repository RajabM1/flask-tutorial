import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow";
import Root from "./Root";
import ActionButton from "../components/button/ActionButton";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMarketPage } from "../hooks/useMarketPage";
import { getUserRole } from "../utils/jwtHelpers";

const MarketPage = () => {
    const { t } = useTranslation('market-page');
    const navigate = useNavigate();
    const { columns, items, marketMessage, handlePurchase, handleDelete } = useMarketPage();
    const role = getUserRole();
    const adminAccess = (role: string) => role === 'admin';
    return (
        <Root>
            <ErrorMessage message={marketMessage.message} type={marketMessage.type} />
            <table className="table table-hover table-dark">
                <TableHeader columns={columns} />
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <TableRow
                                key={item.id}
                                values={[item.id ?? 0, item.name, item.barcode, `${item.price} $`, item.description]}
                                actions={
                                    <>
                                        {!adminAccess(role) && <ActionButton label={t('btn.purchase')} color="info" onClick={() => handlePurchase(item.id ?? 0)} />}
                                        {adminAccess(role) && <ActionButton label={t('btn.edit')} color="primary" onClick={() => navigate(`/market/edit/${item.id}`)} />}
                                        {adminAccess(role) && <ActionButton label={t('btn.delete')} color="danger" onClick={() => handleDelete(item.id ?? 0)} />}
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

            {role && <ActionButton label={t('btn.add_item')} color="primary" onClick={() => navigate('/market/add')} />}
        </Root>
    );
};


export default MarketPage;
