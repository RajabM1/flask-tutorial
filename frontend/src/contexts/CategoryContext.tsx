import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Category } from "../types/category";
import { Item } from "../types/item";
import HttpService from "../service/HttpService";

type CategoryContextType = {
    categories: Category[];
    fetchCategoryItem: (category: string) => Promise<Item[] | undefined>;
};

export const CategoryContext = createContext({} as CategoryContextType);

export const CategoryProvider = ({ children }: PropsWithChildren) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await HttpService.getRequest("categories");
            setCategories(response);
        } catch {
            console.log("Failed to fetch categories.");
        }
    };

    const fetchCategoryItem = async (category: string) => {
        try {
            const response: Item[] = await HttpService.getRequest(
                `items/${category}`
            );
            return response;
        } catch {
            console.log("Failed to fetch category items.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, fetchCategoryItem }}>
            {children}
        </CategoryContext.Provider>
    );
};
