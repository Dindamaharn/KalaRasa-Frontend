import { useNavigate } from "react-router-dom";
import styles from "./waitingCard.module.css";
import waitIcon from "../../assets/icons/wait.svg";
import timeIcon from "../../assets/icons/time.svg";

function WaitingCard({ recipe }) {
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
                />
            </div>

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