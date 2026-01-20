import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q4 = () => {
  const questions = [
    {
      id: 1,
      image: '/assets/unit4/secA/page43/01.svg',
      options: ["Il y a du", "Il n’y a pas de"],
      correctAnswer: "Il y a du"
    },
    {
      id: 2,
      image: '/assets/unit4/secA/page43/02.svg',
      options: ["Il y a une", "Il n’y a pas de"],
      correctAnswer: "Il y a une"
    },
    {
      id: 3,
      image: '/assets/unit4/secA/page43/03.svg',
      options: ["Il y a des", "Il n’y a pas de"],
      correctAnswer: "Il y a des"
    },
    {
      id: 4,
      image: '/assets/unit4/secA/page43/04.svg',
      options: ["Il y a du", "Il n’y a pas de"],
      correctAnswer: "Il y a du"
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});

  const handleSelectAnswer = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const checkAnswers = () => {
    // التأكد من أن كل الأسئلة مجابة
    const allAnswered = questions.every(q => selectedAnswers[q.id]);
    if (!allAnswered) {
      ValidationAlert.warning("Veuillez répondre à toutes les questions!");
      return;
    }

    // حساب النتيجة
    let correctCount = 0;
    const newCheckedAnswers = {};
    
    questions.forEach(q => {
      const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
      newCheckedAnswers[q.id] = isCorrect;
      if (isCorrect) {
        correctCount++;
      }
    });

    setCheckedAnswers(newCheckedAnswers);

    const score = `${correctCount}/${questions.length}`;

    // عرض النتيجة
    if (correctCount === questions.length) {
      ValidationAlert.success(score);
    } else {
      ValidationAlert.error(score);
    }
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    const newCheckedAnswers = {};
    
    questions.forEach(q => {
      correctAnswers[q.id] = q.correctAnswer;
      newCheckedAnswers[q.id] = true;
    });
    
    setSelectedAnswers(correctAnswers);
    setCheckedAnswers(newCheckedAnswers);
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setCheckedAnswers({});
  };

  const getButtonStyle = (questionId, option) => {
    const question = questions.find(q => q.id === questionId);
    const isSelected = selectedAnswers[questionId] === option;
    const isCorrect = question.correctAnswer === option;
    const isChecked = checkedAnswers[questionId] !== undefined;

    if (!isChecked) {
      return isSelected
        ? { backgroundColor: '#3b82f6', color: 'white', borderColor: '#3b82f6' }
        : { backgroundColor: 'white', color: '#1f2937', borderColor: '#d1d5db' };
    }

    if (isCorrect) {
      return { backgroundColor: '#22c55e', color: 'white', borderColor: '#22c55e' };
    }

    if (isSelected && !isCorrect) {
      return { backgroundColor: '#ef4444', color: 'white', borderColor: '#ef4444' };
    }

    return { backgroundColor: 'white', color: '#1f2937', borderColor: '#d1d5db' };
  };

  return (
    <div className="flex flex-col items-center p-8 gap-8">
      {/* الأسئلة */}
      <div className="grid grid-cols-4 gap-6">
        {questions.map((question) => (
          <div key={question.id} className="flex flex-col items-center gap-4">
            {/* الصورة */}
            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-lg shadow-md overflow-hidden">
              <img
                src={question.image}
                alt={`Question ${question.id}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* الخيارات */}
            <div className="flex flex-col gap-2 w-full">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectAnswer(question.id, option)}
                  disabled={checkedAnswers[question.id] !== undefined}
                  style={{
                    ...getButtonStyle(question.id, option),
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: '2px solid',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: checkedAnswers[question.id] !== undefined ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                >
                  {option}
                </button>
              ))}
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

export default Q4;