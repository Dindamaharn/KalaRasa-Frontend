import Navbar from "../../components/layout/Navbar";
import "./history.css";
import emptyIcon from "../../assets/icons/Empty History.svg";
import backIcon from "../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";

function RiwayatUser() {

    const navigate = useNavigate();
    const history = []; // nanti dari API

    return (
        <>
            <Navbar />

            <div className="riwayat-page">

                {/* SEARCH SECTION */}
                <div className="riwayat-search">
                    <button
                        className="back-box"
                        onClick={() => navigate(-1)}
                    >
                        <img src={backIcon} alt="Back" />
                    </button>

                    <input
                        type="text"
                        placeholder="Cari resep berdasarkan nama makanan"
                        className="search-input"
                    />

                    <button className="search-button">
                        Cari
                    </button>
                </div>

                {/* CONTENT */}
                {history.length === 0 && (
                    <div className="empty-container">
                        <img
                            src={emptyIcon}
                            alt="Empty"
                            className="empty-icon"
                        />

                        <h3>Belum Ada Riwayat</h3>
                        <p>Anda belum pernah membagikan resep.</p>
                    </div>
                )}

            </div>
        </>
    );
}

export default RiwayatUser;