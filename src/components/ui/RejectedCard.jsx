import { useNavigate } from "react-router-dom";
import styles from "./rejectedCard.module.css";
import failIcon from "../../assets/icons/fail.svg";
import timeIcon from "../../assets/icons/time.svg";

function RejectedCard({ recipe }) {
    const navigate = useNavigate();

    return (
        <div className={styles.historyCard}>

            {/* LEFT */}
            <div className={styles.cardLeft}>
                <img
                    src={
                        recipe.gambar
                            ? `http://localhost:8000/storage/${recipe.gambar}`
                            : "https://via.placeholder.com/300"
                    }
                    alt={recipe.nama}
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
                    <span>Dikirim: {recipe.created_at}</span>
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
                    <button className={styles.dangerBtn}>
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