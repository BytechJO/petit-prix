import React, { useState } from "react";

const backgroundImage = "/assets/unit3/secA/page28/cover.png";

import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../../unit1/interactive";

const bear = "/assets/unit3/secA/page28/1.svg";
const clock = "/assets/unit3/secA/page28/2.svg";
const comb = "/assets/unit3/secA/page28/3.svg";
const pen = "/assets/unit3/secA/page28/4.svg";

const Q1 = () => {
  const [foundItems, setFoundItems] = useState([false, false, false, false]);
  const [recentlyFound, setRecentlyFound] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const Items = [
    {
      index: 0,
      top: "46%",
      left: "29.2%",
      width: "26%",
      height: "26%",
      image: bear,
      "aria-label": "Restaurant area 1",
    },
    {
      index: 1,
      top: "43%",
      left: "53%",
      width: "20%",
      height: "20%",
      image: clock,
      "aria-label": "Restaurant area 2",
    },
    {
      index: 2,
      top: "71%",
      left: "53.5%",
      width: "15%",
      height: "18%",
      image: comb,
      "aria-label": "Restaurant area 3",
    },
    {
      index: 3,
      top: "28.5%",
      left: "57.5%",
      width: "24%",
      height: "21%",
      image: pen,
      "aria-label": "Restaurant area 4",
    }
  ];

  const iconCustomStyles = [
    { top: '85%', left: '28.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '85%', left: '12.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '85%', left: '4.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '85%', left: '20.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' }
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
      ValidationAlert.error( scoreMessage);
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