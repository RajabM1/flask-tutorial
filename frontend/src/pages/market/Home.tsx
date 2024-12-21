import Root from "./Root";
import Container from "@mui/material/Container";
import ProductList from "../../components/market/product/ProductList";
import { useMarketPage } from "../../hooks/items/useMarketPage";
import MultipleRowsSlider from "../../components/market/slider/MultipleRowsSlider";
import ProductSlider from "../../components/market/slider/ProductSlider";
import "../../../styles/pages/market/Home.scss";
import { useCategory } from "../../features/categorize/context";

const Home = () => {
    const { items, itemsOnDiscount } = useMarketPage();
    const { categories } = useCategory();

    return (
        <Root>
            <Container maxWidth="xl">
                <ProductSlider
                    label="Hot Deals"
                    bgcolor="#F5F5F5"
                    textColor="#d32f2f"
                    data={itemsOnDiscount}
                />
            </Container>
            <MultipleRowsSlider data={categories} />
            <Container maxWidth="xl">
                <ProductList data={items} />
            </Container>
        </Root>
    );
};

export default Home;
