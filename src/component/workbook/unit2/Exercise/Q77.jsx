import React, { useState, useRef } from 'react';
import ValidationAlert from "../../../Popup/ValidationAlert";

const quizData = [
    {
        id: 'day',
        prompt: "C'est",
        correctAnswer: 'jeudi',
        options: [
            { type: 'image', value: 'lundi', src: "/assets/workbook/unit2/page18/01.png" },
            { type: 'image', value: 'jeudi', src: "/assets/workbook/unit2/page18/02.png" },
            { type: 'image', value: 'samedi', src: "/assets/workbook/unit2/page18/03.png" },
        ],
    },
    {
        id: 'backpack',
        prompt: "J'ai un",
        correctAnswer: 'rouge',
        options: [
            { type: 'image', value: 'bleu', src: "/assets/workbook/unit2/page18/01.png" },
            { type: 'image', value: 'rouge', src: "/assets/workbook/unit2/page18/02.png" },
        ],
    },
    {
        id: 'person',
        prompt: "Je suis avec",
        correctAnswer: 'Pierre',
        options: [
            { type: 'image', value: 'Marie', src: "/assets/workbook/unit2/page18/03.png" },
            { type: 'image', value: 'Pierre', src: "/assets/workbook/unit2/page18/01.png" },
        ],
    },
];


const Q77 = () => {
    const [userSelections, setUserSelections] = useState({});
    const [feedback, setFeedback] = useState({});
    const [isLocked, setIsLocked] = useState(false);
    const audioRef = useRef(null);

    const handleSelect = (questionId, selectedValue) => {
        if (isLocked) return;
        setUserSelections(prev => ({ ...prev, [questionId]: selectedValue }));
        setFeedback(prev => ({ ...prev, [questionId]: null }));
    };


    const checkAnswers = () => {
        if (Object.keys(userSelections).length < quizData.length) {
            ValidationAlert.warning("Attention!", "Veuillez répondre à toutes les questions.");
            return;
        }

        const newFeedback = {};
        let score = 0;
        quizData.forEach(q => {
            if (userSelections[q.id] === q.correctAnswer) {
                score++;
            } 
        });

        setFeedback(newFeedback);
        setIsLocked(true);

        const total = quizData.length;
        const scoreMessage = `${score} / ${total}`;
        ValidationAlert[score === total ? 'success' : 'error'](scoreMessage);
    };

    const handleShowAnswer = () => {
        const correctSelections = {};
        const newFeedback = {};
        quizData.forEach(q => {
            correctSelections[q.id] = q.correctAnswer;
            newFeedback[q.id] = 'correct';
        });
        setUserSelections(correctSelections);
        setFeedback(newFeedback);
        setIsLocked(true);
    };

    const handleTryAgain = () => {
        setUserSelections({});
        setFeedback({});
        setIsLocked(false);
    };

    // دالة لتحديد تصميم الخيار بناءً على حالته
    const getOptionClass = (questionId, optionValue) => {
        const isSelected = userSelections[questionId] === optionValue;
        const feedbackStatus = feedback[questionId];

        if (isLocked) {
            const isCorrectAnswer = quizData.find(q => q.id === questionId)?.correctAnswer === optionValue;
            if (isCorrectAnswer) return 'ring-4 ring-green-500';
            if (isSelected && feedbackStatus === 'wrong') return 'ring-4 ring-red-500'; // اختيار المستخدم الخاطئ
            return 'opacity-60'; // الخيارات الأخرى غير النشطة
        }

        if (isSelected) return 'ring-4 ring-blue-500'; // الاختيار الحالي للمستخدم
        return 'hover:ring-2 hover:ring-blue-300'; // تأثير عند التحويم
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl font-sans">

            <div className="space-y-8">
                {quizData.map(q => (
                    <div key={q.id} className="flex items-center gap-0">
                        <p className="text-3xl font-serif w-48">{q.prompt}</p>
                        <div className="flex-1 flex items-center gap-4">
                            {q.options.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleSelect(q.id, opt.value)}
                                    disabled={isLocked}
                                    className={`transition-all duration-200 rounded-lg overflow-hidden focus:outline-none ${getOptionClass(q.id, opt.value)}`}
                                >
                                    <img src={opt.src} alt={opt.value} className="max-w-40 max-h-40 object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="popup-buttons">
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

export default Q77;
