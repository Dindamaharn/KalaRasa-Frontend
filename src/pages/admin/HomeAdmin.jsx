import { useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import "./homeAdmin.css";

// import icon
import usersIcon from "../../assets/icons/group-person.svg";
import recipeIcon from "../../assets/icons/chef-hat.svg";
import submissionIcon from "../../assets/icons/approval-list.svg";

function HomeAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="admin-layout">
      <AsideAdmin />

      <main className="admin-content">
        <h1>Beranda</h1>

        <div className="cards">
  <div className="card">
    <div className="card-text">
      <p>Total Pengguna</p>
      <h2>120</h2>
    </div>
    <img src={usersIcon} alt="" className="card-icon" />
  </div>

  <div className="card">
    <div className="card-text">
      <p>Total Resep</p>
      <h2>1025</h2>
    </div>
    <img src={recipeIcon} alt="" className="card-icon" />
  </div>

  <div className="card">
    <div className="card-text">
      <p>Total Pengajuan</p>
      <h2>50</h2>
    </div>
    <img src={submissionIcon} alt="" className="card-icon" />
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

          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomeAdmin;