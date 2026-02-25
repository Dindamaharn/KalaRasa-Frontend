import { useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import "./homeAdmin.css";

function HomeAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // sesuaikan dengan total data dari backend nanti

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // nanti di sini bisa fetch data berdasarkan page
  };

  return (
    <div className="admin-layout">
      <AsideAdmin />

      <main className="admin-content">
        <h1>Beranda</h1>

        <div className="cards">
          <div className="card">
            <p>Total Pengguna</p>
            <h2>120</h2>
          </div>

          <div className="card">
            <p>Total Resep</p>
            <h2>1025</h2>
          </div>

          <div className="card">
            <p>Total Pengajuan</p>
            <h2>50</h2>
          </div>
        </div>

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
              <tr>
                <td>Soto Banjar</td>
                <td>Yanto Setio</td>
                <td>19/08/2025</td>
                <td>
                  <span className="status">Menunggu</span>
                </td>
                <td>
                  <button className="btn-detail">Lihat</button>
                </td>
              </tr>
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}

export default HomeAdmin;