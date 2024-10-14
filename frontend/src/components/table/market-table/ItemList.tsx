import { useTranslation } from "react-i18next";
import Message from "../../Message";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import ActionButton from "../../button/ActionButton";
import { Item } from "../../../types/item";

interface Props {
    columns: string[];
    items: Item[];
    marketMessage: { type: string; message: string };
    handlePurchase: (id: number) => void;
}

const ItemList = ({ columns, items, marketMessage, handlePurchase }: Props) => {
    const { t } = useTranslation("market-page");

    return (
        <>
            <h2>{t("headings.market_items")}</h2>
            <p>{t("instructions.market_items")}</p>
            <Message message={marketMessage.message} type={marketMessage.type} />
            <div className="table-responsive">
                <table className="table table-hover table-dark">
                    <TableHeader columns={columns} />
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <TableRow
                                    key={item.id}
                                    values={[
                                        item.id ?? 0,
                                        item.name,
                                        item.barcode,
                                        `${item.price} $`,
                                        item.description,
                                    ]}
                                    actions={
                                        <ActionButton
                                            label={t("btn.purchase")}
                                            color="info"
                                            onClick={() => handlePurchase(item.id ?? 0)}
                                        />
                                    }
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length}>
                                    {t("messages.no_items_available")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ItemList;
