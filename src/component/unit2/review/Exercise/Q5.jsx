import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const correctAnswers = {
  trousse: "3",
  livre: "2",
  stylo: "1",
  gomme: "4",
};

const img = "/assets/unit2/review/page26/1.svg";
const totalCount = Object.keys(correctAnswers).length;

const Q5 = () => {
  const [answers, setAnswers] = useState({
    trousse: "",
    livre: "",
    stylo: "",
    gomme: "",
  });

  const [results, setResults] = useState({});

  // ========================
  // handlers
  // ========================

  const handleChange = (key, value) => {
    if (value === "" || /^[1-4]$/.test(value)) {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      setResults((prev) => ({ ...prev, [key]: null }));
    }
  };

  const handleTryAgain = () => {
    setAnswers({
      trousse: "",
      livre: "",
      stylo: "",
      gomme: "",
    });
    setResults({});
  };

  const handleShowAnswer = () => {
    setAnswers(correctAnswers);

    const allCorrect = {};
    Object.keys(correctAnswers).forEach((k) => {
      allCorrect[k] = "correct";
    });

    setResults(allCorrect);
  };

  const checkAnswers = () => {
    const allAnswered = Object.values(answers).every((v) => v !== "");

    if (!allAnswered) {
      ValidationAlert.warning(
        "Veuillez répondre à toutes les questions.",
        "Essayer à nouveau"
      );
      return;
    }

    let score = 0;
    const newResults = {};

    Object.keys(correctAnswers).forEach((key) => {
      if (answers[key] === correctAnswers[key]) {
        score++;
        newResults[key] = "correct";
      } else {
        newResults[key] = "incorrect";
      }
    });

    setResults(newResults);

    const message = `${score} / ${totalCount}`;

    if (score === totalCount) {
      ValidationAlert.success(message);
    } else {
      ValidationAlert.error(message);
    }
  };

  // ========================
  // UI
  // ========================

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* الصورة */}
      <div className="flex justify-center mb-8">
        <img
          src={img}
          alt="School objects"
          className="max-w-full max-h-80 rounded-xl shadow-md"
        />
      </div>

      {/* الأسئلة - تصميم Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <QuestionCard
          label="Une trousse"
          value={answers.trousse}
          result={results.trousse}
          onChange={(v) => handleChange("trousse", v)}
        />

        <QuestionCard
          label="Un livre"
          value={answers.livre}
          result={results.livre}
          onChange={(v) => handleChange("livre", v)}
        />

        <QuestionCard
          label="Un stylo"
          value={answers.stylo}
          result={results.stylo}
          onChange={(v) => handleChange("stylo", v)}
        />

        <QuestionCard
          label="Une gomme"
          value={answers.gomme}
          result={results.gomme}
          onChange={(v) => handleChange("gomme", v)}
        />
      </div>

      {/* الأزرار */}
      <div className="popup-buttons flex gap-4 justify-center">
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



// ========================
// Card Component
// ========================

const QuestionCard = ({ label, value, onChange, result }) => {
  const getStyle = () => {
    if (result === "correct")
      return "border-green-500 bg-green-50";
    if (result === "incorrect")
      return "border-red-500 bg-red-50";
    return "border-gray-200";
  };

  return (
    <div
      className={`
        flex items-center justify-between
        p-5
        rounded-2xl
        border-2
        shadow-md
        transition
        hover:shadow-xl hover:scale-[1.02]
        ${getStyle()}
      `}
    >
      <span className="text-lg font-semibold text-gray-700">
        {label}
      </span>

      <input
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-14 h-14
          text-center
          text-xl font-bold
          border-2 border-blue-300
          rounded-full
          focus:outline-none
          focus:ring-4 focus:ring-blue-200
          focus:border-blue-600
          transition
        "
        placeholder="?"
      />
    </div>
  );
};

export default Q5;
