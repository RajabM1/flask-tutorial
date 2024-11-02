import Container from "@mui/material/Container";
import ProductList from "../../../components/product/new/ProductList";
import Root from "../Root";
import { useCategoryPage } from "../../../hooks/category/useCategoryPage";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "../../../types/item";

const ItemByCategoryPage = () => {
    const { category } = useParams();
    const { items } = useCategoryPage(category);
    const [data, setData] = useState<Item[]>([]);

    useEffect(()=>{
        setData(items)
    }, [category, items])
    return (
        <Root>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        color: "#333",
                        p: 4,
                        mb: 3,
                        borderBottom: "1px solid #ddd",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        sx={{ color: "#222" }}
                    >
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

export default ItemByCategoryPage;
