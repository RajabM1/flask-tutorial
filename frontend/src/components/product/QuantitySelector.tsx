interface Props {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}
const QuantitySelector = ({ quantity, setQuantity }: Props) => {
    const handleQuantityChange = (value: number) => {
        if (quantity + value > 0) {
            setQuantity(quantity + value);
        }
    };

    return (
        <div className="quantity-selector">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
    );
};

export default QuantitySelector;
