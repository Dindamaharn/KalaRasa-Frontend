import { useNavigate } from "react-router-dom";
import styles from "./rejectedCard.module.css";
import failIcon from "../../assets/icons/fail.svg";
import timeIcon from "../../assets/icons/time.svg";
import api from "../../services/api";

function RejectedCard({ recipe }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus resep ini?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/recipes/${recipe.id}`);

            alert("Resep berhasil dihapus");

            navigate("/history");
        } catch (error) {
            console.error("Gagal menghapus resep", error);
            alert("Gagal menghapus resep");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className={styles.historyCard}>

            {/* LEFT */}
            <div className={styles.cardLeft}>
                <img
                    src={
                        recipe?.gambar
                            ? recipe.gambar
                            : "https://via.placeholder.com/300"
                    }
                    alt={recipe?.nama}
                    className={styles.recipeImage}
                />
            </div>

            {/* MIDDLE */}
            <div className={styles.cardMiddle}>
                <h3 className={styles.recipeTitle}>
                    {recipe.nama}
                </h3>

                <p className={styles.recipeDesc}>
                    {recipe.deskripsi}
                </p>

                <div className={styles.cardInfo}>
                    <img src={timeIcon} alt="Time" />
                    <span>Dikirim: {formatDate(recipe.created_at)}</span>
                </div>

                <div className={styles.rejectReason}>
                    Alasan penolakan: Foto kurang jelas dan langkah resep belum lengkap.
                </div>
            </div>

            {/* RIGHT */}
            <div className={styles.cardRight}>
                <div className={`${styles.statusBadge} ${styles.rejected}`}>
                    <img src={failIcon} alt="Status Ditolak" className={styles.failIcon} />
                    <span>Ditolak</span>
                </div>

                <div className={styles.buttonGroupVertical}>
                    <button className={styles.dangerBtn} onClick={handleDelete}>
                        Hapus
                    </button>
                    <button
                        className={styles.secondaryBtn}
                        onClick={() => navigate("/edit-recipes")}
                    >
                        Perbaiki
                    </button>
                </div>
            </div>

        </div>
    );
}

export default RejectedCard;