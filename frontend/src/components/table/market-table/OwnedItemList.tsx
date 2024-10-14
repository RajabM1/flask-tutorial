import { Item } from "../../../types/item";
import ActionButton from "../../button/ActionButton";
import { useTranslation } from "react-i18next";

interface Props {
    ownedItems: Item[];
    handleSell: (id: number) => void;
}

const OwnedItemsList = ({ ownedItems, handleSell }: Props) => {
    const { t } = useTranslation("market-page");

    return (
        <div>
            <h2>{t("headings.owned_items")}</h2>
            <p>{t("instructions.owned_items")}</p>
            <div className="row row-cols-1 row-cols-md-2 g-3">
                {ownedItems.map((ownedItem) => (
                    <div key={ownedItem.id} className="col">
                        <div className="card text-center bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title text-white">{ownedItem.name}</h5>
                                <ActionButton
                                    label={t("btn.sell_item")}
                                    color="danger"
                                    onClick={() => handleSell(ownedItem.id ?? 0)}
                                />
                                <p className="card-text text-white">
                                    <strong>
                                        {t("messages.item_costs", { price: ownedItem.price })}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OwnedItemsList;
