import { useNavigate } from "react-router-dom";
import "./waitingCard.css";
import timeIcon from "../../assets/icons/time.svg";

function WaitingCard() {
    const navigate = useNavigate();

    return (
        <div className="history-card waiting">

            {/* LEFT */}
            <div className="card-left">
                <img
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                    alt="Resep"
                />
            </div>

            {/* MIDDLE */}
            <div className="card-middle">
                <h3 className="recipe-title">
                    Nasi Goreng Spesial Rumahan Enak dan Praktis
                </h3>

                <p className="recipe-desc">
                    Resep nasi goreng sederhana dengan bumbu rumahan yang lezat dan mudah dibuat untuk keluarga.
                </p>

                <div className="card-info">
                    <img src={timeIcon} alt="Time" />
                    <span>Dikirim: 05 Februari</span>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/detail-wait")}
                >
                    Lihat Detail
                </button>
            </div>

            {/* RIGHT */}
            <div className="card-waiting-right">
                <div className="status waiting-status">
                    <img src={timeIcon} alt="Status-waiting" />
                    <span>Menunggu</span>
                </div>
            </div>

        </div>
    );
}

export default WaitingCard;