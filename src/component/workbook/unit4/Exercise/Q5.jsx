import React, { useState, useEffect } from "react";

const backgroundImage = "/assets/workbook/unit4/page29/1.svg";
const backgroundImage2 = "/assets/workbook/unit4/page29/2.svg";

import ValidationAlert from "../../../Popup/ValidationAlert";
import Q5Guide from "../../../shared/Q5Guide";

// يمكنك إضافة أو تعديل إحداثيات المربعات هنا
const Items = [
    {
        index: 0,
        top: "65%",
        left: "4.5%",
        width: "9%",
        height: "14%",
        "aria-label": "Area 1",
    },
    {
        index: 1,
        top: "30%",
        left: "6.5%",
        width: "15%",
        height: "18%",
        "aria-label": "Area 2",
    },
    {
        index: 2,
        top: "32.5%",
        left: "30.3%",
        width: "10%",
        height: "17%",
        "aria-label": "Area 3",
    },
    {
        index: 3,
        top: "61%",
        left: "-3%",
        width: "8%",
        height: "26%",
        "aria-label": "Area 4",
    },
    {
        index: 4,
        top: "52%",
        left: "20%",
        width: "25%",
        height: "30%",
        "aria-label": "Area 5",
    },
    {
        index: 5,
        top: "31%",
        left: "58%",
        width: "45%",
        height: "20%",
        "aria-label": "Area 6",
    },
    {
        index: 5,
        top: "64%",
        left: "60%",
        width: "4%",
        height: "15%",
        "aria-label": "Area 6",
    },
];

const Q5 = () => {
    // مصفوفة الحالة لتتبع أي المربعات تم الضغط عليها
    const [foundItems, setFoundItems] = useState(new Array(Items.length).fill(false));
    const [recentlyFound, setRecentlyFound] = useState(null);
    const [checkResult, setCheckResult] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showGuide, setShowGuide] = useState(true);

    const handleItemClick = (index) => {
        if (foundItems[index]) return;
        const newFoundItems = [...foundItems];
        newFoundItems[index] = true;
        setFoundItems(newFoundItems);
        setRecentlyFound(index);
    };

    const handleCheck = () => {
        if (showAnswer) return;

        const correctCount = foundItems.filter(Boolean).length;
        const totalCount = Items.length;

        const color =
            correctCount === totalCount
                ? "green"
                : correctCount === 0
                    ? "orange"
                    : "red";

        const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${totalCount}
        </span>
      </div>
    `;

        if (correctCount === totalCount) {
            setCheckResult("success");
            ValidationAlert.success(scoreMessage);
        } else if (correctCount === 0) {
            setCheckResult("fail");
            ValidationAlert.warning("Oups !", "Trouvez tous les objets");
        } else {
            ValidationAlert.error(scoreMessage);
        }
    };

    const handleStartAgain = () => {
        setFoundItems(new Array(Items.length).fill(false));
        setRecentlyFound(null);
        setCheckResult(null);
        setShowAnswer(false);
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setFoundItems(new Array(Items.length).fill(true));
        setCheckResult("success");
    };

    useEffect(() => {
        const hasSeenGuide = localStorage.getItem('q5-guide-seen');
        if (!hasSeenGuide) {
            setShowGuide(true);
        }
    }, []);

    const handleCloseGuide = () => {
        setShowGuide(false);
        localStorage.setItem('q5-guide-seen', 'true');
    };

    return (
        <div>
            {showGuide && <Q5Guide onClose={handleCloseGuide} />}
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                    position: "relative",
                    display: "flex",
                    gap: "10%",
                    marginTop: "5%",
                    marginLeft: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <img
                        src={backgroundImage}
                        alt="interactive"
                        style={{ width: "auto", height: "50vh", display: "block" }}
                    />
                    <img
                        src={backgroundImage2}
                        alt="interactive"
                        style={{ width: "auto", height: "50vh", display: "block" }}
                    />

                    {/* عرض المربعات الشفافة */}
                    {Items.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleItemClick(idx)}
                            style={{
                                position: "absolute",
                                top: item.top,
                                left: item.left,
                                width: item.width,
                                height: item.height,
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 10
                            }}
                        >
                            {/* إظهار علامة الصح إذا تم الضغط على المربع */}
                            {foundItems[idx] && (
                                <span style={{
                                    fontSize: "2rem",
                                    color: "green",
                                    fontWeight: "bold",
                                    textShadow: "1px 1px 2px white"
                                }}>
                                    ✓
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="popup-buttons">
                <button className="try-again-button" onClick={handleStartAgain}>
                    Recommencer ↻
                </button>
                <button className="show-answer-btn" onClick={handleShowAnswer}>
                    Afficher la réponse
                </button>
                <button className="check-button2" onClick={handleCheck}>
                    Vérifier la réponse ✓
                </button>
            </div>
        </div>
    );
};

export default Q5;