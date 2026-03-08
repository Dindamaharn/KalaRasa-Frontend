import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import "./shopping.css";
import { Link } from "react-router-dom";
import emptyIcon from "../../assets/icons/Empty List.svg";

function ShoppingUser() {

    const [shopping, setShopping] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchShopping();
    }, []);

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
                // karena response dari Laravel pagination
            }

            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="shopping-page">

                <h3>Daftar Belanja</h3>
                <p>Catat Kebutuhan Belanja dan Amati Pengeluaran Anda.</p>

                <div className="shopping-search">
                    <input
                        type="text"
                        placeholder="Cari daftar belanja yang pernah dibuat"
                        className="search-input"
                    />

                    <button className="search-button">
                        Cari
                    </button>
                </div>

                {loading && (
                    <p>Memuat data...</p>
                )}

                {!loading && shopping.length === 0 && (
                    <div className="empty-container">
                        <img
                            src={emptyIcon}
                            alt="Empty"
                            className="empty-icon"
                        />

                        <h3>Belum Ada Daftar Belanja</h3>
                        <p>Anda belum menambahkan daftar belanja.</p>

                        <Link to="/add-shopping" className="add-button">
                            Tambahkan Daftar Belanja
                        </Link>
                    </div>
                )}

                {!loading && shopping.length > 0 && (
                    <div className="shopping-list">
                        {shopping.map((list) => (
                            <div key={list.id} className="shopping-card">

                                <h4>{list.nama_list}</h4>

                                <p>
                                    {list.purchased_items}/{list.total_items} item dibeli
                                </p>

                                <p>
                                    Progress: {list.progress}%
                                </p>

                                <Link to={`/shopping/${list.id}`} className="detail-button">
                                    Lihat Detail
                                </Link>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}

export default ShoppingUser;