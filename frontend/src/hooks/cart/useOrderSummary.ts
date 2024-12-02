import { useState, useEffect } from "react";

interface CartItem {
    price: number;
    quantity?: number;
    discount?: number;
}

interface OrderSummary {
    subTotal: number;
    saved: number;
    discount: number | null;
    total: number;
}

export const useOrderSummary = (
    cartItems: CartItem[],
    discount: number | null
) => {
    const [orderSummary, setOrderSummary] = useState<OrderSummary>({
        subTotal: 0,
        saved: 0,
        discount: null,
        total: 0,
    });

    useEffect(() => {
        let subTotal = 0;
        let saved = 0;

        cartItems.forEach((item) => {
            const quantity = item.quantity ?? 1;
            const itemDiscount = item.discount ? item.price - item.discount : 0;

            subTotal += item.price * quantity;
            saved += itemDiscount * quantity;
        });

        const total = subTotal - saved - (discount || 0);

        setOrderSummary({ subTotal, saved, discount, total });
    }, [cartItems, discount]);

    return orderSummary;
};
