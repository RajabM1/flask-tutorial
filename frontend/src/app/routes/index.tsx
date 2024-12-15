import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "../../features/auth/context/AuthContext";
import { ShoppingCartProvider } from "../../contexts/ShoppingCartContext";
import { CategoryProvider } from "../../contexts/CategoryContext";

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <CategoryProvider>
                <ShoppingCartProvider>
                    <RouterProvider router={router} />
                </ShoppingCartProvider>
            </CategoryProvider>
        </AuthProvider>
    );
};
