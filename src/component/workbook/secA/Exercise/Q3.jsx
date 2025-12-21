import React, { useState } from 'react';

const bread = "/assets/workbook/Unit1/Lesson1/L1Q3-1.svg";
const flag = "/assets/workbook/Unit1/Lesson1/L1Q3-2.svg";
const Burger = "/assets/workbook/Unit1/Lesson1/L1Q3-3.svg";


import ValidationAlert from '../../../Popup/ValidationAlert';
// === الخطوة 2: تنظيم بيانات الأسئلة ===
const questions = [
    {
        id: 1,
        // image: image1,
        image: bread,
        options: [
            { id: '1a', text: 'Salut !' },
            { id: '1b', text: 'Bonjour, Madame !' },
            { id: '1c', text: 'Bleu' },
        ],
        correctAnswerId: '1b', // حدد ID الإجابة الصحيحة هنا
    },
    {
        id: 2,
        // image: image2,
        image: flag,
        options: [
            { id: '2a', text: 'Salut !' },
            { id: '2b', text: 'Vert' },
            { id: '2c', text: 'Bonjour, Monsieur !' },
        ],
        correctAnswerId: '2c',
    },
    {
        id: 3,
        // image: image3,
        image: Burger,
        options: [
            { id: '3a', text: 'Salut !' },
            { id: '3b', text: 'Rouge' },
            { id: '3c', text: 'Bonjour, Monsieur Paul !' },
        ],
        correctAnswerId: '3c',
    },
];

const Q3 = () => {
    const [userAnswers, setUserAnswers] = useState({});
    const [showAnswers, setShowAnswers] = useState(false);

    const handleAnswerClick = (questionId, selectedOptionId) => {
        if (userAnswers[questionId]) return;

        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: selectedOptionId,
        }));
    };

    // إعادة المحاولة
    const handleTryAgain = () => {
        setUserAnswers({});
        setShowAnswers(false);
    };

    // عرض الإجابات الصحيحة
    const handleShowAnswer = () => {
        const correctAnswers = {};
        questions.forEach((q) => {
            correctAnswers[q.id] = q.correctAnswerId;
        });

        setUserAnswers(correctAnswers);
        setShowAnswers(true);
    };

    // التحقق من الإجابات
    const checkAnswers = () => {
    // تحذير إذا ما جاوب كل الأسئلة
    if (Object.keys(userAnswers).length < questions.length) {
        ValidationAlert.warning(
            "Attention !",
            "Veuillez répondre à toutes les questions ⚠️"
        );
        return;
    }

    let correctCount = 0;

    questions.forEach((q) => {
        if (userAnswers[q.id] === q.correctAnswerId) {
            correctCount++;
        }
    });

    const scoreMessage = `${correctCount} / ${questions.length}`;

    if (correctCount === questions.length) {
        ValidationAlert.success(
            "Excellent ! Toutes les réponses sont correctes 🎉",
            scoreMessage
        );
    } else {
        ValidationAlert.error(
            "Bon effort ! Essaie encore 💪",
            scoreMessage
        );
    }
};



    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                </div>

                <div className="space-y-8">
                    {questions.map((q) => {
                        const userAnswerId = userAnswers[q.id];
                        const hasAnswered = !!userAnswerId;

                        return (
                            <div key={q.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-6 rounded-2xl shadow-md">

                                <div className="w-full h-64 rounded-lg overflow-hidden">
                                    <img src={q.image} alt={`Question ${q.id}`} className="w-full h-full object-cover" loading='lazy'/>
                                </div>

                                <div className="flex flex-col space-y-4">
                                    {q.options.map((option) => {
                                        let buttonClass = 'border-gray-300 bg-white hover:bg-gray-100';
                                        if (hasAnswered) {
                                            if (option.id === q.correctAnswerId) {
                                                // الإجابة الصحيحة دائمًا خضراء بعد الإجابة
                                                buttonClass = 'bg-green-100 border-green-500 text-green-800';
                                            } else if (option.id === userAnswerId) {
                                                // الإجابة الخاطئة التي اختارها المستخدم
                                                buttonClass = 'bg-red-100 border-red-500 text-red-800';
                                            } else {
                                                // الخيارات الأخرى التي لم يتم اختيارها
                                                buttonClass = 'border-gray-200 bg-gray-50 text-gray-400';
                                            }
                                        }

                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleAnswerClick(q.id, option.id)}
                                                disabled={hasAnswered}
                                                className={`w-full text-left p-4 rounded-lg border-2 text-lg transition-all duration-200 disabled:cursor-not-allowed ${buttonClass}`}
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

export default Q3;
