import { Box, IconButton, Typography } from "@mui/material";
import { Item } from "../../../types/item";
import { useCategoryPage } from "../../../hooks/category/useCategoryPage";
import QuantitySelector from "../../product/QuantitySelector";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../hooks/cart/useShoppingCart";
import { useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";

const ProductList = ({ data }: { data: Item[] }) => {
    const navigate = useNavigate();
    const { categories } = useCategoryPage();
    const { removeFromCart, updateCartItemQuantity } = useShoppingCart();

    const [, setItemQuantities] = useState(
        data.reduce(
            (acc, item) => ({ ...acc, [Number(item.id)]: item.quantity || 1 }),
            {}
        )
    );
    const setQuantity = (id: number, quantity: number) => {
        setItemQuantities((prev) => ({ ...prev, [id]: quantity }));
        updateCartItemQuantity(id, quantity);
    };

    const getCategoryById = (id: number) =>
        categories.find((category) => category.id === id);
    const handleNavigate = (id: number) => navigate(`/market/product/${id}`);
    const handleSimilarItem = (id: number) => {
        const category = getCategoryById(id)?.name;
        navigate(`/market/${category}`);
    };
    const handleWishList = (id: number) =>
        alert(`This feature does not available for item_id ${id}`);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#fff",
                p: 1,
            }}
        >
            {data.map((row) => (
                <Box
                    key={row.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        padding: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        ":last-child": { borderBottom: "none" },
                        flexDirection: {
                            xs: "column",
                            lg: "row",
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={row.image ?? ""}
                        alt={row.name}
                        width={100}
                        height={100}
                        borderRadius={1}
                        onClick={() => handleNavigate(row.id ?? 0)}
                        sx={{ cursor: "pointer" }}
                    />

                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            fontWeight="medium"
                            onClick={() => handleNavigate(row.id ?? 0)}
                            sx={{ cursor: "pointer" }}
                        >
                            {row.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {getCategoryById(Number(row.category))?.name ?? "Other"}
                        </Typography>
                        {row.discount ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "gray",
                                        mt: 1,
                                    }}
                                >
                                    {formatCurrency(row.price)}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    sx={{ mt: 1 }}
                                    color="#d32f2f"
                                >
                                    {formatCurrency(row.discount)}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                {formatCurrency(row.price)}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                        }}
                    >
                        <QuantitySelector
                            quantity={row.quantity ?? 1}
                            setQuantity={(quantity: number) =>
                                setQuantity(row.id ?? 1, quantity)
                            }
                        />
                        <Box>
                            <IconButton
                                aria-label="View"
                                color="default"
                                onClick={() => handleSimilarItem(Number(row.category))}
                                sx={{
                                    display: { xs: "none", sm: "inline-flex" },
                                }}
                            >
                                <SearchRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                aria-label="Favorite"
                                color="default"
                                onClick={() => handleWishList(row.id ?? 0)}
                            >
                                <FavoriteBorderIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                aria-label="Delete"
                                color="default"
                                onClick={() => removeFromCart(row.id ?? 0)}
                            >
                                <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ProductList;
