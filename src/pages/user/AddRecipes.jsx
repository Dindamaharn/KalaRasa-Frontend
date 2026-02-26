import "./addRecipes.css";
import Navbar from "../../components/layout/Navbar";
import backIcon from "../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddRecipes() {
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([
        { name: "", amount: "", unit: "" }
    ]);

    const [steps, setSteps] = useState([""]);

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
    };

    const addStep = () => {
        setSteps([...steps, ""]);
    };

    return (
        <div className="add-recipe-page">

            {/* BACK BUTTON */}
            <button className="back-button" onClick={() => navigate(-1)}>
                <img src={backIcon} alt="Back" />
            </button>

            <div className="form-card">
                <h2>Tambahkan Resep Baru</h2>

                {/* FOTO */}
                <label>Foto Masakan *</label>
                <div className="upload-box">
                    <p>Tekan untuk unggah foto<br />JPG, PNG maks 1 MB</p>
                    <input type="file" hidden />
                </div>

                {/* NAMA */}
                <label>Nama Resep *</label>
                <input
                    type="text"
                    placeholder="Contoh: Tumis Sayur Bayam"
                />

                {/* DESKRIPSI */}
                <label>Deskripsi Resep *</label>
                <textarea
                    placeholder="Jelaskan tentang resep Anda..."
                />

                {/* 3 INPUT ROW */}
                <div className="row-3">
                    <div>
                        <label>Waktu Memasak *</label>
                        <input type="text" placeholder="Contoh: 30 Menit" />
                    </div>

                    <div>
                        <label>Daerah *</label>
                        <input type="text" placeholder="Contoh: Bali" />
                    </div>

                    <div>
                        <label>Kategori *</label>
                        <select>
                            <option>Pilih Kategori</option>
                            <option>Sayur</option>
                            <option>Ayam</option>
                            <option>Seafood</option>
                            <option>Dessert</option>
                        </select>
                    </div>
                </div>

                {/* BAHAN */}
                <div className="section-header">
                    <label>Bahan-Bahan *</label>
                    <span onClick={addIngredient}>+ Tambah Bahan</span>
                </div>

                {ingredients.map((item, index) => (
                    <div className="ingredient-row" key={index}>
                        <input
                            type="text"
                            placeholder="Nama Bahan"
                        />
                        <input
                            type="text"
                            placeholder="Jumlah"
                        />
                        <input
                            type="text"
                            placeholder="Satuan"
                        />
                    </div>
                ))}

                {/* LANGKAH */}
                <div className="section-header">
                    <label>Langkah-Langkah *</label>
                    <span onClick={addStep}>+ Tambah Langkah</span>
                </div>

                {steps.map((step, index) => (
                    <div className="step-row" key={index}>
                        <span className="step-number">{index + 1}.</span>
                        <input
                            type="text"
                            placeholder="Jelaskan Langkah Memasak..."
                        />
                    </div>
                ))}

                {/* BUTTONS */}
                <div className="form-buttons">
                    <button
                        className="btn-cancel"
                        onClick={() => navigate(-1)}
                    >
                        Batal
                    </button>

                    <button className="btn-submit">
                        Ajukan Resep
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AddRecipes;