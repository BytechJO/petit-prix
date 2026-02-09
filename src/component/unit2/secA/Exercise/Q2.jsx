import React, { useState } from "react";

const backgroundImage = "/assets/unit2/secA/page17/cover.png";

import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../../unit1/interactive";

const fence = "/assets/unit2/secA/page17/2.svg";
const book = "/assets/unit2/secA/page17/1.svg";

const Q2 = () => {
  const [foundItems, setFoundItems] = useState([false, false, false, false]);
  const [recentlyFound, setRecentlyFound] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const Items = [
    {
      index: 0,
      top: "43%",
      left: "42%",
      width: "41%",
      height: "40%",
      image: fence,
      "aria-label": "Restaurant area 1",
    },
    {
      index: 2,
      top: "26%",
      left: "11%",
      width: "25%",
      height: "50%",
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


    const scoreMessage = `${correctCount} / ${totalCount} `;

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

export default Q2;