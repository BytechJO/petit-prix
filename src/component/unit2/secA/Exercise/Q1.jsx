import React, { useState } from "react";

const backgroundImage = "/assets/unit2/secA/page16/cover.png";

import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../../unit1/interactive";

const bear = "/assets/unit2/secA/page16/bear.svg";
const clock = "/assets/unit2/secA/page16/clock.svg";
const comb = "/assets/unit2/secA/page16/comb.webp";
const pen = "/assets/unit2/secA/page16/pen.svg";

const Q1 = () => {
  const [foundItems, setFoundItems] = useState([false, false, false, false]);
  const [recentlyFound, setRecentlyFound] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const Items = [
    {
      index: 0,
      top: "45.5%",
      left: "81.6%",
      width: "10%",
      height: "20%",
      image: bear,
      "aria-label": "Restaurant area 1",
    },
    {
      index: 1,
      top: "22.8%",
      left: "30%",
      width: "10%",
      height: "10%",
      image: clock,
      "aria-label": "Restaurant area 2",
    },
    {
      index: 2,
      top: "47.5%",
      left: "32.5%",
      width: "15%",
      height: "10%",
      image: comb,
      "aria-label": "Restaurant area 3",
    },
    {
      index: 3,
      top: "52%",
      left: "58.8%",
      width: "7%",
      height: "7%",
      image: pen,
      "aria-label": "Restaurant area 4",
    }
  ];

  const iconCustomStyles = [
    { top: '83%', left: '29.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '83%', left: '12%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '83%', left: '3.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '83%', left: '20.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' }
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
      ValidationAlert.success("Bravo!", scoreMessage);
    } else if (correctCount === 0) {
      setCheckResult("fail");
      ValidationAlert.warning("Oups !", "Trouvez tous les objets");
    } else {
      ValidationAlert.error("Continue!", scoreMessage);
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
        <div style={{ position: "relative" }}>
          <img
            src={backgroundImage}
            alt="interactive"
            style={{ width: "auto", height: "70vh", display: "block" }}
          />

          <InteractivePage
            items={Items}
            foundItems={foundItems}
            recentlyFound={recentlyFound}
            onItemClick={handleItemClick}
            iconStyles={iconCustomStyles} // ✨ تمرير التنسيقات المخصصة هنا
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

export default Q1;