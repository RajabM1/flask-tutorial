import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import Root from "../Root";
import OrderSummary from "../../../components/new/cart/OrderSummary";
import DeliverySummary from "../../../components/new/cart/DeliverySummary";
import ProductList from "../../../components/new/cart/ProductList";
import ProductSlider from "../../../components/new/slider/ProductSlider";
import { useMarketPage } from "../../../hooks/items/useMarketPage";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { useShoppingCart } from "../../../hooks/cart/useShoppingCart";

const Cart = memo(() => {
    const { cartItems } = useShoppingCart();
    const { itemsOnDiscount } = useMarketPage();
    const navigate = useNavigate();
    return (
        <Root>
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                {cartItems.length ? (
                    <>
                        <Box color={"#333"} p={2}>
                            <Typography
                                variant="h4"
                                component="h1"
                                fontWeight="bold"
                                sx={{ color: "#222" }}
                            >
                                Your Shopping Cart ({cartItems.length})
                            </Typography>
                        </Box>
                        <Grid2 container spacing={2} p={2}>
                            <Grid2 size={{ xs: 12, md: 8 }}>
                                <ProductList data={cartItems} />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <Box>
                                    <OrderSummary
                                        orderPrice={{ subTotal: 0, saved: 0 }}
                                        itemCount={cartItems.length}
                                    />
                                    <DeliverySummary />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </>
                ) : (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            height: "500px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "8px",
                            p: 3,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Box
                            component="img"
                            src="https://ae-pic-a1.aliexpress-media.com/kf/Sa15be314eadd4a9bb186ab4a0cb971b5D/360x360.png_.webp"
                            alt={"empty cart"}
                            sx={{
                                width: "200px",
                                height: "200px",
                                mb: 2,
                                opacity: 0.8,
                            }}
                        />
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                            Your cart is empty
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 3 }}>
                            No items yet? Continue shopping to explore more.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                padding: "8px 16px",
                                bgcolor: "black",
                                borderRadius: 30,
                            }}
                            onClick={() => navigate("/")}
                        >
                            Explore Items
                        </Button>
                    </Box>
                )}
                <MemoizedProductSlider label="More to love" data={itemsOnDiscount} />
            </Container>
        </Root>
    );
});

const MemoizedProductSlider = memo(ProductSlider);

export default Cart;
