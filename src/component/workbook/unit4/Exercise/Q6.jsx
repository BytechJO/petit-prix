import React, { useState } from "react";
import ValidationAlert from '../../../Popup/ValidationAlert';

const Q6 = () => {
    const box =
        "w-10 h-10 flex items-center justify-center border-2 border-cyan-300 rounded-md font-bold text-xl bg-white";

    const inputStyle =
        "ml-4 px-3 py-1 border-2 border-cyan-400 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-cyan-500";

    const sections = [
        { id: "a", letters: ["o", "s", "i", "n", "B", "o", "s", "s"], bg: "bg-blue-50" },
        { id: "b", letters: ["b", "T", "e", "l", "a"], bg: "bg-green-50" },
        { id: "c", letters: ["â", "u", "t", "a", "G", "e"], bg: "bg-yellow-50" },
        { id: "d", letters: ["a", "a", "e", "u", "d", "C", "x"], bg: "bg-purple-50" },
        { id: "e", letters: ["a", "e", "n", "B", "a", "n"], bg: "bg-pink-50" },
    ];

    // State لإجابات المستخدم
    const [answers, setAnswers] = useState({
        a: "",
        b: "",
        c: "",
        d: "",
        e: ""
    });

    // كلمات صحيحة لكل section
    const correctAnswers = {
        a: "o s i n B o s s",
        b: "b T e l a",
        c: "â u t a G e",
        d: "a a e u d C x",
        e: "a e n B a n"
    };

    // Handle change
    const handleChange = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleTryAgain = () => {
        setAnswers({ a: "", b: "", c: "", d: "", e: "" });
    };

    const handleShowAnswer = () => {
        setAnswers({ ...correctAnswers });
    };

    const checkAnswers = () => {
        // تحقق من الحقول الفارغة
        const emptyField = Object.keys(answers).some(key => answers[key].trim() === "");
        if (emptyField) {
            ValidationAlert.warning("Attention!", "Veuillez remplir tous les champs avant de vérifier.");
            return;
        }

        // حساب الإجابات الصحيحة
        let correctCount = 0;
        Object.keys(correctAnswers).forEach(key => {
            if (answers[key].trim() === correctAnswers[key]) correctCount++;
        });

        if (correctCount === Object.keys(correctAnswers).length) {
            ValidationAlert.success(`${correctCount}/5`);
        } else {
            ValidationAlert.error(`${correctCount}/5`);
        }
    };


    return (
        <div className="space-y-4 p-6 max-w-280">
            {sections.map((sec) => (
                <div
                    key={sec.id}
                    className={`flex items-center gap-2 ${sec.bg} p-2 rounded-xl lg:ml-95`}
                >
                    <span className="font-bold text-lg w-6 text-center">{sec.id})</span>
                    {sec.letters.map((l, i) => (
                        <div key={i} className={box}>{l}</div>
                    ))}
                    <input
                        type="text"
                        className={inputStyle}
                        value={answers[sec.id]}
                        onChange={(e) => handleChange(sec.id, e.target.value)}
                    />
                </div>
            ))}

            {/* Buttons */}
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

export default Q6;
