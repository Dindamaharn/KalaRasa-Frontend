import Navbar from "../../components/layout/Navbar";
import "./editProfile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/authService";

function EditProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        birth_date: "",
        points: 0
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                const user = response.data;

                setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    gender: user.gender || "",
                    birth_date: user.birth_date || "",
                    points: user.points || 0,
                    password: ""
                });

            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { ...formData };

            if (!payload.password) {
                delete payload.password;
            }

            const response = await updateProfile(payload);

            // update localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/profile");

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
                                {errors.name && <p className="error-text">{errors.name[0]}</p>}
                            </div>

                            <div>
                                <label>Total Poin</label>
                                <input
                                    type="text"
                                    value={formData.points}
                                    disabled
                                />
                            </div>

                            <div>
                                <label>No Telp</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <p className="error-text">{errors.phone[0]}</p>}
                            </div>

                            <div>
                                <label>Alamat Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="error-text">{errors.email[0]}</p>}
                            </div>

                            <div>
                                <label>Jenis Kelamin</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="L">Pria</option>
                                    <option value="P">Wanita</option>
                                </select>
                                {errors.gender && <p className="error-text">{errors.gender[0]}</p>}
                            </div>

                            <div>
                                <label>Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="birth_date"
                                    value={formData.birth_date}
                                    onChange={handleChange}
                                />
                                {errors.birth_date && <p className="error-text">{errors.birth_date[0]}</p>}
                            </div>

                            <div className="full-width">
                                <label>Kata Sandi Baru</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Kosongkan jika tidak ingin mengubah"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="error-text">{errors.password[0]}</p>}
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

                            <button
                                type="submit"
                                className="save-btn"
                            >
                                Simpan Perubahan
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default EditProfile;