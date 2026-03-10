import styles from "./detailRecipes.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import bookmarkIcon from "../../assets/icons/bookmark.svg";
import fillBookmarkIcon from "../../assets/icons/fill-bookmark.svg";
import starIcon from "../../assets/icons/star.svg";
import timeIcon from "../../assets/icons/time.svg";
import locationIcon from "../../assets/icons/location.svg";
import backIcon from "../../assets/icons/back.svg";

const DetailRecipes = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const response = await api.get(`/recipe/${id}`);

            setRecipe(response.data.data.recipe);
            setUserData(response.data.data.user_data);

        } catch (error) {
            console.error("Gagal mengambil detail resep:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookmark = async () => {
        try {
            const response = await api.post(`/recipe/${id}/toggle-favorite`);

            setUserData((prev) => ({
                ...prev,
                is_favorited: response.data.data.is_favorited
            }));

        } catch (error) {
            console.error("Gagal toggle bookmark:", error);
        }
    };

    const handleAddShoppingList = async () => {
        try {
            await api.post(`/recipe/${id}/add-to-shopping-list`);
            alert("Bahan berhasil ditambahkan ke daftar belanja!");
        } catch (error) {
            console.error("Gagal menambah ke daftar belanja:", error);
        }
    };

    if (loading) {
        return <p style={{ textAlign: "center", marginTop: "40px" }}>Memuat resep...</p>;
    }

    if (!recipe) {
        return <p style={{ textAlign: "center", marginTop: "40px" }}>Resep tidak ditemukan</p>;
    }

    return (
        <div className={styles.detailContainer}>

            {/* IMAGE SECTION */}
            <div className={styles.detailImageWrapper}>

                <img
                    src={
                        recipe.gambar
                            ? recipe.gambar
                            : "https://via.placeholder.com/600"
                    }
                    alt={recipe.nama}
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

                {/* BUTTONS */}
                <div className={styles.detailButtons}>

                    <button className={styles.rateButton}>
                        Beri Penilaian
                    </button>

                    <button
                        className={styles.cartButton}
                        onClick={handleAddShoppingList}
                    >
                        Tambah ke Daftar Belanja
                    </button>

                </div>

            </div>
        </div>
    );
};

export default DetailRecipes;