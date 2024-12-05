import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../../pages/errors/NotFoundPage";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";

const routes = [
    ...adminRoutes,
    ...userRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export const router = createBrowserRouter(routes);
