import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export default routes;
