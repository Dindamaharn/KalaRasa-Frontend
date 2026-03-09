import { useState, useEffect } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

import bookmarkIcon from "../../assets/icons/bookmark.svg";
import starIcon from "../../assets/icons/star.svg";

import heroImage from "../../assets/images/hero.jpg";
import heroImage2 from "../../assets/images/hero1.png";
import sliderIcon from "../../assets/icons/slider.svg";

import seafoodImg from "../../assets/images/seafood.png";
import pastaImg from "../../assets/images/pasta.png";
import sayurImg from "../../assets/images/sayur.png";
import minumanImg from "../../assets/images/minuman.png";
import mieImg from "../../assets/images/mie.png";
import jajananImg from "../../assets/images/jajanan.png";
import ikanImg from "../../assets/images/ikanpg.png";
import dagingImg from "../../assets/images/daging.png";
import ayamImg from "../../assets/images/ayam.png";
import Footer from "../../components/layout/Footer";

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Kelola kebutuhan dapur dengan lebih terencana",
      desc: "Atur resep, daftar belanja, dan pengeluaran rumah tangga dalam satu aplikasi yang mudah digunakan.",
      image: heroImage,
      imagePosition: "right",
      buttons: "default"
    },
    {
      title: "Bagikan Resep Andalanmu di Kala Rasa",
      desc: "Unggah resep favoritmu dan bantu pengguna lain memasak lebih mudah setiap hari.",
      image: heroImage2,
      imagePosition: "left",
      buttons: "share"
    }
  ];

  const categories = [
  { name: "Olahan Daging", image: dagingImg },
  { name: "Olahan Sayur Mayur", image: sayurImg },
  { name: "Aneka Minuman", image: minumanImg },
  { name: "Aneka Jajanan", image: jajananImg },
  { name: "Olahan Seafood", image: seafoodImg },
  { name: "Olahan Ayam & Bebek", image: ayamImg },
  { name: "Olahan Mie", image: mieImg },
  { name: "Olahan Pasta", image: pastaImg },
  { name: "Olahan Ikan", image: ikanImg },
  ];

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className={styles.homeContainer}>

        {/* HERO SECTION */}
        <section className={styles.heroSection}>

          <div
            className={styles.heroSlider}
            style={{ transform: `translateX(-${currentSlide * 50}%)` }}
          >

            {slides.map((slide, index) => (
              <div
                className={styles.heroSlide}
                key={index}
                style={{
                  flexDirection: slide.imagePosition === "left" ? "row-reverse" : "row"
                }}
              >

                <div className={styles.heroLeft}>
                  <h1>{slide.title}</h1>

                  <p>{slide.desc}</p>

                  <div className={styles.heroButtons}>

                    {slide.buttons === "default" && (
                      <>
                        <Link to="/recipes" className={styles.btnPrimary}>
                          Cari Resep
                        </Link>

                        <Link to="/shopping" className={styles.btnSecondary}>
                          Buka Daftar Belanja
                        </Link>
                      </>
                    )}

                    {slide.buttons === "share" && (
                      <Link to="/add-recipes" className={styles.btnSecondary}>
                        Bagikan Resep
                      </Link>
                    )}

                  </div>
                </div>

                <div className={styles.heroRight}>
                  <img src={slide.image} alt="Hero" />
                </div>

              </div>
            ))}

          </div>

          {/* INDICATOR */}
          <div className={styles.heroIndicator}>
            {slides.map((_, index) => (
              <img
                key={index}
                src={sliderIcon}
                alt="slider"
                className={`${styles.sliderDot} ${
                  currentSlide === index ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

        </section>


        {/* PALING BANYAK DILIHAT */}
        <section className={styles.homeSection}>
          <div className={styles.sectionHeader}>
            <h2>Paling Banyak Dilihat</h2>
            <div className={styles.sectionLine}></div>
          </div>

          <div className={styles.recipesGrid}>
            {[1,2,3,4].map((item) => (
              <div className={styles.recipeCard} key={item}>

                <img
                  src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                  alt="Recipe"
                  className={styles.recipeImage}
                />

                <div className={styles.recipeBody}>
                  <div className={styles.recipeHeader}>
                    <h4>Tumis Sayur</h4>
                    <img src={bookmarkIcon} alt="Bookmark" className={styles.bookmarkIcon}/>
                  </div>

                  <p className={styles.recipeDesc}>
                    Menu sehat untuk makan siang keluarga
                  </p>

                  <div className={styles.recipeFooter}>
                    <div className={styles.rating}>
                      <img src={starIcon} alt="Star"/>
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

          <div className={styles.categorySlider}>

            {categories.map((cat, index) => (
              <div className={styles.categoryCard} key={index}>

                <img src={cat.image} alt={cat.name} />

                <div className={styles.categoryOverlay}>
                  <span>{cat.name}</span>
                </div>

              </div>
            ))}

          </div>

        </section>

      </div>
      <Footer />
    </>
  );
};

export default Home;