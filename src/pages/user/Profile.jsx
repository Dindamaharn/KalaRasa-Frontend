import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Exit from "../../components/modal/Exit";
import "./Profile.css";

import profileIcon from "../../assets/icons/user.svg";
import bookmarkIcon from "../../assets/icons/fill-bookmark.svg";
import historyIcon from "../../assets/icons/history.svg";
import logoutIcon from "../../assets/icons/logout.svg";

function ProfileUser() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [openExit, setOpenExit] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            <Navbar />
            <div className="profile-wrapper">
                <div className="profile-card">

                    <h2 className="profile-title">Profil Pengguna</h2>

                    <div className="profile-content">

                        <div className="profile-left">
                            <div className="form-group">
                                <label>Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={user?.name || ""}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    value={user?.email || ""}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="profile-right">
                            <div className="form-group">
                                <label>Total Poin</label>
                                <input
                                    type="text"
                                    value={user?.points || "0"}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>No Telp</label>
                                <input
                                    type="text"
                                    value={user?.phone || "-"}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="profile-avatar-section">
                            <div className="profile-avatar">
                                <img src={profileIcon} alt="Profile" />
                            </div>

                            <Link to="/user/edit-profile" className="edit-button">
                                Edit Profil
                            </Link>
                        </div>

                    </div>

                    <div className="profile-menu">
                        <Link to="/user/bookmark" className="menu-item">
                            <span>Markah</span>
                            <img src={bookmarkIcon} alt="Markah" />
                        </Link>

                        <Link to="/user/history" className="menu-item">
                            <span>Riwayat</span>
                            <img src={historyIcon} alt="Riwayat" />
                        </Link>

                        <button
                            className="menu-item logout"
                            onClick={() => setOpenExit(true)}
                        >
                            <span>Keluar</span>
                            <img src={logoutIcon} alt="Keluar" />
                        </button>
                    </div>

                </div>
            </div>

            <Exit
                isOpen={openExit}
                onClose={() => setOpenExit(false)}
            />
        </>
    );
}

export default ProfileUser;