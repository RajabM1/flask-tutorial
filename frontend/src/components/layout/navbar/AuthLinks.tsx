import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HttpService from "../../../service/HttpService";
import { removeTokens } from "../../../utils/jwtHelpers";
import { getAccessToken } from "../../../utils/jwtHelpers";
import { useTranslation } from "react-i18next";
const AuthLinks = () => {
    const { t } = useTranslation('root');
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
                    <span className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>{t('auth_links.logout')}</span>
                </li>
            ) : (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">{t('auth_links.login')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">{t('auth_links.register')}</Link>
                    </li>
                </>
            )}
        </ul>
    );
};

export default AuthLinks;
