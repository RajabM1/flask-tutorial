import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { paths } from "../../config/paths";

const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));
const RegisterPage = lazy(
    () => import("../../features/auth/pages/RegisterPage")
);
const ForgetPasswordPage = lazy(
    () => import("../../features/auth/pages/ForgetPasswordPage")
);
const ResetPasswordPage = lazy(
    () => import("../../features/auth/pages/ResetPasswordPage")
);
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
        path: paths.HOME,
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.AUTH.LOGIN,
        element: (
            <ProtectedRoute allowedRoles={["guest"]}>
                <LoginPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.AUTH.REGISTER,
        element: (
            <ProtectedRoute allowedRoles={["guest"]}>
                <RegisterPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.AUTH.FORGET_PASSWORD,
        element: (
            <ProtectedRoute allowedRoles={["guest"]}>
                <ForgetPasswordPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.AUTH.RESET_PASSWORD,
        element: (
            <ProtectedRoute allowedRoles={["guest"]}>
                <ResetPasswordPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.MARKET.PRODUCT,
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <ProductPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.MARKET.CATEGORY,
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <CategoryPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.CART.SHIPPING_CART,
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <CartPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.CART.CHECKOUT,
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <CheckoutPage />
            </ProtectedRoute>
        ),
    },
    {
        path: paths.ORDER.CONFIRMATION,
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <OrderConfirmationPage />
            </ProtectedRoute>
        ),
    },
];

export default userRoutes;
