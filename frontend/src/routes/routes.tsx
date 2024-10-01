import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
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
        path: "*",
        element: <NotFoundPage />,
    },
];

export default routes;
