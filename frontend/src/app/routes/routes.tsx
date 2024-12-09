import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../../pages/errors/NotFoundPage";
import userRoutes from "./userRoutes";

const routes = [
    ...userRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export const router = createBrowserRouter(routes);
