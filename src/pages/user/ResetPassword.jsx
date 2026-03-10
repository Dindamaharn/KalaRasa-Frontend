import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./resetPassword.css";

import Loading from "../../components/modal/Loading";

import backIcon from "../../assets/icons/back.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeOffIcon from "../../assets/icons/eye-off.svg";
import logo from "../../assets/images/logo.png";

function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Hapus error saat user mulai mengetik ulang
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const toggleShow = (field) => {
    setShow({
      ...show,
      [field]: !show[field],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset semua error
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Validasi konfirmasi password
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Konfirmasi kata sandi tidak cocok",
      }));
      return;
    }

    try {
      setLoading(true);

      await api.put("/profile/password", {
        current_password: formData.oldPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword,
      });

      // Redirect ke login
      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        setErrors((prev) => ({
          ...prev,
          oldPassword: apiErrors.current_password?.[0] || "",
          newPassword: apiErrors.new_password?.[0] || "",
          confirmPassword: apiErrors.new_password_confirmation?.[0] || "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          oldPassword: error.response?.data?.message || "Gagal mengubah password",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MODAL LOADING */}
      <Loading isOpen={loading} />

      <div className="rp-wrapper">
        <div className="rp-layout">

          {/* Back Button */}
          <div className="rp-back" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="back"/>
          </div>

          <div className="rp-card">

            <img src={logo} className="rp-logo" alt="logo"/>
            <h2 className="rp-title">Atur Ulang Kata Sandi</h2>

            <form onSubmit={handleSubmit}>

              {/* PASSWORD LAMA */}
              <div className="rp-field">
                <label>Kata Sandi Lama</label>
                <div className="rp-input-box">
                  <input
                    type={show.old ? "text" : "password"}
                    placeholder="Masukkan Kata Sandi Lama"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  />
                  <img
                    src={show.old ? eyeIcon : eyeOffIcon}
                    className="rp-eye"
                    onClick={() => toggleShow("old")}
                    alt="toggle"
                  />
                </div>
                {errors.oldPassword && (
                  <p className="rp-error">{errors.oldPassword}</p>
                )}
              </div>

              {/* PASSWORD BARU */}
              <div className="rp-field">
                <label>Kata Sandi Baru</label>
                <div className="rp-input-box">
                  <input
                    type={show.new ? "text" : "password"}
                    placeholder="Masukkan Kata Sandi Baru"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <img
                    src={show.new ? eyeIcon : eyeOffIcon}
                    className="rp-eye"
                    onClick={() => toggleShow("new")}
                    alt="toggle"
                  />
                </div>
                {errors.newPassword && (
                  <p className="rp-error">{errors.newPassword}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="rp-field">
                <label>Konfirmasi Kata Sandi Baru</label>
                <div className="rp-input-box">
                  <input
                    type={show.confirm ? "text" : "password"}
                    placeholder="Ulangi Kata Sandi Baru"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <img
                    src={show.confirm ? eyeIcon : eyeOffIcon}
                    className="rp-eye"
                    onClick={() => toggleShow("confirm")}
                    alt="toggle"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="rp-error">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="rp-button">
                <button type="submit" disabled={loading}>
                  Simpan Perubahan
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;