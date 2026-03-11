import styles from "./detailRecipes.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/modal/Loading";

import bookmarkIcon from "../../assets/icons/bookmark.svg";
import fillBookmarkIcon from "../../assets/icons/fill-bookmark.svg";
import starIcon from "../../assets/icons/star.svg";
import timeIcon from "../../assets/icons/time.svg";
import locationIcon from "../../assets/icons/location.svg";
import backIcon from "../../assets/icons/back.svg";
import RatingModal from "../../components/modal/Rating";

const DetailRecipes = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [showRatingModal, setShowRatingModal] = useState(false);

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {

            setLoading(true);

            const response = await api.get(`/recipes/${id}`);

            setRecipe(response.data.data.recipe);
            setUserData(response.data.data.user_data);

        } catch (error) {

            console.error("Gagal mengambil detail resep:", error);

        } finally {

            setLoading(false);

        }
    };

    const handleBookmark = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(`/recipes/${id}/toggle-favorite`);

            setUserData((prev) => ({
                ...prev,
                is_favorited: response.data.data.is_favorited
            }));

        } catch (error) {

            console.error("Gagal toggle bookmark:", error);

        } finally {

            setLoading(false);

        }
    };

    const handleAddShoppingList = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            setLoading(true);

            await api.post(`/recipes/${id}/add-to-shopping-list`);

            alert("Bahan berhasil ditambahkan ke daftar belanja!");

        } catch (error) {

            console.error("Gagal menambah ke daftar belanja:", error);

        } finally {

            setLoading(false);

        }
    };

    /* SUBMIT RATING */

    const handleSubmitRating = async (rating) => {
        try {

            setLoading(true);

            const response = await api.post(`/recipes/${id}/ratings`, {
                rating: rating
            });

            const data = response.data.data;

            // update recipe
            setRecipe((prev) => ({
                ...prev,
                avg_rating: data.avg_rating,
                total_ratings: data.total_ratings
            }));

            // update user data
            setUserData((prev) => ({
                ...prev,
                has_rated: true,
                my_rating: rating
            }));

            setShowRatingModal(false);

        } catch (error) {

            console.error("Gagal mengirim rating:", error);

        } finally {

            setLoading(false);

        }
    };

    if (!recipe && !loading) {
        return (
            <p style={{ textAlign: "center", marginTop: "40px" }}>
                Resep tidak ditemukan
            </p>
        );
    }

    return (

        <>
            {/* LOADING */}
            <Loading isOpen={loading} />

            {/* RATING MODAL */}
            <RatingModal
                isOpen={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                onSubmit={handleSubmitRating}
            />

            <div className={styles.detailContainer}>

                {/* IMAGE */}
                <div className={styles.detailImageWrapper}>

                    <img
                        src={
                            recipe?.gambar
                                ? recipe.gambar
                                : "https://via.placeholder.com/600"
                        }
                        alt={recipe?.nama}
                        className={styles.detailImage}
                    />

                    <button
                        className={styles.backButton}
                        onClick={() => navigate(-1)}
                    >
                        <img src={backIcon} alt="Back" />
                    </button>

                    <button
                        className={styles.bookmarkButton}
                        onClick={handleBookmark}
                    >
                        <img
                            src={
                                userData?.is_favorited
                                    ? fillBookmarkIcon
                                    : bookmarkIcon
                            }
                            alt="Bookmark"
                        />
                    </button>

                </div>

                {/* CONTENT */}
                {recipe && (
                    <div className={styles.detailContent}>

                        <h1 className={styles.recipeTitle}>{recipe.nama}</h1>

                        <p className={styles.recipeSubtitle}>
                            {recipe.deskripsi}
                        </p>

                        {/* META */}
                        <div className={styles.recipeMeta}>

                            <div className={styles.metaItem}>
                                <img src={starIcon} alt="Star" />
                                <span>{recipe.avg_rating ?? 0}/5</span>
                            </div>

                            <div className={styles.metaItem}>
                                <img src={timeIcon} alt="Time" />
                                <span>{recipe.waktu_masak} menit</span>
                            </div>

                            <div className={styles.metaItem}>
                                <img src={locationIcon} alt="Location" />
                                <span>{recipe.region}</span>
                            </div>

                        </div>

                        {/* BAHAN */}
                        <div className={styles.detailCard}>

                            <h3>Bahan - bahan</h3>

                            <ul>
                                {recipe.ingredients?.map((item) => (
                                    <li key={item.id}>
                                        {Number(item.pivot?.jumlah)} {item.pivot?.satuan} {item.nama}
                                    </li>
                                ))}
                            </ul>

                        </div>

                        {/* CARA MEMBUAT */}
                        <div className={styles.detailCard}>

                            <h3>Cara Membuat</h3>

                            {JSON.parse(recipe.langkah_langkah || "[]").map((step, index) => (

                                <div className={styles.step} key={index}>

                                    <div className={styles.stepNumber}>
                                        {index + 1}
                                    </div>

                                    <p>{step}</p>

                                </div>

                            ))}

                        </div>

                        {/* BUTTON */}
                        <div className={styles.detailButtons}>

                            {/* tampilkan hanya jika user belum rating */}
                            {!userData?.has_rated && (
                                <button
                                    className={styles.rateButton}
                                    onClick={() => {

                                        const token = localStorage.getItem("access_token");

                                        if (!token) {
                                            navigate("/login");
                                            return;
                                        }

                                        setShowRatingModal(true);
                                    }}
                                >
                                    Beri Penilaian
                                </button>
                            )}

                            <button
                                className={styles.cartButton}
                                onClick={handleAddShoppingList}
                            >
                                Tambah ke Daftar Belanja
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </>
    );
};

export default DetailRecipes;