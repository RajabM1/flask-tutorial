import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../../utils/formatCurrency";

interface Props {
    discount?: number;
    price: number;
}
const PriceSection = ({ discount, price }: Props) => {
    return (
        <Box className="price-section">
            {discount ? (
                <>
                    <Typography
                        component="span"
                        className="original-price"
                    >
                        {formatCurrency(price)}
                    </Typography>
                    <Typography
                        component="h5"
                        className="discount-price offer-t-c"
                    >
                        {formatCurrency(discount)}
                    </Typography>
                </>
            ) : (
                <Typography component="h5" className="normal-price">
                    {formatCurrency(price)}
                </Typography>
            )}
        </Box>
    );
};

export default PriceSection;
