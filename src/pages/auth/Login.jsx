import { login } from "../../services/authService";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        device_uuid: crypto.randomUUID(),
        device_name: "react-web",
        platform: "web",
      });

      const token = response.data.access_token;

      // simpan token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/home");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else if (error.response?.status === 401) {
        setErrors({
          email: ["Email atau password salah"],
        });
      } else {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-text">
          <h1>
            <span className="extra">Selamat Datang,</span> <br />
            <span className="semi">di</span>{" "}
            <span className="extra">Kala Rasa</span>
          </h1>
          <p className="desc">
            Masuk <span className="semi">untuk</span> mengelola daftar belanja{" "}
            <span className="semi">&</span> <br />
            temukan resep favoritmu
          </p>
        </div>
      </div>

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

            {errors.email && (
              <p className="error-text">{errors.email[0]}</p>
            )}

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

            {errors.password && (
              <p className="error-text">{errors.password[0]}</p>
            )}

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