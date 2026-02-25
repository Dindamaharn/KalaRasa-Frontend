import Navbar from "../../components/layout/Navbar";
import "./recipes.css";
import { Link } from "react-router-dom";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import starIcon from "../../assets/icons/star.svg";

function RecipesUser() {

    const recipes = []; // nanti dari API

    return (
        <>
            <Navbar />

            <div className="recipes-page">

                {/* SEARCH SECTION */}
                <h3>Resep</h3>
                <p>Temukan Resep dari Masakan yang Ingin Anda Coba.</p>
                <div className="recipes-search">

                    <input
                        type="text"
                        placeholder="Cari resep berdasarkan nama makanan"
                        className="search-input"
                    />

                    <button className="search-button">
                        Cari
                    </button>

                    <Link to="/add-recipes" className="add-recipes-button">
                        Tambahkan Resep Masakan Baru
                    </Link>
                </div>

                {/* CONTENT */}
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

export default RecipesUser;