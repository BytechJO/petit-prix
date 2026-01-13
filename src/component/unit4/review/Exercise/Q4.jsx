import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q4 = () => {
    const wordBox = [
        "du Gâteau",
        "une Table",
        "du Jus d'orange",
        "un Trampoline",
        "un Ballon",
        "un Cadeau",
        "des Bonbons"
    ];

    const correctAnswers = [
        "Il y a du gâteau.",
        "Il y a une table.",
        "Il y a du jus d'orange.",
        "Il y a un trampoline.",
        "Il y a un ballon.",
        "Il y a un cadeau.",
        "Il y a des bonbons."
    ];

    const [answers, setAnswers] = useState([
        "Il y a du gâteau.",
        "",
        "",
        "",
        "",
        "",
        ""
    ]);

    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ");
    };

    const checkAnswer = (userAnswer, correctAnswer) => {
        return normalizeText(userAnswer) === normalizeText(correctAnswer);
    };

    const checkAnswers = () => {
        // التحقق من ملء جميع الحقول
        const allFilled = answers.every(answer => answer.trim() !== "");

        if (!allFilled) {
            ValidationAlert.warning("Veuillez remplir toutes les phrases!");
            return;
        }

        // حساب النتيجة
        let correctCount = 0;
        answers.forEach((answer, index) => {
            if (checkAnswer(answer, correctAnswers[index])) {
                correctCount++;
            }
        });

        setIsChecked(true);

        const score = `${correctCount}/${correctAnswers.length}`;

        if (correctCount === correctAnswers.length) {
            ValidationAlert.success(score);
        } else {
            ValidationAlert.error(score);
        }
    };

    const handleShowAnswer = () => {
        setAnswers([...correctAnswers]);
        setIsChecked(true);
    };

    const handleTryAgain = () => {
        setAnswers(Array(7).fill(""));
        setIsChecked(false);
    };

    const getInputStyle = (index) => {
        if (!isChecked) {
            return {
                backgroundColor: 'white',
                color: '#1f2937'
            };
        }

        if (checkAnswer(answers[index], correctAnswers[index])) {
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

            {/* المحتوى الرئيسي */}
            <div className="flex gap-8 w-full max-w-4xl">
                {/* الجانب الأيسر - الـ inputs */}
                <div className="flex-1 flex flex-col gap-4">
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="font-bold text-lg text-gray-700 w-6">
                                {String.fromCharCode(97 + index)}.
                            </span>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                disabled={isChecked || index === 0}
                                placeholder={index === 0 ? "Il y a du gâteau." : "Il y a....................................................."}
                                className="flex-1 px-4 py-3 rounded-lg font-medium"
                                style={{
                                    ...getInputStyle(index),
                                    outline: 'none',
                                    cursor: index === 0 ? 'not-allowed' : 'text'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* الجانب الأيمن - البوكس */}
                <div className="w-80 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg shadow-lg p-6 border-4 border-purple-300">
                    <h3 className="text-xl font-bold text-center text-purple-700 mb-4">
                        Mots à utiliser
                    </h3>
                    <div className="flex flex-col gap-3">
                        {wordBox.map((word, index) => (
                            <div
                                key={index}
                                className="bg-white px-4 py-3 rounded-lg shadow-md border-2 border-purple-200 text-center font-semibold text-gray-800 hover:bg-purple-50 transition-colors"
                            >
                                {word}
                            </div>
                        ))}
                    </div>
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

export default Q4;