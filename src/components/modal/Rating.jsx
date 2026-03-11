import { useState } from "react";
import "./rating.css";
import starIcon from "../../assets/icons/star.svg";

function RatingModal({ isOpen, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);

    if (!isOpen) return null;

    const handleClick = (index) => {
        setRating(index);
    };

    const handleSubmit = () => {
        if (onSubmit) {
        onSubmit(rating);
        }
    };

    return (
        <div className="rating-overlay" onClick={onClose}>
        <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Bagaimana menurut Anda?</h3>

            <p>
            Berikan penilaian Anda untuk membantu meningkatkan kualitas resep dan
            layanan.
            </p>

            <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <img
                key={star}
                src={starIcon}
                alt="star"
                className={`star ${star <= rating ? "active" : ""}`}
                onClick={() => handleClick(star)}
                />
            ))}
            </div>

            <button className="rating-submit" onClick={handleSubmit}>
            Kirim Penilaian
            </button>
        </div>
        </div>
    );
}

export default RatingModal;