import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const img = '/assets/workbook/unit1/page6/1.svg';

const Q7 = () => {
    const dialogue = [
        { speaker: "Pierre", text: "Salut !", hasInput: false },
        { speaker: "Marc", inputBefore: true, textAfter: "!", answer: "Salut" },
        { speaker: "Pierre", inputBefore: true, textAfter: "tu t'appelles ?", answer: "Comment" },
        { speaker: "Marc", text: "Je", inputMiddle: true, textAfter: "Marc. Et toi ?", answer: "m'appelle" },
        { speaker: "Pierre", text: "Moi,", inputMiddle: true, textAfter: "m'appelle Pierre.", answer: "je" }
    ];

    const wordBank = ["je", "Salut !", "Comment", "m'appelle"];

    const [answers, setAnswers] = useState({});
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (index, value) => {
        setAnswers({
            ...answers,
            [index]: value
        });
    };

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[!?.,]/g, "");
    };

    const checkAnswer = (userAnswer, correctAnswer) => {
        return normalizeText(userAnswer) === normalizeText(correctAnswer);
    };

    const checkAnswers = () => {
        const requiredInputs = dialogue.filter(line => line.answer);
        const allFilled = requiredInputs.every((_, index) => answers[index + 1]?.trim());

        if (!allFilled) {
            ValidationAlert.warning("Veuillez remplir tous les champs!");
            return;
        }

        let correctCount = 0;
        requiredInputs.forEach((line, index) => {
            if (checkAnswer(answers[index + 1] || '', line.answer)) {
                correctCount++;
            }
        });

        setIsChecked(true);

        const score = `${correctCount}/${requiredInputs.length}`;

        if (correctCount === requiredInputs.length) {
            ValidationAlert.success(score);
        } else {
            ValidationAlert.error(score);
        }
    };

    const handleShowAnswer = () => {
        const correctAnswers = {};
        dialogue.forEach((line, index) => {
            if (line.answer) {
                correctAnswers[index] = line.answer;
            }
        });
        setAnswers(correctAnswers);
        setIsChecked(true);
    };

    const handleTryAgain = () => {
        setAnswers({});
        setIsChecked(false);
    };

    const getInputStyle = (index, correctAnswer) => {
        if (!isChecked) {
            return {
                border: '2px solid #d1d5db',
                backgroundColor: 'white',
                color: '#1f2937'
            };
        }

        if (checkAnswer(answers[index] || '', correctAnswer)) {
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

    const getSpeakerColor = (speaker) => {
        return speaker === "Pierre" ? "#7c3aed" : "#ec4899";
    };

    return (
        <div className="flex flex-col items-center p-8 gap-8">

            {/* المحتوى الرئيسي */}
            <div className="lg:ml-70 flex gap-8 w-full lg:max-w-5xl">
                {/* الحوار */}
                <div className="flex-1 bg-white rounded-lg p-8 space-y-6">
                    {/* Pierre : Salut ! */}
                    <div className="flex gap-3">
                        <span className="font-bold text-lg shrink-0" style={{ color: getSpeakerColor("Pierre") }}>
                            Pierre :
                        </span>
                        <span className="text-lg text-gray-800">Salut !</span>
                    </div>

                    {/* Marc : [INPUT] ! */}
                    <div className="flex gap-3">
                        <span className="font-bold text-lg shrink-0" style={{ color: getSpeakerColor("Marc") }}>
                            Marc :
                        </span>
                        <div className="flex items-center gap-2 text-lg">
                            <input
                                type="text"
                                value={answers[1] || ''}
                                onChange={(e) => handleInputChange(1, e.target.value)}
                                disabled={isChecked}
                                className="px-3 py-1 rounded-lg font-semibold"
                                style={{
                                    ...getInputStyle(1, "Salut"),
                                    width: '250px',
                                    outline: 'none'
                                }}
                                placeholder="..........................."
                            />
                            <span className="text-gray-800">!</span>
                        </div>
                    </div>

                    {/* Pierre : [INPUT] tu t'appelles ? */}
                    <div className="flex gap-3">
                        <span className="font-bold text-lg shrink-0" style={{ color: getSpeakerColor("Pierre") }}>
                            Pierre :
                        </span>
                        <div className="flex items-center gap-2 text-lg">
                            <input
                                type="text"
                                value={answers[2] || ''}
                                onChange={(e) => handleInputChange(2, e.target.value)}
                                disabled={isChecked}
                                className="px-3 py-1 rounded-lg font-semibold"
                                style={{
                                    ...getInputStyle(2, "Comment"),
                                    width: '250px',
                                    outline: 'none'
                                }}
                                placeholder="..........................."
                            />
                            <span className="text-gray-800">tu t'appelles ?</span>
                        </div>
                    </div>

                    {/* Marc : Je [INPUT] Marc. Et toi ? */}
                    <div className="flex gap-3">
                        <span className="font-bold text-lg shrink-0" style={{ color: getSpeakerColor("Marc") }}>
                            Marc :
                        </span>
                        <div className="flex items-center gap-2 text-lg">
                            <span className="text-gray-800">Je</span>
                            <input
                                type="text"
                                value={answers[3] || ''}
                                onChange={(e) => handleInputChange(3, e.target.value)}
                                disabled={isChecked}
                                className="px-3 py-1 rounded-lg font-semibold"
                                style={{
                                    ...getInputStyle(3, "m'appelle"),
                                    width: '250px',
                                    outline: 'none'
                                }}
                                placeholder="..........................."
                            />
                            <span className="text-gray-800">Marc. Et toi ?</span>
                        </div>
                    </div>

                    {/* Pierre : Moi, [INPUT] m'appelle Pierre. */}
                    <div className="flex gap-3">
                        <span className="font-bold text-lg shrink-0" style={{ color: getSpeakerColor("Pierre") }}>
                            Pierre :
                        </span>
                        <div className="flex items-center gap-2 text-lg">
                            <span className="text-gray-800">Moi,</span>
                            <input
                                type="text"
                                value={answers[4] || ''}
                                onChange={(e) => handleInputChange(4, e.target.value)}
                                disabled={isChecked}
                                className="px-3 py-1 rounded-lg font-semibold"
                                style={{
                                    ...getInputStyle(4, "je"),
                                    width: '250px',
                                    outline: 'none'
                                }}
                                placeholder="..........................."
                            />
                            <span className="text-gray-800">m'appelle Pierre.</span>
                        </div>
                    </div>
                </div>

                {/* بنك الكلمات داخل دائرة */}
                <div className="w-75 h-85 flex flex-col items-center justify-center gap-3">
                <img src= {img} />
                </div>
                {/* <div className="w-64 h-64 rounded-full shadow-xl flex flex-col items-center justify-center gap-3 border-4 border-[#178e6e] p-4">
                    {wordBank.map((word, index) => (
                        <div
                            key={index}
                            className="px-3 py-1 rounded-lg text-center font-bold text-white text-lg"
                            style={{
                                backgroundColor: ['#dc2626', '#ec4899', '#3b82f6', '#22c55e'][index]
                            }}
                        >
                            {word}
                        </div>
                    ))}
                </div> */}

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

export default Q7;