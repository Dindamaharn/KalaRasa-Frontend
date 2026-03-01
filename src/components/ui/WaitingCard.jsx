import { useNavigate } from "react-router-dom";
import styles from "./waitingCard.module.css";
import waitIcon from "../../assets/icons/wait.svg";
import timeIcon from "../../assets/icons/time.svg";

function WaitingCard() {
    const navigate = useNavigate();

    return (
        <div className={styles.historyCard}>

            <div className={styles.cardLeft}>
                <img
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                    alt="Resep"
                />
            </div>

            <div className={styles.cardMiddle}>
                <h3 className={styles.recipeTitle}>
                    Nasi Goreng Spesial Rumahan Enak dan Praktis
                </h3>

                <p className={styles.recipeDesc}>
                    Resep nasi goreng sederhana dengan bumbu rumahan yang lezat dan mudah dibuat untuk keluarga.
                </p>

                <div className={styles.cardInfo}>
                    <img src={timeIcon} alt="Time" />
                    <span>Dikirim: 05 Februari</span>
                </div>

                <button
                    className={styles.primaryBtn}
                    onClick={() => navigate("/detail-wait")}
                >
                    Lihat Detail
                </button>
            </div>

            <div className={styles.cardRight}>
                <div className={`${styles.statusBadge} ${styles.waiting}`}>
                    <img src={waitIcon} alt="Status-waiting" className={styles.waitIcon} />
                    <span>Menunggu</span>
                </div>
            </div>

        </div>
    );
}

export default WaitingCard;