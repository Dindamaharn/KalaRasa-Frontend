import "./iframe.css";
import closeIcon from "../../assets/icons/close-popup.svg";

function RegisterModal({ show, onClose }) {
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
          src="https://hub.jtv.co.id/register"
          title="Register"
          scrolling="yes"
        />

      </div>
    </div>
  );
}

export default RegisterModal;