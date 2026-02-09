import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const characterImage = "/assets/unit3/secA/page32/1.svg";
const characterImage1 = "/assets/unit3/secA/page32/2.svg";

const ANSWER_OPTIONS = ["B", "A"].sort(() => Math.random() - 0.5);
const CORRECT_ANSWERS = ["A", "B"];

const Q6 = () => {
  const [answers, setAnswers] = useState(["", ""]);
  const [ setShowAnswer] = useState(false);

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
        scoreText
      );
    } else {
      ValidationAlert.error(
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
    <div className="min-h-screen flex flex-col items-center justify-between">

      {/* Content */}
      <div className="w-full max-w-4xl">

        {/* Images container */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

          {/* Character 1 */}
          <div className="flex flex-col items-center">
            <img
              src={characterImage}
              alt="Character 1"
              className="w-40 md:w-52"
            />

            <div className="flex gap-8">
              {ANSWER_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerChange(0, option)}
                  className={`px-6 py-2 rounded-xl border text-lg font-bold transition cursor-pointer
                ${answers[0] === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Character 2 */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={characterImage1}
              alt="Character 2"
              className="w-40 md:w-52"
            />

            <div className="flex gap-3">
              {ANSWER_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerChange(1, option)}
                  className={`px-6 py-2 rounded-xl border text-lg font-bold transition cursor-pointer
                ${answers[1] === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="popup-buttons shrink-0">
        <button className="try-again-button" onClick={handleStartAgain}>
          Recommencer
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Vérifier la réponse
        </button>
      </div>
    </div>
  );

};

export default Q6;
