import Navbar from "../../components/layout/Navbar";
import "./bookmark.css";
import emptyIcon from "../../assets/icons/Empty Mark.svg";
import backIcon from "../../assets/icons/back.svg";
import starIcon from "../../assets/icons/star.svg";
import bookmarkIcon from "../../assets/icons/fill-bookmark.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

function MarkahUser() {

    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        try {
            const response = await api.get("/recipe/my/favorites");
            setBookmarks(response.data.data.data);
        } catch (error) {
            console.error("Gagal mengambil bookmark:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveBookmark = async (recipeId) => {
        try {
            await api.delete(`/bookmarks/${recipeId}`);

            // hapus dari state supaya langsung hilang dari UI
            setBookmarks((prev) =>
                prev.filter((item) => item.id !== recipeId)
            );

        } catch (error) {
            console.error("Gagal menghapus bookmark:", error);
        }
    };

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
                {!loading && bookmarks.length === 0 && (
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
                {loading && <p>Memuat bookmark...</p>}
                <div className="recipes-grid">
                    {!loading && bookmarks.map((recipe) => (
                        <div className="recipe-card" key={recipe.id}>

                            <img
                                src={
                                    recipe.gambar
                                        ? `http://127.0.0.1:8000/storage/${recipe.gambar}`
                                        : "https://via.placeholder.com/300"
                                }
                                alt={recipe.nama}
                                className="recipe-image"
                            />

                            <div className="recipe-body">
                                <div className="recipe-header">
                                    <h4>{recipe.nama}</h4>
                                    <img
                                        src={bookmarkIcon}
                                        alt="Bookmark"
                                        className="bookmark-icon"
                                        onClick={() => handleRemoveBookmark(recipe.id)}
                                    />
                                </div>

                                <p className="recipe-desc">
                                    {recipe.deskripsi}
                                </p>

                                <div className="recipe-footer">
                                    <div className="rating">
                                        <img src={starIcon} alt="Star" />
                                        <span>{recipe.avg_rating ?? 0}/5</span>
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