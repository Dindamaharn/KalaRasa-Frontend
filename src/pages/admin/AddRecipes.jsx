import "./addrecipes.css";
import AsideAdmin from "../../components/layout/Aside";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import api from "../../services/api";

import backIcon from "../../assets/icons/back.svg";
import uploadIcon from "../../assets/icons/upload-add.svg";
import plusIcon from "../../assets/icons/plus.svg";

function AddRecipes() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [waktuMasak, setWaktuMasak] = useState("");
  const [region, setRegion] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState(null);

  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);

  const [steps, setSteps] = useState([""]);

  // tambah bahan
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  // tambah langkah
  const addStep = () => {
    setSteps([...steps, ""]);
  };

  // update bahan
  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  // update step
  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  // upload gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
  };

  // submit ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nama", nama);
      formData.append("deskripsi", deskripsi);
      formData.append("waktu_masak", waktuMasak);
      formData.append("region", region);
      formData.append("kategori", kategori);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      ingredients.forEach((item, index) => {
        formData.append(`bahan_bahan[${index}][nama]`, item.name);
        formData.append(`bahan_bahan[${index}][jumlah]`, item.amount);
        formData.append(`bahan_bahan[${index}][satuan]`, item.unit);
      });

      steps.forEach((step, index) => {
        formData.append(`langkah_langkah[${index}]`, step);
      });

      await api.post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/recipes");
    } catch (error) {
      console.error(error);
    }
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
            <div
              className="admin-add-upload-box"
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
                onChange={handleImageChange}
              />
            </div>

            {/* NAMA */}
            <label>Nama Resep *</label>
            <input
              type="text"
              placeholder="Contoh: Tumis Sayur Bayam"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            {/* DESKRIPSI */}
            <label>Deskripsi Resep *</label>
            <textarea
              placeholder="Jelaskan tentang resep Anda..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />

            {/* ROW */}
            <div className="admin-add-row-3">
              <div>
                <label>Waktu Memasak *</label>
                <input
                  type="text"
                  placeholder="Contoh: 30 Menit"
                  value={waktuMasak}
                  onChange={(e) => setWaktuMasak(e.target.value)}
                />
              </div>

              <div>
                <label>Daerah *</label>
                <input
                  type="text"
                  placeholder="Contoh: Bali"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>

              <div>
                <label>Kategori *</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Jajanan">Jajanan</option>
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
                <input
                  type="text"
                  placeholder="Nama Bahan"
                  value={item.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Jumlah"
                  value={item.amount}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Satuan"
                  value={item.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                />
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
                  value={step}
                  onChange={(e) =>
                    handleStepChange(index, e.target.value)
                  }
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
                onClick={handleSubmit}
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