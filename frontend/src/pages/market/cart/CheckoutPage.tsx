import Container from "@mui/material/Container";
import Root from "../Root";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckoutForm from "../../../components/market/cart/CheckoutForm";
import OrderPreview from "../../../components/market/cart/OrderPreview";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import HttpService from "../../../service/HttpService";
import { useShoppingCart } from "../../../hooks/cart/useShoppingCart";

const CheckoutPage = () => {
    const [stripePromise, setStripePromise] =
        useState<Promise<Stripe | null> | null>(null);
    const [clientSecret, setClientSecret] = useState("");
    const { cartSummary } = useShoppingCart();
    const total = Math.round(cartSummary.subTotal - cartSummary.saved) * 100;
    useEffect(() => {
        const fetchPromise = async () => {
            const response = await HttpService.getRequest("config");
            setStripePromise(loadStripe(response.publishableKey));
        };
        const fetchData = async () => {
            const response = await HttpService.postRequest(
                "create-payment-intent",
                {
                    amount: total,
                    currency: "usd",
                }
            );
            setClientSecret(response.clientSecret);
        };
        fetchPromise();
        fetchData();
    }, [total]);

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
                                <CheckoutForm />
                            </Elements>
                        )}
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, md: 5 }}
                        sx={{ position: "relative" }}
                    >
                        <Box sx={{ position: "sticky", top: 80 }}>
                            <OrderPreview />
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Root>
    );
};

export default CheckoutPage;
