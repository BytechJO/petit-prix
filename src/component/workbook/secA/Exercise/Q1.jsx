import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const bear = "/assets/workbook/Unit1/Lesson1/L1Q1-1.svg";
const tower = "/assets/workbook/Unit1/Lesson1/L1Q1-2.svg";
const bread = "/assets/workbook/Unit1/Lesson1/L1Q1-3.svg";
const flag = "/assets/workbook/Unit1/Lesson1/L1Q1-4.svg";
const Burger = "/assets/workbook/Unit1/Lesson1/L1Q1-5.svg";

import ValidationAlert from '../../../Popup/ValidationAlert';

const images = [
    { id: 5, src: Burger, alt: 'Burger' },
    { id: 4, src: flag, alt: 'French Flag' },
    { id: 3, src: bread, alt: 'Baguette' },
    { id: 2, src: tower, alt: 'Eiffel Tower' },
    { id: 1, src: bear, alt: 'Bear' },
];



const Q1 = () => {
    const [cards, setCards] = useState(images);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleAnswer = (answer, id) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));

        setAnswers((prev) => ({ ...prev, [id]: answer }));

        setResult(answer);
        setTimeout(() => setResult(null), 500);
    };

    const activeCard = cards[cards.length - 1];


    const handleTryAgain = () => {
        setCards(images);
        setAnswers({});
        setResult(null);
    };

    const handleShowAnswer = () => {
        if (!activeCard) return;

        const frenchIds = [4, 3, 2];
        const correctAnswer = frenchIds.includes(activeCard.id) ? 'oui' : 'non';

        setResult(correctAnswer);

        setTimeout(() => setResult(null), 800);
    };

    const checkAnswers = () => {
        const frenchIds = [5, 4, 3, 2, 1];
        const totalQuestions = images.length;
        const answeredCount = Object.keys(answers).length;

        if (answeredCount === 0) {
            ValidationAlert.warning(
                "Termine toutes les cartes d'abord ⚠️",
                "encore"
            );
            return;
        }

        if (answeredCount < totalQuestions) {
            ValidationAlert.warning(
                "Termine toutes les cartes d'abord ⚠️",
                `Répondu : ${answeredCount} / ${totalQuestions}`
            );
            return;
        }

        let correct = 0;

        Object.entries(answers).forEach(([id, answer]) => {
            const isFrench = frenchIds.includes(Number(id));

            if (
                (isFrench && answer === "oui") ||
                (!isFrench && answer === "non")
            ) {
                correct++;
            }
        });

        const scoreMessage = `Score : ${correct} / ${totalQuestions}`;

        if (correct === totalQuestions) {
            ValidationAlert.success(
                "Excellent ! Toutes les réponses sont correctes 🎉",
                scoreMessage
            );
        }
        else if (correct > 0) {
            ValidationAlert.error(
                "Bon effort ! Essaie encore 💪",
                scoreMessage
            );
        }
        else {
            ValidationAlert.error(
                "Oops ! Aucune réponse correcte ❌",
                scoreMessage
            );
        }
    };




    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden p-4">

            <div className="relative w-full h-96 flex items-center justify-center">

                <div className="absolute left-18 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-[-20deg] text-red-400 border-4 border-red-400 rounded-2xl px-6 py-2 font-bold text-4xl opacity-50">NON</div>
                <div className="absolute right-18 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-[20deg] text-green-400 border-4 border-green-400 rounded-2xl px-6 py-2 font-bold text-4xl opacity-50">OUI</div>

                <AnimatePresence>
                    {cards.length > 0 ? (
                        <motion.div
                            key={activeCard.id}
                            className="absolute w-90 h-100 cursor-grab rounded-3xl"

                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(event, info) => {
                                if (info.offset.x > 100) {
                                    handleAnswer('oui', activeCard.id);
                                } else if (info.offset.x < -100) {
                                    handleAnswer('non', activeCard.id);
                                }
                            }}
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{
                                x: result === 'oui' ? 300 : -300,
                                opacity: 0,
                                scale: 0.5,
                                transition: { duration: 0.3 }
                            }}

                            style={{
                                backgroundImage: `url(${activeCard.src})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize:'cover',
                                backgroundPosition: 'center',
                            }}
                        >

                            <motion.div
                                className="w-full h-full rounded-2xl flex items-center justify-center text-4xl font-bold text-white"
                                style={{
                                    opacity: result ? 1 : 0,
                                    backgroundColor: result === 'oui' ? 'rgba(4, 120, 87, 0.7)' : 'rgba(185, 28, 28, 0.7)',
                                }}
                            >
                                {result?.toUpperCase()}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-700">Merci !</h2>
                            <p className="text-gray-500">Vous avez répondu à toutes les questions.</p>

                        </div>
                    )}
                </AnimatePresence>
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

export default Q1;
