import AsideAdmin from "../../components/layout/Aside";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./submissiondetail.css";
import { useState, useEffect } from "react";
import RejectReason from "../../components/modal/ReasonRejection";
import UploadConfirm from "../../components/modal/UploadConfirm";
import Loading from "../../components/modal/Loading";
import backIcon from "../../assets/icons/back.svg";
import timeIcon from "../../assets/icons/time.svg";
import locationIcon from "../../assets/icons/location.svg";
import api from "../../services/api";

function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState([]);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/admin/recipe/${id}`);
      const data = res.data.data;

      setRecipe(data);

      // parsing langkah dari API
      if (data.langkah_langkah) {
        const parsedSteps =
          typeof data.langkah_langkah === "string"
            ? JSON.parse(data.langkah_langkah)
            : data.langkah_langkah;

        setSteps(parsedSteps);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // FUNCTION FORMAT BAHAN
  const formatIngredient = (item) => {
    const jumlah = parseFloat(item.pivot.jumlah);

    const jumlahFormatted = Number.isInteger(jumlah)
      ? jumlah
      : jumlah.toFixed(1);

    const nama = item.nama.toLowerCase();

    return `${jumlahFormatted} ${item.pivot.satuan} ${nama}`;
  };

  const handleReject = async (reason) => {
    try {
      setLoading(true);
      await api.patch(`/admin/recipe/${id}/reject`, {
        rejection_reason: reason,
      });
      navigate("/admin/submissions");
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      await api.patch(`/admin/recipe/${id}/approve`);
      navigate("/admin/submissions");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* LOADING MODAL */}
      <Loading isOpen={loading} />

      <div className="admin-layout">
        <AsideAdmin />

        <main className="admin-content">
          <div className="submission-wrapper">

            <Link to="/admin/submissions" className="back-btn">
              <img src={backIcon} alt="Back" />
            </Link>

            {recipe && (
              <div className="submission-card">

                <img
                  src={
                    recipe.gambar
                      ? recipe.gambar.startsWith("http")
                        ? recipe.gambar
                        : `http://127.0.0.1:8000/storage/${recipe.gambar}`
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={recipe.nama}
                  className="recipe-image-admin"
                />

                <div className="recipe-info">
                  <h2>{recipe.nama}</h2>
                  <p className="recipe-desc">{recipe.deskripsi}</p>

                  <div className="recipe-meta">
                    <span>
                      <img src={timeIcon} alt="Waktu" className="meta-icon" />
                      {recipe.waktu_masak} menit
                    </span>

                    <span>
                      <img src={locationIcon} alt="Lokasi" className="meta-icon" />
                      {recipe.region}
                    </span>
                  </div>
                </div>

                {/* BAHAN */}
                <div className="section-card">
                  <h3>Bahan - bahan</h3>

                  <ul className="ingredient-list">
                    {recipe.ingredients?.map((item) => (
                      <li key={item.id}>
                        {formatIngredient(item)}
                      </li>
                    ))}
                  </ul>

                </div>

                {/* LANGKAH */}
                <div className="section-card">
                  <h3>Cara Membuat</h3>

                  {steps.map((step, index) => (
                    <div className="step" key={index}>
                      <span className="step-number">{index + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}

                </div>

                {/* ACTION (Hanya muncul jika status pending) */}
                {recipe.status === "pending" && (
                  <div className="submission-actions">

                    <button
                      className="btn-reject"
                      onClick={() => setShowRejectModal(true)}
                    >
                      Tolak Pengajuan
                    </button>

                    <button
                      className="btn-approve"
                      onClick={() => setShowApproveModal(true)}
                    >
                      Setujui Pengajuan
                    </button>

                  </div>
                )}

              </div>
            )}
          </div>

          <footer className="admin-footer">
            © 2026 Kala Rasa — Admin
          </footer>
        </main>

        {/* MODAL REJECT */}
        <RejectReason
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          onSubmit={handleReject}
        />

        {/* MODAL APPROVE */}
        <UploadConfirm
          isOpen={showApproveModal}
          onClose={() => setShowApproveModal(false)}
          onConfirm={handleApprove}
        />
      </div>
    </>
  );
}

export default SubmissionDetail;