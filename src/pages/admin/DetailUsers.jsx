import { useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import { Link } from "react-router-dom";
import "./detailusers.css";

import backIcon from "../../assets/icons/back.svg";

function DetailUsers() {
  const [currentPage, setCurrentPage] = useState(1);

  const user = {
    nama: "Dewi Anggraini",
    poin: "1200",
    telp: "0812-3456-7890",
    email: "dewi.anggraini@example.com",
    gender: "Wanita",
    lahir: "31/12/1978",
  };

  const submissions = [
    {
      id: 1,
      nama: "Soto Banjar",
      tanggal: "19/08/2025",
      status: "Menunggu",
    },
    {
      id: 2,
      nama: "Tumis Sayur",
      tanggal: "12/09/2025",
      status: "Disetujui",
    },
    {
      id: 3,
      nama: "Kue Cucur",
      tanggal: "15/09/2025",
      status: "Ditolak",
    },
  ];

  const itemsPerPage = 5;
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
        {/* HEADER */}
        <div className="detail-header">
          <div className="detail-title">
            <Link to="/admin/users" className="back-btn">
              <img src={backIcon} alt="back" />
            </Link>
            <h1>Detail Pengguna</h1>
          </div>
        </div>

        {/* CARD */}
        <div className="detail-card">
          {/* USER INFO */}
          <div className="user-grid">
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input type="text" value={user.nama} readOnly />
            </div>

            <div className="form-group">
              <label>Total Poin</label>
              <input type="text" value={user.poin} readOnly />
            </div>

            <div className="form-group">
              <label>No Telp</label>
              <input type="text" value={user.telp} readOnly />
            </div>

            <div className="form-group">
              <label>Alamat Email</label>
              <input type="text" value={user.email} readOnly />
            </div>

            <div className="form-group">
              <label>Jenis Kelamin</label>
              <input type="text" value={user.gender} readOnly />
            </div>

            <div className="form-group">
              <label>Tanggal Lahir</label>
              <input type="text" value={user.lahir} readOnly />
            </div>
          </div>

          {/* TABLE */}
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
                {currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.tanggal}</td>
                    <td>
                      <span className={`status-admin status-${item.status.toLowerCase()}`}>
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
        </div>

        {/* FOOTER */}
        <div className="admin-footer">
          © 2025 Kala Rasa — Admin
        </div>
      </main>
    </div>
  );
}

export default DetailUsers;