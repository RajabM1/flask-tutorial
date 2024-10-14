import Root from "../Root";
import { useMarketPage } from "../../hooks/items/useMarketPage";
import ItemList from "../../components/table/market-table/ItemList";
import OwnedItemsList from "../../components/table/market-table/OwnedItemList";

const MarketPage = () => {
    const {
        columns,
        items,
        marketMessage,
        handlePurchase,
        ownedItems,
        handleSell,
    } = useMarketPage();

    return (
        <Root>
            <div className="row mx-3 mt-3">
                <div className="col-lg-8 col-md-12 mb-4">
                    <ItemList
                        columns={columns}
                        items={items}
                        marketMessage={marketMessage}
                        handlePurchase={handlePurchase}
                    />
                </div>
                <div className="col-lg-4 col-md-12">
                    <OwnedItemsList ownedItems={ownedItems} handleSell={handleSell} />
                </div>
            </div>
        </Root>
    );
};

export default MarketPage;
