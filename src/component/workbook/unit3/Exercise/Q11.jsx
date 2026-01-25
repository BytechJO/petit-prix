import React, { useState } from 'react';
import './Q11.css';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/workbook/unit2/page11/1.svg';
const img2 = '/assets/workbook/unit2/page11/2.svg';
const img3 = '/assets/workbook/unit2/page11/3.svg';

//first element
const b1 = '/assets/workbook/unit2/page11/1-b.svg';
const e1 = '/assets/workbook/unit2/page11/1-e.svg';
const i1 = '/assets/workbook/unit2/page11/1-i.svg';
const j1 = '/assets/workbook/unit2/page11/1-j.svg';
const k1 = '/assets/workbook/unit2/page11/1-k.svg';
const l1 = '/assets/workbook/unit2/page11/1-l.svg';
const r1 = '/assets/workbook/unit2/page11/1-r.svg';
const v1 = '/assets/workbook/unit2/page11/1-v.svg';
//2th elemnt
const e2 = '/assets/workbook/unit2/page11/2-e.svg';
const ee2 = '/assets/workbook/unit2/page11/2-ee.svg';
const g2 = '/assets/workbook/unit2/page11/2-g.svg';
const k2 = '/assets/workbook/unit2/page11/2-k.svg';
const l2 = '/assets/workbook/unit2/page11/2-l.svg';
const o2 = '/assets/workbook/unit2/page11/2-o.svg';
const r2 = '/assets/workbook/unit2/page11/2-r.svg';
const z2 = '/assets/workbook/unit2/page11/2-z.svg';
//3th element
const a3 = '/assets/workbook/unit2/page11/3-a.svg';
const e3 = '/assets/workbook/unit2/page11/3-e.svg';
const g3 = '/assets/workbook/unit2/page11/3-g.svg';
const l3 = '/assets/workbook/unit2/page11/3-l.svg';
const m3 = '/assets/workbook/unit2/page11/3-m.svg';
const mm3 = '/assets/workbook/unit2/page11/3-mm.svg';
const n3 = '/assets/workbook/unit2/page11/3-n.svg';
const o3 = '/assets/workbook/unit2/page11/3-o.svg';
const r3 = '/assets/workbook/unit2/page11/3-r.svg';

const exerciseData = [
    {
        id: 'livre',
        image: img1,
        correctWord: 'livre',
        letters: [
            { src: b1, char: 'b' },
            { src: e1, char: 'e' },
            { src: i1, char: 'i' },
            { src: j1, char: 'j' },
            { src: k1, char: 'k' },
            { src: l1, char: 'l' },
            { src: r1, char: 'r' },
            { src: v1, char: 'v' }
        ],
    },
    {
        id: 'regle',
        image: img2,
        correctWord: 'règle',
        letters: [
            { src: e2, char: 'è' },
            { src: ee2, char: 'e' },
            { src: g2, char: 'g' },
            { src: k2, char: 'k' },
            { src: l2, char: 'l' },
            { src: o2, char: 'o' },
            { src: r2, char: 'r' },
            { src: z2, char: 'z' }
        ],
    },
    {
        id: 'gomme',
        image: img3,
        correctWord: 'gomme',
        letters: [
            { src: a3, char: 'a' },
            { src: e3, char: 'e' },
            { src: g3, char: 'g' },
            { src: l3, char: 'l' },
            { src: m3, char: 'm' },
            { src: mm3, char: 'm' },
            { src: n3, char: 'n' },
            { src: o3, char: 'o' },
            { src: r3, char: 'r' }
        ],
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
            if (correctWord.includes(letter.char)) {
                correctIndexes.push({ index, status: 'correct' });
            }
        });

        setClickedLetters(correctIndexes);
    }, [showAnswerTrigger]);

    const handleLetterClick = (letter, index) => {
        if (clickedLetters.some(item => item.index === index)) return;

        const isCorrect = correctWord.includes(letter.char);
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
            <img src={image} alt={correctWord} className="item1-image1" />
            <div className="letters-wrapper">
                {letters.map((letter, index) => (
                    <img
                        key={index}
                        className={getLetterClassName(index)}
                        onClick={() => handleLetterClick(letter, index)}
                        src={letter.src}
                    />
                ))}
            </div>
        </div>
    );
};



// --- المكون الرئيسي للتمرين ---
const Q11 = () => {

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
        <>
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
            </>
    );
};

export default Q11;
