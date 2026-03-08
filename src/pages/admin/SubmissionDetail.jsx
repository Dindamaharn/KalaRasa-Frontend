import AsideAdmin from "../../components/layout/Aside";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./submissiondetail.css";
import { useState, useEffect } from "react";
import RejectReason from "../../components/modal/ReasonRejection";
import UploadConfirm from "../../components/modal/UploadConfirm";
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

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/admin/recipe/${id}`);
      const data = res.data.data;

      setRecipe(data);

      // parsing langkah dari deskripsi
      if (data.deskripsi && data.deskripsi.includes("Langkah-langkah:")) {
        const parts = data.deskripsi.split("Langkah-langkah:");

        const stepList = parts[1]
          ?.trim()
          .split("\n")
          .map((s) => s.replace(/^\d+\.\s*/, ""));

        setSteps(stepList);
      }

    } catch (err) {
      console.log(err);
    }
  };

  if (!recipe) {
    return (
      <div className="admin-layout">
        <AsideAdmin />
        <main className="admin-content">
          <p>Loading recipe detail...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">

      <AsideAdmin />

      <main className="admin-content">

        <div className="submission-wrapper">

          <Link to="/admin/submissions" className="back-btn">
            <img src={backIcon} alt="Back" />
          </Link>

          <div className="submission-card">

            <img
              src={
                recipe.gambar
                  ? `http://127.0.0.1:8000/storage/${recipe.gambar}`
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

              <ul>
                {recipe.ingredients?.map((item) => (
                  <li key={item.id}>
                    {item.pivot.jumlah} {item.pivot.satuan} {item.nama}
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

            {/* ACTION */}
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

          </div>

        </div>

        <footer className="admin-footer">
          © 2026 Kala Rasa — Admin
        </footer>

      </main>

      {/* MODAL REJECT */}
      <RejectReason
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onSubmit={async (reason) => {
          try {
            await api.patch(`/admin/recipe/${id}/reject`, {
              rejection_reason: reason
            });

            navigate("/admin/submissions");

          } catch (err) {
            console.log(err.response.data);
          }
        }}
      />

      {/* MODAL APPROVE */}
      <UploadConfirm
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={async () => {
          try {

            await api.patch(`/admin/recipe/${id}/approve`);

            navigate("/admin/submissions");

          } catch (err) {
            console.log(err);
          }
        }}
      />

    </div>
  );
}

export default SubmissionDetail;