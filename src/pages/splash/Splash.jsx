import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
    setTimeout(() => {
        navigate("/login");
        }, 2000);
    }, []);

    return <h1>Welcome to Kala Rasa</h1>;
    }

export default Splash;