import "./loading.css";

function LoadingModal({ isOpen, text = "Memuat data..." }) {
  if (!isOpen) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="spinner"></div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default LoadingModal;