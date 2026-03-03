import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import profileIcon from "../../assets/icons/user.svg";
import "./navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <img
                    src={logo}
                    alt="Kala Rasa Logo"
                    className="navbar-logo"
                />

                <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
                    <NavLink
                        to="/home"
                        className="nav-link"
                        onClick={closeMenu}
                    >
                        Beranda
                    </NavLink>

                    <NavLink
                        to="/recipes"
                        className="nav-link"
                        onClick={closeMenu}
                    >
                        Resep
                    </NavLink>

                    <NavLink
                        to="/shopping"
                        className="nav-link"
                        onClick={closeMenu}
                    >
                        Daftar Belanja
                    </NavLink>
                </div>

                <div className="navbar-right">
                    <div className="burger" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <Link to="/profile" className="navbar-profile">
                        <img src={profileIcon} alt="Profile" />
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;