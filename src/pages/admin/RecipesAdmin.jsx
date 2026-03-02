import { useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import { Link } from "react-router-dom";
import "./recipesAdmin.css";

import starIcon from "../../assets/icons/star.svg";
import timeIcon from "../../assets/icons/time.svg";
import locationIcon from "../../assets/icons/location.svg";

function RecipesAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const recipeImage =
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d";

  const recipes = [
    {
      id: 1,
      nama: "Tumis Sayur Kangkung",
      desc: "Menu sehat untuk keluarga",
      rating: "4/5",
      waktu: "15 menit",
      lokasi: "Bali",
      image: recipeImage,
    },
    {
      id: 2,
      nama: "Tumis Sayur Kangkung",
      desc: "Menu sehat untuk keluarga",
      rating: "4/5",
      waktu: "15 menit",
      lokasi: "Bali",
      image: recipeImage,
    },
    {
      id: 3,
      nama: "Tumis Sayur Kangkung",
      desc: "Menu sehat untuk keluarga",
      rating: "4/5",
      waktu: "15 menit",
      lokasi: "Bali",
      image: recipeImage,
    },
    {
      id: 4,
      nama: "Tumis Sayur Kangkung",
      desc: "Menu sehat untuk keluarga",
      rating: "4/5",
      waktu: "15 menit",
      lokasi: "Bali",
      image: recipeImage,
    },
  ];

  const itemsPerPage = 3;

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.nama.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-layout">
      <AsideAdmin />

      <main className="admin-content">
        <div className="recipes-header">
          <h1>Resep</h1>

          <div className="search-box-admin">
            <input
              type="text"
              placeholder="Cari berdasarkan nama masakan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Cari</button>
          </div>
        </div>

        <div className="recipes-action">
          <Link to="/admin/submissions" className="btn-outline">
            Pengajuan Resep
          </Link>

          <Link to="/admin/add-recipe" className="btn-primary-admin">
            Tambah Resep Baru
          </Link>
        </div>

        <div className="recipes-list">
          {currentData.map((recipe) => (
            <div className="recipe-card-admin" key={recipe.id}>
              <img src={recipe.image} alt={recipe.nama} />

              <div className="recipe-info">
                <h3>{recipe.nama}</h3>
                <p>{recipe.desc}</p>

                <div className="recipe-meta">
                  <span>
                    <img
                      src={starIcon}
                      alt="rating"
                      className="meta-icon"
                    />
                    {recipe.rating}
                  </span>

                  <span>
                    <img
                      src={timeIcon}
                      alt="waktu"
                      className="meta-icon"
                    />
                    {recipe.waktu}
                  </span>

                  <span>
                    <img
                      src={locationIcon}
                      alt="lokasi"
                      className="meta-icon"
                    />
                    {recipe.lokasi}
                  </span>
                </div>
              </div>

              <Link
                to={`/admin/recipes/${recipe.id}`}
                className="btn-update"
              >
                Perbarui Resep
              </Link>
            </div>
          ))}
        </div>

        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="admin-footer">
          © 2025 Kala Rasa — Admin
        </div>
      </main>
    </div>
  );
}

export default RecipesAdmin;