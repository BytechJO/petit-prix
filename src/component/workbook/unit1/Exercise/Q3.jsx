import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

// --- مسارات الصور (لا تغيير هنا) ---
const bread = "/assets/workbook/unit1/Lesson1/L1Q3-1.svg";
const flag = "/assets/workbook/unit1/Lesson1/L1Q3-2.svg";
const Burger = "/assets/workbook/unit1/Lesson1/L1Q3-3.svg";

// --- بيانات الأسئلة (لا تغيير هنا) ---
const questions = [
    { id: 1, image: bread, options: [{ id: '1a', text: 'Salut !' }, { id: '1b', text: 'Bonjour, Madame !' }, { id: '1c', text: 'Bleu' }], correctAnswerId: '1b' },
    { id: 2, image: flag, options: [{ id: '2a', text: 'Salut !' }, { id: '2b', text: 'Vert' }, { id: '2c', text: 'Bonjour, Monsieur !' }], correctAnswerId: '2a' },
    { id: 3, image: Burger, options: [{ id: '3a', text: 'Salut !' }, { id: '3b', text: 'Rouge' }, { id: '3c', text: 'Bonjour, Monsieur Paul !' }], correctAnswerId: '3c' },
];

const Q3 = () => {
    const [userAnswers, setUserAnswers] = useState({});
    const [showAnswers, setShowAnswers] = useState(false);

    // --- الدوال المنطقية (لا تغيير هنا) ---
    const handleAnswerClick = (questionId, selectedOptionId) => {
        if (showAnswers) return; // لا تسمح بالتغيير بعد إظهار الإجابات
        setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOptionId }));
    };
    const handleTryAgain = () => {
        setUserAnswers({});
        setShowAnswers(false);
    };
    const handleShowAnswer = () => {
        const correctAnswers = {};
        questions.forEach((q) => { correctAnswers[q.id] = q.correctAnswerId; });
        setUserAnswers(correctAnswers);
        setShowAnswers(true);
    };
    const checkAnswers = () => {
        if (Object.keys(userAnswers).length < questions.length) {
            ValidationAlert.warning("Attention !", "Veuillez répondre à toutes les questions ⚠️");
            return;
        }
        let correctCount = 0;
        questions.forEach((q) => { if (userAnswers[q.id] === q.correctAnswerId) correctCount++; });
        const scoreMessage = `${correctCount} / ${questions.length}`;
        if (correctCount === questions.length) {
            ValidationAlert.success( scoreMessage);
        } else {
            ValidationAlert.error(scoreMessage);
        }
        setShowAnswers(true);
    };

    return (
        <div className="font-sans p-4 sm:p-8 lg:ml-10">
            <div className="max-w-7xl mx-auto">
                
                {/* حاوية الأسئلة */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {questions.map((q) => {
                        const userAnswerId = userAnswers[q.id];
                        const isAnswered = !!userAnswerId;

                        return (
                            <div
                                key={q.id}
                                className=" ml-55 w-75 bg-white rounded-2xl overflow-hidden flex flex-col transition-transform duration-300"
                            >
                                <div className="border-b border-gray-200">
                                    <div className=" h-58 flex items-center justify-center">
                                        <img
                                            src={q.image}
                                            alt={`Question ${q.id}`}
                                            loading="lazy"
                                            className="max-w-65 max-h-65 object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col space-y-3">
                                    {q.options.map((option) => {
                                        const isSelected = userAnswerId === option.id;
                                        const isCorrectAnswer = option.id === q.correctAnswerId;

                                        // تحديد الأنماط بناءً على الحالة
                                        let buttonClass = "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400 cursor-pointer"; // الحالة الافتراضية
                                        
                                        if (showAnswers) {
                                            if (isCorrectAnswer) {
                                                buttonClass = "bg-green-100 border-green-500 text-green-800 font-bold"; // الإجابة الصحيحة
                                            } else if (isSelected) {
                                                buttonClass = "bg-red-100 border-red-500 text-red-800"; // اختيار خاطئ
                                            } else {
                                                buttonClass = "bg-gray-100 border-gray-200 text-gray-500 opacity-80"; // خيارات غير نشطة
                                            }
                                        } else if (isSelected) {
                                            buttonClass = "bg-blue-500 border-blue-500 text-white font-bold"; // الخيار المحدد قبل التحقق
                                        }

                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleAnswerClick(q.id, option.id)}
                                                disabled={showAnswers}
                                                className={`w-full text-left px-5 py-3 rounded-lg border-2 text-base font-medium transition-all duration-200 disabled:cursor-not-allowed ${buttonClass}`}
                                            >
                                                {option.text}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* حاوية الأزرار السفلية */}
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

export default Q3;
