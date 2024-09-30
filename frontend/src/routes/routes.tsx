import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export default routes;
