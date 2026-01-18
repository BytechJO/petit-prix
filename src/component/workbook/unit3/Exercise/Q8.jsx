import React, { useState, useEffect } from 'react';
import { Volume2, Check, X, RotateCcw } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const exercises = [
    {
        id: 'exercise1',
        character1Image: '/assets/workbook/unit3/page22/1.svg',
        character2Image: '/assets/workbook/unit3/page22/2.svg',
        options: [
            { id: 'a', label: 'a', text: 'Il     Elle a deux frères.' },
            { id: 'b', label: 'b', text: 'Il     Elle a une soeur et un frère.' },
            { id: 'c', label: 'c', text: 'Il     Elle a trois soeurs.' },
            { id: 'd', label: 'd', text: "Il     Elle a trois soeurs." },
        ],
        correctAnswerId: 'a',
    },
];

export default function Q8() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [completedExercises, setCompletedExercises] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        setSelectedAnswers(new Array(exercises.length).fill(null));
        setCompletedExercises(new Array(exercises.length).fill(false));
    }, []);

    const handleOptionClick = (exerciseIndex, optionId) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[exerciseIndex] = optionId;
        setSelectedAnswers(newAnswers);
    };

    const handleReset = () => {
        setSelectedAnswers(new Array(exercises.length).fill(null));
        setCompletedExercises(new Array(exercises.length).fill(false));
        setShowAnswer(false);
    };

    const handleShowAnswerAll = () => {
        const answers = exercises.map(ex => ex.correctAnswerId);
        setSelectedAnswers(answers);
        setCompletedExercises(new Array(exercises.length).fill(true));
        setShowAnswer(true);
    };

    const handleCheckAll = () => {
        let correctCount = 0;
        let emptyCount = 0;

        const feedback = exercises.map((ex, i) => {
            const answer = selectedAnswers[i];
            if (!answer) {
                emptyCount++;
                return false;
            }
            if (answer === ex.correctAnswerId) {
                correctCount++;
                return true;
            }
            return false;
        });

        setCompletedExercises(feedback);

        if (emptyCount > 0) {
            ValidationAlert.warning('Veuillez remplir tous les champs!');
        } else if (correctCount === exercises.length) {
            ValidationAlert.success(`${correctCount}/${exercises.length}`);
        } else {
            ValidationAlert.error(`${correctCount}/${exercises.length}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl p-6 space-y-8">

                {exercises.map((exercise, exIndex) => (
                    <div key={exercise.id} className="space-y-15">

                        {/* صور الشخصيات */}
                        <div className="flex justify-center gap-40">
                            <div className="w-60 h-40 rounded-xl flex items-center justify-center">
                                <img src={exercise.character1Image} alt="Character 1" className="w-full h-full object-contain" />
                            </div>
                            <div className="w-60 h-40 rounded-xl flex items-center justify-center">
                                <img src={exercise.character2Image} alt="Character 2" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        {/* خيارات التمرين */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {exercise.options.map(option => {
                                const isSelected = selectedAnswers[exIndex] === option.id;
                                const isCorrect = completedExercises[exIndex];
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionClick(exIndex, option.id)}
                                        className={`flex items-center gap-3 p-4 rounded-lg text-left transition cursor-pointer
                                            ${isSelected
                                                ? isCorrect
                                                    ? 'border-2 border-green-500 bg-green-50'
                                                    : 'border-2 border-red-500 bg-red-50'
                                                : ' bg-white hover:bg-blue-50 hover:border-blue-400'}
                                        `}
                                    >
                                        <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-blue-400 font-bold text-gray-600 flex-shrink-0">
                                            {option.label}
                                        </span>
                                        <span className="text-gray-800">{option.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* الأزرار */}
                <div className="popup-buttons">
                    <button className="try-again-button" onClick={handleReset}>
                        Recommencer ↻
                    </button>
                    <button className="show-answer-btn" onClick={handleShowAnswerAll}>
                        Afficher la réponse
                    </button>
                    <button className="check-button2" onClick={handleCheckAll}>
                        Vérifier la réponse ✓
                    </button>
                </div>
            </div>
        </div>
    );
}
