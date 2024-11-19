import Container from "@mui/material/Container";
import ProductList from "../../../components/market/product/ProductList";
import Root from "../Root";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "../../../types/item";
import "../../../../styles/pages/market/categories/CategoryPage.scss";
import { useCategory } from "../../../hooks/category/useCategory";

const CategoryPage = () => {
    const { category } = useParams();
    const { fetchCategoryItem } = useCategory();
    const [data, setData] = useState<Item[] | undefined>([]);

    useEffect(() => {
        const loadCategoryItems = async () => {
            try {
                const response = await fetchCategoryItem(category ?? "other");
                setData(response);
            } catch {
                console.log("Error");
            }
        };

        loadCategoryItems();
    }, [category, fetchCategoryItem]);
    return (
        <Root>
            <Container maxWidth="xl">
                <Box className="header-box">
                    <Typography variant="h4" component="h1">
                        {category}
                    </Typography>
                </Box>
                <Container maxWidth="xl">
                    <ProductList data={data ?? []} />
                </Container>
            </Container>
        </Root>
    );
};

export default CategoryPage;
