import Navbar from "../../components/layout/Navbar";
import styles from "./editProfile.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessPopup from "../../components/modal/Succes";
import { getProfile, updateProfile } from "../../services/authService";
import LoadingModal from "../../components/modal/Loading";

function EditProfile() {
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        birthdate: "",
        points: 0,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                const user = response.data.data.user;

                setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    gender: user.gender || "",
                    birthdate: user.birthdate
                        ? new Date(new Date(user.birthdate).getTime() + 7 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                        : "",
                    points: user.points || 0,
                    password: "",
                });
            } catch (error) {
                console.log("Error ambil profile:", error);

                if (error.response?.status === 401) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("user");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const payload = { ...formData };

            if (!payload.password) {
                delete payload.password;
            }

            await updateProfile(payload);

            setShowSuccess(true);
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className={styles.editProfilePage}>
                <div className={styles.editCard}>
                    <h2>Informasi Akun</h2>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div>
                                <label>Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className={styles.errorText}>{errors.name[0]}</p>
                                )}
                            </div>

                            <div>
                                <label>Total Poin</label>
                                <input type="text" value={formData.points} disabled />
                            </div>

                            <div>
                                <label>No Telp</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && (
                                    <p className={styles.errorText}>{errors.phone[0]}</p>
                                )}
                            </div>

                            <div>
                                <label>Alamat Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className={styles.errorText}>{errors.email[0]}</p>
                                )}
                            </div>

                            <div>
                                <label>Jenis Kelamin</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="pria">Pria</option>
                                    <option value="wanita">Wanita</option>
                                </select>
                                {errors.gender && (
                                    <p className={styles.errorText}>{errors.gender[0]}</p>
                                )}
                            </div>

                            <div>
                                <label>Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={formData.birthdate || ""}
                                    onChange={handleChange}
                                />
                                {errors.birthdate && (
                                    <p className={styles.errorText}>{errors.birthdate[0]}</p>
                                )}
                            </div>

                            <div className={styles.fullWidth}>
                                <p
                                    className={styles.resetPasswordText}
                                    onClick={() => navigate("/reset-password")}
                                >
                                    <span className={styles.resetGray}>Atur Ulang </span>
                                    <span className={styles.resetOrange}>Kata Sandi</span>
                                </p>
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={() => navigate("/profile")}
                            >
                                Batalkan Perubahan
                            </button>

                            <button type="submit" className={styles.saveBtn}>
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showSuccess && (
                <SuccessPopup
                    title="Profil berhasil diperbarui!"
                    message="Perubahan informasi akunmu telah disimpan dengan aman."
                    onClose={() => {
                        setShowSuccess(false);
                        navigate("/profile");
                    }}
                />
            )}

            <LoadingModal
                isOpen={loading}
                text="Memuat profil..."
            />
        </>
    );
}

export default EditProfile;