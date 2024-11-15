import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useShoppingCart } from "../../../hooks/cart/useShoppingCart";

const OrderPreview = () => {
    const { cartItems } = useShoppingCart();
    return (
        <Box className="customer-trust-section">
            {cartItems.map((item) => (
                <Box
                    key={item.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    borderBottom="1px solid #ddd"
                >
                    <Box display="flex" alignItems="center">
                        <Box
                            component="img"
                            width={50}
                            height={50}
                            src={item.image ?? ""}
                            alt={item.name}
                            mr={2}
                        />
                        <Box>
                            <Typography
                                variant="body1"
                                className="title"
                                fontWeight="bold"
                            >
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Quantity: {item.quantity}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="body1" className="title">
                            ${item.price.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            ))}
            <Box display="flex" justifyContent="space-between" my={1} p={2}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h6">
                    $
                    {cartItems
                        .reduce(
                            (acc, item) =>
                                acc + item.price * (item.quantity ?? 0),
                            0
                        )
                        .toFixed(2)}
                </Typography>
            </Box>
        </Box>
    );
};

export default OrderPreview;
