import styles from "./addRecipes.module.css";
import backIcon from "../../assets/icons/back.svg";
import uploadIcon from "../../assets/icons/upload-add.svg";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import api from "../../services/api";
import Succes from "../../components/modal/Succes";

function AddRecipes() {

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [form, setForm] = useState({
        nama: "",
        deskripsi: "",
        waktu_masak: "",
        region: "",
        kategori: ""
    });

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

    const removeIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const removeStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (!file) return;

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            alert("File harus berupa JPG atau PNG");
            return;
        }

        if (file.size > 1024 * 1024) {
            alert("Ukuran file maksimal 1 MB");
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleIngredientChange = (index, field, value) => {

        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, value) => {

        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const handleSubmit = async () => {

        if (
            !form.nama ||
            !form.deskripsi ||
            !form.waktu_masak ||
            !form.region ||
            !form.kategori ||
            !image ||
            ingredients.some(i => !i.name || !i.amount || !i.unit) ||
            steps.some(s => !s)
        ) {
            setErrorMessage("Lengkapi semua data dengan benar");
            return;
        }

        try {

            const formData = new FormData();

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

            await api.post("/recipe/recipes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setErrorMessage("");
            setShowSuccessModal(true);

        } catch (err) {

            console.error(err);
            setErrorMessage("Terjadi kesalahan saat mengirim resep");

        }
    };

    return (
        <div className={styles.addRecipePage}>

            <div className={styles.layoutWrapper}>

                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    <img src={backIcon} alt="Back" />
                </button>

                <div className={styles.formCard}>

                    <h2>Tambahkan Resep Baru</h2>

                    <label>Foto Masakan *</label>

                    <div
                        className={styles.uploadBox}
                        onClick={handleUploadClick}
                    >

                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className={styles.imagePreview}
                            />
                        ) : (
                            <>
                                <img
                                    src={uploadIcon}
                                    alt="Upload"
                                    className={styles.uploadIcon}
                                />

                                <p>
                                    Tekan untuk unggah foto
                                    <br />
                                    JPG, PNG maks 1 MB
                                </p>
                            </>
                        )}

                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            hidden
                        />

                    </div>

                    <label>Nama Resep *</label>

                    <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        placeholder="Contoh: Tumis Sayur Bayam"
                    />

                    <label>Deskripsi Resep *</label>

                    <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        placeholder="Jelaskan tentang resep Anda..."
                    />

                    <div className={styles.row3}>

                        <div>

                            <label>Waktu Memasak *</label>

                            <input
                                type="text"
                                name="waktu_masak"
                                value={form.waktu_masak}
                                onChange={handleChange}
                                placeholder="Contoh: 30"
                            />

                        </div>

                        <div>

                            <label>Daerah *</label>

                            <input
                                type="text"
                                name="region"
                                value={form.region}
                                onChange={handleChange}
                                placeholder="Contoh: Bali"
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

                        <label>Bahan-Bahan *</label>

                        <span onClick={addIngredient}>
                            + Tambah Bahan
                        </span>

                    </div>

                    {ingredients.map((item, index) => (

                        <div
                            className={styles.ingredientRow}
                            key={index}
                        >

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

                        <label>Langkah-Langkah *</label>

                        <span onClick={addStep}>
                            + Tambah Langkah
                        </span>

                    </div>

                    {steps.map((step, index) => (

                        <div
                            className={styles.stepRow}
                            key={index}
                        >

                            <span className={styles.stepNumber}>
                                {index + 1}.
                            </span>

                            <input
                                type="text"
                                value={step}
                                onChange={(e) =>
                                    handleStepChange(index, e.target.value)
                                }
                                placeholder="Jelaskan Langkah Memasak..."
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

                    {errorMessage && (
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    )}

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
                            Ajukan Resep
                        </button>

                    </div>

                </div>

            </div>

            {showSuccessModal && (
                <Succes
                    title="Resep berhasil dibagikan!"
                    message="Resep kamu akan ditinjau oleh admin sebelum ditampilkan. Pantau statusnya melalui halaman riwayat."
                    buttonText="Riwayat"
                    onButtonClick={() => navigate("/history")}
                    onClose={() => setShowSuccessModal(false)}
                />
            )}
        </div>
    );
}

export default AddRecipes;