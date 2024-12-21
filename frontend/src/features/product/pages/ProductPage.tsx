import { Link, useParams } from "react-router-dom";
import ImageSection from "../../../features/product/components/ImageSection";
import Rating from "../../../features/product/components/Rating";
import { useUpdateItemForm } from "../../../features/product/hooks/useUpdateItemForm";
import { useMarketPage } from "../../../features/product/hooks/useMarketPage";
import QuantitySelector from "../../../components/market/product/QuantitySelector";
import { useState } from "react";
import Message from "../../../components/shared/feedback/Message";
import { Box, Button, Container, Typography } from "@mui/material";
import ProductSlider from "../../../components/market/slider/ProductSlider";
import { useTranslation } from "react-i18next";
import PriceSection from "../../../components/market/product/PriceSection";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext";
import Root from "../../../pages/market/Root";
import "../styles/ProductPage.scss";

const ProductPage = () => {
    const { t } = useTranslation("product-page");
    const { id } = useParams();
    const { addToCart } = useShoppingCart();
    const { formData } = useUpdateItemForm(Number(id));
    const { pageMessage, itemsOnDiscount } = useMarketPage();
    const [quantity, setQuantity] = useState(1);

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <Root>
            {pageMessage && (
                <Message
                    message={pageMessage.message}
                    type={pageMessage.type}
                />
            )}
            <Container maxWidth="xl" className="product-container">
                <Box className="product-box">
                    <ImageSection
                        imageUrl={formData.image ?? ""}
                        name={formData.name}
                    />
                    <Box className="product-info">
                        <Typography className="product-name" variant="h5">
                            {formData.name}
                        </Typography>
                        <Box className="rate-price-section">
                            <PriceSection
                                discount={formData.discount}
                                price={formData.price}
                            />
                            <Rating rating={t("rating")} />
                        </Box>

                        <Typography variant="body1" className="description">
                            {formData.description}
                        </Typography>

                        <Box className="quantity-cart-section">
                            <QuantitySelector
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                            <Button
                                className="add-to-cart"
                                variant="contained"
                                onClick={() => {
                                    addToCart(
                                        formData.id ?? 0,
                                        quantity,
                                        formData.price
                                    );
                                    setQuantity(1);
                                }}
                            >
                                {t("add_to_cart")}
                            </Button>
                        </Box>

                        <Link className="wishlist-link" to={"#"}>
                            {t("add_to_wishlist")}
                        </Link>
                    </Box>
                </Box>
            </Container>
            <Container maxWidth="xl">
                <ProductSlider
                    label={t("sliderLabel")}
                    data={itemsOnDiscount}
                />
            </Container>
        </Root>
    );
};

export default ProductPage;
