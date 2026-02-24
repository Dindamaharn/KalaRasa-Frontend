import { login } from "../../services/authService.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
import logo from "../../assets/images/logo.png";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeOffIcon from "../../assets/icons/eye-off.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await login({
      email,
      password,
    });

    const user = response.data.data.user;
    const token = response.data.data.access_token;

    // simpan ke localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // redirect berdasarkan role
    if (user.role === "admin") {
      navigate("/home-admin");
    } else {
      navigate("/home");
    }

  } catch (error) {
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
    } else if (error.response?.status === 401) {
      setGeneralError(error.response.data.message);
    } else {
      console.error(error);
    }
  }
};

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-text">
          <h1>
            <span className="extra">Selamat Datang,</span> <br />
            <span className="semi">di</span> <span className="extra">Kala Rasa</span>
          </h1>
          <p className="desc">
            Masuk <span className="semi">untuk</span> mengelola daftar belanja <span className="semi">&</span> <br />
            temukan resep favoritmu
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <img src={logo} alt="logo" className="login-logo" />
            <form onSubmit={handleLogin}>
              <label>Email</label>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label>Kata Sandi</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  alt="toggle password"
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              {errors.email && (
                <p className="error-text">{errors.email[0]}</p>
              )}
              {errors.password && (
                <p className="error-text">{errors.password[0]}</p>
              )}

              <p className="forgot">Lupa Kata Sandi?</p>

              <button className="login-btn" type="submit">
                  Masuk
              </button>

              <p className="register-text-to-page">
                Belum Memiliki Akun?{" "}
                <Link to="/register" className="register-link">
                  Daftar
                </Link>
              </p>
              </form>
              </div>
            </div>
          </div>
        );
}

export default Login;