import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getUserRole } from "../../../utils/jwtHelpers";

const NavLinks = () => {
    const { t } = useTranslation("root");
    const role = getUserRole();

    const adminAccess = (role: string) => role === "admin";
    const userAccess = (role: string) => role === "user";

    return (
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">
                    {t("nav_links.home")}
                </Link>
            </li>
            {userAccess(role) && (
                <li className="nav-item">
                    <Link className="nav-link" to="/market">
                        {t("nav_links.market")}
                    </Link>
                </li>
            )}
            {adminAccess(role) && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/market">
                            {t("nav_links.market")}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/users">
                            {t("nav_links.users")}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/categories">
                            {t("nav_links.categories")}
                        </Link>
                    </li>
                </>
            )}
        </ul>
    );
};

export default NavLinks;
