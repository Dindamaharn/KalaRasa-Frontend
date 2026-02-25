import { useEffect, useRef, useState } from "react";
import "./historyTabs.css";

function HistoryTabs({ activeTab, setActiveTab }) {
    const tabs = ["Menunggu", "Disetujui", "Ditolak"];
    const containerRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});

    useEffect(() => {
        const activeIndex = tabs.indexOf(activeTab);
        const container = containerRef.current;
        const activeButton = container.children[activeIndex];

        setIndicatorStyle({
            width: activeButton.offsetWidth,
            left: activeButton.offsetLeft,
        });
    }, [activeTab]);

    return (
        <div className="history-tabs-wrapper">
            <div className="history-tabs" ref={containerRef}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`history-tab ${activeTab === tab ? "active" : ""
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}

                <span
                    className="tab-indicator"
                    style={indicatorStyle}
                />
            </div>
        </div>
    );
}

export default HistoryTabs;