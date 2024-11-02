import { Link, useParams } from "react-router-dom";
import ImageSection from "../../../components/product/ImageSection";
import Rating from "../../../components/product/Rating";
import { useUpdateItemForm } from "../../../hooks/items/useUpdateItemForm";
import Root from "../Root";
import { useMarketPage } from "../../../hooks/items/useMarketPage";
import QuantitySelector from "../../../components/product/QuantitySelector";
import { useState } from "react";
import Message from "../../../components/feedback/Message";
import { Box, Button, Container, Typography } from "@mui/material";
import ProductSlider from "../../../components/new/slider/ProductSlider";

const ProductPage = () => {
    const { id } = useParams();

    const { formData } = useUpdateItemForm(Number(id));
    const { pageMessage, itemsOnDiscount } = useMarketPage();
    const [quantity, setQuantity] = useState(1);

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <Root>
            <Message message={pageMessage.message} type={pageMessage.type} />
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "center", md: "flex-start" },
                        gap: { xs: "16px", md: "32px" },
                    }}
                >
                    <ImageSection imageUrl={formData.image ?? ""} name={formData.name} />

                    <Box sx={{ flex: 1, maxWidth: "600px", padding: "16px" }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", marginBottom: "8px" }}
                        >
                            {formData.name}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "8px",
                                marginBottom: "16px",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {formData.discount ? (
                                    <>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            sx={{
                                                textDecoration: "line-through",
                                                color: "gray",
                                                mr: 1,
                                            }}
                                        >
                                            ${formData.price}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
                                            ${formData.discount}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="h5"
                                        sx={{ color: "#333", fontWeight: "bold" }}>${formData.price}</Typography>
                                )}
                            </Box>
                            <Rating rating={"5.0"} />
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{ marginBottom: "24px", color: "#666" }}
                        >
                            {formData.description}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                marginBottom: "16px",
                            }}
                        >
                            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: "8px",
                                    backgroundColor: "black",
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>

                        
                        <Link to={"#"} style={{
                            fontWeight: "bold",
                            color: "black",
                            textDecoration:"none"
                        }}>
                            Add to Wishlist
                        </Link>
                    </Box>
                </Box>
            </Container>
            <Container maxWidth="xl">
                <ProductSlider label="You may also like" data={itemsOnDiscount} />
            </Container>
        </Root>
    );
};

export default ProductPage;
