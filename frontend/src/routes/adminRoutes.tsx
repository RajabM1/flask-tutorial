import MarketDashboard from "../pages/admin/items/MarketDashboard";
import UpdateItemPage from "../pages/admin/items/UpdateItemPage";
import CreateCategory from "../pages/admin/categories/CreateCategory";
import ProtectedRoute from "../contexts/ProtectedRoute";
import CreateItemPage from "../pages/admin/items/CreateItemPage";
import UsersPage from "../pages/admin/users/UsersPage";
import CategoryPage from "../pages/admin/categories/CategoryPage";

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
