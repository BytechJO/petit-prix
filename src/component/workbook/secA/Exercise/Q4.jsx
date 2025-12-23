import React, { useState } from 'react';

const conv = "/assets/workbook/Unit1/Lesson1/L1Q4.svg";
import ValidationAlert from '../../../Popup/ValidationAlert';

// الكلمات التي ستظهر في بنك الكلمات (بشكل عشوائي)
const wordBank = ['Bonjour', 'Je te présente', 'Bonjour'].sort(() => Math.random() - 0.5);

// بيانات الحوار مع تحديد النص الذي يأتي بعد الفراغ
const dialogueParts = [
    { id: 1, type: 'input', speaker: 'Robert', afterText: ', Marie.', correct: 'Bonjour' },
    { id: 2, type: 'text', speaker: 'Marie', text: 'Salut, Robert.' },
    { id: 3, type: 'input', speaker: 'Robert', afterText: ', c’est Lili.', correct: 'Je te présente' },
    { id: 4, type: 'text', speaker: 'Marie', text: 'Bonjour, Lili.' },
    { id: 5, type: 'input', speaker: 'Lili', afterText: ', Marie.', correct: 'Bonjour' },
];

const Q4 = () => {
    const [userInputs, setUserInputs] = useState({ 1: '', 3: '', 5: '' });

    const handleInputChange = (id, value) => {
        setUserInputs((prev) => ({ ...prev, [id]: value }));
    };

    // دالة جديدة: عند النقر على كلمة من بنك الكلمات
    const handleWordBankClick = (word) => {
        // ابحث عن أول حقل فارغ واملأه بالكلمة
        const emptyInputId = Object.keys(userInputs).find(id => userInputs[id] === '');
        if (emptyInputId) {
            handleInputChange(emptyInputId, word);
        }
    };

    const handleTryAgain = () => {
        setUserInputs({ 1: '', 3: '', 5: '' });
    };

    const handleShowAnswer = () => {
        setUserInputs({ 1: 'Bonjour', 3: 'Je te présente', 5: 'Bonjour' });
    };

    const checkAnswers = () => {
        const inputIds = dialogueParts.filter(p => p.type === 'input').map(p => p.id);
        for (let id of inputIds) {
            if (!userInputs[id] || userInputs[id].trim() === '') {
                ValidationAlert.warning("Attention !", "Veuillez compléter toutes les phrases ⚠️");
                return;
            }
        }
        let correctCount = inputIds.filter(id => {
            const part = dialogueParts.find(p => p.id === id);
            return userInputs[id].trim().toLowerCase() === part.correct.toLowerCase();
        }).length;

        const scoreMessage = `${correctCount} / ${inputIds.length}`;
        if (correctCount === inputIds.length) {
            ValidationAlert.success("Excellent ! Le dialogue est correct 🎉", scoreMessage);
        } else {
            ValidationAlert.error("Bon effort ! Essaie encore 💪", scoreMessage);
        }
    };

    return (
        <div className=" p-4 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">

                    <div className="p-8 flex flex-col justify-between">

                        <div>
                            <div className="space-y-6 text-lg sm:text-xl">
                                <div className="mt-8">
                                    <div className="flex flex-wrap gap-4 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-inner">

                                        {wordBank.map((word, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleWordBankClick(word)}
                                                className="
        px-5 py-2 rounded-full
        bg-gradient-to-r from-blue-50 to-indigo-50
        border border-blue-200
        text-blue-700 font-semibold
        shadow-sm
        hover:from-blue-100 hover:to-indigo-100
        hover:border-blue-400
        hover:shadow-md
        active:scale-95
        transition-all duration-300
        cursor-pointer
    "
                                            >
                                                {word}
                                            </button>

                                        ))}
                                    </div>
                                </div>
                                {dialogueParts.map((part) => (
                                    <div key={part.id} className="flex items-end">
                                        <span className="
    font-bold
    text-blue-800
    min-w-[70px]
">
                                            {part.speaker}:
                                        </span>

                                        {part.type === 'text' ? (
                                            <span className="text-gray-700">{part.text}</span>
                                        ) : (
                                            <div className="
    flex items-end gap-3
    p-2 rounded-xl
    hover:bg-blue-50
    transition-colors duration-300
">

                                                <input
                                                    type="text"
                                                    value={userInputs[part.id]}
                                                    onChange={(e) => handleInputChange(part.id, e.target.value)}
                                                    className="
        bg-transparent
        border-b-4 border-blue-200
        focus:border-blue-600
        focus:outline-none
        w-full
        text-blue-700
        font-semibold
        text-lg
        tracking-wide
        transition-all duration-300
        placeholder:text-gray-400
    "
                                                />

                                                <span className="text-gray-600 italic whitespace-nowrap">
                                                    {part.afterText}
                                                </span>

                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Drop Box - بنك الكلمات */}

                    </div>

                    {/* القسم الأيمن: الصورة */}
                    <div className="hidden md:block">
                        <img
                            src={conv}
                            alt="Dialogue scene"
                            className="w-[80%] h-[80%]  rounded-r-2xl"
                        />
                    </div>
                </div>

                {/* قسم الأزرار في الأسفل */}
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
        </div>
    );
};

export default Q4;
