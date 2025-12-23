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
        <div className="flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-6xl bg-white rounded-2xl flex flex-col h-130">

                {/* المحتوى الرئيسي */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] flex-grow overflow-hidden">


                    {/* القسم الأيسر */}
                    <div className="ml-35 p-8 flex flex-col overflow-hidden">

                        {/* Scroll هنا فقط */}
                        <div className="flex-grow overflow-y-auto pr-2 space-y-6 text-lg sm:text-xl">

                            <div>

                                <div className="grid grid-cols-3 p-4 bg-gray-100 rounded-lg">
                                    {wordBank.map((word, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleWordBankClick(word)}
                                            className={`
        bg-white px-4 py-2 rounded-md shadow-sm border border-gray-300
        hover:bg-blue-100 hover:border-blue-400 transition-all
        ${index === 0 ? 'justify-self-start' : ''}
        ${index === 1 ? 'justify-self-center' : ''}
        ${index === 2 ? 'justify-self-end' : ''}
      `}
                                        >
                                            {word}
                                        </button>
                                    ))}
                                </div>

                            </div>

                            {/* الحوار */}
                            {dialogueParts.map((part) => (
                                <div key={part.id} className="flex items-end">
                                    <span className="font-bold text-gray-800 min-w-[70px]">
                                        {part.speaker}:
                                    </span>

                                    {part.type === 'text' ? (
                                        <span className="text-gray-700">{part.text}</span>
                                    ) : (
                                        <div className="flex items-end gap-2 flex-grow">
                                            <input
                                                type="text"
                                                value={userInputs[part.id]}
                                                onChange={(e) =>
                                                    handleInputChange(part.id, e.target.value)
                                                }
                                                className="bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full text-blue-600 font-semibold pb-1"
                                            />
                                            <span className="text-gray-700 whitespace-nowrap">
                                                {part.afterText}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* القسم الأيمن: الصورة */}
                    <div className="hidden md:flex overflow-hidden max-w-50%">
                        <img
                            src={conv}
                            alt="Dialogue scene"
                            className="max-w-[90%] max-h-[90%] object-contain"
                        />
                    </div>
                </div>

                <div className="popup-buttons shrink-0">
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
