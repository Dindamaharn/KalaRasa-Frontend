import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import backIcon from "../../assets/icons/back.svg";
import "./addShopping.css";

function AddShopping() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [items, setItems] = useState([
        { id: Date.now(), name: "", quantity: "", unit: "" }
    ]);

    const handleAddItem = () => {
        const newItem = {
            id: Date.now(),
            name: "",
            quantity: "",
            unit: "",
        };

        setItems([...items, newItem]);
    };

    const handleItemChange = (id, field, value) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("access_token");

            const payload = {
                nama_list: title,
                items: items.map((item) => ({
                    nama_item: item.name,
                    jumlah: Number(item.quantity),
                    satuan: item.unit,
                })),
            };

            const response = await fetch(
                "http://localhost:8000/api/shopping-lists",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Daftar belanja berhasil dibuat");
                navigate("/shopping");
            } else {
                alert(data.message || "Gagal membuat daftar belanja");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan");
        }
    };

    return (
        <div className="add-shopping-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                <img src={backIcon} alt="Back" />
            </button>

            <div className="add-shopping-card">
                <h2>Tambahkan Daftar Belanja Baru</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Masukkan Judul Daftar Belanja</label>
                        <input
                            type="text"
                            placeholder="Contoh: Belanja Sayur Asem"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Tambahkan Item Belanja</label>

                        {items.map((item) => (
                            <div key={item.id} className="item-row">

                                <input
                                    type="text"
                                    placeholder="Nama Item"
                                    value={item.name}
                                    onChange={(e) =>
                                        handleItemChange(item.id, "name", e.target.value)
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Jumlah"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(item.id, "quantity", e.target.value)
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Satuan"
                                    value={item.unit}
                                    onChange={(e) =>
                                        handleItemChange(item.id, "unit", e.target.value)
                                    }
                                />

                            </div>
                        ))}

                        <button
                            type="button"
                            className="add-item-button"
                            onClick={handleAddItem}
                        >
                            +
                        </button>
                    </div>

                    <div className="button-row">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate(-1)}
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                        >
                            Simpan Daftar Belanja
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddShopping;