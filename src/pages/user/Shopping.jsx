import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import "./shopping.css";
import { Link, useNavigate } from "react-router-dom";

import emptyIcon from "../../assets/icons/Empty List.svg";
import emptyLoginIcon from "../../assets/icons/EmptyLogin.svg";
import calendarIcon from "../../assets/icons/kalender.svg";
import shoppingIcon from "../../assets/icons/shopping.svg";
import trashIcon from "../../assets/icons/trash.svg";

function ShoppingUser() {

    const [shopping, setShopping] = useState([]);
    const [filteredShopping, setFilteredShopping] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            setIsLogin(false);
            setLoading(false);
            return;
        }

        setIsLogin(true);
        fetchShopping();

    }, []);

    useEffect(() => {
        handleSearch();
    }, [search, shopping]);

    const fetchShopping = async () => {
        try {

            const token = localStorage.getItem("access_token");

            const response = await fetch("http://localhost:8000/api/shopping-lists", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setShopping(data.data.data);
                setFilteredShopping(data.data.data);
            }

            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSearch = () => {

        const result = shopping.filter((item) =>
            item.nama_list.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredShopping(result);

    };

    const formatDate = (dateString) => {

        const date = new Date(dateString);

        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    };

    const handleDelete = async (id, e) => {

        e.stopPropagation();

        const confirmDelete = window.confirm("Yakin ingin menghapus daftar belanja?");
        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("access_token");

            const response = await fetch(`http://localhost:8000/api/shopping-lists/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {

                const updated = shopping.filter(item => item.id !== id);

                setShopping(updated);
                setFilteredShopping(updated);

            }

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <>
            <Navbar />

            <div className="shopping-page">

                {/* ================= GUEST ================= */}
                {!isLogin && (

                    <div className="empty-login-container">

                        <img
                            src={emptyLoginIcon}
                            alt="Login Required"
                            className="empty-login-icon"
                        />

                    </div>

                )}

                {/* ================= USER LOGIN ================= */}
                {isLogin && (

                    <>
                        <h3>Daftar Belanja</h3>
                        <p>Catat Kebutuhan Belanja dan Amati Pengeluaran Anda.</p>

                        {/* SEARCH */}
                        <div className="shopping-search">

                            <input
                                type="text"
                                placeholder="Cari daftar belanja yang pernah dibuat"
                                className="search-input"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button
                                className="search-button"
                                onClick={handleSearch}
                            >
                                Cari
                            </button>

                        </div>

                        <div className="shopping-layout">

                            {/* LEFT SIDE */}
                            <div className="shopping-left">

                                <Link to="/add-shopping" className="add-button">
                                    +
                                </Link>

                                {loading && <p>Memuat data...</p>}

                                {!loading && filteredShopping.length === 0 && (

                                    <div className="empty-container">

                                        <img
                                            src={emptyIcon}
                                            alt="Empty"
                                            className="empty-icon"
                                        />

                                        <h3>Belum Ada Daftar Belanja</h3>
                                        <p>Anda belum menambahkan daftar belanja.</p>

                                    </div>

                                )}

                                {!loading && filteredShopping.length > 0 && (

                                    <div className="shopping-list">

                                        {filteredShopping.map((list) => (

                                            <div
                                                key={list.id}
                                                className="shopping-card"
                                                onClick={() => navigate(`/shopping/${list.id}`)}
                                            >

                                                <div className="card-left">

                                                    <h4>{list.nama_list}</h4>

                                                    <div className="row-info">

                                                        <div className="card-info">
                                                            <img src={calendarIcon} alt="Calendar" />
                                                            <span>{formatDate(list.shopping_date)}</span>
                                                        </div>

                                                        <div className="card-info">
                                                            <img src={shoppingIcon} alt="Shopping" />
                                                            <span>{list.total_items} Barang</span>
                                                        </div>

                                                    </div>

                                                </div>

                                                <button
                                                    className="delete-button"
                                                    onClick={(e) => handleDelete(list.id, e)}
                                                >
                                                    <img src={trashIcon} alt="Delete" />
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="shopping-right">

                                <h3>Analisis Pengeluaran</h3>

                                <div className="analysis-card total">
                                    <p>Total Pengeluaran</p>
                                    <h4>Rp 134.000</h4>
                                </div>

                                <div className="analysis-card average">
                                    <p>Rata Rata Pengeluaran</p>
                                    <h4>Rp 70.000</h4>
                                </div>

                                <div className="chart-box">
                                    Grafik
                                </div>

                                <div className="analysis-filter">
                                    <button>Minggu</button>
                                    <button>Bulan</button>
                                    <button>Tahun</button>
                                </div>

                            </div>

                        </div>
                    </>

                )}

            </div>
        </>
    );
}

export default ShoppingUser;