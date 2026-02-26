import "./home.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

import bookmarkIcon from "../../assets/icons/bookmark.svg";
import starIcon from "../../assets/icons/star.svg";
import heroImage from "../../assets/images/hero.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">

        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-left">
            <h1>
              Kelola kebutuhan dapur <br />
              dengan lebih terencana
            </h1>

            <p>
              Atur resep, daftar belanja, dan pengeluaran rumah tangga dalam satu aplikasi yang mudah digunakan.
            </p>

            <div className="hero-buttons">
              <Link to="/recipes" className="btn-primary">
                Cari Resep
              </Link>

              <Link to="/shopping" className="btn-secondary">
                Buka Daftar Belanja
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <img src={heroImage} alt="Hero" />
          </div>
        </section>

        {/* PALING BANYAK DILIHAT */}
        <section className="home-section">
          <div className="section-header">
            <h2>Paling Banyak Dilihat</h2>
            <div className="section-line"></div>
          </div>

          <div className="recipes-grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="recipe-card" key={item}>

                <img
                  src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                  alt="Recipe"
                  className="recipe-image"
                />

                <div className="recipe-body">
                  <div className="recipe-header">
                    <h4>Tumis Sayur</h4>
                    <img src={bookmarkIcon} alt="Bookmark" className="bookmark-icon" />
                  </div>

                  <p className="recipe-desc">
                    Menu sehat untuk makan siang keluarga
                  </p>

                  <div className="recipe-footer">
                    <div className="rating">
                      <img src={starIcon} alt="Star" />
                      <span>4/5</span>
                    </div>

                    <Link to="/detail-recipes" className="detail-button">
                      Detail
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* PENILAIAN TERATAS */}
        <section className="home-section">
          <div className="section-header">
            <h2>Penilaian Teratas Minggu Ini</h2>
            <div className="section-line"></div>
          </div>

          <div className="recipes-grid">
            {[1, 2, 3, 4].map((item, index) => (
              <div className="recipe-card ranking-card" key={item}>

                <div className="ranking-badge">
                  {index + 1}
                </div>

                <img
                  src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                  alt="Recipe"
                  className="recipe-image"
                />

                <div className="recipe-body">
                  <div className="recipe-header">
                    <h4>Tumis Sayur</h4>
                    <img src={bookmarkIcon} alt="Bookmark" className="bookmark-icon" />
                  </div>

                  <p className="recipe-desc">
                    Menu sehat untuk makan siang keluarga
                  </p>

                  <div className="recipe-footer">
                    <div className="rating">
                      <img src={starIcon} alt="Star" />
                      <span>4/5</span>
                    </div>

                    <Link to="/detail-recipes" className="detail-button">
                      Detail
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;