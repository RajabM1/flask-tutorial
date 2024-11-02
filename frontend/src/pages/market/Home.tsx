import Root from "./Root";
import Container from "@mui/material/Container";
import ProductList from "../../components/product/new/ProductList";
import { useMarketPage } from "../../hooks/items/useMarketPage";
import MultipleRowsSlider from "../../components/new/slider/MultipleRowsSlider";
import { useCategoryPage } from "../../hooks/category/useCategoryPage";
import ProductSlider from "../../components/new/slider/ProductSlider";


const Home = () => {
    const { items, itemsOnDiscount } = useMarketPage()
    const { categories } = useCategoryPage()

    return (
        <Root>
            <Container maxWidth="xl">
                <ProductSlider label="Hot Deals" bgcolor="#F5F5F5" textColor="#d32f2f" data={itemsOnDiscount} />
            </Container>
            <MultipleRowsSlider data={categories} />
            <Container maxWidth="xl">
                <ProductList data={items} />
            </Container>
        </Root>
    );
};

export default Home;
