import React, { useState } from 'react';
import '../../unit2/Exercise/Q1.css';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/workbook/unit2/page11/1.svg';
const img2 = '/assets/workbook/unit2/page11/2.svg';
const img3 = '/assets/workbook/unit2/page11/3.svg';

const exerciseData = [
    {
        id: 'livre',
        image: img1,
        correctWord: 'livre',
        letters: ['g', 'n', 'é', 'g', 'r', 'a', 'n', 'd', '-', 'm', 'è', 'r', 'e', 'é'],
    },
    {
        id: 'regle',
        image: img2,
        correctWord: 'règle',
        letters: ['f', 'r', 'é', 'e', 'r', 'a', 'n', 'f', 'r', 'é', 'r', 'e', 'n', 'é'],
    },
    {
        id: 'gomme',
        image: img3,
        correctWord: 'gomme',
        letters: ['g', 'r', 'é', 'p', 'é', 'r', 'n', 'd', 'm', 'p', 'è', 'r', 'e', 'n'],
    },
];

const WordRow = ({ image, correctWord, letters, resetTrigger, showAnswerTrigger, onResult }) => {
    const [clickedLetters, setClickedLetters] = useState([]);

    // إعادة المحاولة
    React.useEffect(() => {
        setClickedLetters([]);
    }, [resetTrigger]);

    // إظهار الإجابة
    React.useEffect(() => {
        if (!showAnswerTrigger) return;

        const correctIndexes = [];
        const used = {};

        letters.forEach((letter, index) => {
            if (correctWord.includes(letter)) {
                correctIndexes.push({ index, status: 'correct' });
            }
        });

        setClickedLetters(correctIndexes);
    }, [showAnswerTrigger]);

    const handleLetterClick = (letter, index) => {
        if (clickedLetters.some(item => item.index === index)) return;

        const isCorrect = correctWord.includes(letter);
        setClickedLetters(prev => [...prev, { index, status: isCorrect ? 'correct' : 'incorrect' }]);
    };

    // التحقق
    React.useEffect(() => {
        const correctCount = correctWord.length;
        const selectedCorrect = clickedLetters.filter(l => l.status === 'correct').length;

        if (onResult) {
            onResult(selectedCorrect === correctCount);
        }
    }, [clickedLetters]);

    const getLetterClassName = (index) => {
        const clicked = clickedLetters.find(item => item.index === index);
        if (!clicked) return 'letter-box';
        return `letter-box ${clicked.status}`;
    };

    return (
        <div className="word-row">
            <img src={image} alt={correctWord} className="item-image" />
            <div className="letters-wrapper">
                {letters.map((letter, index) => (
                    <div
                        key={index}
                        className={getLetterClassName(index)}
                        onClick={() => handleLetterClick(letter, index)}
                    >
                        {letter}
                    </div>
                ))}
            </div>
        </div>
    );
};



// --- المكون الرئيسي للتمرين ---
const Q10 = () => {

    const [resetTrigger, setResetTrigger] = useState(0);
    const [showAnswerTrigger, setShowAnswerTrigger] = useState(0);
    const [results, setResults] = useState([]);

    const handleTryAgain = () => {
        setResetTrigger(prev => prev + 1);
        setResults([]);
    };

    const handleShowAnswer = () => {
        setShowAnswerTrigger(prev => prev + 1);
    };

    const checkAnswers = () => {
        const total = exerciseData.length; // عدد الكلمات
        const correctCount = results.filter(r => r === true).length;

        // حساب العلامة من 5
        const score = Math.round((correctCount / total) * 3);

        if (correctCount === total) {
            ValidationAlert.success(score);
        } else {
            ValidationAlert.error(score);
        }
    };


    const handleResult = (index, isCorrect) => {
        setResults(prev => {
            const updated = [...prev];
            updated[index] = isCorrect;
            return updated;
        });
    };

    return (
        <div className="exercise-container">
            <div className="word-rows-container">
                {exerciseData.map((data, index) => (
                    <WordRow
                        key={data.id}
                        image={data.image}
                        correctWord={data.correctWord}
                        letters={data.letters}
                        resetTrigger={resetTrigger}
                        showAnswerTrigger={showAnswerTrigger}
                        onResult={(isCorrect) => handleResult(index, isCorrect)}
                    />
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

export default Q10;
