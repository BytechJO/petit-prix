import React, { useState } from "react";

const backgroundImage = "/assets/workbook/unit4/page29/1.svg";
const backgroundImage2 = "/assets/workbook/unit4/page29/2.svg";

import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../../unit1/interactive";

const circle = '/assets/workbook/unit4/page29/a-1.svg';
const banana = '/assets/workbook/unit4/page29/a-2.svg';
const pcase = '/assets/workbook/unit4/page29/a-3.svg';
const books = '/assets/workbook/unit4/page29/a-4.svg';

const cat = '/assets/workbook/unit4/page29/b-1.svg';
const table = '/assets/workbook/unit4/page29/b-2.svg';
const ruler = '/assets/workbook/unit4/page29/b-3.svg';

const Q5 = () => {
    const [foundItems, setFoundItems] = useState([false, false, false, false]);
    const [recentlyFound, setRecentlyFound] = useState(null);
    const [checkResult, setCheckResult] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const Items = [
        {
            index: 0,
            top: "65%",
            left: "4.5%",
            width: "9%",
            height: "14%",
            image: circle,
            "aria-label": "Restaurant area 1",
        },
        {
            index: 1,
            top: "30%",
            left: "6.5%",
            width: "15%",
            height: "18%",
            image: banana,
            "aria-label": "Restaurant area 2",
        },
        {
            index: 2,
            top: "32.5%",
            left: "30.3%",
            width: "10%",
            height: "17%",
            image: pcase,
            "aria-label": "Restaurant area 3",
        },
        {
            index: 3,
            top: "61%",
            left: "-3%",
            width: "8%",
            height: "26%",
            image: books,
            "aria-label": "Restaurant area 4",
        },
        {
            index: 4,
            top: "52%",
            left: "20%",
            width: "25%",
            height: "30%",
            image: cat,
            "aria-label": "Restaurant area 1",
        },

        {
            index: 5,
            top: "16%",
            left: "59%",
            width: "50%",
            height: "80%",
            image: table,
            "aria-label": "Restaurant area 2",
        },
    ];


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
                    : correctCount >= 1 && correctCount < 4
                        ? "red"
                        : undefined;


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
        setFoundItems([false, false, false, false]);
        setRecentlyFound(null);
        setCheckResult(null);
        setShowAnswer(false);
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setFoundItems([true, true, true, true]);
        setCheckResult("success");
    };

    return (
        <div>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                    position: "relative",
                    display: "flex",
                    gap: "10%",
                    marginTop : "5%",
                    marginLeft : "15%",
                    justifyContent: "center",
                    alignItems: "center"
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

                    <InteractivePage
                        items={Items}
                        foundItems={foundItems}
                        recentlyFound={recentlyFound}
                        onItemClick={handleItemClick}
                    />
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