import Grid from "@mui/material/Grid2";
import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Item } from "../../../types/item";
import { useCategoryPage } from "../../../hooks/category/useCategoryPage";
import { useEffect, useState } from "react";
import SearchAppBar from "../../new/search/SearchBar";

interface Props {
    data: Item[];
}

const ProductList = ({ data }: Props) => {
    const { categories } = useCategoryPage();
    const getCategoryById = (id: number) =>
        categories.find((category) => category.id === id);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                borderRadius: 3,
                mt: 3,
                p: 4.5,
                mx: "auto",
                boxShadow: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                        md: "center",
                        xl: "center",
                    },
                    gap: 2,
                    mb: 2,
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        mb: { xs: 1, sm: 2 },
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                        textAlign: { xs: "center", sm: "left" },
                    }}
                >
                    Give All You Need
                </Typography>
                <SearchAppBar setSearchQuery={setSearchQuery} />
            </Box>
            <Grid size={{ xs: 12, md: 9 }}>
                <Grid container spacing={3}>
                    {paginatedData.map((item) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                            <ProductCard
                                id={item.id ?? 0}
                                name={item.name}
                                price={item.price}
                                image={item.image ?? ""}
                                category={getCategoryById(Number(item.category))?.name}
                                discount={item.discount}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 3,
                    }}
                />
            </Grid>
        </Box>
    );
};

export default ProductList;
