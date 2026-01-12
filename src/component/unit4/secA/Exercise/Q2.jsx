import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q2 = () => {
  const imageSrc = '/assets/unit3/secA/page31/1.svg';

  const leftOptions = [
    { id: 1, text: "Un", value: 1 },
    { id: 2, text: "Deux", value: 2 },
    { id: 3, text: "Trois", value: 3 },
    { id: 4, text: "Quatre", value: 4 },
    { id: 5, text: "Cinq", value: 5 },
  ];

  const rightOptions = [
    { id: 6, text: "Six", value: 6 },
    { id: 7, text: "Sept", value: 7 },
    { id: 8, text: "Huit", value: 8 },
    { id: 9, text: "Neuf", value: 9 },
    { id: 10, text: "Dix", value: 10 },
  ];

  const correctAnswer = 7; 

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectAnswer = (value) => {
    if (!isChecked) {
      setSelectedAnswer(value);
    }
  };

  const checkAnswers = () => {
  if (selectedAnswer === null) {
    ValidationAlert.warning();
    return;
  }

  setIsChecked(true);

  if (selectedAnswer === correctAnswer) {
    ValidationAlert.success("Excellent");
  } else {
    ValidationAlert.error("Failed");
  }
};


  const handleShowAnswer = () => {
    setSelectedAnswer(correctAnswer);
    setIsChecked(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setIsChecked(false);
  };

  const getButtonStyle = (value) => {
    if (!isChecked) {
      return selectedAnswer === value
        ? { backgroundColor: '#3b82f6', color: 'white' }
        : {};
    }

    if (value === correctAnswer) {
      return { backgroundColor: '#22c55e', color: 'white' };
    }

    if (selectedAnswer === value && value !== correctAnswer) {
      return { backgroundColor: '#ef4444', color: 'white' };
    }

    return {};
  };

  return (
    <div className="flex flex-col items-center p-8 gap-8">

      {/* الخيارات والصورة */}
      <div className="flex items-center justify-center gap-8">
        {/* الخيارات اليسرى */}
        <div className="flex flex-col gap-3">
          {leftOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectAnswer(option.value)}
              disabled={isChecked}
              style={{
                ...getButtonStyle(option.value),
                padding: '12px 32px',
                borderRadius: '8px',
                border: '2px solid #d1d5db',
                fontSize: '18px',
                fontWeight: '600',
                cursor: isChecked ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                minWidth: '150px'
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* الصورة */}
        <div className="flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Pierre"
            className="max-w-xs max-h-96 object-contain "
          />
        </div>

        {/* الخيارات اليمنى */}
        <div className="flex flex-col gap-3">
          {rightOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectAnswer(option.value)}
              disabled={isChecked}
              style={{
                ...getButtonStyle(option.value),
                padding: '12px 32px',
                borderRadius: '8px',
                border: '2px solid #d1d5db',
                fontSize: '18px',
                fontWeight: '600',
                cursor: isChecked ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                minWidth: '150px'
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* الأزرار */}
      <div className="popup-buttons shrink-0">
        <button className="try-again-button" onClick={handleTryAgain}>
          Recommencer
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Vérifier la réponse
        </button>
      </div>
    </div>
  );
};

export default Q2;