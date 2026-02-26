import { useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import "./homeAdmin.css";
import { Link } from "react-router-dom";

import usersIcon from "../../assets/icons/group-person.svg";
import recipeIcon from "../../assets/icons/chef-hat.svg";
import submissionIcon from "../../assets/icons/approval-list.svg";

function HomeAdmin() {
  const [currentPage, setCurrentPage] = useState(1);

  const submissions = [
    {
      id: 1,
      namaResep: "Soto Banjar",
      pengaju: "Yanto Setio",
      tanggal: "19/08/2025",
      status: "Menunggu",
    },
    {
      id: 2,
      namaResep: "Tumis Sayur",
      pengaju: "Dewi Anggraini",
      tanggal: "12/09/2025",
      status: "Menunggu",
    },
    {
      id: 3,
      namaResep: "Kue Cucur",
      pengaju: "Samsul Arik",
      tanggal: "15/09/2025",
      status: "Menunggu",
    },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <div className="card-text">
              <p>Total Pengguna</p>
              <h2>120</h2>
            </div>
            <img src={usersIcon} className="card-icon" />
          </div>

          <div className="card">
            <div className="card-text">
              <p>Total Resep</p>
              <h2>1025</h2>
            </div>
            <img src={recipeIcon} className="card-icon" />
          </div>

          <div className="card">
            <div className="card-text">
              <p>Total Pengajuan</p>
              <h2>50</h2>
            </div>
            <img src={submissionIcon} className="card-icon" />
          </div>
        </div>

        {/* Table */}
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
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.namaResep}</td>
                  <td>{item.pengaju}</td>
                  <td>{item.tanggal}</td>
                  <td>
                    <span className="status">{item.status}</span>
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

          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="admin-footer">
          © 2025 Kala Rasa — Admin
        </div>
      </main>
    </div>
  );
}

export default HomeAdmin;