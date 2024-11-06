import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Star } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { Item } from "../../../types/item";
import { useShoppingCart } from "../../../hooks/cart/useShoppingCart";
import { formatCurrency } from "../../../utils/formatCurrency";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    textTransform: "none",
                    width: "100%",
                    padding: "12px 0",
                },
                outlined: {
                    color: "black",
                    borderColor: "black",
                },
                contained: {
                    backgroundColor: "black",
                },
            },
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                    },
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    p: 3,
                },
            },
        },
    },
});

const ProductCard = ({ id, name, price, image, category, discount }: Item) => {
    const navigate = useNavigate();
    const onCardClick = () => navigate(`/market/product/${id}`);
    const { addToCart } = useShoppingCart();
    return (
        <ThemeProvider theme={theme}>
            <Grid>
                <Card
                    sx={{ maxWidth: 345, cursor: "pointer", borderRadius: "10px" }}
                    onClick={onCardClick}
                >
                    <Box sx={{ position: "relative" }}>
                        <CardMedia
                            component="img"
                            image={image}
                            alt={`${name} image`}
                            sx={{ height: 250 }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                color: "white",
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                padding: "4px 8px",
                                borderRadius: "30px",
                            }}
                        >
                            <Typography variant="body2">{category}</Typography>
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: "medium",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Star sx={{ color: "#FFD700" }} aria-label="Star rating" />
                            <Typography variant="body2" sx={{ mx: 0.5 }}>
                                {4.5}
                            </Typography>
                            <Typography variant="body2">({"1.2K"} Reviews)</Typography>
                            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                                {discount ? (
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
                                            {formatCurrency(price)}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            color="#d32f2f"
                                            fontWeight={"bold"}
                                        >
                                            {formatCurrency(discount)}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="h5" fontWeight={"bold"}>
                                        {formatCurrency(price)}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ paddingBottom: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={(e) => addToCart(id ?? 0, 1, e)}
                        >
                            Add to Cart
                        </Button>
                        <Button variant="contained">See Preview</Button>
                    </CardActions>
                </Card>
            </Grid>
        </ThemeProvider>
    );
};

export default ProductCard;
