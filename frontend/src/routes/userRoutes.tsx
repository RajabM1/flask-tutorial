import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "../contexts/ProtectedRoute";
import Home from "../pages/market/Home";
import ProductPage from "../pages/market/items/ProductPage";
import ItemByCategoryPage from "../pages/market/categories/ItemByCategoryPage";
import CartPage from "../pages/market/cart/CartPage";
import ConfirmationPage from "../pages/market/cart/ConfirmationPage";

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
                <ItemByCategoryPage />
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
