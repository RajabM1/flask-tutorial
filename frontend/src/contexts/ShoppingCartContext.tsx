import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Item } from "../types/item";
import HttpService from "../service/HttpService";
import { ShoppingCartContextType } from "../types/ShoppingCartContextType";
import { useFetch } from "../hooks/shared/useFetch";

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<Item[]>([]);

    const { data: cartResponse, isLoading } = useFetch("cart");
    useEffect(() => {
        if (!isLoading && cartResponse) {
            setCartItems(cartResponse);
        }
    }, [cartResponse, isLoading]);
    const cartQuantity = cartItems.length;

    const addItemToCart = async (
        id: number,
        quantity: number,
        price: number
    ) => {
        await HttpService.postRequest("cart/items", {
            itemId: id,
            quantity,
            price,
        });
    };
    const updateCartItemQuantity = async (id: number, quantity: number) => {
        await HttpService.patchRequest("cart/items", {
            itemId: id,
            quantity,
        });
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
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
                        quantity,
                    } as Item,
                ]);
            } else {
                await updateCartItemQuantity(
                    id,
                    quantity + (existingItem.quantity ?? 1)
                );
            }
        } catch {
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
        const response = await HttpService.getRequest(`items/${id}`);
        return response.data;
    };

    const handleCouponApply = async (couponCode: string, cartTotal: number) => {
        try {
            const response = await HttpService.postRequest("coupons/apply", {
                couponCode,
                cartTotal,
            });

            return response.data?.discountAmount || 0;
        } catch (error) {
            console.error("Error applying coupon:", error);
            throw error;
        }
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                cartQuantity,
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                handleCouponApply,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
