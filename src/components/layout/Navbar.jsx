import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import profileIcon from "../../assets/icons/user.svg";
import "./navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">

                <img src={logo} alt="Kala Rasa Logo" className="navbar-logo" />

                <div className="navbar-menu">
                    <NavLink to="/home" className="nav-link">
                        Beranda
                    </NavLink>
                    <NavLink to="/recipes" className="nav-link">
                        Resep
                    </NavLink>
                    <NavLink to="/shopping" className="nav-link">
                        Daftar Belanja
                    </NavLink>
                </div>

                <Link to="/profile" className="navbar-profile">
                    <img src={profileIcon} alt="Profile" />
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;