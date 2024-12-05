import { Suspense } from "react";
import { AppRoutes } from "./routes";

export const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
        </Suspense>
    );
};
