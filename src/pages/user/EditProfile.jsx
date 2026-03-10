import Navbar from "../../components/layout/Navbar";
import "./editProfile.css";
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
                        ? user.birthdate.split("T")[0]
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

            <div className="edit-profile-page">
                <div className="edit-card">
                    <h2>Informasi Akun</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div>
                                <label>Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className="error-text">{errors.name[0]}</p>
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
                                    <p className="error-text">{errors.phone[0]}</p>
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
                                    <p className="error-text">{errors.email[0]}</p>
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
                                    <p className="error-text">{errors.gender[0]}</p>
                                )}
                            </div>

                            <div>
                                <label>Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                />
                                {errors.birth_date && (
                                    <p className="error-text">{errors.birth_date[0]}</p>
                                )}
                            </div>

                            <div className="full-width">
                                <p
                                    className="reset-password-text"
                                    onClick={() => navigate("/reset-password")}
                                >
                                    <span className="reset-gray">Atur Ulang </span>
                                    <span className="reset-orange">Kata Sandi</span>
                                </p>
                            </div>
                        </div>

                        <div className="button-group">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/profile")}
                            >
                                Batalkan Perubahan
                            </button>

                            <button type="submit" className="save-btn">
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* POPUP SUCCESS */}
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