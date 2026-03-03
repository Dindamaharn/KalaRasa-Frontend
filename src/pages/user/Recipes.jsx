import Navbar from "../../components/layout/Navbar";
import styles from "./recipes.module.css";
import { Link } from "react-router-dom";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import bookmarkFillIcon from "../../assets/icons/fill-bookmark.svg";
import starIcon from "../../assets/icons/star.svg";
import { useState } from "react";

function RecipesUser() {

    const [search, setSearch] = useState("");

    const [recipes, setRecipes] = useState([
        {
            id: 1,
            title: "Tumis Sayur",
            desc: "Menu sehat untuk makan siang keluarga",
            rating: 4,
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
            bookmarked: false
        },
        {
            id: 2,
            title: "Cheese Burger",
            desc: "Burger enak dan sehat buatan rumahan",
            rating: 5,
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
            bookmarked: false
        }
    ]);

    const handleBookmark = (id) => {
        const updated = recipes.map((recipe) =>
            recipe.id === id
                ? { ...recipe, bookmarked: !recipe.bookmarked }
                : recipe
        );
        setRecipes(updated);
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

                <div className={styles.recipesGrid}>
                    {filteredRecipes.map((recipe) => (
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
                                        onClick={() => handleBookmark(recipe.id)}
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
                                        to="/detail-recipes"
                                        className={styles.detailButton}
                                    >
                                        Detail
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}

                    {filteredRecipes.length === 0 && (
                        <p>Resep tidak ditemukan.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default RecipesUser;