import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);

    if (context === undefined) {
        throw new Error(
            "useShoppingCart must be used inside of a ShoppingCartProvider"
        );
    }

    return context;
};
