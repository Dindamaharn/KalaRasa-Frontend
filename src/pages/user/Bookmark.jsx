import Navbar from "../../components/layout/Navbar";
import "./bookmark.css";
import emptyIcon from "../../assets/icons/Empty Mark.svg";
import backIcon from "../../assets/icons/back.svg";
import starIcon from "../../assets/icons/star.svg";
import bookmarkIcon from "../../assets/icons/fill-bookmark.svg";
import { Link, useNavigate } from "react-router-dom";

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
                <div className="recipes-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div className="recipe-card" key={item}>

                            <img
                                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                                alt="Recipe"
                                className="recipe-image"
                            />

                            <div className="recipe-body">
                                <div className="recipe-header">
                                    <h4>Tumis Sayur</h4>
                                    <img src={bookmarkIcon} alt="Bookmark" className="bookmark-icon" />
                                </div>

                                <p className="recipe-desc">
                                    Menu sehat untuk makan siang keluarga
                                </p>

                                <div className="recipe-footer">
                                    <div className="rating">
                                        <img src={starIcon} alt="Star" />
                                        <span>4/5</span>
                                    </div>

                                    <Link to="/detail-recipes" className="detail-button">
                                        Detail
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default MarkahUser;