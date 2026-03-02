import { useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import { Link } from "react-router-dom";
import "./UsersAdmin.css";

function UsersAdmin() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const users = [
        {
        id: 1,
        nama: "Dewi Anggraini",
        email: "dewi@example.com",
        telp: "0812-3456-7890",
        gender: "Perempuan",
        tanggal: "15/07/2005",
        },
        {
        id: 2,
        nama: "Budi Santoso",
        email: "budi@example.com",
        telp: "0813-1122-3344",
        gender: "Laki-laki",
        tanggal: "12/02/1998",
        },
        {
        id: 3,
        nama: "Agus Permadi",
        email: "agus@example.com",
        telp: "0819-5566-7788",
        gender: "Laki-laki",
        tanggal: "10/06/2000",
        },
    ];

    const itemsPerPage = 5;

    const filteredUsers = users.filter(
        (user) =>
        user.nama.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredUsers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="admin-layout">
        <AsideAdmin />

        <main className="admin-content">
            <div className="users-header">
            <h1>Pengguna</h1>

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

            <div className="table-box">
            <table>
                <thead>
                <tr>
                    <th>Nama Lengkap</th>
                    <th>Email</th>
                    <th>No Telp</th>
                    <th>Jenis Kelamin</th>
                    <th>Tanggal Lahir</th>
                    <th>Aksi</th>
                </tr>
                </thead>

                <tbody>
                {currentData.map((user) => (
                    <tr key={user.id}>
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>{user.telp}</td>
                    <td>{user.gender}</td>
                    <td>{user.tanggal}</td>
                    <td>
                        <Link
    to={`/admin/users/${user.id}`}
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

            <div className="admin-footer">
            © 2025 Kala Rasa — Admin
            </div>
        </main>
        </div>
    );
}

export default UsersAdmin;