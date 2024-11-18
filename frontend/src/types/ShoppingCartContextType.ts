import { Item } from "./item";

export type ShoppingCartContextType = {
    cartQuantity: number;
    cartSummary: { subTotal: number; saved: number; total: number };
    cartItems: Item[];
    addToCart: (
        id: number,
        quantity: number,
        price: number,
        e?: React.MouseEvent<HTMLButtonElement>
    ) => void;
    removeFromCart: (id: number) => void;
    updateCartItemQuantity: (id: number, quantity: number) => void;
    handleCouponApply: (
        couponCode: string,
        cartTotal: number
    ) => Promise<number>;
};
