import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReasonRejection.css";
import closeIcon from "../../assets/icons/close-popup.svg";

const RejectReason = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("");
    const navigate = useNavigate();
    if (!isOpen) return null;

    const handleSubmit = () => {
    // proses kirim alasan (kalau ada API / logic lain)

    navigate("/admin/submissions");
    };

    return (
        <div className="reject-overlay">
        <div className="reject-card">
            {/* Close Button */}
            <img
            src={closeIcon}
            alt="close"
            className="reject-close"
            onClick={onClose}
            />

            {/* Title */}
            <h2 className="reject-title">Alasan Penolakan</h2>
            <p className="reject-subtitle">
            Berikan alasan penolakan resep secara jelas.
            </p>

            {/* Textarea */}
            <textarea
            className="reject-textarea"
            placeholder="Masukkan alasan Anda disini"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            />

            {/* Button */}
            <button className="reject-button" onClick={handleSubmit}>
                Kirim Alasan
            </button>
        </div>
        </div>
    );
};

export default RejectReason;