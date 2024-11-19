import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider from "../contexts/AuthProvider";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";
import { CategoryProvider } from "../contexts/CategoryContext";

const AppRoutes = () => {
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

export default AppRoutes;
