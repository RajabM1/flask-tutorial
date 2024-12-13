import { PropsWithChildren, useEffect, useState } from "react";
import { Item } from "../../types/item";
import { useFetch } from "../../hooks/shared/useFetch";
import HttpService from "../../service/HttpService";
import ShoppingCartContext from "./ShoppingCartContext";
import endpoints from "../../config/api";

const ShoppingCartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<Item[]>([]);

    const { data: cartResponse, isLoading } = useFetch(
        endpoints.SHIPPING_CART.GET
    );
    useEffect(() => {
        if (!isLoading && cartResponse) {
            setCartItems(cartResponse);
        }
    }, [cartResponse, isLoading]);

    const calculateCartQuantity = () => {
        return cartItems.reduce(
            (total, item) => total + (item.quantity || 0),
            0
        );
    };

    const cartQuantity = calculateCartQuantity();

    const addItemToCart = async (
        id: number,
        quantity: number,
        price: number
    ) => {
        await HttpService.postRequest(endpoints.SHIPPING_CART.CART_ITEMS, {
            itemId: id,
            quantity,
            price,
        });
    };
    const updateCartItemQuantity = async (id: number, quantity: number) => {
        await HttpService.patchRequest(endpoints.SHIPPING_CART.CART_ITEMS, {
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
            await HttpService.deleteRequest(
                endpoints.SHIPPING_CART.DELETE_CART_ITEMS_BY_ID(id)
            );
            setCartItems((currentItem) =>
                currentItem.filter((item) => item.id !== id)
            );
        } catch {
            console.log("Error removing from cart");
        }
    };

    const fetchItemById = async (id: number) => {
        const response = await HttpService.getRequest(
            endpoints.PRODUCT.BY_ID(id)
        );
        return response.data;
    };

    const handleCouponApply = async (couponCode: string, cartTotal: number) => {
        try {
            const response = await HttpService.postRequest(
                endpoints.COUPONS.APPLY,
                {
                    couponCode,
                    cartTotal,
                }
            );

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

export default ShoppingCartProvider;
