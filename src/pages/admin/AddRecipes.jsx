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

  const [previewImage, setPreviewImage] = useState(null);

  const [errors, setErrors] = useState({});

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

  // update langkah
  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  // upload gambar + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        gambar: "Ukuran gambar maksimal 1MB",
      }));
      return;
    }

    setGambar(file);
    setPreviewImage(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      gambar: null,
    }));
  };

  // validasi form
  const validateForm = () => {
    const newErrors = {};

    if (!nama) newErrors.nama = "Nama resep wajib diisi";
    if (!deskripsi) newErrors.deskripsi = "Deskripsi wajib diisi";
    if (!waktuMasak) newErrors.waktuMasak = "Waktu memasak wajib diisi";
    if (!region) newErrors.region = "Daerah wajib diisi";
    if (!kategori) newErrors.kategori = "Kategori wajib dipilih";
    if (!gambar) newErrors.gambar = "Foto masakan wajib diupload";

    if (ingredients.length === 0) {
      newErrors.ingredients = "Minimal 1 bahan";
    }

    if (steps.length === 0) {
      newErrors.steps = "Minimal 1 langkah";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();

      formData.append("nama", nama);
      formData.append("deskripsi", deskripsi);
      formData.append("waktu_masak", parseInt(waktuMasak) || 0);
      formData.append("region", region);
      formData.append("kategori", kategori);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      // bahan
      ingredients
        .filter((item) => item.name && item.amount)
        .forEach((item, index) => {
          formData.append(`bahan_bahan[${index}][nama]`, item.name);
          formData.append(`bahan_bahan[${index}][jumlah]`, item.amount);
          formData.append(`bahan_bahan[${index}][satuan]`, item.unit);
        });

      // langkah
      steps
        .filter((step) => step.trim() !== "")
        .forEach((step, index) => {
          formData.append(`langkah_langkah[${index}]`, step);
        });

      await api.post("/admin/recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/recipes");

    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (backendErrors) {
        setErrors(backendErrors);
      } else {
        setErrors({
          general: "Terjadi kesalahan saat menyimpan resep",
        });
      }

      console.error("ERROR BACKEND:", error.response?.data || error);
    }
  };

  return (
    <div className="admin-add-page">
      <AsideAdmin />

      <div className="admin-add-content">
        <div className="admin-add-layout">

          <button
            className="admin-add-back-btn"
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} alt="Back" />
          </button>

          <form className="admin-add-card" onSubmit={handleSubmit}>
            <h2>Tambahkan Resep Baru</h2>

            {/* FOTO */}
            <label>Foto Masakan *</label>

            <div className="admin-add-upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              {previewImage ? (
                <div className="preview-wrapper">
                  <img
                    src={previewImage}
                    alt="preview"
                    className="preview-image"
                  />

                  <div className="preview-overlay">
                    Klik untuk mengubah gambar
                  </div>
                </div>
              ) : (
                <>
                  <img src={uploadIcon} alt="Upload" />
                  <p>
                    Klik untuk unggah foto <br />
                    JPG / PNG (maks 1 MB)
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            {errors.gambar && (
              <p className="form-error">{errors.gambar}</p>
            )}

            {/* NAMA */}
            <label>Nama Resep *</label>

            <input
              type="text"
              placeholder="Contoh: Tumis Sayur Bayam"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            {errors.nama && (
              <p className="form-error">{errors.nama}</p>
            )}

            {/* DESKRIPSI */}
            <label>Deskripsi Resep *</label>

            <textarea
              placeholder="Jelaskan tentang resep Anda..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />

            {errors.deskripsi && (
              <p className="form-error">{errors.deskripsi}</p>
            )}

            {/* ROW */}
            <div className="admin-add-row-3">

              <div>
                <label>Waktu Memasak *</label>

                <input
                  type="number"
                  placeholder="Contoh: 30"
                  value={waktuMasak}
                  onChange={(e) => setWaktuMasak(e.target.value)}
                />

                {errors.waktuMasak && (
                  <p className="form-error">
                    {errors.waktuMasak}
                  </p>
                )}
              </div>

              <div>
                <label>Daerah *</label>

                <input
                  type="text"
                  placeholder="Contoh: Bali"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />

                {errors.region && (
                  <p className="form-error">{errors.region}</p>
                )}
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

                {errors.kategori && (
                  <p className="form-error">{errors.kategori}</p>
                )}
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
              <div
                className="admin-add-ingredient-row"
                key={index}
              >
                <input
                  type="text"
                  placeholder="Nama Bahan"
                  value={item.name}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Jumlah"
                  value={item.amount}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      "amount",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Satuan"
                  value={item.unit}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      "unit",
                      e.target.value
                    )
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
              <div
                className="admin-add-step-row"
                key={index}
              >
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

            {errors.general && (
              <p className="form-error">{errors.general}</p>
            )}

            {/* BUTTON */}
            <div className="admin-add-buttons">

              <button
                type="button"
                className="admin-add-cancel"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>

              <button
                type="submit"
                className="admin-add-submit"
              >
                Simpan Resep
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipes;