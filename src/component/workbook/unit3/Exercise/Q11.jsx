import React, { useState } from 'react';
import './Q11.css';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/workbook/unit3/page23/1.svg';
const img2 = '/assets/workbook/unit3/page23/2.svg';
const img3 = '/assets/workbook/unit3/page23/3.svg';

//first element
const _ = '/assets/workbook/unit3/page23/1--.svg';
const a1 = '/assets/workbook/unit3/page23/1-a.svg';
const d1 = '/assets/workbook/unit3/page23/1-d.svg';
const e1 = '/assets/workbook/unit3/page23/1-e.svg';
const ee1 = '/assets/workbook/unit3/page23/1-ee.svg';
const eee1 = '/assets/workbook/unit3/page23/1-ee.svg';
const eeee1 = '/assets/workbook/unit3/page23/1-ee.svg';
const g1 = '/assets/workbook/unit3/page23/1-g.svg';
const gg1 = '/assets/workbook/unit3/page23/1-g.svg';
const m1 = '/assets/workbook/unit3/page23/1-m.svg';
const n1 = '/assets/workbook/unit3/page23/1-n.svg';
const nn1 = '/assets/workbook/unit3/page23/1-n.svg';
const r1 = '/assets/workbook/unit3/page23/1-r.svg';
const rr1 = '/assets/workbook/unit3/page23/1-r.svg';
//2th elemnt
const a2 = '/assets/workbook/unit3/page23/2-a.svg';
const e2 = '/assets/workbook/unit3/page23/2-e.svg';
const ee2 = '/assets/workbook/unit3/page23/2-e.svg';
const ee22 = '/assets/workbook/unit3/page23/2-ee.svg';
const ee23 = '/assets/workbook/unit3/page23/2-ee.svg';
const ee24 = '/assets/workbook/unit3/page23/2-ee.svg';
const f2 = '/assets/workbook/unit3/page23/2-f.svg';
const f22 = '/assets/workbook/unit3/page23/2-f.svg';
const n2 = '/assets/workbook/unit3/page23/2-n.svg';
const n22 = '/assets/workbook/unit3/page23/2-n.svg';
const r2  = '/assets/workbook/unit3/page23/2-r.svg';
const r22 = '/assets/workbook/unit3/page23/2-r.svg';
const r23 = '/assets/workbook/unit3/page23/2-r.svg';
const r24 = '/assets/workbook/unit3/page23/2-r.svg';
//3th element
const d3 = '/assets/workbook/unit3/page23/3-d.svg';
const e3 = '/assets/workbook/unit3/page23/3-e.svg';
const ee3 = '/assets/workbook/unit3/page23/3-ee.svg';
const ee32 = '/assets/workbook/unit3/page23/3-ee.svg';
const ee33 = '/assets/workbook/unit3/page23/3-ee.svg';
const g3 = '/assets/workbook/unit3/page23/3-g.svg';
const m3 = '/assets/workbook/unit3/page23/3-m.svg';
const n3 = '/assets/workbook/unit3/page23/3-n.svg';
const n32 = '/assets/workbook/unit3/page23/3-n.svg';
const p3 = '/assets/workbook/unit3/page23/3-p.svg';
const p32 = '/assets/workbook/unit3/page23/3-p.svg';
const r3 = '/assets/workbook/unit3/page23/3-r.svg';
const r32 = '/assets/workbook/unit3/page23/3-r.svg';
const r33 = '/assets/workbook/unit3/page23/3-r.svg';

const exerciseData = [
    {
        id: 'livre',
        image: img1,
        correctWord: 'rand-mère',
        letters: [
            { src: _, char: '-' },
            { src: a1, char: 'a' },
            { src: d1, char: 'd' },
            { src: e1, char: 'e' },
            { src: ee1, char: 'è' },
            { src: eee1, char: 'è' },
            { src: eeee1, char: 'è' },
            { src: g1, char: 'g' },
            { src: gg1, char: 'g' },
            { src: m1, char: 'm' },
            { src: n1, char: 'n' },
            { src: nn1, char: 'n' },
            { src: r1, char: 'r' },
            { src: rr1, char: 'r' }
        ],
    },
    {
        id: 'regle',
        image: img2,
        correctWord: 'frére',
        letters: [
            { src: a2, char: 'a' },
            { src: e2, char: 'e' },
            { src: ee2, char: 'é' },
            { src: ee22, char: 'é' },
            { src: ee23, char: 'é' },
            { src: ee24, char: 'é' },
            { src: f2, char: 'f' },
            { src: f22, char: 'f' },
            { src: n2, char: 'n' },
            { src: n22, char: 'n' },
            { src: r2, char: 'r' },
            { src: r22, char: 'r' },
            { src: r23, char: 'r' },
            { src: r24, char: 'r' },
        ],
    },
    {
        id: 'gomme',
        image: img3,
        correctWord: 'pére',
        letters: [
            { src: d3, char: 'd' },
            { src: e3, char: 'e' },
            { src: ee3, char: 'é' },
            { src: ee32, char: 'é' },
            { src: ee33, char: 'é' },
            { src: g3, char: 'g' },
            { src: m3, char: 'm' },
            { src: n3, char: 'n' },
            { src: n32, char: 'n' },
            { src: p3, char: 'p' },
            { src: p32, char: 'p' },
            { src: r3, char: 'r' },
            { src: r32, char: 'r' },
            { src: r33, char: 'r' },
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
            ValidationAlert.success(`${score}/3`);
        } else {
            ValidationAlert.error(`${score}/3`);
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
