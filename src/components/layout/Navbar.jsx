import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import profileIcon from "../../assets/icons/user.svg";
import Register from "../modal/Register";
import "./navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const token = localStorage.getItem("access_token");

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
                    <NavLink to="/home" className="nav-link" onClick={closeMenu}>
                        Beranda
                    </NavLink>

                    <NavLink to="/recipes" className="nav-link" onClick={closeMenu}>
                        Resep
                    </NavLink>

                    <NavLink to="/shopping" className="nav-link" onClick={closeMenu}>
                        Daftar Belanja
                    </NavLink>
                </div>

                <div className="navbar-right">

                    <div className="burger" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* ========= CONDITIONAL UI ========= */}

                    {token ? (

                        /* USER LOGIN */
                        <Link to="/profile" className="navbar-profile">
                            <img src={profileIcon} alt="Profile" />
                        </Link>

                    ) : (

                        /* GUEST */
                        <div className="navbar-auth">
                            <Link to="/login" className="btn-login">
                                Masuk
                            </Link>

                            <button
                                className="btn-register"
                                onClick={() => setShowRegister(true)}
                            >
                                Daftar
                            </button>
                        </div>

                    )}

                </div>

            </div>

            {/* REGISTER MODAL */}
            <Register
                show={showRegister}
                onClose={() => setShowRegister(false)}
            />

        </nav>
    );
}

export default Navbar;