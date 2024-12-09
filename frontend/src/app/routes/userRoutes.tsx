import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/auth/RegisterPage"));
const Home = lazy(() => import("../../pages/market/Home"));
const ProductPage = lazy(() => import("../../pages/market/items/ProductPage"));
const CategoryPage = lazy(
    () => import("../../pages/market/categories/CategoryPage")
);
const CartPage = lazy(() => import("../../pages/market/cart/CartPage"));
const CheckoutPage = lazy(() => import("../../pages/market/cart/CheckoutPage"));
const OrderConfirmationPage = lazy(
    () => import("../../pages/market/cart/OrderConfirmationPage")
);

const userRoutes = [
    {
        path: "/",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/market/product/:id",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <ProductPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/market/:category",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <CategoryPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/cart",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <CartPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/cart/confirm",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <CheckoutPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/order/confirmation",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <OrderConfirmationPage />
            </ProtectedRoute>
        ),
    },
];

export default userRoutes;
