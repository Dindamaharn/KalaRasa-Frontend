import { useEffect, useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import Loading from "../../components/modal/Loading";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./SubmissionRecipes.css";
import backIcon from "../../assets/icons/back.svg";

function QueueSubmissionRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // <-- Tambahkan state loading

  // ================= FETCH =================
  const fetchRecipes = async (page = 1, searchQuery = "") => {
    try {
      setLoading(true); // <-- Tampilkan loading

      const res = await api.get("/admin/recipe-submissions", {
        params: {
          status: "pending",
          page: page,
          search: searchQuery,
        },
      });

      const response = res.data.data;

      setRecipes(response.data);
      setCurrentPage(response.current_page);
      setTotalPages(response.last_page);
    } catch (error) {
      console.error("Gagal mengambil data submission:", error);
    } finally {
      setLoading(false); // <-- Sembunyikan loading
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

  return (
    <>
      {/* LOADING MODAL */}
      <Loading isOpen={loading} />

      <div className="admin-layout">
        <AsideAdmin />

        <main className="admin-content">
          <div className="queue-header">
            <div className="queue-title">
              <Link to="/admin/recipes" className="back-btn">
                <img src={backIcon} alt="back" />
              </Link>
              <h1>Pengajuan Resep</h1>
            </div>

            <div className="search-box-admin">
              <input
                type="text"
                placeholder="Cari berdasarkan nama resep"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button onClick={handleSearch}>Cari</button>
            </div>
          </div>

          <div className="queue-card">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>Nama Resep</th>
                  <th>Pengaju</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>

              <tbody>
                {recipes.length > 0 ? (
                  recipes.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama}</td>
                      <td>{item.creator?.name}</td>
                      <td>
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td>
                        <span className="status-admin">{item.status}</span>
                      </td>
                      <td>
                        <Link
                          to={`/admin/submissions/${item.id}`}
                          className="btn-detail"
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
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

          <div className="admin-footer">© 2026 Kala Rasa — Admin</div>
        </main>
      </div>
    </>
  );
}

export default QueueSubmissionRecipes;