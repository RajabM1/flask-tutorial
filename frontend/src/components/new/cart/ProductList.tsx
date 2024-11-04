import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { Item } from "../../../types/item";
import { useCategoryPage } from "../../../hooks/category/useCategoryPage";
import QuantitySelector from "../../product/QuantitySelector";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const ProductList = ({ data }: { data: Item[] }) => {
    const { categories } = useCategoryPage();
    const getCategoryById = (id: number) =>
        categories.find((category) => category.id === id);

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
                    }}
                >
                    <Checkbox
                        checked={true}
                        inputProps={{ "aria-label": "controlled" }}
                        sx={{
                            color: "grey.500",
                            "&.Mui-checked": {
                                color: "black",
                            },
                        }}
                    />

                    <Box
                        component="img"
                        src={row.image ?? ""}
                        alt={row.name}
                        width={100}
                        height={100}
                        borderRadius={1}
                    />

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="medium">
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
                                    ${row.price}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    sx={{ mt: 1 }}
                                    color="#d32f2f"
                                >
                                    ${row.discount.toFixed(2)}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                ${row.price.toFixed(2)}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                        }}
                    >
                        <QuantitySelector quantity={1} />
                        <Box>
                            <IconButton aria-label="View" color="default">
                                <SearchRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton aria-label="Favorite" color="default">
                                <FavoriteBorderRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton aria-label="Delete" color="default">
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
