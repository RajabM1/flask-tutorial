import { Link } from "react-router-dom"

const NavLinks = () => {
    return (
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/market">Market</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
            </li>
        </ul>
    )
}

export default NavLinks