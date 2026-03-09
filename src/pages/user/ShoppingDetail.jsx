import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import styles from "./shoppingDetail.module.css";
import trashIcon from "../../assets/icons/trash.svg";
import backIcon from "../../assets/icons/back.svg";
import plusIcon from "../../assets/icons/plus.svg";

function ShoppingDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [listName, setListName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {

        const token = localStorage.getItem("access_token");

        const response = await fetch(
            `http://localhost:8000/api/shopping-lists/${id}/items`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (data.success) {
            setItems(data.data);
        }

        setLoading(false);
    };

    const handleChange = (index, field, value) => {

        const updated = [...items];
        updated[index][field] = value;

        setItems(updated);
    };

    const addRow = () => {

        const newItem = {
            nama_item: "",
            jumlah: 1,
            satuan: "",
            actual_price: 0,
            is_purchased: false
        };

        setItems([...items, newItem]);
    };

    const deleteItem = async (itemId) => {

        const token = localStorage.getItem("access_token");

        await fetch(
            `http://localhost:8000/api/shopping-lists/${id}/items/${itemId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchItems();
    };

    const saveChanges = async () => {

        const token = localStorage.getItem("access_token");

        for (const item of items) {

            if (!item.id) {

                await fetch(
                    `http://localhost:8000/api/shopping-lists/${id}/items`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(item)
                    }
                );

            } else {

                await fetch(
                    `http://localhost:8000/api/shopping-lists/${id}/items/${item.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(item)
                    }
                );

            }

        }

        fetchItems();
    };

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.actual_price ?? 0);
    }, 0);

    return (
        <>
            <Navbar />

            <div className={styles.shoppingDetail}>

                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    <img src={backIcon} alt="Back" />
                </button>

                <div className={styles.detailCard}>

                    <div className={styles.detailHeader}>

                        <div>
                            <h2>Daftar Belanja</h2>
                            <p>Klik harga untuk merubah</p>
                        </div>

                        <button
                            className={styles.addItemBtn}
                            onClick={addRow}
                        >
                            <img src={plusIcon} alt="Tambah" />
                        </button>

                    </div>

                    {loading && <p>Memuat...</p>}

                    {!loading && (

                        <div className={styles.itemList}>

                            {items.map((item, index) => (

                                <div
                                    key={index}
                                    className={styles.itemRow}
                                >

                                    <input
                                        type="checkbox"
                                        className={styles.customCheckbox}
                                        checked={item.is_purchased}
                                        onChange={() =>
                                            handleChange(index, "is_purchased", !item.is_purchased)
                                        }
                                    />

                                    <input
                                        className={styles.itemNameInput}
                                        value={item.nama_item}
                                        onChange={(e) =>
                                            handleChange(index, "nama_item", e.target.value)
                                        }
                                    />

                                    <input
                                        className={styles.itemQtyInput}
                                        value={item.jumlah}
                                        onChange={(e) =>
                                            handleChange(index, "jumlah", e.target.value)
                                        }
                                    />

                                    <input
                                        className={styles.itemUnitInput}
                                        value={item.satuan}
                                        onChange={(e) =>
                                            handleChange(index, "satuan", e.target.value)
                                        }
                                    />

                                    <input
                                        className={styles.itemPriceInput}
                                        value={item.actual_price ?? 0}
                                        onChange={(e) =>
                                            handleChange(index, "actual_price", e.target.value)
                                        }
                                    />

                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        <img src={trashIcon} alt="delete" />
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                    <div className={styles.totalBar}>
                        <span>Total Pengeluaran</span>
                        <span>Rp {totalPrice.toLocaleString()}</span>
                    </div>

                    <div className={styles.actionButtons}>

                        <button
                            className={styles.saveBtn}
                            onClick={saveChanges}
                        >
                            Simpan Perubahan
                        </button>

                        <button
                            className={styles.cancelBtn}
                            onClick={() => navigate(-1)}
                        >
                            Batalkan Perubahan
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ShoppingDetail;