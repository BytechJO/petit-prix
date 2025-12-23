import React, { useState } from 'react';
import InteractiveHotspotQuestion from './InteractiveHotspotQuestion';
import ValidationAlert from '../../../Popup/ValidationAlert';
import './Q12.css';

const imgs1 = "/assets/unit1/secA/page9/dem1.svg";
const imgs2 = "/assets/unit1/secA/page9/dem2.svg";
const imgs3 = "/assets/unit1/secA/page9/dem3.svg";
const imgs4 = "/assets/unit1/secA/page9/dem4.svg";

const images = [imgs1, imgs2, imgs3, imgs4];
const CORRECT_INDICES = [0, 1];

const Q12 = () => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (index) => {
    if (showResult || showAnswer) return;

    setSelectedIndices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

 


// 👁️ إظهار الإجابة
const handleShowAnswer = () => {
  setSelectedIndices(CORRECT_INDICES);
  setShowAnswer(true);
  setShowResult(true);
};

// 🔄 إعادة المحاولة
const handleStartAgain = () => {
  setSelectedIndices([]);
  setShowResult(false);
  setShowAnswer(false);
};

 const handleCheck = () => {
    if (selectedIndices.length === 0) {
      ValidationAlert.error(
        "Attention",
        "Sélectionne au moins une image"
      );
      return;
    }

    setShowResult(true);

    const correctCount = selectedIndices.filter(i =>
      CORRECT_INDICES.includes(i)
    ).length;

    const isCorrect =
      correctCount === CORRECT_INDICES.length &&
      selectedIndices.length === CORRECT_INDICES.length;

    const score = `${correctCount} / ${CORRECT_INDICES.length}`;

    if (isCorrect) {
      ValidationAlert.success(
        "Bravo!",
        `Score: ${score}`
      );
    } else if (selectedIndices.length > isCorrect) {
      ValidationAlert.warning(
      " Sélectionnez seulement 2 images",
      "Réessayez!"
    )
  }
  else {
  ValidationAlert.error(
    "Oops!",
    `Score: ${score}`
  );
  setShowResult(false);
}
handleStartAgain();
};

return (
  <div className="l4q2-container">
    <InteractiveHotspotQuestion
      imageSources={images}
      selectedIndices={selectedIndices}
      correctIndices={CORRECT_INDICES}
      showResult={showResult}
      onSelect={handleSelect}
    />

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

export default Q12;
