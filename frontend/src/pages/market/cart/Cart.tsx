import { Box, Container, Grid2, Typography } from "@mui/material";
import Root from "../Root";
import OrderSummary from "../../../components/new/cart/OrderSummary";
import DeliverySummary from "../../../components/new/cart/DeliverySummary";
import { useMarketPage } from "../../../hooks/items/useMarketPage";
import ProductList from "../../../components/new/cart/ProductList";

const Cart = () => {
    const { items } = useMarketPage();
    return (
        <Root>
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <Box color={"#333"} p={2}>
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        sx={{ color: "#222" }}
                    >
                        Your Shopping Cart (6)
                    </Typography>
                </Box>
                <Grid2 container spacing={2} p={2}>
                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <ProductList data={items.slice(0, 6)} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box>
                            <OrderSummary />
                            <DeliverySummary />
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Root>
    );
};

export default Cart;
