import Navbar from "../../components/layout/Navbar";
import styles from "./recipes.module.css";
import { Link, useNavigate } from "react-router-dom";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import bookmarkFillIcon from "../../assets/icons/fill-bookmark.svg";
import starIcon from "../../assets/icons/star.svg";
import { useState, useEffect } from "react";
import api from "../../services/api";

function RecipesUser() {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            setLoading(true);

            const response = await api.get("/recipe");

            // Karena backend pakai paginate
            const recipeData = response.data.data.data;

            const formatted = recipeData.map((item) => ({
                id: item.id,
                title: item.nama,
                desc: item.deskripsi,
                rating: item.avg_rating,
                image: item.gambar
                    ? `http://127.0.0.1:8000/storage/${item.gambar}`
                    : "https://via.placeholder.com/300",
                bookmarked: item.is_favorited ?? false
            }));

            setRecipes(formatted);

        } catch (error) {
            console.error("Gagal mengambil resep:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookmark = async (id, isBookmarked) => {
        try {
            await api.post(`/recipe/${id}/toggle-favorite`);

            // update state langsung tanpa fetch ulang
            setRecipes(prev =>
                prev.map(recipe =>
                    recipe.id === id
                        ? { ...recipe, bookmarked: !recipe.bookmarked }
                        : recipe
                )
            );

            // kalau baru ditambahkan ke bookmark, langsung pindah halaman
            if (!isBookmarked) {
                navigate("/bookmark");
            }

        } catch (error) {
            console.error("Gagal toggle bookmark:", error);
        }
    };

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <>
            <Navbar />

            <div className={styles.recipesPage}>

                <h3>Resep</h3>
                <p>Temukan Resep dari Masakan yang Ingin Anda Coba.</p>

                <div className={styles.recipesSearch}>

                    <input
                        type="text"
                        placeholder="Cari resep berdasarkan nama makanan"
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button className={styles.searchButton}>
                        Cari
                    </button>

                    <Link to="/add-recipes" className={styles.addRecipesButton}>
                        Tambahkan Resep Masakan Baru
                    </Link>
                </div>

                {loading && <p>Memuat resep...</p>}

                <div className={styles.recipesGrid}>
                    {!loading && filteredRecipes.map((recipe) => (
                        <div className={styles.recipeCard} key={recipe.id}>

                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className={styles.recipeImage}
                            />

                            <div className={styles.recipeBody}>
                                <div className={styles.recipeHeader}>
                                    <h4>{recipe.title}</h4>

                                    <img
                                        src={
                                            recipe.bookmarked
                                                ? bookmarkFillIcon
                                                : bookmarkIcon
                                        }
                                        alt="Bookmark"
                                        className={styles.bookmarkIcon}
                                        onClick={() => handleBookmark(recipe.id, recipe.bookmarked)}
                                    />
                                </div>

                                <p className={styles.recipeDesc}>
                                    {recipe.desc}
                                </p>

                                <div className={styles.recipeFooter}>
                                    <div className={styles.rating}>
                                        <img src={starIcon} alt="Star" />
                                        <span>{recipe.rating}/5</span>
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

                    {!loading && filteredRecipes.length === 0 && (
                        <p>Resep tidak ditemukan.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default RecipesUser;