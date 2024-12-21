import { PropsWithChildren } from "react";
import { useFetch } from "../../../hooks/shared/useFetch";
import HttpService from "../../../service/HttpService";
import CategoryContext from "./CategoryContext";
import endpoints from "../../../config/api";

const CategoryProvider = ({ children }: PropsWithChildren) => {
    const {
        data: categoriesResponse,
        isLoading,
        error,
    } = useFetch(endpoints.CATEGORY.ALL);

    const categories = categoriesResponse;

    const fetchCategoryItem = async (category: string) => {
        try {
            const response = await HttpService.getRequest(
                endpoints.PRODUCT.BY_CATEGORY(category)
            );
            return response.data;
        } catch {
            console.log("Failed to fetch category items.");
        }
    };

    return (
        <CategoryContext.Provider
            value={{ categories, fetchCategoryItem, isLoading, error }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
