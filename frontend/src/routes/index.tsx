import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider from "../contexts/AuthProvider";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <ShoppingCartProvider>
                <RouterProvider router={router} />
            </ShoppingCartProvider>
        </AuthProvider>
    );
};

export default AppRoutes;
