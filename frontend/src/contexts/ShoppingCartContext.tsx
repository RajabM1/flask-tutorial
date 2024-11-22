import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Item } from "../types/item";
import HttpService from "../service/HttpService";
import { ShoppingCartContextType } from "../types/ShoppingCartContextType";

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<Item[]>([]);
    const [cartSummary, setCartSummary] = useState({
        subTotal: 0,
        saved: 0,
        discount: null,
        total: 0,
    });

    const cartQuantity = cartItems.length;

    const fetchCartItems = async () => {
        try {
            const response = await HttpService.getRequest("cart");
            setCartItems(response);
        } catch {
            console.log("Error fetching cart items");
        }
    };
    const addItemToCart = async (
        id: number,
        quantity: number,
        price: number
    ) => {
        await HttpService.postRequest("cart/items", {
            itemId: id,
            quantity: quantity,
            price: price,
        });
    };
    const updateCartItemQuantity = async (id: number, quantity: number) => {
        await HttpService.patchRequest("cart/items", {
            itemId: id,
            quantity: quantity,
        });
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    const addToCart = async (
        id: number,
        quantity: number,
        price: number,
        e?: React.MouseEvent<HTMLButtonElement>
    ) => {
        e?.stopPropagation();
        const existingItem = cartItems.find((item) => item.id === id);
        try {
            if (!existingItem) {
                await addItemToCart(id, quantity, price);
                const itemToAdd: Item = await fetchItemById(id);
                setCartItems((currentItems) => [
                    ...currentItems,
                    {
                        ...itemToAdd,
                        quantity: quantity,
                    } as Item,
                ]);
            } else {
                await updateCartItemQuantity(
                    id,
                    quantity + (existingItem.quantity ?? 1)
                );
            }
        } catch {
            fetchCartItems();
            console.log("Error");
        }
    };

    const removeFromCart = async (id: number) => {
        try {
            await HttpService.deleteRequest(`cart/items/${id}`);
            setCartItems((currentItem) =>
                currentItem.filter((item) => item.id !== id)
            );
        } catch {
            console.log("Error removing from cart");
        }
    };
    const fetchItemById = async (id: number) => {
        return await HttpService.getRequest(`items/${id}`);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleCouponApply = async (couponCode: string, cartTotal: number) => {
        try {
            const response = await HttpService.postRequest("coupons/apply", {
                couponCode,
                cartTotal,
            });
            if (response?.discountAmount) {
                setCartSummary((current) => ({
                    ...current,
                    discount: response.discountAmount,
                }));
            }
            return response?.discountAmount || 0;
        } catch (error) {
            console.error("Error applying coupon:", error);
            throw error;
        }
    };

    useEffect(() => {
        let subTotal: number = 0;
        let saved: number = 0;
        let total: number = 0;
        cartItems.map((item) => {
            subTotal += item.price * (item.quantity ?? 1);
            saved += item.discount
                ? (item.price - item.discount) * (item.quantity ?? 1)
                : 0;
        });
        total = subTotal - saved - (cartSummary.discount || 0);
        setCartSummary((current) => ({
            ...current,
            subTotal: subTotal,
            saved: saved,
            total: total,
        }));
    }, [cartItems, cartSummary.discount]);

    return (
        <ShoppingCartContext.Provider
            value={{
                cartQuantity,
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                cartSummary,
                handleCouponApply,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
