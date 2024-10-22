import Root from "../Root";
import { useMarketPage } from "../../hooks/items/useMarketPage";
import ProductCard from "../../components/product/ProductCard";
import Message from "../../components/feedback/Message";

const MarketPage = () => {
    const { items, handlePurchase, marketMessage } = useMarketPage();

    return (
        <Root>
            <Message message={marketMessage.message} type={marketMessage.type} />
            <div className="container mt-4">
                <div className="row gx-4 gy-4">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="col-md-4 col-sm-6 col-lg-3 d-flex">
                                <ProductCard
                                    id={item.id ?? 0}
                                    name={item.name}
                                    price={item.price}
                                    imgUrl={item.image ?? ""}
                                    purchase={handlePurchase}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No items available at the moment.</p>
                    )}
                </div>
            </div>
        </Root>
    );
};

export default MarketPage;
