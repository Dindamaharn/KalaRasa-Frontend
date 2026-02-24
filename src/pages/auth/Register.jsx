import { register } from "../../services/authService.js";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import "./register.css";
import logo from "../../assets/images/logo.png";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeOffIcon from "../../assets/icons/eye-off.svg";
import calendarIcon from "../../assets/icons/calendar.svg";

function Register() {
    const navigate = useNavigate();
    const dateRef = useRef(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        gender: "",
        birth_date: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
        await register(form);
        navigate("/login");
        } catch (error) {
        if (error.response?.status === 422) {
            setErrors(error.response.data.errors);
        }
        }
    };

    return (
        <div className="register-page">

        {/* LEFT SIDE (FORM) */}
        <div className="register-left">
            <div className="register-card">
            <img src={logo} alt="logo" className="register-logo" />

            <form onSubmit={handleRegister}>
                <label className="register-label">Nama Lengkap</label>
                <div className="input-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Masukkan Nama Lengkap"
                    onChange={handleChange}
                />
                </div>
                {errors.name && <p className="error-text">{errors.name[0]}</p>}

                <label className="register-label">Email</label>
                <div className="input-group">
                <input
                    type="email"
                    name="email"
                    placeholder="Masukkan Email"
                    onChange={handleChange}
                />
                </div>
                {errors.email && <p className="register-error-text">{errors.email[0]}</p>}

                <label className="register-label">Kata Sandi</label>
                <div className="input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Buat Kata Sandi"
                    onChange={handleChange}
                />
                <img
                    src={showPassword ? eyeIcon : eyeOffIcon}
                    alt="toggle"
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                />
                </div>
                {errors.password && <p className="register-error-text">{errors.password[0]}</p>}

                <label className="register-label">Konfirmasi Kata Sandi</label>
                <div className="input-group">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="Ulangi Kata Sandi"
                    onChange={handleChange}
                />
                <img
                    src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                    alt="toggle"
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                </div>

                <label className="register-label">No Telp</label>
                <div className="input-group">
                <input
                    type="text"
                    name="phone"
                    placeholder="Masukkan No Telp"
                    onChange={handleChange}
                />
                </div>

            <label className="register-label">Jenis Kelamin</label>
            <div className="input-group">

            <label className="gender-option">
                <input
                type="radio"
                name="gender"
                value="P"
                onChange={handleChange}
                />
                Wanita
            </label>

            <label className="gender-option">
                <input
                type="radio"
                name="gender"
                value="L"
                onChange={handleChange}
                />
                Pria
            </label>

            </div>

            <label className="register-label">Tanggal Lahir</label>
            <div className="input-group">
                <input
                ref={dateRef}
                type="date"
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
                className={form.birth_date ? "date-filled" : ""}
                />
                <img
                    src={calendarIcon}
                    alt="calendar"
                    className="register-calendar-icon"
                    onClick={() => dateRef.current.showPicker()}
                />
            </div>

            <button className="register-btn" type="submit">
                Daftar
            </button>

            <p className="register-login-text">
                Sudah Memiliki Akun?{" "}
                <Link to="/login" className="register-login-link">
                Masuk
                </Link>
            </p>
            </form>
        </div>
        </div>

        {/* RIGHT SIDE (BACKGROUND + TEXT) */}
        <div className="register-right">
            <div className="register-text">
            <h1> <span className="extra">Bergabung</span> <span className="semi">dengan</span> <br />
                <span className="extra">Kala Rasa</span>
            </h1>
            <p className="register-desc">
                Catat belanja, atur pengeluaran, <span className="semi">dan eksplor berbagai </span> 
                menu masakan <span className="semi">lewat</span> satu platform
            </p>
            </div>
        </div>

        </div>
    );
}

export default Register;