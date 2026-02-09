import React, { useState, useEffect } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";
import WordSearchTutorial from "../../../WordSearchTutorial";

const Q5 = () => {

  const [showTutorial, setShowTutorial] = useState(false);

  const images = [
    { id: 1, src: '/assets/unit4/review/page51/1.svg', word: 'banane' },
    { id: 2, src: '/assets/unit4/review/page51/2.svg', word: 'gâteau' },
    { id: 3, src: '/assets/unit4/review/page51/3.svg', word: 'bonbons' },
    { id: 4, src: '/assets/unit4/review/page51/4.svg', word: 'pomme' },
    { id: 5, src: '/assets/unit4/review/page51/5.svg', word: 'poulet' },
    { id: 6, src: '/assets/unit4/review/page51/6.svg', word: "jus d'orange" }
  ];

  const grid = [
    ['b', 'u', 'i', 'o', 'x', 'n', 'f', 'v', 'b', 'm', 'p', 'p'],
    ['o', 'd', 'a', 'r', 'e', 't', 'r', 'i', 'o', 'l', 'k', 'o'],
    ['n', 'y', 'r', 't', 'u', 'p', 'o', 'm', 'm', 'e', 'i', 'u'],
    ['b', 'u', 'i', 'o', 'v', 'n', 'm', 'm', 'u', 'i', 'o', 'l'],
    ['o', 's', 'a', 'o', 'j', 'h', 'a', 'n', 'y', 't', 'r', 'e'],
    ['n', 'u', 'i', 'o', 'p', 'y', 'g', 'j', 'k', 'o', 'g', 't'],
    ['s', 'b', 'a', 'n', 'a', 'n', 'e', 's', 'k', 'm', 'o', 'k'],
    ['y', 'b', 'a', 'n', 'a', 'n', 'h', 'b', 'f', 'g', 'a', 'g'],
    ['q', 'd', 'y', 'o', 'a', 'j', 'p', 'l', 'm', "'", 'b', 'p'],
    ['z', 'x', 'c', 's', 'd', 'f', 'u', 'h', 'u', 'k', 'p', 'k'],
    ['j', 'u', 's', 'd', "'", 'o', 'r', 'a', 'n', 'g', 'e', 'l']
  ];

  const [selectedLetters, setSelectedLetters] = useState({});
  const [answers, setAnswers] = useState(Array(6).fill(""));
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleLetterClick = (rowIndex, colIndex, letter) => {
    if (isChecked || activeImageIndex === null) return;

    const key = `${rowIndex}-${colIndex}`;

    // إذا الحرف محدد، نشيله
    if (selectedLetters[key]?.imageIndex === activeImageIndex) {
      const newSelectedLetters = { ...selectedLetters };
      delete newSelectedLetters[key];
      setSelectedLetters(newSelectedLetters);

      // تحديث الـ answer
      const newAnswers = [...answers];
      newAnswers[activeImageIndex] = newAnswers[activeImageIndex].slice(0, -1);
      setAnswers(newAnswers);
    } else {
      // إضافة الحرف
      setSelectedLetters({
        ...selectedLetters,
        [key]: { imageIndex: activeImageIndex, letter }
      });

      // إضافة الحرف للـ answer
      const newAnswers = [...answers];
      newAnswers[activeImageIndex] += letter;
      setAnswers(newAnswers);
    }
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

  const checkAnswers = () => {
    const allFilled = answers.every(answer => answer.trim() !== "");

    if (!allFilled) {
      ValidationAlert.warning("Veuillez trouver tous les mots!");
      return;
    }

    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (checkAnswer(answer, images[index].word)) {
        correctCount++;
      }
    });

    setIsChecked(true);

    const score = `${correctCount}/${images.length}`;

    if (correctCount === images.length) {
      ValidationAlert.success(score);
    } else {
      ValidationAlert.error(score);
    }
  };

  const handleShowAnswer = () => {
    setAnswers(images.map(img => img.word));
    setIsChecked(true);
  };

  const handleTryAgain = () => {
    setAnswers(Array(6).fill(""));
    setSelectedLetters({});
    setActiveImageIndex(null);
    setIsChecked(false);
  };

  const clearWord = (index) => {
    if (isChecked) return;

    const newAnswers = [...answers];
    newAnswers[index] = "";
    setAnswers(newAnswers);

    // إزالة كل الحروف المحددة لهذه الصورة
    const newSelectedLetters = { ...selectedLetters };
    Object.keys(newSelectedLetters).forEach(key => {
      if (newSelectedLetters[key].imageIndex === index) {
        delete newSelectedLetters[key];
      }
    });
    setSelectedLetters(newSelectedLetters);
  };

  const getAnswerStyle = (index) => {
    if (!isChecked) {
      return {
        border: '3px solid #3b82f6',
        backgroundColor: activeImageIndex === index ? '#dbeafe' : 'white',
        color: '#1f2937'
      };
    }

    if (checkAnswer(answers[index], images[index].word)) {
      return {
        border: '3px solid #22c55e',
        backgroundColor: '#f0fdf4',
        color: '#15803d'
      };
    } else {
      return {
        border: '3px solid #ef4444',
        backgroundColor: '#fef2f2',
        color: '#dc2626'
      };
    }
  };

  const getLetterStyle = (rowIndex, colIndex) => {
    const key = `${rowIndex}-${colIndex}`;
    const isSelected = selectedLetters[key];

    if (isSelected) {
      const colors = [
        '#fbbf24', // yellow
        '#fb923c', // orange
        '#f472b6', // pink
        '#a78bfa', // purple
        '#60a5fa', // blue
        '#34d399'  // green
      ];
      return {
        backgroundColor: colors[isSelected.imageIndex],
        color: 'white',
        fontWeight: 'bold',
        transform: 'scale(1.1)',
        border: '2px solid #1f2937'
      };
    }

    return {
      backgroundColor: 'white',
      color: '#1f2937',
      border: '2px solid #d1d5db'
    };
  };

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('wordsearch_tutorial_completed');
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // دالة للإغلاق
  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  // زر مساعدة في واجهة Q5
  const handleShowHelp = () => {
    setShowTutorial(true);
  };

  return (
    <div className="flex flex-col items-center p-8 gap-5 lg:ml-50">
      <WordSearchTutorial
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
      />
      {/* الصور والإجابات */}
      <div className="grid grid-cols-6 gap-4 w-full max-w-4xl">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`flex flex-col items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${activeImageIndex === index ? 'bg-blue-100 shadow-lg' : 'bg-gray-50'
              }`}
            onClick={() => !isChecked && setActiveImageIndex(index)}
          >
            {/* الصورة */}
            <div className="w-24 h-24 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* عرض الكلمة */}
            <div
              className="w-full px-3 py-2 rounded-lg text-center font-bold text-sm min-h-[40px] flex items-center justify-center relative"
              style={getAnswerStyle(index)}
            >
              {answers[index] || '...'}
              {!isChecked && answers[index] && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearWord(index);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* شبكة الحروف */}
      <div className=" rounded-lg shadow-xl p-6 border-4 border-[#4ead9b]">
        <div className="grid grid-cols-12 gap-x-10 gap-y-2">
          {grid.map((row, rowIndex) => (
            row.map((letter, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleLetterClick(rowIndex, colIndex, letter)}
                disabled={isChecked}
                className="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg transition-all hover:scale-110 disabled:cursor-not-allowed"
                style={getLetterStyle(rowIndex, colIndex)}
              >
                {letter}
              </button>
            ))
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

export default Q5;