import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import { getUserRole } from "../../../utils/jwtHelpers";

const NavLinks = () => {
    const { t } = useTranslation('root');
    const role = getUserRole();

    const canAccessMarket = (role: string) => role !== 'guest';
    const canAccessUsers = (role: string) => role === 'admin';

    return (
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">{t('nav_links.home') }</Link>
            </li>
            {canAccessMarket(role) && <li className="nav-item">
                <Link className="nav-link" to="/market">{t('nav_links.market')}</Link>
            </li>}
            {canAccessUsers(role) && <li className="nav-item">
                <Link className="nav-link" to="/users">{t('nav_links.users')}</Link>
            </li>}
        </ul>
    )
}

export default NavLinks