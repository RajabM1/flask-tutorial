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
        <Box>
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
            <TextField
                value={quantity}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                sx={{
                    width: "4rem",
                    "& .MuiOutlinedInput-root": {
                        padding: "0px",
                        "& fieldset": {
                            borderColor: "#F5F5F5",
                        },
                        "&:hover fieldset": {
                            borderColor: "#333",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#333",
                        },
                    },
                    "& input": {
                        padding: "5px 0",
                        textAlign: "center",
                    },
                    margin: "0 8px",
                }}
            />
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
