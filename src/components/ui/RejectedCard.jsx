import { useNavigate } from "react-router-dom";
import "./rejectedCard.css";
import failIcon from "../../assets/icons/fail.svg";
import timeIcon from "../../assets/icons/time.svg";

function RejectedCard() {
    const navigate = useNavigate();

    return (
        <div className="history-card rejected">

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
                    Martabak Manis Lembut Anti Gagal
                </h3>

                <p className="recipe-desc">
                    Martabak manis tebal dan lembut dengan topping favorit keluarga.
                </p>

                <div className="card-info">
                    <img src={timeIcon} alt="Time" />
                    <span>Dikirim: 05 Februari</span>
                </div>

                <div className="reject-reason">
                    Alasan penolakan: Foto kurang jelas dan langkah resep belum lengkap.
                </div>
            </div>

            {/* RIGHT */}
            <div className="card-right">
                <div className="status rejected-status">
                    <img src={failIcon} alt="Status" />
                    <span>Ditolak</span>
                </div>

                <div className="button-group-vertical">
                    <button className="danger-btn">Hapus</button>
                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/edit-recipes")}
                    >
                        Perbaiki
                    </button>
                </div>
            </div>

        </div>
    );
}

export default RejectedCard;