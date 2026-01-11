import { useState } from "react";

import ValidationAlert from "../../../Popup/ValidationAlert";

const questions = [
    {
        id: "a",
        title: "Lundi ...",
        options: ["Mercredi", "Jeudi", "Mardi"],
        correct: 2,
    },
    {
        id: "b",
        title: "Dimanche ...",
        options: ["Lundi", "Samedi", "Mercredi"],
        correct: 1,
    },
    {
        id: "c",
        title: "Jeudi ...",
        options: ["Mardi", "Lundi", "Vendredi"],
        correct: 2,
    },
    {
        id: "d",
        title: "Vendredi ...",
        options: ["Jeudi", "Samedi", "Dimanche"],
        correct: 2,
    },
];

export default function Q6() {
    const [answers, setAnswers] = useState({});
    const [checked, setChecked] = useState(false);

    const handleSelect = (qId, index) => {
        if (checked) return;
        setAnswers({ ...answers, [qId]: index });
    };

    const handleCheck = () => {
        setChecked(true);
    };

    const handleReset = () => {
        setAnswers({});
        setChecked(false);
    };

    const checkAnswers = () => {
        const totalCount = questions.length;

        const allAnswered = questions.every(
            q => answers[q.id] !== undefined
        );

        if (!allAnswered) {
            ValidationAlert.warning(
                "Veuillez répondre à toutes les questions.",
                "Essayer à nouveau"
            );
            return;
        }

        let score = 0;

        questions.forEach(q => {
            if (answers[q.id] === q.correct) {
                score++;
            }
        });

        const color = score === totalCount ? "#16a34a" : "#dc2626"; // أخضر / أحمر

        const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${totalCount}
      </span>
    </div>
  `;

        if (score === totalCount) {
            ValidationAlert.success(
                scoreMessage
            );
        } else {
            ValidationAlert.error(
                scoreMessage
            );
        }
    };



    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">

            {questions.map((q) => (
                <div
                    key={q.id}
                    className="bg-white rounded-2xl shadow-md p-5 space-y-4"
                >
                    <p className="text-lg font-semibold text-gray-700">
                        {q.id}) {q.title}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {q.options.map((opt, index) => {
                            const isSelected = answers[q.id] === index;
                            const isCorrect = checked && index === q.correct;
                            const isWrong =
                                checked && isSelected && index !== q.correct;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(q.id, index)}
                                    className={`
                    flex items-center gap-3 px-4 py-2 rounded-full border-2
                    transition-all duration-200
                    ${isCorrect
                                            ? "border-green-500 bg-green-100 text-green-700"
                                            : isWrong
                                                ? "border-red-500 bg-red-100 text-red-700"
                                                : isSelected
                                                    ? "border-blue-500 bg-blue-100 text-blue-700"
                                                    : "border-gray-300 hover:border-blue-400"
                                        }
                  `}
                                >
                                    <span
                                        className={`
                      w-5 h-5 rounded-full border-2
                      ${isCorrect
                                                ? "border-green-500 bg-green-500"
                                                : isWrong
                                                    ? "border-red-500 bg-red-500"
                                                    : isSelected
                                                        ? "border-blue-500 bg-blue-500"
                                                        : "border-gray-400"
                                            }
                    `}
                                    />
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="popup-buttons shrink-0">
                <button className="try-again-button" onClick={handleReset}>
                    Recommencer ↻
                </button>
                <button className="show-answer-btn" onClick={handleCheck}>
                    Afficher la réponse
                </button>
                <button className="check-button2" onClick={checkAnswers}>
                    Vérifier la réponse ✓
                </button>
            </div>
        </div>
    );
}
