import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MarketPage from "../pages/MarketPage";

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
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: '/market',
        element: <MarketPage />
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export default routes;
