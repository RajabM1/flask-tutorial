import { useParams } from "react-router-dom";
import ImageSection from "../../components/product/ImageSection";
import Rating from "../../components/product/Rating";
import { useUpdateItemForm } from "../../hooks/items/useUpdateItemForm";
import "../../assets/css/items/single-item.css";
import Root from "../Root";
import { useMarketPage } from "../../hooks/items/useMarketPage";
import QuantitySelector from "../../components/product/QuantitySelector";
import { useState } from "react";
import Message from "../../components/feedback/Message";
const SingleItemPage = () => {
    const { id } = useParams();

    const { formData } = useUpdateItemForm(Number(id));
    const { handlePurchase, marketMessage } = useMarketPage();
    const [quantity, setQuantity] = useState(1);

    const handleBuyNow = () => {
        handlePurchase(Number(id), quantity);
    };

    if (!formData) {
        return <div>Loading...</div>;
    }
    return (
        <Root>
            <Message message={marketMessage.message} type={marketMessage.type} />
            <div className="product-card">
                <div className="product-info">
                    <h2>{formData.name}</h2>
                    <div className="product-price-rating">
                        <p className="price">{formData.price}$</p>
                        <Rating rating={"5.0"} />
                    </div>
                    <p className="description">{formData.description}</p>
                    <div className="quantity-cart-wrapper">
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                        <button className="add-to-cart" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                    <button className="add-to-wishlist">Add to Wishlist</button>
                </div>
                <ImageSection imageUrl={formData.image ?? ""} name={formData.name} />
            </div>
        </Root>
    );
};

export default SingleItemPage;
