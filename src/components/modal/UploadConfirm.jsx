import React from "react";
import "./UploadConfirm.css";
import uploadIcon from "../../assets/icons/upload.svg";

const UploadConfirm = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="upload-overlay">
      <div className="upload-card">
        <h2 className="upload-title">
          Apakah Anda yakin ingin menyetujui resep ini?
        </h2>

        <img
          src={uploadIcon}
          alt="upload"
          className="upload-icon"
        />

        <p className="upload-description">
          Resep akan dipublikasikan dan dapat dilihat oleh semua pengguna.
        </p>

        <div className="upload-actions">
          <button className="btn-cancel" onClick={onClose}>
            Batal
          </button>

          <button className="btn-confirm" onClick={onConfirm}>
            Setujui Resep
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadConfirm;