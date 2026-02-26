import { useNavigate } from "react-router-dom";
import "./approvedCard.css";
import timeIcon from "../../assets/icons/time.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import successIcon from "../../assets/icons/succced.svg";

function ApprovedCard() {
    const navigate = useNavigate();

    return (
        <div className="history-card approved">

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
                    Ayam Bakar Teflon Empuk dan Bumbu Meresap
                </h3>

                <p className="recipe-desc">
                    Resep ayam bakar teflon dengan bumbu khas yang meresap sempurna dan mudah dibuat.
                </p>

                <div className="card-info-row">
                    <div className="card-info">
                        <img src={timeIcon} alt="Time" />
                        <span>Dikirim: 05 Februari</span>
                    </div>

                    <div className="card-info">
                        <img src={bookmarkIcon} alt="Bookmark" />
                        <span>245 Markah</span>
                    </div>
                </div>

                <div className="button-group">
                    <button
                        className="primary-btn"
                        onClick={() => navigate("/detail-wait")}
                    >
                        Lihat Detail
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/edit-recipe")}
                    >
                        Perbarui Resep
                    </button>
                </div>
            </div>

            {/* RIGHT */}
            <div className="card-right">
                <div className="status approved-status">
                    <img src={successIcon} alt="Status" />
                    <span>Disetujui</span>
                </div>

                <button className="danger-btn">
                    Hapus
                </button>
            </div>

        </div>
    );
}

export default ApprovedCard;