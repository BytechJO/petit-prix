import React, { useState, useRef } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert'; 


const questions = [
    { id: 'a', text: "Est-ce que c’est l’alphabet ?", correctAnswer: "Oui" },
    { id: 'b', text: "Est-ce que c’est l’alphabet anglais ?", correctAnswer: "Non" },
    { id: 'c', text: "C’est l’alphabet de quelle langue ?", correctAnswer: "Français" },
];

const Q22 = () => {
    const [answers, setAnswers] = useState({}); 
    const [feedback, setFeedback] = useState({}); 
    const [isLocked, setIsLocked] = useState(false);

    const handleInputChange = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
        // إزالة النتيجة عند تغيير الإجابة
        if (feedback[id]) {
            setFeedback(prev => {
                const newFeedback = { ...prev };
                delete newFeedback[id];
                return newFeedback;
            });
        }
    };

    const checkAnswers = () => {
        // التحقق من أن جميع الحقول مملوءة
        if (Object.keys(answers).length < questions.length || Object.values(answers).some(a => !a.trim())) {
            ValidationAlert.warning("Attention!", "Veuillez répondre à toutes les questions.");
            return;
        }

        const newFeedback = {};
        let score = 0;
        questions.forEach(q => {
            const userAnswer = answers[q.id]?.trim().toLowerCase();
            const correctAnswer = q.correctAnswer.trim().toLowerCase();

            if (userAnswer === correctAnswer) {
                newFeedback[q.id] = 'correct';
                score++;
            } else {
                newFeedback[q.id] = 'wrong';
            }
        });

        setFeedback(newFeedback);
        setIsLocked(true);

        const total = questions.length;
        const scoreMessage = `${score} / ${total}`;
        if (score === total) {
            ValidationAlert.success(scoreMessage);
        } else {
            ValidationAlert.error(scoreMessage);
        }
    };

    const handleShowAnswer = () => {
        const correctAnswers = {};
        const newFeedback = {};
        questions.forEach(q => {
            correctAnswers[q.id] = q.correctAnswer;
            newFeedback[q.id] = 'correct';
        });
        setAnswers(correctAnswers);
        setFeedback(newFeedback);
        setIsLocked(true);
    };

    const handleTryAgain = () => {
        setAnswers({});
        setFeedback({});
        setIsLocked(false);
    };

    const getInputClass = (id) => {
        if (!isLocked) return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
        if (feedback[id] === 'correct') return 'border-green-500 bg-green-50 text-green-800';
        if (feedback[id] === 'wrong') return 'border-red-500 bg-red-50 text-red-800';
        return 'border-gray-300';
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl  font-sans">

            <div className="space-y-6">
                {questions.map((q, index) => (
                    <div key={q.id} className="flex items-start gap-4">
                        <span className="text-lg font-semibold text-gray-600">{q.id}.</span>
                        <div className="flex-1">
                            <p className="text-lg text-gray-800 mb-2">{q.text}</p>
                            <input
                                type="text"
                                value={answers[q.id] || ''}
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                disabled={isLocked}
                                className={`w-full px-4 py-2 text-lg border-2 rounded-lg transition-colors duration-200 ${getInputClass(q.id)}`}
                                placeholder="Votre réponse..."
                            />
                        </div>
                    </div>
                ))}
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
    );
};

export default Q22;
