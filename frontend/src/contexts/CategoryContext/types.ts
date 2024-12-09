import { Category } from "../../types/category";
import { Item } from "../../types/item";

export interface ICategoryContext {
    categories: Category[];
    fetchCategoryItem: (category: string) => Promise<Item[] | undefined>;
    isLoading: boolean;
    error: string | null;
}
