import { lazy } from "react";
import ProtectedRoute from "../contexts/ProtectedRoute";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const Home = lazy(() => import("../pages/market/Home"));
const ProductPage = lazy(() => import("../pages/market/items/ProductPage"));
const CategoryPage = lazy(
    () => import("../pages/market/categories/CategoryPage")
);
const CartPage = lazy(() => import("../pages/market/cart/CartPage"));
const ConfirmationPage = lazy(
    () => import("../pages/market/cart/ConfirmationPage")
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
        element: (
            <ProtectedRoute allowedRoles={["guest"]}>
                <LoginPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <ProtectedRoute allowedRoles={["guest"]}>
                <RegisterPage />
            </ProtectedRoute>
        ),
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
                <ConfirmationPage />
            </ProtectedRoute>
        ),
    },
];

export default userRoutes;
