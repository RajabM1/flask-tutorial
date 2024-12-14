import { PropsWithChildren } from "react";
import { getUserRole } from "../../utils/jwtHelpers";
import UnauthorizedPage from "../../pages/errors/UnauthorizedPage";
import { useAuth } from "../../contexts/AuthContext";
import LoginPage from "../../features/auth/pages/LoginPage";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles: Array<string>;
};

export default function ProtectedRoute({
    allowedRoles,
    children,
}: ProtectedRouteProps) {
    const { currentUser } = useAuth();

    if (currentUser === null) {
        return <LoginPage />;
    }

    if (currentUser === undefined) {
        return <div>Loading...</div>;
    }

    if (
        allowedRoles &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(getUserRole(currentUser))
    ) {
        return <UnauthorizedPage />;
    }

    return children;
}
