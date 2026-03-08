import styles from "./addRecipes.module.css";
import backIcon from "../../assets/icons/back.svg";
import uploadIcon from "../../assets/icons/upload-add.svg";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function AddRecipes() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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
                    <input type="text" placeholder="Contoh: Tumis Sayur Bayam" />

                    <label>Deskripsi Resep *</label>
                    <textarea placeholder="Jelaskan tentang resep Anda..." />

                    <div className={styles.row3}>
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

                    <div className={styles.sectionHeader}>
                        <label>Bahan-Bahan *</label>
                        <span onClick={addIngredient}>+ Tambah Bahan</span>
                    </div>

                    {ingredients.map((item, index) => (
                        <div className={styles.ingredientRow} key={index}>
                            <input type="text" placeholder="Nama Bahan" />
                            <input type="text" placeholder="Jumlah" />
                            <input type="text" placeholder="Satuan" />
                        </div>
                    ))}

                    <div className={styles.sectionHeader}>
                        <label>Langkah-Langkah *</label>
                        <span onClick={addStep}>+ Tambah Langkah</span>
                    </div>

                    {steps.map((step, index) => (
                        <div className={styles.stepRow} key={index}>
                            <span className={styles.stepNumber}>
                                {index + 1}.
                            </span>
                            <input
                                type="text"
                                placeholder="Jelaskan Langkah Memasak..."
                            />
                        </div>
                    ))}

                    <div className={styles.formButtons}>
                        <button
                            className={styles.btnCancel}
                            onClick={() => navigate(-1)}
                        >
                            Batal
                        </button>

                        <button className={styles.btnSubmit}>
                            Ajukan Resep
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddRecipes;