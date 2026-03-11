import Navbar from "../../components/layout/Navbar";
import styles from "./bookmark.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import emptyIcon from "../../assets/icons/Empty Mark.svg";
import backIcon from "../../assets/icons/back.svg";
import starIcon from "../../assets/icons/star.svg";
import bookmarkIcon from "../../assets/icons/fill-bookmark.svg";

import Pagination from "../../components/ui/Pagination";
import Loading from "../../components/modal/Loading";

function MarkahUser() {

    const navigate = useNavigate();

    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        try {

            setLoading(true);

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

            setLoading(true);

            await api.delete(`/bookmarks/${recipeId}`);

            setBookmarks((prev) =>
                prev.filter((item) => item.id !== recipeId)
            );

        } catch (error) {

            console.error("Gagal menghapus bookmark:", error);

        } finally {

            setLoading(false);

        }
    };

    // FILTER SEARCH
    const filteredBookmarks = bookmarks.filter((recipe) =>
        recipe.nama.toLowerCase().includes(search.toLowerCase())
    );

    // PAGINATION LOGIC
    const totalPages = Math.ceil(filteredBookmarks.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentBookmarks = filteredBookmarks.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            {/* MODAL LOADING */}
            <Loading isOpen={loading} />

            <Navbar />

            <div className={styles.markahPage}>

                {/* SEARCH SECTION */}
                <div className={styles.markahSearch}>

                    <button
                        className={styles.backBox}
                        onClick={() => navigate(-1)}
                    >
                        <img src={backIcon} alt="Back" />
                    </button>

                    <input
                        type="text"
                        placeholder="Cari resep berdasarkan nama makanan"
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />

                    <button className={styles.searchButton}>
                        Cari
                    </button>

                </div>

                {/* EMPTY STATE */}
                {!loading && bookmarks.length === 0 && (
                    <div className={styles.emptyContainer}>

                        <img
                            src={emptyIcon}
                            alt="Empty"
                            className={styles.emptyIcon}
                        />

                        <h3>Belum Ada Markah</h3>
                        <p>Anda belum menyimpan resep favorit.</p>

                    </div>
                )}

                {/* GRID */}
                <div className={styles.recipesGrid}>

                    {!loading && currentBookmarks.map((recipe) => (

                        <div
                            className={styles.recipeCard}
                            key={recipe.id}
                        >

                            <img
                                src={
                                    recipe.gambar_url?.includes("https")
                                        ? recipe.gambar_url.replace("/storage/", "")
                                        : `http://localhost:8000${recipe.gambar_url}`
                                }
                                alt={recipe.nama}
                                className={styles.recipeImage}
                            />

                            <div className={styles.recipeBody}>

                                <div className={styles.recipeHeader}>

                                    <h4>{recipe.nama}</h4>

                                    <img
                                        src={bookmarkIcon}
                                        alt="Bookmark"
                                        className={styles.bookmarkIcon}
                                        onClick={() =>
                                            handleRemoveBookmark(recipe.id)
                                        }
                                    />

                                </div>

                                <p className={styles.recipeDesc}>
                                    {recipe.deskripsi}
                                </p>

                                <div className={styles.recipeFooter}>

                                    <div className={styles.rating}>
                                        <img src={starIcon} alt="Star" />
                                        <span>
                                            {recipe.avg_rating ?? 0}/5
                                        </span>
                                    </div>

                                    <Link
                                        to={`/recipes/${recipe.id}`}
                                        className={styles.detailButton}
                                    >
                                        Detail
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* PAGINATION */}
                {!loading && filteredBookmarks.length > itemsPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}

            </div>
        </>
    );
}

export default MarkahUser;