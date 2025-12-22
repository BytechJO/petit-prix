import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';
import './Q3.css';

const characterImage  = "/assets/unit1/secA/page6/characters1.webp";
const characterImage1 = "/assets/unit1/secA/page6/character2.webp";

const ANSWER_OPTIONS = ["B", "A"].sort(() => Math.random() - 0.5);
const CORRECT_ANSWERS = ["A", "B"];

const Q3 = () => {
  const [answers, setAnswers] = useState(["", ""]);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleCheck = () => {

    if (answers.some(answer => answer === "")) {
      ValidationAlert.warning(
        "Attention!",
        "Veuillez répondre à toutes les questions avant de vérifier."
      );
      return;
    }

    let correctCount = 0;

    answers.forEach((answer, index) => {
      if (
        answer &&
        answer.toLowerCase() === CORRECT_ANSWERS[index].toLowerCase()
      ) {
        correctCount++;
      }
    });

    const scoreText = `${correctCount}/2`;

    if (correctCount === 2) {
      ValidationAlert.success(
        "Bravo!",
        scoreText
      );
    } else {
      ValidationAlert.error(
        "Oops!",
        scoreText
      );
    }
  };

  const handleStartAgain = () => {
    setAnswers(["", ""]);
    setShowAnswer(false);
    ValidationAlert?.close?.();
  };

  const handleShowAnswer = () => {
    setAnswers([...CORRECT_ANSWERS]);
    setShowAnswer(true);
  };

  return (
    <div className="l2q1-page-container">
      <div className="content-container">
        <div className="images-flex-container">

          {/* Character 1 */}
          <div className="image-box">
            <img src={characterImage} alt="Character 1" className="character-img" />
            <select
              value={answers[0]}
              onChange={(e) => handleAnswerChange(0, e.target.value)}
              className="answer-select"
            >
              <option value="" disabled>Choisis...</option>
              {ANSWER_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Character 2 */}
          <div className="image-box">
            <img src={characterImage1} alt="Character 2" className="character-img" />
            <select
              value={answers[1]}
              onChange={(e) => handleAnswerChange(1, e.target.value)}
              className="answer-select"
            >
              <option value="" disabled>Choisis...</option>
              {ANSWER_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

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

export default Q3;
