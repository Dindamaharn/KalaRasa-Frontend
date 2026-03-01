import { useNavigate } from "react-router-dom";
import styles from "./approvedCard.module.css";
import timeIcon from "../../assets/icons/time.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import successIcon from "../../assets/icons/succced.svg";

function ApprovedCard() {
    const navigate = useNavigate();

    return (
        <div className={styles.historyCard}>

            <div className={styles.cardLeft}>
                <img
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                    alt="Resep"
                    className={styles.recipeImage}
                />
            </div>

            <div className={styles.cardMiddle}>
                <h3 className={styles.recipeTitle}>
                    Ayam Bakar Teflon Empuk dan Bumbu Meresap
                </h3>

                <p className={styles.recipeDesc}>
                    Resep ayam bakar teflon dengan bumbu khas yang meresap sempurna dan mudah dibuat.
                </p>

                <div className={styles.cardInfoRow}>
                    <div className={styles.cardInfo}>
                        <img src={timeIcon} alt="Time" />
                        <span>Dikirim: 05 Februari</span>
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