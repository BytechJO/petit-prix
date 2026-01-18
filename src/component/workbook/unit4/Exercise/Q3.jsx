import React, { useState, useEffect } from 'react';
import { Check, X, Eye, RotateCcw, CheckCircle2 } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert';

export default function SentenceOrder() {
    const sentences = [
        {
            id: 'a',
            label: 'a',
            words: ['tu', 'Quel', 'as', '-', 'âge', '?'],
            correctOrder: ['Quel', 'âge', 'as', '-', 'tu', '?'],
            correctSentence: 'Quel âge as-tu ?'
        },
        {
            id: 'b',
            label: 'b',
            words: ['dix', "J'", 'ans', '.', 'ai'],
            correctOrder: ["J'", 'ai', 'dix', 'ans', '.'],
            correctSentence: "J'ai dix ans."
        },
        {
            id: 'c',
            label: 'c',
            words: ['neuf', 'Mon', 'a', 'ans', '.', 'amie'],
            correctOrder: ['Mon', 'amie', 'a', 'neuf', 'ans', '.'],
            correctSentence: 'Mon amie a neuf ans.'
        }
    ];

    const [userAnswers, setUserAnswers] = useState({
        a: [],
        b: [],
        c: []
    });

    const [availableWords, setAvailableWords] = useState({
        a: [...sentences[0].words],
        b: [...sentences[1].words],
        c: [...sentences[2].words]
    });

    const [showAnswers, setShowAnswers] = useState({});
    const [allChecked, setAllChecked] = useState(false);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        // Shuffle words initially
        setAvailableWords({
            a: shuffleArray(sentences[0].words),
            b: shuffleArray(sentences[1].words),
            c: shuffleArray(sentences[2].words)
        });
    }, []);

    const handleWordClick = (sentenceId, word) => {
        // Add word to user answer
        setUserAnswers(prev => ({
            ...prev,
            [sentenceId]: [...prev[sentenceId], word]
        }));

        // Remove word from available words
        setAvailableWords(prev => ({
            ...prev,
            [sentenceId]: prev[sentenceId].filter((w, i) =>
                i !== prev[sentenceId].indexOf(word)
            )
        }));
        setAllChecked(false);
    };

    const handleRemoveWord = (sentenceId, index) => {
        const word = userAnswers[sentenceId][index];

        // Remove from user answer
        setUserAnswers(prev => ({
            ...prev,
            [sentenceId]: prev[sentenceId].filter((_, i) => i !== index)
        }));

        // Add back to available words
        setAvailableWords(prev => ({
            ...prev,
            [sentenceId]: [...prev[sentenceId], word]
        }));

        // Clear checked state

        setAllChecked(false);
    };

    const checkAnswers = () => {
        // تحقق أن جميع الجمل مكتملة
        const incomplete = sentences.some(
            s => userAnswers[s.id].length !== s.words.length
        );

        if (incomplete) {
            ValidationAlert.warning(
                'Attention !',
                'Veuillez compléter toutes les phrases.'
            );
            return;
        }

        let correctCount = 0;

        sentences.forEach(sentence => {
            const userAnswer = userAnswers[sentence.id].join(' ');
            const correctAnswer = sentence.correctOrder.join(' ');
            if (userAnswer === correctAnswer) {
                correctCount++;
            }
        });

        const total = sentences.length;

        setAllChecked(true);

        if (correctCount === total) {
            ValidationAlert.success(
                `${correctCount} / ${total}`
            );
        } else {
            ValidationAlert.error(
                `${correctCount} / ${total}`
            );
        }
    };


    const handleShowAnswer = () => {
        const newShowAnswers = {};
        const newUserAnswers = {};

        sentences.forEach(sentence => {
            newShowAnswers[sentence.id] = true;
            newUserAnswers[sentence.id] = [...sentence.correctOrder];
        });

        setShowAnswers(newShowAnswers);
        setUserAnswers(newUserAnswers);
        setAvailableWords({
            a: [],
            b: [],
            c: []
        });

        // Auto check after showing answers
        const results = {};
        sentences.forEach(sentence => {
            results[sentence.id] = true;
        });
        setAllChecked(true);
    };

    const handleTryAgain = () => {
        setUserAnswers({
            a: [],
            b: [],
            c: []
        });
        setAvailableWords({
            a: shuffleArray(sentences[0].words),
            b: shuffleArray(sentences[1].words),
            c: shuffleArray(sentences[2].words)
        });
        setShowAnswers({});
        setAllChecked(false);
    };

    const allAnswersComplete = Object.values(userAnswers).every(
        (answer, index) => answer.length === sentences[index].words.length
    );


    return (
        <div className="min-h-screen p-8">
            <div className="max-w-3xl mx-auto lg:ml-95">

                {/* Sentences */}
                <div className="space-y-6 mb-8">
                    {sentences.map((sentence, idx) => (
                        <div
                            key={sentence.id}
                            className={`rounded-2xl p-6 transition-all duration-300`}
                            style={{
                                animation: `slideIn 0.6s ease-out ${idx * 0.1}s backwards`
                            }}
                        >
                            {/* Sentence Label */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-indigo-100 text-indigo-700 font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    {sentence.label}
                                </div>

                            </div>

                            {/* Available Words */}
                            {availableWords[sentence.id].length > 0 && (
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {availableWords[sentence.id].map((word, index) => (
                                            <button
                                                key={`${word}-${index}`}
                                                onClick={() => handleWordClick(sentence.id, word)}
                                                className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-lg"
                                            >
                                                {word}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* User Answer Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[80px] bg-gray-50">
                                {userAnswers[sentence.id].length === 0 ? (
                                    <p className="text-gray-400 text-center italic text-lg py-4">
                                        Clique sur les mots ci-dessus pour construire la phrase...
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {userAnswers[sentence.id].map((word, index) => (
                                            <button
                                                key={`answer-${word}-${index}`}
                                                onClick={() => handleRemoveWord(sentence.id, index)}
                                                className="bg-gradient-to-br from-purple-500 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-lg"
                                            >
                                                {word}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>


                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="popup-buttons shrink-0 flex gap-4 justify-center flex-wrap">
                    <button className="try-again-button" onClick={handleTryAgain}>
                        Recommencer
                    </button>
                    <button className="show-answer-btn" onClick={handleShowAnswer}>
                        Afficher la réponse
                    </button>
                    <button
                        className="check-button2"
                        onClick={checkAnswers}
                        style={{
                            opacity: 1,
                            cursor: 'pointer'
                        }}
                    >
                        Vérifier la réponse
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
      `}</style>
        </div>
    );
}