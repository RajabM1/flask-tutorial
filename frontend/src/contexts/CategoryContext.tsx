import { createContext, PropsWithChildren } from "react";
import { Category } from "../types/category";
import { Item } from "../types/item";
import HttpService from "../service/HttpService";
import { useFetch } from "../hooks/shared/useFetch";

type CategoryContextType = {
    categories: Category[];
    fetchCategoryItem: (category: string) => Promise<Item[] | undefined>;
    isLoading: boolean;
    error: string | null;
};

export const CategoryContext = createContext({} as CategoryContextType);

export const CategoryProvider = ({ children }: PropsWithChildren) => {
    const {
        data: categoriesResponse,
        isLoading,
        error,
    } = useFetch("categories");

    const categories = categoriesResponse;
    
    const fetchCategoryItem = async (category: string) => {
        try {
            const response = await HttpService.getRequest(
                `items/${category}`
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
