import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Item } from "../types/item";
import HttpService from "../service/HttpService";

type ShoppingCartContextType = {
    cartQuantity: number;
    cartSummary: { subTotal: number, saved: number };
    cartItems: Item[];
    addToCart: (
        id: number,
        quantity: number,
        e?: React.MouseEvent<HTMLButtonElement>
    ) => void;
    removeFromCart: (id: number) => void;
    updateCartItemQuantity: (id: number, quantity: number) => void;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<Item[]>([]);
    const cartQuantity = cartItems.length;
    const [cartSummary, setCartSummary] = useState({
        subTotal: 0,
        saved: 0
    });

    const fetchCartItems = async () => {
        try {
            const response = await HttpService.getRequest("cart");
            setCartItems(response);
        } catch {
            console.log("Error fetching cart items");
        }
    };
    const addItemToCart = async (id: number, quantity: number) => {
        await HttpService.postRequest(`cart/item/add`, {
            itemId: id,
            quantity: quantity,
        });
    };
    const updateCartItemQuantity = async (id: number, quantity: number) => {
        await HttpService.patchRequest("cart/item", {
            itemId: id,
            quantity: quantity,
        });
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };
    const fetchItemById = async (id: number) => {
        return await HttpService.getRequest(`items/${id}`);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const addToCart = async (
        id: number,
        quantity: number,
        e?: React.MouseEvent<HTMLButtonElement>
    ) => {
        e?.stopPropagation();
        const existingItem = cartItems.find((item) => item.id === id);
        try {
            if (!existingItem) {
                await addItemToCart(id, quantity);
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
            await HttpService.deleteRequest(`cart/item/${id}`);
            setCartItems((currentItem) =>
                currentItem.filter((item) => item.id !== id)
            );
        } catch {
            console.log("Error removing from cart");
        }
    };

    useEffect(() => {
        let subTotal: number = 0;
        let saved: number = 0;
        cartItems.map((item) => {
            subTotal += item.price * (item.quantity ?? 1);
            saved += item.discount ? (item.price - (item.discount)) * (item.quantity ?? 1) : 0;
        });
        setCartSummary({ subTotal, saved });
    }, [cartItems]);

    return (
        <ShoppingCartContext.Provider
            value={{
                cartQuantity,
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                cartSummary
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
