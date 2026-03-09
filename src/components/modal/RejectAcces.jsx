import "./rejectacces.css";
import failIcon from "../../assets/icons/fail.svg";
import closeIcon from "../../assets/icons/close-popup.svg";

export default function RejectAcces({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="reject-overlay">
        <div className="reject-modal">

            <img
            src={closeIcon}
            alt="close"
            className="reject-close"
            onClick={onClose}
            />

            <p className="reject-title">Akses Anda ditolak!</p>

            <img src={failIcon} alt="fail" className="reject-icon" />

            <p className="reject-desc">
            Resep hanya dapat diedit oleh pemiliknya.
            </p>

        </div>
        </div>
    );
}