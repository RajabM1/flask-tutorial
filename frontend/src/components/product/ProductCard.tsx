import { useNavigate } from "react-router-dom";
import ActionButton from "../buttons/ActionButton";
import ProductDetails from "./ProductDetails";

interface Props {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    purchase: (id: number, quantity: number) => void;
}

const ProductCard = ({ id, name, price, imgUrl, purchase }: Props) => {
    const navigate = useNavigate();

    const handleCardClick = () => navigate(`product/${id}`);

    function handlePurchase(e: React.MouseEvent) {
        e.stopPropagation();
        purchase(id, 1);
    }

    return (
        <div
            className="card h-100 shadow-sm hover-shadow"
            style={{
                borderRadius: "15px",
                cursor: "pointer",
                transition: "transform 0.2s",
            }}
            onClick={handleCardClick}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <div className="text-center">
                <img
                    src={imgUrl}
                    alt={name}
                    className="img-fluid"
                    loading="lazy"
                />
            </div>
            <ProductDetails name={name} price={price} />

            <div className="card-footer bg-transparent border-0 text-center">
                <ActionButton
                    label="Buy Now"
                    color="primary"
                    onClick={handlePurchase}
                />
            </div>
        </div>
    );
};

export default ProductCard;
