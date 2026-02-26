import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./aside.css";
import Exit from "../modal/Exit";
import logo from "../../assets/images/logo.png";
import userIcon from "../../assets/icons/userAside.svg";

function Aside() {
    const [openExit, setOpenExit] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <>
        {/* tombol hamburger (muncul di mobile) */}
        <button
            className="menu-toggle"
            onClick={() => setOpenSidebar(!openSidebar)}
        >
            ☰
        </button>

        <aside className={`aside ${openSidebar ? "open" : ""}`}>
            <div className="profile">
                <img src={userIcon} alt="user" className="avatar" />
                <img src={logo} alt="logo" className="logo" />
            </div>

            <nav className="aside-menu">
                <NavLink
                    to="/admin/home"
                    className={({ isActive }) =>
                        isActive ? "menu active" : "menu"
                    }
                    onClick={() => setOpenSidebar(false)}
                >
                    Beranda
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive ? "menu active" : "menu"
                    }
                    onClick={() => setOpenSidebar(false)}
                >
                    Pantau Pengguna
                </NavLink>

                <NavLink
                    to="/admin/resep"
                    className={({ isActive }) =>
                        isActive ? "menu active" : "menu"
                    }
                    onClick={() => setOpenSidebar(false)}
                >
                    Kelola Resep
                </NavLink>

                <button
                    className="menu logout"
                    onClick={() => setOpenExit(true)}
                >
                    Keluar
                </button>
            </nav>
        </aside>

        {/* overlay mobile */}
        {openSidebar && (
            <div
                className="sidebar-overlay"
                onClick={() => setOpenSidebar(false)}
            />
        )}

        <Exit
            isOpen={openExit}
            onClose={() => setOpenExit(false)}
            onConfirm={() => {
                console.log("Logout berhasil");
            }}
        />
        </>
    );
}

export default Aside;