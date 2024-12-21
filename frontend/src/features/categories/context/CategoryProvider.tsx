import { PropsWithChildren } from "react";
import CategoryContext from "./CategoryContext";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../config/query";
import * as Services from "./services";

const CategoryProvider = ({ children }: PropsWithChildren) => {
    const { data: categories } = useQuery({
        initialData: [],
        queryKey: [queryKeys.CATEGORIES],
        queryFn: () => Services.fetchCategories(),
    });

    const valueToReturn = {
        categories,
    };

    return (
        <CategoryContext.Provider value={valueToReturn}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
