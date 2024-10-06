import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HttpService from "../../../service/HttpService";
import { removeTokens } from "../../../utils/jwtHelpers";
import { getAccessToken } from "../../../utils/jwtHelpers";
const AuthLinks = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await HttpService.deleteRequest('auth/logout');
            removeTokens()

            setIsLoggedIn(false);
            navigate("/login", { replace: true });
        } catch {
            console.error("Failed to logout");
        }
    };

    return (
        <ul className="navbar-nav">
            {isLoggedIn ? (
                <li className="nav-item">
                    <span className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
                </li>
            ) : (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </>
            )}
        </ul>
    );
};

export default AuthLinks;
