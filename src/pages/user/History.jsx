import Navbar from "../../components/layout/Navbar";
import "./history.css";
import emptyIcon from "../../assets/icons/Empty History.svg";
import backIcon from "../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api"
import HistoryTabs from "../../components/ui/HistoryTabs";
import WaitingCard from "../../components/ui/WaitingCard";
import ApprovedCard from "../../components/ui/ApprovedCard";
import RejectedCard from "../../components/ui/RejectedCard";

function RiwayatUser() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Menunggu");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await api.get("/recipe/recipes/my");

            setHistory(response.data.data);

        } catch (error) {
            console.error("Gagal mengambil riwayat:", error);
        } finally {
            setLoading(false);
        }
    };

    const waitingRecipes = history.filter(
        (recipe) => recipe.status === "pending"
    );

    const approvedRecipes = history.filter(
        (recipe) => recipe.status === "approved"
    );

    const rejectedRecipes = history.filter(
        (recipe) => recipe.status === "rejected"
    );

    return (
        <>
            <Navbar />

            <div className="riwayat-page">

                {/* SEARCH SECTION */}
                <div className="riwayat-search">
                    <button
                        className="back-box"
                        onClick={() => navigate(-1)}
                    >
                        <img src={backIcon} alt="Back" />
                    </button>

                    <input
                        type="text"
                        placeholder="Cari resep berdasarkan nama makanan"
                        className="search-input"
                    />

                    <button className="search-button">
                        Cari
                    </button>
                </div>

                <div>
                    <HistoryTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    {activeTab === "Menunggu" &&
                        waitingRecipes.map((recipe) => (
                            <WaitingCard key={recipe.id} recipe={recipe} />
                        ))}

                    {activeTab === "Disetujui" &&
                        approvedRecipes.map((recipe) => (
                            <ApprovedCard key={recipe.id} recipe={recipe} />
                        ))}

                    {activeTab === "Ditolak" &&
                        rejectedRecipes.map((recipe) => (
                            <RejectedCard key={recipe.id} recipe={recipe} />
                        ))}
                </div>

                {/* CONTENT */}
                {!loading && history.length === 0 && (
                    <div className="empty-container">
                        <img
                            src={emptyIcon}
                            alt="Empty"
                            className="empty-icon"
                        />

                        <h3>Belum Ada Riwayat</h3>
                        <p>Anda belum pernah membagikan resep.</p>
                    </div>
                )}

            </div>
        </>
    );
}

export default RiwayatUser;