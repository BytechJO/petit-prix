import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q12 = () => {
  const words = [
    {
      id: 1,
      display: "B....e....",
      answer: "Bien",
      inputs: [
        { index: 0, letter: 'B', disabled: true },
        { index: 1, letter: 'i', disabled: false },
        { index: 2, letter: 'e', disabled: false },
        { index: 3, letter: 'n', disabled: false }
      ]
    },
    {
      id: 2,
      display: "Ma....",
      answer: "Mal",
      inputs: [
        { index: 0, letter: 'M', disabled: true },
        { index: 1, letter: 'a', disabled: false },
        { index: 2, letter: 'l', disabled: false }
      ]
    },
    {
      id: 3,
      display: "S....p....r",
      answer: "Super",
      inputs: [
        { index: 0, letter: 'S', disabled: true },
        { index: 1, letter: 'u', disabled: false },
        { index: 2, letter: 'p', disabled: false },
        { index: 3, letter: 'e', disabled: false },
        { index: 4, letter: 'r', disabled: true }
      ]
    },
    {
      id: 4,
      display: "Co....me c....",
      answer: "Comme ci",
      inputs: [
        { index: 0, letter: 'C', disabled: true },
        { index: 1, letter: 'o', disabled: false },
        { index: 2, letter: 'm', disabled: false },
        { index: 3, letter: 'm', disabled: true },
        { index: 4, letter: 'e', disabled: true },
        { index: 5, letter: ' ', disabled: true },
        { index: 6, letter: 'c', disabled: true },
        { index: 7, letter: 'i', disabled: false }
      ]
    },
    {
      id: 5,
      display: "c....mme ....a",
      answer: "comme ça",
      inputs: [
        { index: 0, letter: 'c', disabled: true },
        { index: 1, letter: 'o', disabled: false },
        { index: 2, letter: 'm', disabled: true },
        { index: 3, letter: 'm', disabled: true },
        { index: 4, letter: 'e', disabled: true },
        { index: 5, letter: ' ', disabled: true },
        { index: 6, letter: 'ç', disabled: false },
        { index: 7, letter: 'a', disabled: true }
      ]
    }
  ];

  const [answers, setAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (wordId, inputIndex, value) => {
    setAnswers({
      ...answers,
      [`${wordId}-${inputIndex}`]: value
    });
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
  };

  const checkAnswer = (userAnswer, correctAnswer) => {
    return normalizeText(userAnswer) === normalizeText(correctAnswer);
  };

  const getWordAnswer = (wordId) => {
    const word = words.find(w => w.id === wordId);
    let result = '';
    word.inputs.forEach((input, index) => {
      if (input.disabled) {
        result += input.letter;
      } else {
        result += answers[`${wordId}-${index}`] || '';
      }
    });
    return result;
  };

  const checkAnswers = () => {
    // التحقق من ملء جميع الحقول
    let allFilled = true;
    words.forEach(word => {
      word.inputs.forEach((input, index) => {
        if (!input.disabled && !answers[`${word.id}-${index}`]?.trim()) {
          allFilled = false;
        }
      });
    });

    if (!allFilled) {
      ValidationAlert.warning("Veuillez remplir tous les champs!");
      return;
    }

    // حساب النتيجة
    let correctCount = 0;
    words.forEach(word => {
      const userAnswer = getWordAnswer(word.id);
      if (checkAnswer(userAnswer, word.answer)) {
        correctCount++;
      }
    });

    setIsChecked(true);

    const score = `${correctCount}/${words.length}`;

    if (correctCount === words.length) {
      ValidationAlert.success(score);
    } else {
      ValidationAlert.error(score);
    }
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    words.forEach(word => {
      word.inputs.forEach((input, index) => {
        if (!input.disabled) {
          correctAnswers[`${word.id}-${index}`] = input.letter;
        }
      });
    });
    setAnswers(correctAnswers);
    setIsChecked(true);
  };

  const handleTryAgain = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const getInputStyle = (wordId, inputIndex) => {
    if (!isChecked) {
      return {
        border: '2px solid #d1d5db',
        backgroundColor: 'white',
        color: '#1f2937'
      };
    }

    const word = words.find(w => w.id === wordId);
    const userAnswer = getWordAnswer(wordId);
    const isCorrect = checkAnswer(userAnswer, word.answer);

    if (isCorrect) {
      return {
        border: '2px solid #22c55e',
        backgroundColor: '#f0fdf4',
        color: '#15803d'
      };
    } else {
      return {
        border: '2px solid #ef4444',
        backgroundColor: '#fef2f2',
        color: '#dc2626'
      };
    }
  };

  return (
    <div className="flex flex-col items-center p-8 gap-8">

      {/* الكلمات */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
        {words.map((word) => (
          <div key={word.id} className="flex items-center gap-1">
            {word.inputs.map((input, index) => (
              <React.Fragment key={index}>
                {input.disabled ? (
                  input.letter === ' ' ? (
                    <div className="w-3"></div>
                  ) : (
                    <div
                      className="w-10 h-12 flex items-center justify-center rounded-lg font-bold text-xl"
                      style={{
                        backgroundColor: '#e5e7eb',
                        color: '#1f2937',
                        borderBottom: '2px solid #9ca3af'
                      }}
                    >
                      {input.letter}
                    </div>
                  )
                ) : (
                  <input
                    type="text"
                    maxLength="1"
                    value={answers[`${word.id}-${index}`] || ''}
                    onChange={(e) => handleInputChange(word.id, index, e.target.value)}
                    disabled={isChecked}
                    className="w-10 h-12 text-center rounded-lg font-bold text-xl"
                    style={{
                      ...getInputStyle(word.id, index),
                      outline: 'none'
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
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

export default Q12;