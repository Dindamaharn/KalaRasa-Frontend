import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import api from "../../services/api";
import "./detailusers.css";
import backIcon from "../../assets/icons/back.svg";

function DetailUsers() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserDetail = async (page = 1) => {
    try {
      const response = await api.get(`/admin/user/${id}`, {
        params: { page }
      });

      const resData = response.data.data;

      setUser(resData.user);
      setSubmissions(resData.submissions.data);
      setTotalPages(resData.submissions.last_page);
    } catch (error) {
      console.error("Gagal ambil detail user:", error);
    }
  };

  useEffect(() => {
    fetchUserDetail(currentPage);
  }, [currentPage]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-layout">
      <AsideAdmin />

      <main className="admin-content">
        <div className="detail-header">
          <div className="detail-title">
            <Link to="/admin/user" className="back-btn">
              <img src={backIcon} alt="back" />
            </Link>
            <h1>Detail Pengguna</h1>
          </div>
        </div>

        <div className="detail-card">
          {/* USER INFO */}
          <div className="user-grid">
            <div className="form-group-detail-user">
              <label>Nama Lengkap</label>
              <input type="text" value={user.nama_lengkap} disabled />
            </div>

            <div className="form-group-detail-user">
              <label>Total Poin</label>
              <input type="text" value={user.points} disabled />
            </div>

            <div className="form-group-detail-user">
              <label>No Telp</label>
              <input type="text" value={user.no_telp} disabled />
            </div>

            <div className="form-group-detail-user">
              <label>Alamat Email</label>
              <input type="text" value={user.email} disabled />
            </div>

            <div className="form-group-detail-user">
              <label>Jenis Kelamin</label>
              <input type="text" value={user.jenis_kelamin} disabled />
            </div>

            <div className="form-group-detail-user">
              <label>Tanggal Lahir</label>
              <input type="text" value={user.tanggal_lahir} disabled />
            </div>
          </div>

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
                      <td>{index + 1}</td>
                      <td>{item.nama_resep}</td>
                      <td>{item.tanggal_submit}</td>
                      <td>
                        <span className={`status-${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/admin/submission/${item.id}`}
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

          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="admin-footer">
          © 2026 Kala Rasa — Admin
        </div>
      </main>
    </div>
  );
}

export default DetailUsers;