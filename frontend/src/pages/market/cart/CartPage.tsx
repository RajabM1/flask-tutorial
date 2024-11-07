import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import Root from "../Root";
import OrderSummary from "../../../components/new/cart/OrderSummary";
import CustomerTrustSection from "../../../components/new/cart/CustomerTrustSection";
import ProductList from "../../../components/new/cart/ProductList";
import ProductSlider from "../../../components/new/slider/ProductSlider";
import { useMarketPage } from "../../../hooks/items/useMarketPage";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../hooks/cart/useShoppingCart";
import { useTranslation } from "react-i18next";

const CartPage = () => {
    const { t } = useTranslation("cart-page");
    const { cartItems, cartSummary } = useShoppingCart();
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
                                {t("title")} ({cartItems.length})
                            </Typography>
                        </Box>
                        <Grid2 container spacing={2} p={2}>
                            <Grid2 size={{ xs: 12, md: 8 }}>
                                <ProductList data={cartItems} />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <Box>
                                    <OrderSummary
                                        cartSummary={cartSummary}
                                        itemCount={cartItems.length}
                                    />
                                    <CustomerTrustSection />
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
                            border: "1px solid",
                            borderColor: "grey.300",
                            borderRadius: 2,
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                            backgroundColor: "#fff",
                            p: 3,
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
                        <Typography variant="h5" color="textSecondary" sx={{ mb: 1 }}>
                            {t("emptyCart.title")}
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 3, textAlign: "center" }}>
                            {t("emptyCart.subtitle")}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                padding: "8px 16px",
                                bgcolor: "black",
                                borderRadius: 30,
                                px: 5
                            }}
                            onClick={() => navigate("/")}
                        >
                            {t("emptyCart.button")}
                        </Button>
                    </Box>
                )}
                <ProductSlider label={t("sliderLabel")} data={itemsOnDiscount} />
            </Container>
        </Root>
    );
};

export default CartPage;
