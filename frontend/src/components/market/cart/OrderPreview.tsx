import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useShoppingCart } from "../../../hooks/cart/useShoppingCart";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";

const OrderPreview = () => {
    const { cartItems, cartSummary, handleCouponApply } = useShoppingCart();
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);

    const applyCoupon = async () => {
        const response = await handleCouponApply(
            couponCode.trim(),
            cartSummary.total
        );
        setDiscount(response);
        setIsCouponApplied(true);
    };

    return (
        <Box
            className="order-preview-section"
            sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}
        >
            {cartItems.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        mb: 2,
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <Box
                            component="img"
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1,
                                mr: 2,
                            }}
                            src={item.image}
                            alt={item.name}
                        />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Quantity: {item.quantity}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        ${item.price.toFixed(2)}
                    </Typography>
                </Box>
            ))}

            <Divider />
            <Box mt={3} className="order-summary-container">
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 9 }}>
                        <TextField
                            type="text"
                            label="Coupon Code"
                            fullWidth
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={isCouponApplied}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 3 }}>
                        <Button
                            variant="contained"
                            onClick={applyCoupon}
                            fullWidth
                            sx={{ height: "100%", backgroundColor: "black" }}
                            aria-label="Apply Coupon"
                            disabled={isCouponApplied}
                        >
                            {isCouponApplied ? "Applied" : "Apply"}
                        </Button>
                    </Grid2>
                </Grid2>
                <Box className="summary-item">
                    <Typography variant="body1" className="s-t-c">
                        Subtotal:
                    </Typography>
                    <Typography variant="body1" className="p-t-c">
                        {formatCurrency(cartSummary.subTotal)}
                    </Typography>
                </Box>
                <Box className="summary-item">
                    <Typography variant="body1" className="s-t-c">
                        Saved:
                    </Typography>
                    <Typography variant="body1" className="offer-t-c">
                        - {formatCurrency(cartSummary.saved)}
                    </Typography>
                </Box>
                {isCouponApplied && (
                    <Box className="summary-item">
                        <Typography variant="body1" className="s-t-c">
                            Discount:
                        </Typography>
                        <Typography variant="body1" className="offer-t-c">
                            - {formatCurrency(discount)}
                        </Typography>
                    </Box>
                )}
                <Divider className="divider" />
                <Box className="summary-item">
                    <Typography variant="subtitle1">Total:</Typography>
                    <Typography variant="subtitle1">
                        {formatCurrency(cartSummary.total)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderPreview;
