import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

const NavLinks = () => {
    const { t } = useTranslation('root');
    return (
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <Link className="nav-link active" to="/">{t('nav_links.home')}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/market">{t('nav_links.market')}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">{t('nav_links.users')}</Link>
            </li>
        </ul>
    )
}

export default NavLinks