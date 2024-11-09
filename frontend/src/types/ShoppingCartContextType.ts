import { Item } from "./item";

export type ShoppingCartContextType = {
    cartQuantity: number;
    cartSummary: { subTotal: number; saved: number };
    cartItems: Item[];
    addToCart: (
        id: number,
        quantity: number,
        e?: React.MouseEvent<HTMLButtonElement>
    ) => void;
    removeFromCart: (id: number) => void;
    updateCartItemQuantity: (id: number, quantity: number) => void;
};
