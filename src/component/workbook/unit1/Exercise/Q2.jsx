import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const wordsToWrite = [
    { id: 1, label: "Bonjour", correct: "Bonjour" },
    { id: 2, label: "Salut", correct: "Salut" },
];

const Q2 = () => {
    const [checked, setChecked] = useState(false);

    const [userInputs, setUserInputs] = useState({
        1: "",
        2: "",
    });

    const handleInputChange = (id, value) => {
        setUserInputs((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const checkAnswers = () => {
        // تحقق إنو ما في حقول فاضية
        const hasEmpty = wordsToWrite.some(
            word => userInputs[word.id].trim() === ""
        );

        if (hasEmpty) {
            ValidationAlert.info();
            return;
        }

        // عدّ الإجابات الصحيحة
        const correctCount = wordsToWrite.filter(
            word =>
                userInputs[word.id].trim().toLowerCase() ===
                word.correct.toLowerCase()
        ).length;

        if (correctCount === wordsToWrite.length) {
            ValidationAlert.success(
                `${correctCount} / ${wordsToWrite.length}`
            );
        } else {
            ValidationAlert.error(
                `${correctCount} / ${wordsToWrite.length}`
            );
        }
    };


    const handleTryAgain = () => {
        setUserInputs({
            1: "",
            2: "",
        });
        setChecked(false);
    };

    const handleShowAnswer = () => {
        const answers = {};
        wordsToWrite.forEach(word => {
            answers[word.id] = word.correct;
        });
        setUserInputs(answers);
        setChecked(true);
    };


    return (
        <div className="min-h-145 flex items-center justify-center p-4 ">
            <div className="w-full max-w-200 rounded-3xl p-8 space-y-10">


                <div className="space-y-12">
                    {wordsToWrite.map((word) => {
                        const isCorrect =
                            checked &&
                            userInputs[word.id].trim().toLowerCase() ===
                            word.correct.toLowerCase();

                        return (
                            <div key={word.id} className="relative">
                                <label className="block mb-3 text-2xl font-semibold text-gray-600">
                                    {word.label}
                                </label>

                                <input
                                    type="text"
                                    value={userInputs[word.id]}
                                    onChange={(e) =>
                                        handleInputChange(word.id, e.target.value)
                                    }
                                    placeholder="Écrivez ici..."
                                    className={`
                                        w-full text-4xl font-handwriting
                                        bg-transparent border-b-4 px-2 py-3
                                        transition-all duration-300
                                        focus:outline-none
                                        ${isCorrect
                                            ? "border-green-500 text-green-600"
                                            : "border-gray-300 focus:border-[#2c5287] text-gray-700"
                                        }
                                    `}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="popup-buttons">
                <button className="try-again-button" onClick={handleTryAgain}>
                    Recommencer ↻
                </button>
                <button className="show-answer-btn" onClick={handleShowAnswer}>
                    Afficher la réponse
                </button>
                <button className="check-button2" onClick={checkAnswers}>
                    Vérifier la réponse ✓
                </button>
            </div>
        </div>
    );
};

export default Q2;
