import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import Loading from "../../components/modal/Loading";
import api from "../../services/api";
import "./detailusers.css";
import backIcon from "../../assets/icons/back.svg";

function DetailUsers() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 10;

  const fetchUserDetail = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/user/${id}`);
      const resData = response.data.data;

      const birth = resData.user.tanggal_lahir
        ? new Date(resData.user.tanggal_lahir).toLocaleDateString("id-ID")
        : "-";

      setUser({
        ...resData.user,
        tanggal_lahir: birth,
      });

      const recipes = resData.created_recipes.map((item) => ({
        id: item.id,
        nama_resep: item.nama,
        tanggal_submit: new Date(item.created_at).toLocaleDateString("id-ID"),
        status: item.status,
      }));

      setAllSubmissions(recipes);
      setTotalPages(Math.ceil(recipes.length / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Gagal ambil detail user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setSubmissions(allSubmissions.slice(start, end));
  }, [currentPage, allSubmissions]);

  return (
    <>
      {/* LOADING MODAL */}
      <Loading isOpen={loading} />

      <div className="admin-layout">
        <AsideAdmin />

        <main className="admin-content">
          <div className="detail-header">
            <div className="detail-title">
              <Link to="/admin/users" className="back-btn">
                <img src={backIcon} alt="back" />
              </Link>
              <h1>Detail Pengguna</h1>
            </div>
          </div>

          <div className="detail-card">

            {/* USER INFO */}
            {user && (
              <div className="user-grid">
                <div className="form-group-detail-user">
                  <label>Nama Lengkap</label>
                  <input type="text" value={user.nama_lengkap || "-"} disabled />
                </div>

                <div className="form-group-detail-user">
                  <label>Total Poin</label>
                  <input type="text" value={user.points || 0} disabled />
                </div>

                <div className="form-group-detail-user">
                  <label>No Telp</label>
                  <input type="text" value={user.no_telp || "-"} disabled />
                </div>

                <div className="form-group-detail-user">
                  <label>Alamat Email</label>
                  <input type="text" value={user.email || "-"} disabled />
                </div>

                <div className="form-group-detail-user">
                  <label>Jenis Kelamin</label>
                  <input type="text" value={user.jenis_kelamin || "-"} disabled />
                </div>

                <div className="form-group-detail-user">
                  <label>Tanggal Lahir</label>
                  <input type="text" value={user.tanggal_lahir || "-"} disabled />
                </div>
              </div>
            )}

            {/* TABLE SUBMISSION */}
            <div className="submission-section">
              <table className="submission-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Resep</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Detail</th>
                  </tr>
                </thead>

                <tbody>
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        Tidak ada submission
                      </td>
                    </tr>
                  ) : (
                    submissions.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </td>

                        <td>{item.nama_resep}</td>

                        <td>{item.tanggal_submit}</td>

                        <td>
                          <span
                            className={
                              item.status === "pending"
                                ? "status-menunggu"
                                : item.status === "approved"
                                  ? "status-disetujui"
                                  : "status-ditolak"
                            }
                          >
                            {item.status === "pending"
                              ? "Menunggu"
                              : item.status === "approved"
                                ? "Disetujui"
                                : "Ditolak"}
                          </span>
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
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>

          <div className="admin-footer">
            © 2026 Kala Rasa — Admin
          </div>
        </main>
      </div>
    </>
  );
}

export default DetailUsers;