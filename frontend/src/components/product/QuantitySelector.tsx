import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
        <Box display="flex" alignItems="center" gap={1}>
            <Button
                variant="contained"
                onClick={() => handleQuantityChange(-1)}
                sx={{
                    minWidth: 32,
                    padding: "4px 12px",
                    backgroundColor: "#F5F5F5",
                    color: "#333",
                }}
            >
                -
            </Button>
            <span style={{ padding: "0 12px", fontSize: "1.2rem" }}>{quantity}</span>
            <Button
                variant="contained"
                onClick={() => handleQuantityChange(1)}
                sx={{
                    minWidth: 32,
                    padding: "4px 12px",
                    backgroundColor: "#F5F5F5",
                    color: "#333",
                }}
            >
                +
            </Button>
        </Box>
    );
};

export default QuantitySelector;
