import { login } from "../../services/authService";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import logo from "../../assets/images/logo.png";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeOffIcon from "../../assets/icons/eye-off.svg";

import RegisterModal from "../../components/modal/Register";
import ForgotPassword from "../../components/modal/ForgotPassword";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

// ambil / buat device uuid sekali saja
let deviceUUID = localStorage.getItem("device_uuid");

if (!deviceUUID) {
  deviceUUID = crypto.randomUUID();
  localStorage.setItem("device_uuid", deviceUUID);
}

// ambil nama device (browser + OS)
function getDeviceName() {
  const ua = navigator.userAgent;

  let browser = "Browser";
  if (ua.includes("Chrome") && !ua.includes("Edge") && !ua.includes("OPR")) {
    browser = "Chrome";
  } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
    browser = "Safari";
  } else if (ua.includes("Firefox")) {
    browser = "Firefox";
  } else if (ua.includes("Edge")) {
    browser = "Edge";
  } else if (ua.includes("OPR") || ua.includes("Opera")) {
    browser = "Opera";
  }

  let os = "Unknown";
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "Mac";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("like Mac")) os = "iOS";

  return `${browser} - ${os}`;
}

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await login({
      email,
      password,
      device_uuid: deviceUUID,
      device_name: getDeviceName(),
      platform: "web",
    });

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const user = response.data.user;

    // simpan token
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    // cek role dari API
    if (user.role?.name === "admin") {
      navigate("/admin/home");
    } else {
      navigate("/home");
    }
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
            <p className="forgot" onClick={() => setShowForgot(true)}>
              Lupa Kata Sandi?
            </p>
            {errors.password && (
              <p className="error-text">{errors.password[0]}</p>
            )}

            <button className="login-btn" type="submit">
              Masuk
            </button>

            <p className="register-text-to-page">
              Belum Memiliki Akun?{" "}
              <span
                className="register-link"
                onClick={() => setShowRegister(true)}
              >
                Daftar
              </span>
            </p>
            <RegisterModal
              show={showRegister}
              onClose={() => setShowRegister(false)}
            />
            <ForgotPassword
              show={showForgot}
              onClose={() => setShowForgot(false)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;