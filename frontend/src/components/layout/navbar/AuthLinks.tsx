import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";

const AuthLinks = () => {
    const { t } = useTranslation('root');

    const { handleLogout, authToken, currentUser } = useAuth();

    return (
        <ul className="navbar-nav">
            {currentUser && (
                <li className="nav-item">
                    <span className="nav-link text-success fw-bold">
                        {currentUser.budget}$
                    </span>
                </li>
            )}
            <li className="nav-item">
                <span className="nav-link fw-bold">
                {t('auth_links.welcome')}, {currentUser ? currentUser.username : t('auth_links.guest')}
                </span>
            </li>
            {(authToken) ? (
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
