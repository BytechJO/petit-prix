import React, { useState } from "react";
import backgroundImage from "../../../../assets/unit1/secA/popup/page41.png";
import ValidationAlert from "../../../Popup/ValidationAlert";
import Rabbit from "../../../../assets/unit1/secA/page45/1.svg";
import MySVG from "../../../../assets/unit1/secA/page45/2.svg";
import InteractivePage from "../../interactive";

import fence from "../../../../assets/unit1/secA/page45/1.svg";
import rose from "../../../../assets/unit1/secA/page45/2.svg";
import book from "../../../../assets/unit1/secA/page45/3.svg";
import pen from "../../../../assets/unit1/secA/page45/4.svg";

const Q1 = () => {
  const [foundItems, setFoundItems] = useState([false, false, false, false]);
  const [recentlyFound, setRecentlyFound] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const Items = [
    {
      index: 0,
      top: "26%",
      left: "37%",
      width: "63%",
      height: "30%",
      image: fence,
      "aria-label": "Restaurant area 1",
    },
    {
      index: 1,
      top: "43.5%",
      left: "24%",
      width: "4%",
      height: "2%",
      image: pen,
      "aria-label": "Restaurant area 2",
    },
    {
      index: 2,
      top: "75%",
      left: "46%",
      width: "3%",
      height: "5%",
      image: book,
      "aria-label": "Restaurant area 3",
    },
    {
      index: 3,
      top: "77%",
      left: "79.5%",
      width: "13%",
      height: "13%",
      image: rose,
      "aria-label": "Restaurant area 4",
    }
  ];

  const iconCustomStyles = [
    { top: '84%', left: '28%', fontSize: '3rem' },
    { top: '84%', left: '12.5%', fontSize: '3rem' },
    { top: '84%', left: '5%', fontSize: '3rem' },
    { top: '84%', left: '20%', fontSize: '3rem' }
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
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Show Answer
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Q1;