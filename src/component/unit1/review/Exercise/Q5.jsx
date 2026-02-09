import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValidationAlert from '../../../Popup/ValidationAlert';
import { CheckCircle, XCircle } from 'lucide-react';

// بيانات الكلمات
const wordsData = [
    { image: '/assets/unit1/review/page14/ahlan.svg', isFrench: false, font: "'Pacifico', cursive" },
    { image: '/assets/unit1/review/page14/bonjour.svg', isFrench: true, font: "'Roboto', sans-serif" },
    { image: '/assets/unit1/review/page14/hello.svg', isFrench: false, font: "'Caveat', cursive" },
    { image: '/assets/unit1/review/page14/merci.svg', isFrench: true, font: "'Noto Kufi Arabic', sans-serif" },
].sort(() => Math.random() - 0.5);

// مكون الكلمة القابلة للنقر
const Word = ({ image, isFrench, font, label, onSelect, isSelected, isCorrect }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => onSelect(image, isFrench)}
            className={`
        relative p-6 m-2 rounded-2xl cursor-pointer
        transition-all duration-300 ease-in-out
        hover:shadow-xl
        ${isSelected
                    ? isCorrect
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-white shadow-emerald-100/50'
                        : 'border-rose-500 bg-gradient-to-br from-rose-50 to-white shadow-rose-100/50'
                    : 'border-sky-200 bg-gradient-to-br from-white to-sky-50 hover:border-sky-300'
                }
      `}
        >
            <div className="flex flex-col items-center gap-3">
                {/* شارة الإجابة الصحيحة/الخاطئة */}
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className={`absolute -top-2 -right-2 rounded-full p-1 shadow-lg ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                    >
                        {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                            <XCircle className="w-5 h-5 text-white" />
                        )}
                    </motion.div>
                )}

                {/* الصورة */}
                <div className={`p-4 rounded-xl ${isSelected
                        ? isCorrect ? 'bg-emerald-100' : 'bg-rose-100'
                        : 'bg-gradient-to-br from-sky-100 to-white'
                    }`}>
                    <img
                        src={image}
                        alt={label}
                        className="max-w-36 max-h-34 object-contain"
                    />
                </div>
            </div>

            {/* تأثير اهتزاز للإجابة الخاطئة */}
            {isSelected && !isCorrect && (
                <motion.div
                    animate={{
                        x: [0, -10, 10, -10, 10, 0],
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 border-2 border-rose-400 rounded-2xl pointer-events-none"
                />
            )}
        </motion.div>
    );
};

// المكون الرئيسي للتمرين
const Q5 = () => {
    const [selections, setSelections] = useState({});
    const [score, setScore] = useState(0);
    const [totalFrenchWords, setTotalFrenchWords] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        const frenchCount = wordsData.filter(w => w.isFrench).length;
        setTotalFrenchWords(frenchCount);

        // حساب النقاط الحالية
        let currentScore = 0;
        wordsData.forEach(word => {
            const userChoice = selections[word.image];
            if (userChoice?.isCorrect) currentScore++;
        });
        setScore(currentScore);
    }, [selections]);

    const handleSelectWord = (image, isFrench) => {
        if (selections[image]?.isSelected) return; // منع إعادة الاختيار

        setSelections(prev => ({
            ...prev,
            [image]: { isSelected: true, isCorrect: isFrench },
        }));

        if (!isFrench) {
            setTimeout(() => {
                setSelections(prev => {
                    const newSelections = { ...prev };
                    delete newSelections[image];
                    return newSelections;
                });
            }, 1000);
        }
    };

    const handleTryAgain = () => {
        setSelections({});
        setShowFeedback(false);
    };

    const handleShowAnswer = () => {
        const newSelections = {};
        wordsData.forEach(word => {
            newSelections[word.image] = { isSelected: true, isCorrect: word.isFrench };
        });
        setSelections(newSelections);
    };

    const checkAnswers = () => {
    const selectedCount = Object.keys(selections).length;

    if (selectedCount === 0) {
        ValidationAlert.warning("Please select at least one word");
        return;
    }

    const frenchCount = wordsData.filter(w => w.isFrench).length;

    let correctCount = 0;

    wordsData.forEach(word => {
        const userChoice = selections[word.image];
        if (userChoice?.isCorrect) correctCount++;
    });

    setShowFeedback(true);

    const msg = `${correctCount}/${frenchCount}`;

    if (correctCount === frenchCount) {
        ValidationAlert.success(msg);
    } else {
        ValidationAlert.error(msg);
    }
};


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto md:p-8"
        >


            {/* حاوية التمرين */}
            <div className="rounded-3xl md:p-8">
                {/* شبكة الكلمات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                    <AnimatePresence>
                        {wordsData.map((word, index) => (
                            <motion.div
                                key={word.image}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Word
                                    {...word}
                                    onSelect={handleSelectWord}
                                    isSelected={selections[word.image]?.isSelected || false}
                                    isCorrect={selections[word.image]?.isCorrect || false}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>


                <div className="popup-buttons shrink-0">
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
        </motion.div>
    );
};

export default Q5;