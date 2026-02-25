import "./detailRecipes.css";
import { useNavigate } from "react-router-dom";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import starIcon from "../../assets/icons/star.svg";
import timeIcon from "../../assets/icons/time.svg";
import locationIcon from "../../assets/icons/location.svg";
import backIcon from "../../assets/icons/back.svg";

const DetailRecipes = () => {
    const navigate = useNavigate();
    return (
        <div className="detail-container">

            {/* IMAGE SECTION */}
            <div className="detail-image-wrapper">
                <img
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                    alt="Recipe"
                    className="detail-image"
                />

                <button className="back-button" onClick={() => navigate(-1)}>
                    <img src={backIcon} alt="Back" />
                </button>

                <button className="bookmark-button">
                    <img src={bookmarkIcon} alt="Bookmark" />
                </button>
            </div>

            {/* CONTENT */}
            <div className="detail-content">

                <h1 className="recipe-title">Tumis Sayur</h1>
                <p className="recipe-subtitle">
                    Menu sehat untuk makan siang keluarga
                </p>

                <div className="recipe-meta">
                    <div className="meta-item">
                        <img src={starIcon} alt="Star" />
                        <span>4/5</span>
                    </div>

                    <div className="meta-item">
                        <img src={timeIcon} alt="Time" />
                        <span>15 menit</span>
                    </div>

                    <div className="meta-item">
                        <img src={locationIcon} alt="Location" />
                        <span>Bali</span>
                    </div>
                </div>

                {/* BAHAN */}
                <div className="detail-card">
                    <h3>Bahan - bahan</h3>
                    <ul>
                        <li>3 ikat daun pakis</li>
                        <li>3 siung bawang putih</li>
                        <li>4 siung bawang merah</li>
                        <li>4 buah cabe kriting merah</li>
                        <li>4 buah cabe rawit merah</li>
                        <li>Secukupnya gula, garam dan kaldu jamur</li>
                    </ul>
                </div>

                {/* CARA MEMBUAT */}
                <div className="detail-card">
                    <h3>Cara Membuat</h3>

                    <div className="step">
                        <div className="step-number">1</div>
                        <p>
                            Cuci bersih daun pakis tiriskan, iris bawang dan cabe.
                            Tumis bawang sampai layu.
                        </p>
                    </div>

                    <div className="step">
                        <div className="step-number">2</div>
                        <p>
                            Masukkan irisan cabe lalu daun pakis.
                            Tambahkan gula, garam dan kaldu jamur.
                        </p>
                    </div>

                    <div className="step">
                        <div className="step-number">3</div>
                        <p>
                            Aduk rata hingga matang. Koreksi rasa dan sajikan.
                        </p>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="detail-buttons">
                    <button className="rate-button">
                        Beri Penilaian
                    </button>

                    <button className="cart-button">
                        Tambah ke Daftar Belanja
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DetailRecipes;