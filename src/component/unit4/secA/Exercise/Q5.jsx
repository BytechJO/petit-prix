import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q5 = () => {
  const image1 = '/assets/unit4/secA/page44/1.svg';
  const image2 = '/assets/unit4/secA/page44/2.svg';

  const image1Answers = ["poulet", "jus", "pain", "pomme"];
  const image2Answers = ["banane", "jus", "salade", "gâteau", "bonbon"];
  const identicalAnswer = "jus";

  const [image1Inputs, setImage1Inputs] = useState(["", "", "", ""]);
  const [image2Inputs, setImage2Inputs] = useState(["", "", "", "", ""]);
  const [identicalInput, setIdenticalInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // إزالة الـ accents
  };

  const handleImage1Change = (index, value) => {
    const newInputs = [...image1Inputs];
    newInputs[index] = value;
    setImage1Inputs(newInputs);
  };

  const handleImage2Change = (index, value) => {
    const newInputs = [...image2Inputs];
    newInputs[index] = value;
    setImage2Inputs(newInputs);
  };

  const checkAnswer = (userAnswer, correctAnswer) => {
    return normalizeText(userAnswer) === normalizeText(correctAnswer);
  };

  const checkAnswers = () => {
    // التحقق من ملء جميع الحقول
    const allFilled = 
      image1Inputs.every(input => input.trim() !== "") &&
      image2Inputs.every(input => input.trim() !== "") &&
      identicalInput.trim() !== "";

    if (!allFilled) {
      ValidationAlert.warning("Veuillez remplir tous les champs!");
      return;
    }

    // حساب النتيجة
    let correctCount = 0;
    const totalQuestions = image1Answers.length + image2Answers.length + 1;

    // التحقق من إجابات الصورة الأولى
    image1Inputs.forEach((input, index) => {
      if (checkAnswer(input, image1Answers[index])) {
        correctCount++;
      }
    });

    // التحقق من إجابات الصورة الثانية
    image2Inputs.forEach((input, index) => {
      if (checkAnswer(input, image2Answers[index])) {
        correctCount++;
      }
    });

    // التحقق من السؤال النهائي
    if (checkAnswer(identicalInput, identicalAnswer)) {
      correctCount++;
    }

    setIsChecked(true);

    const score = `${correctCount}/${totalQuestions}`;

    if (correctCount === totalQuestions) {
      ValidationAlert.success(score);
    } else {
      ValidationAlert.error(score);
    }
  };

  const handleShowAnswer = () => {
    setImage1Inputs([...image1Answers]);
    setImage2Inputs([...image2Answers]);
    setIdenticalInput(identicalAnswer);
    setIsChecked(true);
  };

  const handleTryAgain = () => {
    setImage1Inputs(["", "", "", ""]);
    setImage2Inputs(["", "", "", "", ""]);
    setIdenticalInput("");
    setIsChecked(false);
  };

  const getInputStyle = (userAnswer, correctAnswer) => {
    if (!isChecked) {
      return {
        border: '2px solid #d1d5db',
        backgroundColor: 'white'
      };
    }

    if (checkAnswer(userAnswer, correctAnswer)) {
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

      {/* الصور والإجابات */}
      <div className="grid grid-cols-2 gap-12 w-full max-w-5xl">
        {/* الصورة الأولى */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-80 flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={image1}
              alt="Image 1"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {image1Inputs.map((input, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-bold text-lg">{index + 1}.</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleImage1Change(index, e.target.value)}
                  disabled={isChecked}
                  placeholder="Écris ici..."
                  className="flex-1 px-4 py-2 rounded-lg text-center font-semibold"
                  style={{
                    ...getInputStyle(input, image1Answers[index]),
                    outline: 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* الصورة الثانية */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-80 flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={image2}
              alt="Image 2"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {image2Inputs.map((input, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-bold text-lg">{index + 1}.</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleImage2Change(index, e.target.value)}
                  disabled={isChecked}
                  placeholder="Écris ici..."
                  className="flex-1 px-4 py-2 rounded-lg text-center font-semibold"
                  style={{
                    ...getInputStyle(input, image2Answers[index]),
                    outline: 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* السؤال النهائي */}
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl mt-6">
        <h3 className="text-xl font-bold text-purple-700">
          Qu'est-ce qui est identique sur les deux images ?
        </h3>
        <input
          type="text"
          value={identicalInput}
          onChange={(e) => setIdenticalInput(e.target.value)}
          disabled={isChecked}
          placeholder="Ta réponse..."
          className="w-full px-6 py-3 rounded-lg text-center font-semibold text-lg"
          style={{
            ...getInputStyle(identicalInput, identicalAnswer),
            outline: 'none'
          }}
        />
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