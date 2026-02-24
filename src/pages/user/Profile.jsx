import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import "./Profile.css";
import profileIcon from "../../assets/icons/user.svg";
import bookmarkIcon from "../../assets/icons/fill-bookmark.svg";
import historyIcon from "../../assets/icons/history.svg";
import logoutIcon from "../../assets/icons/logout.svg";

function ProfileUser() {
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
                                <input type="text" value="Dewi Anggraini" disabled />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" value="dewi.anggraini@example.com" disabled />
                            </div>
                        </div>

                        <div className="profile-right">
                            <div className="form-group">
                                <label>Total Poin</label>
                                <input type="text" value="1200" disabled />
                            </div>

                            <div className="form-group">
                                <label>No Telp</label>
                                <input type="text" value="0812-3456-7890" disabled />
                            </div>
                        </div>

                        <div className="profile-avatar-section">
                            <div className="profile-avatar">
                                <img src={profileIcon} alt="Profile" />
                            </div>
                            <Link to="/edit-profile" className="edit-button">
                                Edit Profil
                            </Link>
                        </div>

                    </div>

                    <div className="profile-menu">
                        <Link to="/markah" className="menu-item">
                            <span>Markah</span>
                            <img src={bookmarkIcon} alt="Markah" />
                        </Link>

                        <Link to="/riwayat" className="menu-item">
                            <span>Riwayat</span>
                            <img src={historyIcon} alt="Riwayat" />
                        </Link>

                        <button
                            className="menu-item logout"
                            onClick={() => setShowLogoutModal(true)}
                        >
                            <span>Keluar</span>
                            <img src={logoutIcon} alt="Keluar" />
                        </button>

                    </div>

                </div>
            </div>
        </>

    );
}

export default ProfileUser;