import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./aside.css";
import Exit from "../modal/Exit";
import logo from "../../assets/images/logo.png";
import userIcon from "../../assets/icons/userAside.svg";

function Aside() {
    const [openExit, setOpenExit] = useState(false);

    return (
        <>
        <aside className="aside">
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
            >
                Beranda
            </NavLink>

            <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                isActive ? "menu active" : "menu"
                }
            >
                Pantau Pengguna
            </NavLink>

            <NavLink
                to="/admin/resep"
                className={({ isActive }) =>
                isActive ? "menu active" : "menu"
                }
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