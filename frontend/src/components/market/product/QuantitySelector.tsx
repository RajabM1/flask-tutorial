import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Props {
    quantity: number;
    setQuantity: (quantity: number) => void;
}
const QuantitySelector = ({ quantity, setQuantity }: Props) => {
    const handleQuantityChange = (value: number) => {
        if (quantity + value > 0) {
            setQuantity(quantity + value);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value, 10);
        if (!isNaN(inputValue) && inputValue > 0) {
            setQuantity(inputValue);
        }
    };
    return (
        <Box className="quantity-selector-container">
            <Button
                variant="contained"
                onClick={() => handleQuantityChange(-1)}
                className="quantity-button"
            >
                -
            </Button>
            <TextField
                value={quantity}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                className="quantity-input"
            />
            <Button
                variant="contained"
                onClick={() => handleQuantityChange(1)}
                className="quantity-button"
            >
                +
            </Button>
        </Box>
    );
};

export default QuantitySelector;
