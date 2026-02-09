import React, { useState } from "react";

const backgroundImage = "/assets/unit4/secA/page40/cover.png";

import ValidationAlert from "../../../Popup/ValidationAlert";
import InteractivePage from "../../../unit1/interactive";

const bear = "/assets/unit4/secA/page40/1.svg";
const clock = "/assets/unit4/secA/page40/2.svg";
const comb = "/assets/unit4/secA/page40/3.svg";

const Q1 = () => {
  const [foundItems, setFoundItems] = useState([false, false, false, false]);
  const [recentlyFound, setRecentlyFound] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const Items = [
    {
      index: 0,
      top: "49.5%",
      left: "49.5%",
      width: "7%",
      height: "7%",
      image: bear,
      "aria-label": "Restaurant area 1",
    },
    {
      index: 1,
      top: "58.8%",
      left: "32%",
      width: "10%",
      height: "10%",
      image: clock,
      "aria-label": "Restaurant area 2",
    },
    {
      index: 2,
      top: "46%",
      left: "20%",
      width: "6.5%",
      height: "10%",
      image: comb,
      "aria-label": "Restaurant area 3",
    },
  ];

  const iconCustomStyles = [
    { top: '84%', left: '16.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '84%', left: '9.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '84%', left: '2.5%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' },
    { top: '84%', left: '19%', fontSize: 'clamp(1.8rem, 3vw, 3rem)' }
  ];

  const handleItemClick = (index) => {
    if (foundItems[index]) return;
    const newFoundItems = [...foundItems];
    newFoundItems[index] = true;
    setFoundItems(newFoundItems);
    setRecentlyFound(index);
  };

  const handleCheck = () => {

    const correctCount = foundItems.filter(Boolean).length;
    const totalCount = Items.length;

    const scoreMessage = ` ${correctCount} / ${totalCount}`;

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