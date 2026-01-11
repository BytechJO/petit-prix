import React, { useState } from "react";
import ValidationAlert from '../../../Popup/ValidationAlert';

const correctAnswers = {
    trousse: "3",
    livre: "2",
    stylo: "1",
    gomme: "4",
};

const img = '/assets/unit2/review/page26/1.svg';

const totalCount = Object.keys(correctAnswers).length;

const Q5 = () => {
    const [answers, setAnswers] = useState({
        trousse: "",
        livre: "",
        stylo: "",
        gomme: "",
    });

    const handleChange = (key, value) => {
        if (value === "" || /^[1-4]$/.test(value)) {
            setAnswers({ ...answers, [key]: value });
        }
    };

    const handleTryAgain = () => {
        setAnswers({
            trousse: "",
            livre: "",
            stylo: "",
            gomme: "",
        });
    };

    const handleShowAnswer = () => {
        setAnswers(correctAnswers);
    };

    const checkAnswers = () => {
        const allAnswered = Object.values(answers).every(v => v !== "");

        if (!allAnswered) {
            ValidationAlert.warning(
                "Veuillez répondre à toutes les questions.",
                "Essayer à nouveau"
            );
            return;
        }

        let score = 0;

        Object.keys(correctAnswers).forEach(key => {
            if (answers[key] === correctAnswers[key]) {
                score++;
            }
        });

        const color = score === totalCount ? "#16a34a" : "#dc2626";

        const scoreMessage = `
      <div style="font-size:20px; margin-top:10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${totalCount}
        </span>
      </div>
    `;

        if (score === totalCount) {
            ValidationAlert.success(scoreMessage);
        } else {
            ValidationAlert.error(scoreMessage);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-2">
            <div className="p-6">

                {/* الصورة */}
                <div className="flex justify-center">
                    <div className="p-4">
                        <img
                            src={img}
                            alt="School objects"
                            className="max-w-full  max-h-80 rounded-lg"
                        />
                    </div>
                </div>

                {/* الأسئلة */}
                <div className="space-y-4 mb-10">
                    <QuestionRow
                        label="Une trousse __________"
                        value={answers.trousse}
                        onChange={(v) => handleChange("trousse", v)}
                    />
                    <QuestionRow
                        label="Un livre __________"
                        value={answers.livre}
                        onChange={(v) => handleChange("livre", v)}
                    />
                    <QuestionRow
                        label="Un stylo __________"
                        value={answers.stylo}
                        onChange={(v) => handleChange("stylo", v)}
                    />
                    <QuestionRow
                        label="Une gomme __________"
                        value={answers.gomme}
                        onChange={(v) => handleChange("gomme", v)}
                    />
                </div>
            </div>
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

const QuestionRow = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <span className="text-lg font-medium text-gray-700">
            {label}
        </span>

        <input
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 text-center text-lg font-bold border-2 border-blue-300 rounded-full focus:outline-none focus:border-blue-600"
            placeholder="1-4"
        />
    </div>
);


export default Q5;
