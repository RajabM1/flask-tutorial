export const paths = {
    HOME: "/",
    AUTH: {
        REGISTER: "/register",
        LOGIN: "/login",
    },
    CART: {
        SHIPPING_CART: "/cart",
        CHECKOUT: "/cart/confirm",
    },
    ORDER: {
        CONFIRMATION: "/order/confirmation",
    },
    MARKET: {
        BY_CATEGORY: (category: string) => `/market/${category}`,
        BY_PRODUCT_ID: (id: number) => `/market/product/${id}`,
    },
};
