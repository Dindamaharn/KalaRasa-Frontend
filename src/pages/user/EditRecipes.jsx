import styles from "./editRecipes.module.css";
import backIcon from "../../assets/icons/back.svg";
import uploadIcon from "../../assets/icons/upload-add.svg";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../../services/api";

import Succes from "../../components/modal/Succes";
import Loading from "../../components/modal/Loading";

function EditRecipes() {

    const navigate = useNavigate();
    const { id } = useParams();
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        nama: "",
        deskripsi: "",
        waktu_masak: "",
        region: "",
        kategori: ""
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    /* FETCH RECIPE */
    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {

        try {

            const res = await api.get(`/recipes/${id}`);
            const recipe = res.data.data.recipe;

            setForm({
                nama: recipe.nama || "",
                deskripsi: recipe.deskripsi || "",
                waktu_masak: recipe.waktu_masak || "",
                region: recipe.region || "",
                kategori: recipe.kategori || ""
            });

            /* IMAGE */
            if (recipe.image_url) {
                setImagePreview(recipe.image_url);
            }

            /* INGREDIENTS */
            if (recipe.ingredients) {

                const mappedIngredients = recipe.ingredients.map((item) => ({
                    name: item.nama,
                    amount: item.pivot?.jumlah || "",
                    unit: item.pivot?.satuan || ""
                }));

                setIngredients(mappedIngredients);

            }

            /* STEPS */
            setSteps(recipe.langkah_langkah || []);

        } catch (err) {

            console.error("Fetch error:", err);

        } finally {

            setLoading(false);

        }
    };

    /* IMAGE */
    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            setImage(file);

            const preview = URL.createObjectURL(file);
            setImagePreview(preview);

        }

    };

    /* FORM */
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };

    /* INGREDIENTS */
    const addIngredient = () => {

        setIngredients([
            ...ingredients,
            { name: "", amount: "", unit: "" }
        ]);

    };

    const handleIngredientChange = (index, field, value) => {

        const updated = [...ingredients];
        updated[index][field] = value;

        setIngredients(updated);

    };

    /* STEPS */
    const addStep = () => {

        setSteps([...steps, ""]);

    };

    const handleStepChange = (index, value) => {

        const updated = [...steps];
        updated[index] = value;

        setSteps(updated);

    };

    /* UPDATE */
    const handleSubmit = async () => {

        try {

            setSaving(true);

            const formData = new FormData();

            formData.append("_method", "PUT");

            formData.append("nama", form.nama);
            formData.append("deskripsi", form.deskripsi);
            formData.append("waktu_masak", form.waktu_masak);
            formData.append("region", form.region);
            formData.append("kategori", form.kategori);

            if (image) {
                formData.append("gambar", image);
            }

            ingredients.forEach((item, index) => {

                formData.append(`bahan_bahan[${index}][nama]`, item.name);
                formData.append(`bahan_bahan[${index}][jumlah]`, item.amount);
                formData.append(`bahan_bahan[${index}][satuan]`, item.unit);

            });

            steps.forEach((step, index) => {

                formData.append(`langkah_langkah[${index}]`, step);

            });

            await api.post(`/admin/recipe/${id}`, formData);

            setShowSuccessModal(true);

        } catch (err) {

            console.error(err);

        } finally {

            setSaving(false);

        }
    };

    return (
        <>
            <Loading isOpen={loading || saving} />

            <div className={styles.editRecipePage}>

                <div className={styles.layoutWrapper}>
                    <button
                        className={styles.backButton}
                        onClick={() => navigate(-1)}
                    >
                        <img src={backIcon} alt="Back" />
                    </button>

                    <div className={styles.formCard}>

                        <h2>Edit Resep</h2>

                        <label>Foto Masakan *</label>

                        <div
                            className={styles.uploadBox}
                            onClick={() => fileInputRef.current.click()}
                        >

                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className={styles.imagePreview}
                                />
                            ) : (
                                <>
                                    <img src={uploadIcon} alt="upload" />
                                    <p>Klik untuk upload gambar</p>
                                </>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                hidden
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                            />

                        </div>

                        <label>Nama Resep *</label>

                        <input
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                        />

                        <label>Deskripsi Resep *</label>

                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                        />

                        <div className={styles.row3}>
                            <div>
                                <label>Waktu Memasak (menit) *</label>

                                <input
                                    type="number"
                                    name="waktu_masak"
                                    value={form.waktu_masak}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label>Daerah *</label>

                                <input
                                    name="region"
                                    value={form.region}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label>Kategori *</label>

                                <select
                                    name="kategori"
                                    value={form.kategori}
                                    onChange={handleChange}
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="Makanan">Makanan</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Jajanan">Jajanan</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.sectionHeader}>
                            <label>Bahan Bahan *</label>

                            <span onClick={addIngredient}>
                                + Tambah Bahan
                            </span>
                        </div>

                        {ingredients.map((item, index) => (

                            <div key={index} className={styles.ingredientRow}>

                                <input
                                    placeholder="Nama bahan"
                                    value={item.name}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "name", e.target.value)
                                    }
                                />

                                <input
                                    placeholder="Jumlah"
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "amount", e.target.value)
                                    }
                                />

                                <input
                                    placeholder="Satuan"
                                    value={item.unit}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "unit", e.target.value)
                                    }
                                />

                                {ingredients.length > 1 && (
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => removeIngredient(index)}
                                    >
                                        −
                                    </button>
                                )}

                            </div>

                        ))}

                        <div className={styles.sectionHeader}>
                            <label>Langkah Langkah *</label>

                            <span onClick={addStep}>
                                + Tambah Langkah
                            </span>
                        </div>

                        {steps.map((step, index) => (

                            <div key={index} className={styles.stepRow}>

                                <span>{index + 1}.</span>

                                <textarea
                                    value={step}
                                    onChange={(e) =>
                                        handleStepChange(index, e.target.value)
                                    }
                                />

                                {steps.length > 1 && (
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => removeStep(index)}
                                    >
                                        −
                                    </button>
                                )}

                            </div>

                        ))}

                        <div className={styles.formButtons}>

                            <button
                                className={styles.btnCancel}
                                onClick={() => navigate(-1)}
                            >
                                Batal
                            </button>

                            <button
                                className={styles.btnSubmit}
                                onClick={handleSubmit}
                            >
                                Simpan Perubahan
                            </button>

                        </div>
                    </div>

                </div>

                {showSuccessModal && (
                    <Succes
                        title="Resep berhasil diperbarui!"
                        message="Perubahan resep telah disimpan."
                        buttonText="Riwayat"
                        onButtonClick={() => navigate("/history")}
                        onClose={() => setShowSuccessModal(false)}
                    />
                )}

            </div>
        </>
    );
}

export default EditRecipes;