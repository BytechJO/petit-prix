import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const exercises = [
    {
        id: 'exercise1',
        image: '/assets/workbook/unit2/page16/1.svg',
        letters: ['O', 'L', 'O', 'T', 'F', 'E'],
        correctAnswer: 'FOOTLE',
        hint: "J'aime le...",
    },
    {
        id: 'exercise2',
        image: '/assets/workbook/unit2/page16/2.svg',
        letters: ['L', 'V', 'L', 'Y', 'O', 'E'],
        correctAnswer: 'VOLLEY',
        hint: "J'aime le...",
    },
];

export default function Q11() {
    const [selectedLetters, setSelectedLetters] = useState(
        exercises.map(() => [])
    );

    const [availableLetters, setAvailableLetters] = useState(
        exercises.map(ex => [...ex.letters].sort(() => Math.random() - 0.5))
    );

    const [feedback, setFeedback] = useState(
        exercises.map(() => null)
    );

    const handleLetterClick = (exIndex, letter, index) => {
        const a = [...availableLetters];
        const s = [...selectedLetters];

        a[exIndex] = a[exIndex].filter((_, i) => i !== index);
        s[exIndex] = [...s[exIndex], letter];

        setAvailableLetters(a);
        setSelectedLetters(s);

        setFeedback(prev => {
            const f = [...prev];
            f[exIndex] = null;
            return f;
        });
    };

    const handleSelectedLetterClick = (exIndex, index) => {
        const s = [...selectedLetters];
        const a = [...availableLetters];

        const letter = s[exIndex][index];
        s[exIndex] = s[exIndex].filter((_, i) => i !== index);
        a[exIndex] = [...a[exIndex], letter];

        setSelectedLetters(s);
        setAvailableLetters(a);

        setFeedback(prev => {
            const f = [...prev];
            f[exIndex] = null;
            return f;
        });
    };

    const handleCheckAll = () => {
        const f = [...feedback];
        let correctCount = 0;
        let emptyCount = 0;

        exercises.forEach((ex, i) => {
            const answer = selectedLetters[i].join('');
            if (!answer) {
                f[i] = null; // علامة للحقل الفاضي
                emptyCount++;
            } else if (answer === ex.correctAnswer) {
                f[i] = 'correct';
                correctCount++;
            } else {
                f[i] = 'incorrect';
            }
        });

        setFeedback(f);

        if (emptyCount > 0) {
            // يوجد حقل فاضي
            ValidationAlert.warning();
        } else if (correctCount === exercises.length) {
            // كل الحقول صحيحة
            ValidationAlert.success(`${correctCount}/${exercises.length}`);
        } else {
            // كل الحقول مليانة بس فيها أخطاء
            ValidationAlert.error(`${correctCount}/${exercises.length}`);
        }
    };



    const handleResetAll = () => {
        setSelectedLetters(exercises.map(() => []));
        setAvailableLetters(exercises.map(ex => [...ex.letters].sort(() => Math.random() - 0.5)));
        setFeedback(exercises.map(() => null));
    };

    const handleShowAnswerAll = () => {
        setSelectedLetters(exercises.map(ex => ex.correctAnswer.split('')));
        setAvailableLetters(exercises.map(() => []));
        setFeedback(exercises.map(() => 'correct'));
    };

    return (
        <div className="overflow-auto p-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

                {exercises.map((exercise, exIndex) => (
                    <div key={exercise.id} className="rounded-2xl p-6">

                        <div className="flex justify-center mb-4">
                            <img
                                src={exercise.image}
                                alt=""
                                className="max-h-[160px]"
                            />
                        </div>

                        <p className="font-semibold text-gray-600 mb-3 uppercase">
                            {exercise.hint}
                        </p>

                        <div className="border-2 border-pink-300 rounded-xl p-4 mb-4 min-h-[64px] flex justify-center items-center">
                            <div className="flex gap-2 ">
                                {selectedLetters[exIndex].length ? (
                                    selectedLetters[exIndex].map((letter, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectedLetterClick(exIndex, index)}
                                            className="text-pink-600 font-bold text-xl w-12 h-12 cursor-pointer"
                                        >
                                            {letter}
                                        </button>
                                    ))
                                ) : (
                                    <span className="text-gray-400">Cliquez sur les lettres</span>
                                )}
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 mb-4">
                            <div className="flex gap-3 justify-center flex-wrap">
                                {availableLetters[exIndex].map((letter, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleLetterClick(exIndex, letter, index)}
                                        className="bg-white border-2 border-blue-400 text-blue-600 font-bold text-xl w-14 h-14 rounded-lg cursor-pointer"
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="popup-buttons mt-4 flex gap-4">
                <button className="try-again-button" onClick={handleResetAll}>
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
    );
}
