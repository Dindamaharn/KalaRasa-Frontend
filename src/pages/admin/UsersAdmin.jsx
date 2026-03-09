import { useEffect, useState } from "react";
import AsideAdmin from "../../components/layout/Aside";
import Pagination from "../../components/ui/Pagination";
import Loading from "../../components/modal/Loading";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./UsersAdmin.css";

function UsersAdmin() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);
        if (isNaN(date)) return dateString;

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const fetchUsers = async (page = 1, keyword = "") => {
        try {
        setLoading(true);

        const response = await api.get("/admin/user", {
            params: {
            page: page,
            search: keyword,
            },
        });

        const resData = response.data.data;

        setUsers(resData.data);
        setTotalPages(resData.last_page);

        } catch (error) {
        console.error("Gagal ambil users:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
        fetchUsers(currentPage, search);
        }, 400);

        return () => clearTimeout(delay);
    }, [currentPage, search]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchClick = () => {
        setCurrentPage(1);
        fetchUsers(1, search);
    };

    return (
        <>
        {/* LOADING MODAL */}
        <Loading isOpen={loading} />

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

                <button onClick={handleSearchClick}>
                    Cari
                </button>
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
                    {users.length === 0 ? (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                        Tidak ada data
                        </td>
                    </tr>
                    ) : (
                    users.map((user) => (
                        <tr key={user.id}>
                        <td>{user.nama_lengkap || "-"}</td>
                        <td>{user.email || "-"}</td>
                        <td>{user.no_telp || "-"}</td>
                        <td>{user.jenis_kelamin || "-"}</td>
                        <td>{formatDate(user.tanggal_lahir)}</td>
                        <td>
                            <Link
                            to={`/admin/users/${user.id}`}
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

                {totalPages > 1 && (
                <div className="pagination-container">
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
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

export default UsersAdmin;