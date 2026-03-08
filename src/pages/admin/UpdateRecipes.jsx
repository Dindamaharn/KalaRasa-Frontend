import "./updaterecipes.css";
import AsideAdmin from "../../components/layout/Aside";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../../services/api";

import backIcon from "../../assets/icons/back.svg";
import plusIcon from "../../assets/icons/plus.svg";

function UpdateRecipes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [waktuMasak, setWaktuMasak] = useState("");
  const [region, setRegion] = useState("");
  const [kategori, setKategori] = useState("");

  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState("");

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  /*FETCH DETAIL RECIPE*/

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/admin/recipe/${id}`);
      const recipe = res.data.data;

      setNama(recipe.nama);
      setDeskripsi(recipe.deskripsi || "");
      setWaktuMasak(recipe.waktu_masak || "");
      setRegion(recipe.region || "");
      setKategori(recipe.kategori || "");

      if (recipe.gambar) {
        setPreview(`http://127.0.0.1:8000/storage/${recipe.gambar}`);
      }

      // INGREDIENTS
      if (recipe.ingredients) {
        const mapped = recipe.ingredients.map((item) => ({
          name: item.nama,
          amount: item.pivot.jumlah,
          unit: item.pivot.satuan,
        }));
        setIngredients(mapped);
      }

      // STEPS dari deskripsi
      if (recipe.deskripsi?.includes("Langkah-langkah:")) {
        const stepText = recipe.deskripsi.split("Langkah-langkah:")[1];
        const arr = stepText
          .split("\n")
          .map((s) => s.replace(/^\d+\.\s*/, "").trim())
          .filter((s) => s);

        setSteps(arr);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  /*HANDLE IMAGE*/

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /*INGREDIENT FUNCTIONS*/

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  /*STEP FUNCTIONS*/

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const updateStep = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  /*UPDATE RECIPE API*/

  const handleUpdate = async () => {
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

      await api.post(`/admin/recipe/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/recipes");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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

          <div className="admin-update-card">
            <h2>Perbarui Resep</h2>

            {/* FOTO */}
            <label>Foto Masakan *</label>

            <div
              className="admin-update-upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              {preview && <img src={preview} alt="preview" />}

              <span className="admin-update-change-photo">
                Tekan untuk memilih ulang foto
              </span>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            {/* NAMA */}
            <label>Nama Resep *</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            {/* DESKRIPSI */}
            <label>Deskripsi Resep *</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />

            {/* ROW */}
            <div className="admin-update-row-3">
              <div>
                <label>Waktu Memasak *</label>
                <input
                  type="number"
                  value={waktuMasak}
                  onChange={(e) => setWaktuMasak(e.target.value)}
                />
              </div>

              <div>
                <label>Daerah *</label>
                <input
                  type="text"
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
                <input
                  value={item.name}
                  onChange={(e) =>
                    updateIngredient(index, "name", e.target.value)
                  }
                />

                <input
                  value={item.amount}
                  onChange={(e) =>
                    updateIngredient(index, "amount", e.target.value)
                  }
                />

                <input
                  value={item.unit}
                  onChange={(e) =>
                    updateIngredient(index, "unit", e.target.value)
                  }
                />
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

                <input
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                />
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
                onClick={handleUpdate}
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