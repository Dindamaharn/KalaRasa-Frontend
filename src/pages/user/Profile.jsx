import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../services/authService";
import Navbar from "../../components/layout/Navbar";
import Exit from "../../components/modal/Exit";
import LoadingModal from "../../components/modal/Loading";
import styles from "./profile.module.css";

import profileIcon from "../../assets/icons/user.svg";
import bookmarkIcon from "../../assets/icons/fill-bookmark.svg";
import historyIcon from "../../assets/icons/history.svg";
import logoutIcon from "../../assets/icons/logout.svg";

function ProfileUser() {
    const [user, setUser] = useState(null);
    const [openExit, setOpenExit] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getProfile();
                const userData = response.data.data.user;
                setUser(userData);
            } catch (error) {
                console.error("Profile error:", error);

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            <Navbar />

            <div className={styles.profileWrapper}>
                {!loading && !user && (
                    <div style={{ padding: "40px" }}>
                        Gagal memuat data user
                    </div>
                )}

                {!loading && user && (
                    <div className={styles.profileCard}>
                        <h2 className={styles.profileTitle}>Profil Pengguna</h2>

                        <div className={styles.profileContent}>
                            <div className={styles.profileLeft}>
                                <div className={styles.formGroup}>
                                    <label>Nama Lengkap</label>
                                    <input type="text" value={user?.name || "-"} disabled />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input type="text" value={user?.email || "-"} disabled />
                                </div>
                            </div>

                            <div className={styles.profileRight}>
                                <div className={styles.formGroup}>
                                    <label>Total Poin</label>
                                    <input type="text" value={user?.points ?? "0"} disabled />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>No Telp</label>
                                    <input type="text" value={user?.phone || "-"} disabled />
                                </div>
                            </div>

                            <div className={styles.profileAvatarSection}>
                                <div className={styles.profileAvatar}>
                                    <img src={profileIcon} alt="Profile" />
                                </div>

                                <Link to="/edit-profile" className={styles.editButton}>
                                    Edit Profil
                                </Link>
                            </div>
                        </div>

                        <div className={styles.profileMenu}>
                            <Link to="/bookmark" className={styles.menuItem}>
                                <span>Markah</span>
                                <img src={bookmarkIcon} alt="Markah" />
                            </Link>

                            <Link to="/history" className={styles.menuItem}>
                                <span>Riwayat</span>
                                <img src={historyIcon} alt="Riwayat" />
                            </Link>

                            <button
                                className={`${styles.menuItem} ${styles.logout}`}
                                onClick={() => setOpenExit(true)}
                            >
                                <span>Keluar</span>
                                <img src={logoutIcon} alt="Keluar" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Exit
                isOpen={openExit}
                onClose={() => setOpenExit(false)}
                onConfirm={handleLogout}
            />

            <LoadingModal
                isOpen={loading}
                text="Memuat profil..."
            />
        </>
    );
}

export default ProfileUser;