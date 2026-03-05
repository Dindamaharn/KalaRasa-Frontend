import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./splash.css";
import logo from "../../assets/images/logo-splash.png";

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem("access_token");
            const user = JSON.parse(localStorage.getItem("user"));

            if (token && user) {
                if (user.role?.name === "admin") {
                    navigate("/admin/home");
                } else {
                    navigate("/home");
                }
            } else {
                navigate("/login");
            }
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