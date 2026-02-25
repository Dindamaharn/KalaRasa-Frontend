import "./succes.css";
import closeIcon from "../../assets/icons/close-popup.svg";
import successIcon from "../../assets/icons/succced.svg";

function SuccessPopup({ title, message, onClose }) {
    return (
        <div className="popup-overlay">
        <div className="popup-card">
            <img
            src={closeIcon}
            alt="close"
            className="popup-close"
            onClick={onClose}
            />

            <h3>{title}</h3>

            <img
            src={successIcon}
            alt="success"
            className="popup-icon"
            />

            <p>{message}</p>
        </div>
        </div>
    );
}

export default SuccessPopup;