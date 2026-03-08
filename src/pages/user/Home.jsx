import styles from "./home.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

import bookmarkIcon from "../../assets/icons/bookmark.svg";
import starIcon from "../../assets/icons/star.svg";
import heroImage from "../../assets/images/hero.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.homeContainer}>

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroLeft}>
            <h1>
              Kelola kebutuhan dapur <br />
              dengan lebih terencana
            </h1>

            <p>
              Atur resep, daftar belanja, dan pengeluaran rumah tangga dalam satu aplikasi yang mudah digunakan.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/recipes" className={styles.btnPrimary}>
                Cari Resep
              </Link>

              <Link to="/shopping" className={styles.btnSecondary}>
                Buka Daftar Belanja
              </Link>
            </div>
          </div>

          <div className={styles.heroRight}>
            <img src={heroImage} alt="Hero" />
          </div>
        </section>

        {/* PALING BANYAK DILIHAT */}
        <section className={styles.homeSection}>
          <div className={styles.sectionHeader}>
            <h2>Paling Banyak Dilihat</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className={styles.recipesGrid}>
            {[1, 2, 3, 4].map((item) => (
              <div className={styles.recipeCard} key={item}>

                <img
                  src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                  alt="Recipe"
                  className={styles.recipeImage}
                />

                <div className={styles.recipeBody}>
                  <div className={styles.recipeHeader}>
                    <h4>Tumis Sayur</h4>
                    <img src={bookmarkIcon} alt="Bookmark" className={styles.bookmarkIcon} />
                  </div>

                  <p className={styles.recipeDesc}>
                    Menu sehat untuk makan siang keluarga
                  </p>

                  <div className={styles.recipeFooter}>
                    <div className={styles.rating}>
                      <img src={starIcon} alt="Star" />
                      <span>4/5</span>
                    </div>

                    <Link to="/detail-recipes" className={styles.detailButton}>
                      Detail
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* PENILAIAN TERATAS */}
        <section className={styles.homeSection}>
          <div className={styles.sectionHeader}>
            <h2>Penilaian Teratas Minggu Ini</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className={styles.recipesGrid}>
            {[1, 2, 3, 4].map((item, index) => (
              <div className={`${styles.recipeCard} ${styles.rankingCard}`} key={item}>

                <div className={styles.rankingBadge}>
                  {index + 1}
                </div>

                <img
                  src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                  alt="Recipe"
                  className={styles.recipeImage}
                />

                <div className={styles.recipeBody}>
                  <div className={styles.recipeHeader}>
                    <h4>Tumis Sayur</h4>
                    <img src={bookmarkIcon} alt="Bookmark" className={styles.bookmarkIcon} />
                  </div>

                  <p className={styles.recipeDesc}>
                    Menu sehat untuk makan siang keluarga
                  </p>

                  <div className={styles.recipeFooter}>
                    <div className={styles.rating}>
                      <img src={starIcon} alt="Star" />
                      <span>4/5</span>
                    </div>

                    <Link to="/detail-recipes" className={styles.detailButton}>
                      Detail
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ANEKA RESEP MASAKAN */}
        <section className={styles.homeSection}>
          <div className={styles.sectionHeader}>
            <h2>Aneka Resep Masakan</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className={styles.recipesGrid}>
            {[1, 2, 3, 4].map((item) => (
              <div className={styles.recipeCard} key={item}>

                <img
                  src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                  alt="Recipe"
                  className={styles.recipeImage}
                />

                <div className={styles.recipeBody}>
                  <div className={styles.recipeHeader}>
                    <h4>Tumis Sayur</h4>
                    <img src={bookmarkIcon} alt="Bookmark" className={styles.bookmarkIcon} />
                  </div>

                  <p className={styles.recipeDesc}>
                    Menu sehat untuk makan siang keluarga
                  </p>

                  <div className={styles.recipeFooter}>
                    <div className={styles.rating}>
                      <img src={starIcon} alt="Star" />
                      <span>4/5</span>
                    </div>

                    <Link to="/detail-recipes" className={styles.detailButton}>
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