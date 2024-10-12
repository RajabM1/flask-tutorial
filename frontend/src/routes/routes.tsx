import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFoundPage from "../pages/errors/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MarketPage from "../pages/MarketPage";
import CreateItem from "../pages/CreateItem";
import ProtectedRoute from "../contexts/ProtectedRoute";
import UsersPage from "../pages/UsersPage";

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
            <ProtectedRoute allowedRoles={["user", "admin"]}>
                <MarketPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/market/add",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <CreateItem />
            </ProtectedRoute>
        ),
    },
    {
        path: "/users",
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
