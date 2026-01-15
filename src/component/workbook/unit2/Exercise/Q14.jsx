import React, { useState, useEffect } from 'react';
import { Volume2, Check, X, RotateCcw } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert'; // تأكد أن المسار صحيح

const exercises = [
    {
        id: 'exercise1',
        character1Image: '/assets/unit2/review/page26/ch1.svg',
        character2Image: '/assets/unit2/review/page26/ch2.svg',
        options: [
            { id: 'a', label: 'a', text: 'Il     Elle aime jouer aux jeux vidéo.' },
            { id: 'b', label: 'b', text: 'Il     Elle déteste dessiner.' },
            { id: 'c', label: 'c', text: 'Il     Elle aime nager.' },
            { id: 'd', label: 'd', text: "Il     Elle n'aime pas danser." },
        ],
        correctAnswerId: 'a',
    },
    //   {
    //     id: 'exercise2',
    //     character1Image: '/assets/unit2/review/page26/char3.svg',
    //     character2Image: '/assets/unit2/review/page26/char4.svg',
    //     options: [
    //       { id: 'a', label: 'a', text: 'Il aime lire des livres.' },
    //       { id: 'b', label: 'b', text: 'Il aime jouer au football.' },
    //       { id: 'c', label: 'c', text: 'Il déteste danser.' },
    //       { id: 'd', label: 'd', text: "Il n'aime pas nager." },
    //     ],
    //     correctAnswerId: 'b',
    //   },
];

export default function Q14() {
    const [currentExercise, setCurrentExercise] = useState(0);
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
            ValidationAlert.warning('');
        } else if (correctCount === exercises.length) {
            ValidationAlert.success(`${correctCount}/${exercises.length}`);
        } else {
            ValidationAlert.error(`${correctCount}/${exercises.length}`);
        }
    };

    return (
        <div className="min-h-screen ">
            <div className="max-w-6xl mx-auto lg:mr-80">

                {/* Main Content */}
                <div className="rounded-2xl p-6 md:p-8 mb-8">
                    {/* Characters Section */}
                    <div className="flex justify-center gap-8 mb-8">
                        {exercises[currentExercise] && (
                            <>
                                <div className="flex flex-col items-center">
                                    <div className="rounded-xl p-4 w-50 h-40 flex items-center justify-center">
                                        <img
                                            src={exercises[currentExercise].character1Image}
                                            alt="Character 1"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="rounded-xl p-4 w-50 h-40 flex items-center justify-center">
                                        <img
                                            src={exercises[currentExercise].character2Image}
                                            alt="Character 2"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Options */}
                    <div className="flex flex-col items-center space-y-5 mb-8">
                        {exercises.map((exercise, exIndex) => (
                            <div key={exercise.id} className="w-full flex flex-col items-center space-y-3">
                                {exercise.options.map(option => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionClick(exIndex, option.id)}
                                        className={`w-80 p-4 rounded-lg transition-all text-left flex items-start gap-3 cursor-pointer
                      ${selectedAnswers[exIndex] === option.id
                                                ? completedExercises[exIndex]
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-red-500 bg-red-50'
                                                : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                                            }`}
                                    >
                                        <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-blue-400 font-bold text-gray-600 flex-shrink-0 mt-1">
                                            {option.label}
                                        </span>
                                        <span className="text-gray-800 font-medium flex-grow">{option.text}</span>
                                    </button>
                                ))}
                            </div>
                        ))}
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
            </div>
        </div>
    );
}
