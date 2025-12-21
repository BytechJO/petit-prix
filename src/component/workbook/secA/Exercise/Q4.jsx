import React, { useState } from 'react';

import conv from "../../../../assets/workbook/Unit1/Lesson1/L1Q4.png";
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
        <div className=" min-h-screen p-4 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
                    {/* القسم الأيسر: الحوار */}
                    <div className="p-8 flex flex-col justify-between">
                        
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Complétez les espaces vides pour terminer le dialogue.</h1>
                            <div className="space-y-6 text-lg sm:text-xl">
                                <div className="mt-8">
                            <p className="text-sm text-gray-500 mb-2">Cliquez sur un mot pour l'ajouter :</p>
                            <div className="flex flex-wrap gap-3 p-4 bg-gray-100 rounded-lg">
                                {wordBank.map((word, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleWordBankClick(word)}
                                        className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-300 hover:bg-blue-100 hover:border-blue-400 transition-all cursor-pointer"
                                    >
                                        {word}
                                    </button>
                                ))}
                            </div>
                        </div>
                                {dialogueParts.map((part) => (
                                    <div key={part.id} className="flex items-end">
                                        <span className="font-bold text-gray-800 mr-2">{part.speaker}:</span>
                                        {part.type === 'text' ? (
                                            <span className="text-gray-700">{part.text}</span>
                                        ) : (
                                            <div className="flex items-end gap-2 flex-grow">
                                                <input
                                                    type="text"
                                                    value={userInputs[part.id]}
                                                    onChange={(e) => handleInputChange(part.id, e.target.value)}
                                                    className="bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full text-blue-600 font-semibold transition-colors duration-300 pb-1"
                                                />
                                                <span className="text-gray-700 w-27">{part.afterText}</span>
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
                            className="w-full h-full object-cover rounded-r-2xl"
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
