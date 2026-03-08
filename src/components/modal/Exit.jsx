import "./exit.css";
import { useNavigate } from "react-router-dom";

function Exit({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleExit = () => {
  localStorage.clear();
  navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="exit-overlay">
      <div className="exit-box">
        <h2>Keluar</h2>
        <p>Apakah Anda yakin ingin keluar?</p>

        <div className="exit-actions">
          <button className="btn-cancel" onClick={onClose}>
            Batal
          </button>

          <button className="btn-exit" onClick={handleExit}>
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exit;