import React, { useState } from 'react';
import { Check, X, RotateCcw, Star } from 'lucide-react';

const img1 = '/assets/workbook/unit4/page27/1.svg';
const img2 = '/assets/workbook/unit4/page27/2.svg';
const img3 = '/assets/workbook/unit4/page27/3.svg';
const img4 = '/assets/workbook/unit4/page27/4.svg';

export default function Q1() {
    const [answers, setAnswers] = useState({
        marie: '',
        lucas: '',
        lili: '',
        louis: ''
    });

    const [isChecked, setIsChecked] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const correctAnswers = {
        marie: '10',
        lucas: '9',
        lili: '8',
        louis: '7'
    };

    const children = [
        { id: 'marie', name: 'Marie', src: img1, color: 'bg-pink-400' },
        { id: 'lucas', name: 'Lucas', src: img2, color: 'bg-teal-400' },
        { id: 'lili', name: 'Lili', src: img3, color: 'bg-pink-400' },
        { id: 'louis', name: 'Louis', src: img4, color: 'bg-teal-400' }
    ];

    const handleInputChange = (id, value) => {
        if (value === '' || /^\d{1,2}$/.test(value)) {
            setAnswers(prev => ({ ...prev, [id]: value }));
            setIsChecked(false);
        }
    };

    const checkAnswers = () => {
        setIsChecked(true);
        const allCorrect = Object.keys(correctAnswers)
            .every(k => answers[k] === correctAnswers[k]);

        if (allCorrect) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    };

    const reset = () => {
        setAnswers({ marie: '', lucas: '', lili: '', louis: '' });
        setIsChecked(false);
        setShowConfetti(false);
    };

    const isAnswerCorrect = (id) =>
        answers[id] === correctAnswers[id];

    const allAnswered = Object.values(answers).every(v => v !== '');

    return (
        <div className=" font-[Fredoka] relative overflow-hidden">

            {/* confetti */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2.5 h-2.5 animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#FFD700', '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181'][i % 5],
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="max-w-4xl mx-auto">

                {/* cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {children.map((child) => (
                        <div
                            key={child.id}
                            className={`
                transition
                hover:-translate-y-2
                ${isChecked && isAnswerCorrect(child.id) && 'border-4 border-green-400'}
                ${isChecked && !isAnswerCorrect(child.id) && answers[child.id] && 'border-4 border-red-400'}
              `}
                        >
                            <div>
                                <img
                                    src={child.src}
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <input
                                    value={answers[child.id]}
                                    onChange={(e) => handleInputChange(child.id, e.target.value)}
                                    disabled={isChecked && isAnswerCorrect(child.id)}
                                    maxLength={2}
                                    className="
                    w-24 h-14 text-2xl font-bold text-center
                    border-2 rounded-xl outline-none
                    focus:ring-2 focus:ring-indigo-400
                    disabled:bg-green-50
                  "
                                />
                                <span className="text-lg font-semibold text-slate-500">ans</span>

                                {isChecked && (
                                    isAnswerCorrect(child.id)
                                        ? <Check className="text-green-500" />
                                        : answers[child.id] && <X className="text-red-500" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>


            </div>
            {/* الأزرار */}
            <div className="popup-buttons">
                <button className="try-again-button" onClick={reset}>Recommencer ↻</button>
                {/* <button className="show-answer-btn" onClick={handleShowAnswer}>Afficher la réponse</button> */}
                <button className="check-button2" onClick={checkAnswers}>Vérifier ✓</button>
            </div>
        </div>
    );
}
