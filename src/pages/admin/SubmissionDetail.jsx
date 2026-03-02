import AsideAdmin from "../../components/layout/Aside";
import { Link, useNavigate } from "react-router-dom";
import "./submissiondetail.css";
import { useState } from "react";
import RejectReason from "../../components/modal/ReasonRejection";
import UploadConfirm from "../../components/modal/UploadConfirm";
import backIcon from "../../assets/icons/back.svg";
import timeIcon from "../../assets/icons/time.svg";
import locationIcon from "../../assets/icons/location.svg";

function SubmissionDetail() {
  const recipe = {
    nama: "Tumis Sayur",
    desc: "Menu sehat untuk makan siang keluarga",
    waktu: "15 menit",
    lokasi: "Bali",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  };
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="admin-layout">
      <AsideAdmin />

      <main className="admin-content">
        <div className="submission-wrapper">

          {/* BACK BUTTON (di atas card) */}
          <Link to="/admin/submissions" className="back-btn">
            <img src={backIcon} alt="Back" />
          </Link>

          {/* CARD */}
          <div className="submission-card">

            {/* IMAGE */}
            <img
              src={recipe.image}
              alt={recipe.nama}
              className="recipe-image-admin"
            />

            {/* INFO */}
            <div className="recipe-info">
              <h2>{recipe.nama}</h2>
              <p className="recipe-desc">{recipe.desc}</p>

              <div className="recipe-meta">
                <span>
                  <img src={timeIcon} alt="Waktu" className="meta-icon" />
                  {recipe.waktu}
                </span>

                <span>
                  <img src={locationIcon} alt="Lokasi" className="meta-icon" />
                  {recipe.lokasi}
                </span>
              </div>
            </div>

            {/* BAHAN */}
            <div className="section-card">
              <h3>Bahan - bahan</h3>
              <ul>
                <li>3 ikat daun pakis</li>
                <li>3 siung bawang putih</li>
                <li>4 siung bawang merah</li>
                <li>4 buah cabe keriting merah</li>
                <li>4 buah cabe rawit merah</li>
                <li>Secukupnya gula, garam, dan kaldu jamur</li>
              </ul>
            </div>

            {/* CARA MEMBUAT */}
            <div className="section-card">
              <h3>Cara Membuat</h3>

              {[ 
                "Cuci bersih daun pakis tiriskan, iris bawang dan cabe. Kemudian tumis bawang sampai layu.",
                "Masukkan irisan cabe. Setelah cabe layu masukkan daun pakis dan aduk rata.",
                "Aduk hingga matang, koreksi rasa lalu sajikan."
              ].map((step, index) => (
                <div className="step" key={index}>
                  <span className="step-number">{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            {/* ACTION BUTTON */}
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
          © 2025 Kala Rasa — Admin
        </footer>


      </main>
        <RejectReason
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          onSubmit={(reason) => {
            console.log("Alasan:", reason);
            setShowRejectModal(false);
          }}
        />

        <UploadConfirm
          isOpen={showApproveModal}
          onClose={() => setShowApproveModal(false)}
          onConfirm={() => {
            console.log("Disetujui!");
            setShowApproveModal(false);
            navigate("/admin/submissions");
          }}
        />
    </div>
  );
}

export default SubmissionDetail;