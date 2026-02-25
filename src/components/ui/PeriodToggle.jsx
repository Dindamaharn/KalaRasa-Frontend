import { useEffect, useRef, useState } from "react";
import "./periodToggle.css";

function PeriodToggle({ value, onChange }) {
    const options = ["Minggu", "Bulan", "Tahun"];
    const containerRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});

    useEffect(() => {
        const activeIndex = options.indexOf(value);
        const container = containerRef.current;
        const activeButton = container.children[activeIndex];

        setIndicatorStyle({
            width: activeButton.offsetWidth,
            left: activeButton.offsetLeft,
        });
    }, [value]);

    return (
        <div className="period-toggle" ref={containerRef}>
            {options.map((item) => (
                <button
                    key={item}
                    className={`period-btn ${value === item ? "active" : ""}`}
                    onClick={() => onChange(item)}
                >
                    {item}
                </button>
            ))}

            <span
                className="period-indicator"
                style={indicatorStyle}
            />
        </div>
    );
}

export default PeriodToggle;