import React, { useState } from "react";

const backgroundImage = "/assets/unit4/secA/page41/cover.png";

import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../../unit1/interactive";

const img1 = "/assets/unit4/secA/page41/01.svg";
const img2 = "/assets/unit4/secA/page41/02.svg";
const img3 = "/assets/unit4/secA/page41/03.svg";
const img4 = "/assets/unit4/secA/page41/04.svg";
const img5 = "/assets/unit4/secA/page41/05.svg";


const Q10 = () => {
  const [foundItems, setFoundItems] = useState([false, false, false, false]);
  const [recentlyFound, setRecentlyFound] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const Items = [
    {
      index: 0,
      top: "59%",
      left: "17%",
      width: "30%",
      height: "35%",
      image: img1,
      "aria-label": "Restaurant area 1",
    },
    {
      index: 2,
      top: "65%",
      left: "56.7%",
      width: "30%",
      height: "35%",
      image: img2,
      "aria-label": "Restaurant area 3",
    },
    {
      index: 2,
      top: "48%",
      left: "71.5%",
      width: "30%",
      height: "35%",
      image: img3,
      "aria-label": "Restaurant area 3",
    },
    {
      index: 2,
      top: "32%",
      left: "18.5%",
      width: "28%",
      height: "35%",
      image: img4,
      "aria-label": "Restaurant area 3",
    },
    {
      index: 2,
      top: "28.5%",
      left: "28%",
      width: "25%",
      height: "45%",
      image: img5,
      "aria-label": "Restaurant area 3",
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
      ValidationAlert.success( scoreMessage);
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

export default Q10;