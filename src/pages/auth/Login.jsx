import "./login.css";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeOffIcon from "../../assets/icons/eye-off.svg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
            Masuk untuk mengelola daftar belanja & <br />
            temukan resep favoritmu
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <img src={logo} alt="logo" className="login-logo" />

          <form>
            <label>Email</label>
            <div className="input-group">
              <input type="email" placeholder="Masukkan Email" />
            </div>

            <label>Kata Sandi</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
              />
              <img
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt="toggle password"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <p className="forgot">Lupa Kata Sandi?</p>

            <button className="login-btn">Masuk</button>

            <p className="register-text">
              Belum Memiliki Akun? <span>Daftar</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;