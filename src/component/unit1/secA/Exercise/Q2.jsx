import React, { useState } from "react";
import backgroundImage from "../../../../../public/assets/unit1/secA/popup/page4.png";
import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../interactive";

import fence from "../../../../../public/assets/unit1/secA/page45/ch1.svg";
import book from "../../../../../public/assets/unit1/secA/page45/ch3.svg";
import pen from "../../../../../public/assets/unit1/secA/page45/ch4.svg";

const Q1 = () => {
  const [foundItems, setFoundItems] = useState([false, false, false, false]);
  const [recentlyFound, setRecentlyFound] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const Items = [
    {
      index: 0,
      top: "59.5%",
      left: "36%",
      width: "60%",
      height: "40%",
      image: fence,
      "aria-label": "Restaurant area 1",
    },
    {
      index: 1,
      top: "46%",
      left: "69%",
      width: "37%",
      height: "44%",
      image: pen,
      "aria-label": "Restaurant area 2",
    },
    {
      index: 2,
      top: "31%",
      left: "15.5%",
      width: "20%",
      height: "23%",
      image: book,
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