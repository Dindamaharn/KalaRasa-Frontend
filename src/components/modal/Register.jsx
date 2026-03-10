import "./register.css";

function RegisterModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="register-modal">
      <div className="register-modal-content">
        <button className="close-btn" onClick={onClose}>✕</button>

        <iframe
          src="https://hub.jtv.co.id/register"
          title="Register"
          width="100%"
          height="600px"
        />
      </div>
    </div>
  );
}

export default RegisterModal;