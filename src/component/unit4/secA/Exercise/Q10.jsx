import React, { useState } from "react";

const backgroundImage = "/assets/unit4/secA/page41/cover.png";

import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../../unit1/interactive";
import SimpleTutorial from "../../../shared/SimpleTutorial";
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
const [showTutorial, setShowTutorial] = useState(true);
  const Items = [
    {
      index: 0,
      image: img1,
      top: "62%",
      left: "22.5%",
      width: "18%",
      height: "30%",
      imageTop: "-5%",
      imageLeft: "1%",
      imageWidth: "100%",
      imageHeight: "100%",
      "aria-label": "Restaurant area 1",
    },
    {
      index: 1,
      image: img2,
      top: "65%",
      left: "62%",
      width: "20%",
      height: "33.5%",
      imageTop: "0%",
      imageLeft: "-2%",
      imageWidth: "100%",
      imageHeight: "100%",
      "aria-label": "Restaurant area 3",
    },
    {
      index: 2,
      image: img3,
      top: "56%",
      left: "79.5%",
      width: "14.5%",
      height: "20%",
      imageTop: "84%",
      imageLeft: "16.5%",
      imageWidth: "84%",
      imageHeight: "16.5%",
      "aria-label": "Restaurant area 3",
    },
    {
      index: 3,
      image: img4,
      top: "38%",
      left: "29%",
      width: "6%",
      height: "22%",
      imageTop: "84%",
      imageLeft: "16.5%",
      imageWidth: "84%",
      imageHeight: "16.5%",
      "aria-label": "Restaurant area 3",
    },
    {
      index: 4,
      image: img5,
      top: "32%",
      left: "35%",
      width: "11%",
      height: "30%",
      imageTop: "84%",
      imageLeft: "16.5%",
      imageWidth: "84%",
      imageHeight: "16.5%",
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
      {showTutorial && (
        <SimpleTutorial onClose={() => setShowTutorial(false)} />
      )}
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