import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFoundPage from "../pages/errors/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import MarketPage from "../pages/items/MarketPage";
import CreateItemPage from "../pages/items/CreateItemPage";
import ProtectedRoute from "../contexts/ProtectedRoute";
import UsersPage from "../pages/users/UsersPage";
import UpdateItemPage from "../pages/items/UpdateItemPage";
import MarketDashboard from "../pages/items/MarketDashboard";
import SingleItemPage from "../pages/items/SingleItemPage";

const routes = [
    {
        path: "/",
        element: <Home />,
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
        path: "/market",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <MarketPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/market",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <MarketDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/market/add",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <CreateItemPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/market/edit/:id",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <UpdateItemPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/market/product/:id",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <SingleItemPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/users",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <UsersPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export const router = createBrowserRouter(routes);
