import { useEffect, useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import Loading from "../../components/modal/Loading";
import RejectAccess from "../../components/modal/RejectAcces";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./recipesAdmin.css";

import starIcon from "../../assets/icons/star.svg";
import timeIcon from "../../assets/icons/time.svg";
import locationIcon from "../../assets/icons/location.svg";

function RecipesAdmin() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showRejectAccess, setShowRejectAccess] = useState(false);

  const itemsPerPage = 10;

  // ================= FETCH RECIPES =================
  const fetchRecipes = async (page = 1, searchQuery = "") => {
    try {
      setLoading(true);

      const response = await api.get("/admin/recipe", {
        params: {
          page: page,
          search: searchQuery,
          per_page: itemsPerPage,
          status: "approved",
        },
      });

      const resData = response.data.data;

      setRecipes(resData.data);
      setCurrentPage(resData.current_page);
      setTotalPages(resData.last_page);
    } catch (error) {
      console.error("Gagal mengambil resep:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD AWAL =================
  useEffect(() => {
    fetchRecipes(currentPage, search);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchRecipes(1, search);
  };

  // ================= HANDLE UPDATE =================
  const handleUpdateClick = (recipe) => {
  if (recipe.user?.role_id === 1) {
    setShowRejectAccess(true);
  } else {
    navigate(`/admin/recipes/${recipe.id}`);
  }
};

  return (
    <>
      {/* LOADING MODAL */}
      <Loading isOpen={loading} />

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
              <button onClick={handleSearch}>Cari</button>
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
            {recipes.length === 0 ? (
              <p>Tidak ada resep ditemukan</p>
            ) : (
              recipes.map((recipe) => (
                <div className="recipe-card-admin" key={recipe.id}>
                  <img
                    src={
                      recipe.gambar?.startsWith("http")
                        ? recipe.gambar
                        : `http://localhost:8000/storage/${recipe.gambar}`
                    }
                    alt={recipe.nama}
                  />

                  <div className="recipe-info">
                    <h3>{recipe.nama}</h3>
                    <p>{recipe.deskripsi}</p>

                    <div className="recipe-meta">
                      <span>
                        <img src={starIcon} alt="rating" className="meta-icon" />
                        {recipe.avg_rating ?? 0}/5
                      </span>

                      <span>
                        <img src={timeIcon} alt="waktu" className="meta-icon" />
                        {recipe.waktu_masak ?? 0} menit
                      </span>

                      <span>
                        <img
                          src={locationIcon}
                          alt="lokasi"
                          className="meta-icon"
                        />
                        {recipe.region ?? "-"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn-update"
                    onClick={() => handleUpdateClick(recipe)}
                  >
                    Perbarui Resep
                  </button>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          <div className="admin-footer">
            © 2026 Kala Rasa — Admin
          </div>
        </main>
      </div>

      {/* MODAL AKSES DITOLAK */}
      <RejectAccess
        isOpen={showRejectAccess}
        onClose={() => setShowRejectAccess(false)}
      />
    </>
  );
}

export default RecipesAdmin;