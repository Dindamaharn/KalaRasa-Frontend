import { useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import { Link } from "react-router-dom";
import "./SubmissionRecipes.css";
import backIcon from "../../assets/icons/back.svg";

function QueueSubmissionRecipes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const data = [
    {
      id: 1,
      nama: "Soto Banjar",
      pengaju: "Yanto Setio",
      tanggal: "19/08/2025",
      status: "Menunggu",
    },
    {
      id: 2,
      nama: "Tumis Sayur",
      pengaju: "Dewi Anggraini",
      tanggal: "12/09/2025",
      status: "Menunggu",
    },
    {
      id: 3,
      nama: "Kue Cucur",
      pengaju: "Samsul Arik",
      tanggal: "15/09/2025",
      status: "Menunggu",
    },
  ];

  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-layout">
      <AsideAdmin />

      <main className="admin-content">
        {/* HEADER */}
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
              placeholder="Cari berdasarkan nama atau email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Cari</button>
          </div>
        </div>

        {/* TABLE */}
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
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama}</td>
                  <td>{item.pengaju}</td>
                  <td>{item.tanggal}</td>
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
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* FOOTER */}
        <div className="admin-footer">
          © 2025 Kala Rasa — Admin
        </div>
      </main>
    </div>
  );
}

export default QueueSubmissionRecipes;