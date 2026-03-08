import React, { useState } from "react";
import "./ReasonRejection.css";
import closeIcon from "../../assets/icons/close-popup.svg";

const RejectReason = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!reason || reason.length < 10) {
        return;
        }

        onSubmit(reason); // kirim ke parent component
        setReason("");
    };

    return (
        <div className="reject-overlay">
        <div className="reject-card">

            <img
            src={closeIcon}
            alt="close"
            className="reject-close"
            onClick={onClose}
            />

            <h2 className="reject-title">Alasan Penolakan</h2>
            <p className="reject-subtitle">
            Berikan alasan penolakan resep secara jelas.
            </p>

            <textarea
            className="reject-textarea"
            placeholder="Masukkan alasan Anda disini"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            />

            <button className="reject-button" onClick={handleSubmit}>
            Kirim Alasan
            </button>

        </div>
        </div>
    );
};

export default RejectReason;