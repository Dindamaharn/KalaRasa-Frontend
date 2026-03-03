import "./updaterecipes.css";
import AsideAdmin from "../../components/layout/Aside";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import backIcon from "../../assets/icons/back.svg";
import plusIcon from "../../assets/icons/plus.svg";

function UpdateRecipes() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // DATA DEFAULT (seperti di gambar)
  const [ingredients, setIngredients] = useState([
    { name: "Daun Bayam", amount: "3", unit: "Ikat" },
    { name: "Bawang Putih", amount: "3", unit: "Siung" },
    { name: "Bawang Merah", amount: "4", unit: "Siung" },
    { name: "Cabai Rawit", amount: "4", unit: "Buah" },
  ]);

  const [steps, setSteps] = useState([
    "Cuci bersih daun pakis tiriskan, iris bawang2an dan cabe. Kemudian tumis bawang sampai layu.",
    "Masukkan irisan cabe. Setelah cabe layu masukkan daun pakis dan aduk rata. Tambahkan gula, garam dan kaldu jamur.",
    "Aduk rata hingga matang, tidak perlu ditambah air karna seperti kangkung biasanya akan keluar air ketika dimasak.",
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  return (
    <div className="admin-update-page">
      <AsideAdmin />

      <div className="admin-update-content">
        <div className="admin-update-layout">
          
          {/* BACK */}
          <button
            className="admin-update-back-btn"
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} alt="Back" />
          </button>

          {/* CARD */}
          <div className="admin-update-card">
            <h2>Perbarui Resep</h2>

            {/* FOTO */}
            <label>Foto Masakan *</label>
            <div
              className="admin-update-upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                alt="preview"
              />
              <p>Sayurtumis.JPG</p>

              <span className="admin-update-change-photo">
                Tekan untuk memilih ulang foto
              </span>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
              />
            </div>

            {/* NAMA */}
            <label>Nama Resep *</label>
            <input type="text" defaultValue="Tumis Sayur Bayam" />

            {/* DESKRIPSI */}
            <label>Deskripsi Resep *</label>
            <textarea defaultValue="Menu sehat untuk keluarga" />

            {/* ROW */}
            <div className="admin-update-row-3">
              <div>
                <label>Waktu Memasak *</label>
                <input type="text" defaultValue="15 Menit" />
              </div>

              <div>
                <label>Daerah *</label>
                <input type="text" defaultValue="Bali" />
              </div>

              <div>
                <label>Kategori *</label>
                <select defaultValue="Makanan">
                  <option>Makanan</option>
                  <option>Minuman</option>
                  <option>Jajanan</option>
                </select>
              </div>
            </div>

            {/* BAHAN */}
            <div className="admin-update-section-header">
              <label>Bahan-Bahan *</label>
              <span onClick={addIngredient}>
                <img src={plusIcon} alt="plus" /> Tambah Bahan
              </span>
            </div>

            {ingredients.map((item, index) => (
              <div className="admin-update-ingredient-row" key={index}>
                <input defaultValue={item.name} />
                <input defaultValue={item.amount} />
                <input defaultValue={item.unit} />
              </div>
            ))}

            {/* LANGKAH */}
            <div className="admin-update-section-header">
              <label>Langkah-Langkah *</label>
              <span onClick={addStep}>
                <img src={plusIcon} alt="plus" /> Tambah Langkah
              </span>
            </div>

            {steps.map((step, index) => (
              <div className="admin-update-step-row" key={index}>
                <span className="admin-update-step-number">
                  {index + 1}.
                </span>
                <input defaultValue={step} />
              </div>
            ))}

            {/* BUTTON */}
            <div className="admin-update-buttons">
              <button
                className="admin-update-cancel"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>

              <button
                className="admin-update-submit"
                onClick={() => navigate("/admin/recipes")}
              >
                Simpan Pembaharuan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateRecipes;