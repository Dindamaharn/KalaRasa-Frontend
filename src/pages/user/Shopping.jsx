import Navbar from "../../components/layout/Navbar";
import "./shopping.css";
import emptyIcon from "../../assets/icons/Empty List.svg";

function ShoppingUser() {

    const shopping = []; // nanti dari API

    return (
        <>
            <Navbar />

            <div className="shopping-page">

                {/* SEARCH SECTION */}
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

                {/* CONTENT */}
                {shopping.length === 0 && (
                    <div className="empty-container">
                        <img
                            src={emptyIcon}
                            alt="Empty"
                            className="empty-icon"
                        />

                        <h3>Belum Ada Daftar Belanja</h3>
                        <p>Anda belum menambahkan daftar belanja.</p>
                        <button className="add-button">
                            Tambahkan Daftar Belanja
                        </button>
                    </div>
                )}

            </div>
        </>
    );
}

export default ShoppingUser;