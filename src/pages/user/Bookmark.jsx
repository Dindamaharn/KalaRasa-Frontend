import Navbar from "../../components/layout/Navbar";
import "./bookmark.css";
import emptyIcon from "../../assets/icons/Empty Mark.svg";
import backIcon from "../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";

function MarkahUser() {

    const navigate = useNavigate();
    const bookmarks = []; // nanti dari API

    return (
        <>
            <Navbar />

            <div className="markah-page">

                {/* SEARCH SECTION */}
                <div className="markah-search">
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
                {bookmarks.length === 0 && (
                    <div className="empty-container">
                        <img
                            src={emptyIcon}
                            alt="Empty"
                            className="empty-icon"
                        />

                        <h3>Belum Ada Markah</h3>
                        <p>Anda belum menyimpan resep favorit.</p>
                    </div>
                )}

            </div>
        </>
    );
}

export default MarkahUser;