import Container from "@mui/material/Container";
import ProductList from "../../../components/market/product/ProductList";
import Root from "../Root";
import { useCategoryPage } from "../../../hooks/category/useCategoryPage";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "../../../types/item";
import "../../../../styles/pages/market/categories/CategoryPage.scss";

const CategoryPage = () => {
    const { category } = useParams();
    const { items } = useCategoryPage(category);
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        setData(items);
    }, [category, items]);
    return (
        <Root>
            <Container maxWidth="xl">
                <Box className="header-box">
                    <Typography variant="h4" component="h1">
                        {category}
                    </Typography>
                </Box>
                <Container maxWidth="xl">
                    <ProductList data={data} />
                </Container>
            </Container>
        </Root>
    );
};

export default CategoryPage;
