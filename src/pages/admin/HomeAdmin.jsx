import { useState, useEffect } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import "./homeAdmin.css";
import { Link } from "react-router-dom";
import api from "../../services/api"; 

import usersIcon from "../../assets/icons/group-person.svg";
import recipeIcon from "../../assets/icons/chef-hat.svg";
import submissionIcon from "../../assets/icons/approval-list.svg";

function HomeAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalSubmissions: 0,
  });
  const [submissions, setSubmissions] = useState([]);

  const itemsPerPage = 3;

  useEffect(() => {
    fetchSummary();
    fetchSubmissions();
  }, []);

  // FETCH SUMMARY
  const fetchSummary = async () => {
  try {
    const res = await api.get("/admin/dashboard/summary");

    console.log("SUMMARY:", res.data);

    setSummary(res.data.data);

  } catch (err) {
    console.error("Summary error:", err.response || err);
  }
};

  // FETCH SUBMISSIONS

  const fetchSubmissions = async () => {
  try {
    const res = await api.get("/admin/recipe-submissions");

    console.log("SUBMISSIONS:", res.data);

    setSubmissions(res.data.data.data);

  } catch (err) {
    console.error("Submission error:", err.response || err);
  }
};

  // PAGINATION
  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = submissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-layout">
      <AsideAdmin />

      <main className="admin-content">
        <h1>Beranda</h1>

        {/* ================= CARDS ================= */}
        <div className="cards">
          <div className="card">
            <div className="card-text">
              <p>Total Pengguna</p>
              <h2>{summary.total_users}</h2>
            </div>
            <img src={usersIcon} className="card-icon" alt="users" />
          </div>

          <div className="card">
            <div className="card-text">
              <p>Total Resep</p>
              <h2>{summary.total_recipes}</h2>
            </div>
            <img src={recipeIcon} className="card-icon" alt="recipe" />
          </div>

          <div className="card">
            <div className="card-text">
              <p>Total Pengajuan</p>
              <h2>{summary.total_submissions}</h2>
            </div>
            <img src={submissionIcon} className="card-icon" alt="submission" />
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="table-box">
          <h3>Antrian Pengajuan Resep</h3>

          <table>
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
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.recipeName}</td>
                    <td>{item.userName}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className="status-admin">
                        {item.status}
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
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <div className="admin-footer">
          © 2025 Kala Rasa — Admin
        </div>
      </main>
    </div>
  );
}

export default HomeAdmin;