import { useNavigate } from "react-router-dom";
import styles from "./approvedCard.module.css";
import timeIcon from "../../assets/icons/time.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import successIcon from "../../assets/icons/succced.svg";

function ApprovedCard({ recipe }) {
    const navigate = useNavigate();

    return (
        <div className={styles.historyCard}>

            <div className={styles.cardLeft}>
                <img
                    src={
                        recipe.gambar
                            ? `http://localhost:8000/storage/${recipe.gambar}`
                            : "https://via.placeholder.com/300"
                    }
                    alt={recipe.nama}
                    className={styles.recipeImage}
                />
            </div>

            <div className={styles.cardMiddle}>
                <h3 className={styles.recipeTitle}>
                    {recipe.nama}
                </h3>

                <p className={styles.recipeDesc}>
                    {recipe.deskripsi}
                </p>

                <div className={styles.cardInfoRow}>
                    <div className={styles.cardInfo}>
                        <img src={timeIcon} alt="Time" />
                        <span>Dikirim: {recipe.created_at}</span>
                    </div>

                    <div className={styles.cardInfo}>
                        <img src={bookmarkIcon} alt="Bookmark" />
                        <span>245 Markah</span>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryBtn}
                        onClick={() => navigate("/detail-wait")}
                    >
                        Lihat Detail
                    </button>

                    <button
                        className={styles.secondaryBtn}
                        onClick={() => navigate("/edit-recipe")}
                    >
                        Perbarui Resep
                    </button>
                </div>
            </div>

            <div className={styles.cardRight}>
                <div className={`${styles.statusBadge} ${styles.approved}`}>
                    <img src={successIcon} alt="Status Disetujui" className={styles.successIcon} />
                    <span>Disetujui</span>
                </div>

                <button className={styles.dangerBtn}>
                    Hapus
                </button>
            </div>

        </div>
    );
}

export default ApprovedCard;