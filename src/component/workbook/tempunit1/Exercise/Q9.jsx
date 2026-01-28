import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const DecipherName = () => {
  const img = '/assets/workbook/unit1/page6/01.svg'; // e
  const img2 = '/assets/workbook/unit1/page6/02.svg'; // a
  const img3 = '/assets/workbook/unit1/page6/03.svg'; // l
  const img4 = '/assets/workbook/unit1/page6/04.svg'; // d

  // الصور في الأعلى مع الحروف المقابلة
  const topImages = [
    { src: img, letter: 'e' },
    { src: img2, letter: 'a' },
    { src: img3, letter: 'l' },
    { src: img4, letter: 'd' }
  ];

  // الأسطر السفلية - كلمات فرنسية حقيقية
  const rows = [
    {
      id: 1,
      images: [img2, img3, img3, img, img4], // a-l-l-e-d
      answer: 'alled',
    },
    {
      id: 2,
      images: [img4, img2, img3, img3, img], // d-a-l-l-e
      answer: 'dalle',
    },
    {
      id: 3,
      images: [img3, img2, img4, img, img], // l-a-d-e-e
      answer: 'ladee',
    }
  ];

  const [answers, setAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (rowId, value) => {
    setAnswers({
      ...answers,
      [rowId]: value
    });
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const checkAnswer = (userAnswer, correctAnswer) => {
    return normalizeText(userAnswer) === normalizeText(correctAnswer);
  };

  const checkAnswers = () => {
    const allFilled = rows.every(row => answers[row.id]?.trim());

    if (!allFilled) {
      ValidationAlert.warning("Veuillez remplir tous les champs!");
      return;
    }

    let correctCount = 0;
    rows.forEach(row => {
      if (checkAnswer(answers[row.id] || '', row.answer)) {
        correctCount++;
      }
    });

    setIsChecked(true);

    const score = `${correctCount}/${rows.length}`;

    if (correctCount === rows.length) {
      ValidationAlert.success(score);
    } else {
      ValidationAlert.error(score);
    }
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    rows.forEach(row => {
      correctAnswers[row.id] = row.answer;
    });
    setAnswers(correctAnswers);
    setIsChecked(true);
  };

  const handleTryAgain = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const getInputStyle = (rowId) => {
    if (!isChecked) {
      return {
        border: '2px solid #d1d5db',
        backgroundColor: 'white',
        color: '#1f2937'
      };
    }

    const row = rows.find(r => r.id === rowId);
    if (checkAnswer(answers[rowId] || '', row.answer)) {
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
      {/* الصف العلوي - المفتاح */}
      <div className="bg-gradient-to-r from-pink-200 via-green-200 to-pink-200 rounded-lg shadow-lg p-6 w-full max-w-5xl">
        <div className="flex justify-around items-center">
          {topImages.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-28 h-28 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
                <img
                  src={item.src}
                  alt={`Key ${item.letter}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="text-3xl font-bold text-gray-800">
                = {item.letter}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الأسطر السفلية */}
      <div className="w-full max-w-5xl space-y-6">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4">
            {/* الصور */}
            <div className="flex gap-3">
              {row.images.map((imgSrc, index) => (
                <div key={index} className="w-20 h-20 bg-gray-100 rounded-lg shadow-sm p-1 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={`Image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-2xl font-bold text-gray-800 lg:mr-45">=</span>
              <input
                type="text"
                value={answers[row.id] || ''}
                onChange={(e) => handleInputChange(row.id, e.target.value)}
                disabled={isChecked}
                className="px-4 py-2 rounded-lg font-bold text-xl text-center"
                style={{
                  ...getInputStyle(row.id),
                  width: '200px',
                  outline: 'none'
                }}
                placeholder="............"
              />
            </div>
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

export default DecipherName;