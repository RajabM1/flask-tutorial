import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider from "../contexts/AuthProvider";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />;
        </AuthProvider>
    );
};

export default AppRoutes;
