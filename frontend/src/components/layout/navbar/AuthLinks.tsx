import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HttpService from "../../../service/HttpService";

const AuthLinks = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout =async () => {
        try{
            await HttpService.deleteRequest('auth/logout');
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
            navigate("/login", { replace: true }); 
        }catch{
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
