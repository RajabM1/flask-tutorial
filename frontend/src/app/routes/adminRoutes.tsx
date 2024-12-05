import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const MarketDashboard = lazy(
    () => import("../../pages/admin/items/MarketDashboard")
);
const UpdateItemPage = lazy(
    () => import("../../pages/admin/items/UpdateItemPage")
);
const CreateCategory = lazy(
    () => import("../../pages/admin/categories/CreateCategory")
);
const CreateItemPage = lazy(
    () => import("../../pages/admin/items/CreateItemPage")
);
const UsersPage = lazy(() => import("../../pages/admin/users/UsersPage"));
const CategoryPage = lazy(
    () => import("../../pages/admin/categories/CategoryPage")
);

const adminRoutes = [
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
        path: "/admin/users",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <UsersPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/categories",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <CategoryPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/categories/add",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <CreateCategory />
            </ProtectedRoute>
        ),
    },
];

export default adminRoutes;
