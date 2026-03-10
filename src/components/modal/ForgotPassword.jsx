import "./iframe.css";
import closeIcon from "../../assets/icons/close-popup.svg";

function ForgotPassword({ show, onClose }) {
    if (!show) return null;

    return (
        <div className="iframe-modal">
        <div className="iframe-modal-content">

            <div className="iframe-header">
            <button className="close-modal" onClick={onClose}>
                <img src={closeIcon} alt="close" />
            </button>
            </div>

            <iframe
            src="https://hub.jtv.co.id/forgot-password"
            title="Forgot Password"
            style={{ width: "100%", height: "100%", border: "none" }}
            />

        </div>
        </div>
    );
}

export default ForgotPassword;