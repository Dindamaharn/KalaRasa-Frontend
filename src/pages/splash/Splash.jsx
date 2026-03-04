import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./splash.css";
import logo from "../../assets/images/logo-splash.png";

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
        navigate("/login");
        }, 2500); 
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
        <img src={logo} alt="KalaRasa Logo" className="splash-logo" />
        </div>
    );
}

export default SplashScreen;