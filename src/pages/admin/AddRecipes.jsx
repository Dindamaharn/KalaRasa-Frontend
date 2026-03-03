import "./addrecipes.css";
import AsideAdmin from "../../components/layout/Aside";
import { useNavigate } from "react-router-dom";
import { useState, useRef} from "react";

import backIcon from "../../assets/icons/back.svg";
import uploadIcon from "../../assets/icons/upload-add.svg";
import plusIcon from "../../assets/icons/plus.svg";

function AddRecipes() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);

  const [steps, setSteps] = useState([""]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  return (
    <div className="admin-add-page">
      <AsideAdmin />

      <div className="admin-add-content">
        <div className="admin-add-layout">
          
          {/* BACK BUTTON */}
          <button
            className="admin-add-back-btn"
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} alt="Back" />
          </button>

          {/* CARD */}
          <div className="admin-add-card">
            <h2>Tambahkan Resep Baru</h2>

            {/* FOTO */}
            <label>Foto Masakan *</label>
            <div className="admin-add-upload-box"
                onClick={() => fileInputRef.current.click()}
              >
                <img src={uploadIcon} alt="Upload" />
                <p>
                  Tekan untuk unggah foto <br />
                  JPG, PNG maks 1 MB
                </p>

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
            </div>

            {/* NAMA */}
            <label>Nama Resep *</label>
            <input
              type="text"
              placeholder="Contoh: Tumis Sayur Bayam"
            />

            {/* DESKRIPSI */}
            <label>Deskripsi Resep *</label>
            <textarea placeholder="Jelaskan tentang resep Anda..." />

            {/* ROW 3 */}
            <div className="admin-add-row-3">
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
                  <option>Makanan</option>
                  <option>Minuman</option>
                  <option>Jajanan</option>
                </select>
              </div>
            </div>

            {/* BAHAN */}
            <div className="admin-add-section-header">
              <label>Bahan-Bahan *</label>
              <span onClick={addIngredient}>
                <img src={plusIcon} alt="plus" /> Tambah Bahan
              </span>
            </div>

            {ingredients.map((item, index) => (
              <div className="admin-add-ingredient-row" key={index}>
                <input type="text" placeholder="Nama Bahan" />
                <input type="text" placeholder="Jumlah" />
                <input type="text" placeholder="Satuan" />
              </div>
            ))}

            {/* LANGKAH */}
            <div className="admin-add-section-header">
              <label>Langkah-Langkah *</label>
              <span onClick={addStep}>
                <img src={plusIcon} alt="plus" /> Tambah Langkah
              </span>
            </div>

            {steps.map((step, index) => (
              <div className="admin-add-step-row" key={index}>
                <span className="admin-add-step-number">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  placeholder="Jelaskan Langkah Memasak..."
                />
              </div>
            ))}

            {/* BUTTON */}
            <div className="admin-add-buttons">
              <button
                className="admin-add-cancel"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>

              <button
                className="admin-add-submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/admin/recipes");
                }}
              >
                Simpan Resep
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddRecipes;