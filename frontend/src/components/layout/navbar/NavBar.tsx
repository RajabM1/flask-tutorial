import { Link } from "react-router-dom"
import NavLinks from "./NavLinks"
import AuthLinks from "./AuthLinks"
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation('root');
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">{t('nav_links.app_name')}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#footerNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <NavLinks />
        <AuthLinks />
      </div>
    </nav>
  )
}

export default NavBar
