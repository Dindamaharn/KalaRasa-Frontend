import { useNavigate } from "react-router-dom";
import styles from "./approvedCard.module.css";
import timeIcon from "../../assets/icons/time.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import successIcon from "../../assets/icons/succced.svg";
import coinIcon from "../../assets/images/coin.png";
import api from "../../services/api";

function ApprovedCard({ recipe }) {
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
                        <span>Dikirim: {formatDate(recipe.created_at)}</span>
                    </div>

                    <div className={styles.cardInfo}>
                        <img src={bookmarkIcon} alt="Bookmark" />
                        <span>{recipe.bookmarked_by_users_count ?? 0} Markah</span>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryBtn}
                        onClick={() => navigate(`/recipes/${recipe.id}`)}
                    >
                        Lihat Detail
                    </button>

                    <button
                        className={styles.secondaryBtn}
                        onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                    >
                        Perbarui Resep
                    </button>
                </div>
            </div>

            <div className={styles.cardRight}>
                <div className={styles.badgeRow}>

                    <div className={styles.coinBadge}>
                        <img src={coinIcon} alt="coin" />
                        <span>+10</span>
                    </div>

                    <div className={`${styles.statusBadge} ${styles.approved}`}>
                        <img src={successIcon} alt="Status Disetujui" className={styles.successIcon} />
                        <span>Disetujui</span>
                    </div>

                </div>

                <button className={styles.dangerBtn} onClick={handleDelete}>
                    Hapus
                </button>
            </div>

        </div>
    );
}

export default ApprovedCard;