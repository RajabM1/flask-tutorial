import Container from "@mui/material/Container";
import Root from "../Root";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckoutForm from "../../../components/market/cart/CheckoutForm";
import OrderPreview from "../../../components/market/cart/OrderPreview";
import { Elements } from "@stripe/react-stripe-js";
import { useStripeSetup } from "../../../hooks/cart/useStripeSetup";
import { useLocation } from "react-router-dom";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext";

const CheckoutPage = () => {
    const location = useLocation();
    const { orderTotal } = location.state || {};
    const amountInCents = orderTotal * 100;
    const { cartItems } = useShoppingCart();

    const { stripePromise, clientSecret } = useStripeSetup(amountInCents);

    return (
        <Root>
            <Container maxWidth="xl" className="cart-page">
                <Box className="header-box">
                    <Typography variant="h4" component="h1">
                        CheckOut
                    </Typography>
                </Box>
                <Grid2 container spacing={2} p={2}>
                    <Grid2 size={{ xs: 12, md: 7 }} className="product-list">
                        {clientSecret && stripePromise && (
                            <Elements
                                stripe={stripePromise}
                                options={{ clientSecret }}
                            >
                                <CheckoutForm total={orderTotal} />
                            </Elements>
                        )}
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 5 }}
                        sx={{ position: "relative" }}
                    >
                        <Box sx={{ position: "sticky", top: 80 }}>
                            <OrderPreview orderItems={cartItems} />
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Root>
    );
};

export default CheckoutPage;
