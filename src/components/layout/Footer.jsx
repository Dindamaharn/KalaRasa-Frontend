import styles from "./footer.module.css";
import { Link } from "react-router-dom";

import tiktokIcon from "../../assets/icons/tiktok.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import emailIcon from "../../assets/icons/email.svg";

const Footer = () => {
    return (
        <footer className={styles.footer}>

        <div className={styles.footerContainer}>

            {/* ALAMAT */}
            <div className={styles.footerColumn}>
            <h4>Alamat</h4>

            <p>
                PT. JAWAPOS MEDIA TELEVISI <br/>
                Gedung JTV, Kompleks Graha <br/>
                Pena Jl. Ahmad Yani 88 <br/>
                Surabaya
            </p>
            </div>


            {/* KONTAK */}
            <div className={styles.footerColumn}>
            <h4>Kontak</h4>

            <div className={styles.socialIcons}>

                <a href="#">
                <img src={emailIcon} alt="Email"/>
                </a>

                <a href="#">
                <img src={facebookIcon} alt="Facebook"/>
                </a>

                <a href="#">
                <img src={tiktokIcon} alt="Tiktok"/>
                </a>

                <a href="#">
                <img src={youtubeIcon} alt="Youtube"/>
                </a>

                <a href="#">
                <img src={instagramIcon} alt="Instagram"/>
                </a>

            </div>
            </div>


            {/* QUICK LINKS */}
            <div className={styles.footerColumn}>
            <h4>Quick Links</h4>

            <div className={styles.footerLinks}>
                <Link to="/home">Beranda</Link>
                <Link to="/recipes">Resep</Link>
                <Link to="/shopping">Daftar Belanja</Link>
                <Link to="/profile">Profil</Link>
            </div>
            </div>

        </div>


        {/* COPYRIGHT */}
        <div className={styles.footerBottom}>
            © 2026 Kala Rasa. All rights reserved.
        </div>

        </footer>
    );
};

export default Footer;