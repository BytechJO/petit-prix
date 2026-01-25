import React, { useState, useEffect } from 'react';
import { Volume2, Check, X, RotateCcw } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const exercises = [
    {
        id: 'exercise1',
        character1Image: '/assets/workbook/unit3/page22/1.svg',
        character2Image: '/assets/workbook/unit3/page22/2.svg',
        options: [
            { 
                id: 'a', 
                label: 'a', 
                beforeText: '',
                afterText: 'aime jouer aux jeux vidéo.',
                correctAnswer: 'Elle' // أو 'Elle'
            },
            { 
                id: 'b', 
                label: 'b', 
                beforeText: '',
                afterText: 'déteste dessiner.',
                correctAnswer: 'Il'
            },
            { 
                id: 'c', 
                label: 'c', 
                beforeText: '',
                afterText: 'aime nager.',
                correctAnswer: 'Il'
            },
            { 
                id: 'd', 
                label: 'd', 
                beforeText: '',
                afterText: "n'aime pas danser.",
                correctAnswer: 'Elle'
            },
        ],
    },
];

export default function Q14() {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [completedExercises, setCompletedExercises] = useState({});
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const initialAnswers = {};
        const initialCompleted = {};
        exercises[0].options.forEach(opt => {
            initialAnswers[opt.id] = null;
            initialCompleted[opt.id] = null;
        });
        setSelectedAnswers(initialAnswers);
        setCompletedExercises(initialCompleted);
    }, []);

    const handleWordClick = (optionId, word) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [optionId]: word
        }));
        setCompletedExercises(prev => ({
            ...prev,
            [optionId]: null
        }));
    };

    const handleReset = () => {
        const resetAnswers = {};
        const resetCompleted = {};
        exercises[0].options.forEach(opt => {
            resetAnswers[opt.id] = null;
            resetCompleted[opt.id] = null;
        });
        setSelectedAnswers(resetAnswers);
        setCompletedExercises(resetCompleted);
        setShowAnswer(false);
    };

    const handleShowAnswerAll = () => {
        const answers = {};
        const completed = {};
        exercises[0].options.forEach(opt => {
            answers[opt.id] = opt.correctAnswer;
            completed[opt.id] = true;
        });
        setSelectedAnswers(answers);
        setCompletedExercises(completed);
        setShowAnswer(true);
    };

    const handleCheckAll = () => {
        let correctCount = 0;
        let emptyCount = 0;
        const feedback = {};

        exercises[0].options.forEach(opt => {
            const answer = selectedAnswers[opt.id];
            if (!answer) {
                emptyCount++;
                feedback[opt.id] = null;
            } else if (answer === opt.correctAnswer) {
                correctCount++;
                feedback[opt.id] = true;
            } else {
                feedback[opt.id] = false;
            }
        });

        setCompletedExercises(feedback);

        if (emptyCount > 0) {
            ValidationAlert.warning('');
        } else if (correctCount === exercises[0].options.length) {
            ValidationAlert.success(`${correctCount}/${exercises[0].options.length}`);
        } else {
            ValidationAlert.error(`${correctCount}/${exercises[0].options.length}`);
        }
    };

    const getWordStyle = (optionId, word, isSelected) => {
        const baseStyle = "px-4 py-2 mx-1 rounded-full font-bold cursor-pointer transition-all inline-block";
        
        if (completedExercises[optionId] !== null) {
            // بعد التحقق
            if (isSelected) {
                return `${baseStyle} ${completedExercises[optionId] 
                    ? 'bg-green-500 text-white ring-4 ring-green-300' 
                    : 'bg-red-500 text-white ring-4 ring-red-300'}`;
            }
        } else if (isSelected) {
            // مختار بس ما تم التحقق بعد
            return `${baseStyle} ${word === 'Il' 
                ? 'bg-blue-500 text-white ring-4 ring-blue-300' 
                : 'bg-orange-500 text-white ring-4 ring-orange-300'}`;
        }
        
        // غير مختار
        return `${baseStyle} ${word === 'Il' 
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-300' 
            : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-2 border-orange-300'}`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-6xl ">
                <div className="rounded-2xl p-6 md:p-8 mb-8">
                    {/* Characters Section */}
                    <div className="flex justify-center gap-8 mb-8">
                        {exercises[0] && (
                            <>
                                <div className="flex flex-col items-center">
                                    <div className="rounded-xl p-4 w-50 h-40 flex items-center justify-center">
                                        <img
                                            src={exercises[0].character1Image}
                                            alt="Character 1"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className="mt-2 font-bold text-blue-600">Il</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="rounded-xl p-4 w-50 h-40 flex items-center justify-center">
                                        <img
                                            src={exercises[0].character2Image}
                                            alt="Character 2"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className="mt-2 font-bold text-orange-600">Elle</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Options */}
                    <div className="flex flex-col items-center space-y-6 mb-8">
                        {exercises[0].options.map(option => (
                            <div key={option.id} className="w-full max-w-3xl">
                                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-blue-400 font-bold text-gray-600 flex-shrink-0">
                                            {option.label}
                                        </span>
                                    </div>
                                    <div className="text-lg flex flex-wrap items-center gap-2">
                                        {option.beforeText && (
                                            <span className="text-gray-800">{option.beforeText}</span>
                                        )}
                                        
                                        <span
                                            onClick={() => handleWordClick(option.id, 'Il')}
                                            className={getWordStyle(option.id, 'Il', selectedAnswers[option.id] === 'Il')}
                                        >
                                            Il
                                        </span>
                                        
                                        <span
                                            onClick={() => handleWordClick(option.id, 'Elle')}
                                            className={getWordStyle(option.id, 'Elle', selectedAnswers[option.id] === 'Elle')}
                                        >
                                            Elle
                                        </span>
                                        
                                        <span className="text-gray-800 font-medium">{option.afterText}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                   
                </div>
            </div>
             {/* Buttons */}
                    <div className="popup-buttons">
                        <button
                            className="try-again-button"
                            onClick={handleReset}
                        >
                            Recommencer ↻
                        </button>
                        <button
                            className="show-answer-btn"
                            onClick={handleShowAnswerAll}
                        >
                            Afficher la réponse
                        </button>
                        <button
                            className="check-button2"
                            onClick={handleCheckAll}
                        >
                            Vérifier la réponse ✓
                        </button>
                    </div>
        </div>
    );
}