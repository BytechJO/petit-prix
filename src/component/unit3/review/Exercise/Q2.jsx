import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';
// --- مسارات الصور ---
const img1 = '/assets/unit3/review/page36/1.svg';
const img2 = '/assets/unit3/review/page36/2.svg';
const img3 = '/assets/unit3/review/page36/3.svg';
const img4 = '/assets/unit3/review/page36/4.svg';
const img5 = '/assets/unit3/review/page36/5.svg';
const img6 = '/assets/unit3/review/page36/6.svg';
const img7 = '/assets/unit3/review/page36/7.svg';

const treeBgImage = '/assets/unit3/review/page36/tree.svg';

const familyMembers = [
    { id: 'theo', img: img1, correctName: 'Théo', style: { top: '2%', left: '18%' } },
    { id: 'roger', img: img2, correctName: 'Roger', style: { top: '38%', left: '-20%' } },
    { id: 'marie', img: img3, correctName: 'Marie', style: { top: '67%', left: '18%' } },
    { id: 'anna', img: img4, correctName: 'Louis', style: { top: '2%', left: '70%' } }, // تم تصحيح الاسم من Louis إلى Anna
    { id: 'louis', img: img5, correctName: 'Anna', style: { top: '38%', left: '100%' } }, // تم تصحيح الاسم من Anna إلى Louis
    { id: 'lili', img: img6, correctName: 'Lili', style: { top: '67%', left: '70%' } },
    { id: 'leo', img: img7, correctName: 'Léo', style: { top: '85%', left: '43%' } },
];

const Q2 = () => {
    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState({});

    const handleInputChange = (id, value) => {
        setInputs(prev => ({ ...prev, [id]: value }));
        if (results[id]) {
            setResults(prev => ({ ...prev, [id]: null }));
        }
    };

    const checkAnswers = () => {
    let correctCount = 0;

    const newResults = {};

    familyMembers.forEach(member => {
        if (inputs[member.id]?.trim().toLowerCase() === member.correctName.toLowerCase()) {
            newResults[member.id] = 'correct';
            correctCount++;
        } else {
            newResults[member.id] = 'incorrect';
        }
    });

    setResults(newResults);

    // حساب score
    const total = familyMembers.length;
    const scoreMessage = `${correctCount} / ${total}`;

    // عرض التنبيه المناسب
    if (correctCount === total) {
        ValidationAlert.success(scoreMessage);
    } else if (correctCount === 0) {
        ValidationAl(scoreMessage);
    } else {
        ValidationAlert.error(scoreMessage);
    }
};


    const reset = () => {
        setInputs({});
        setResults({});
    };
    const handleShowAnswer = () => {
        const newInputs = {};
        const newResults = {};

        familyMembers.forEach(member => {
            newInputs[member.id] = member.correctName; // املأ الاسم الصحيح
            newResults[member.id] = 'correct';         // لوّن أخضر
        });

        setInputs(newInputs);
        setResults(newResults);
    };

    const getBorderColor = (id) => {
        if (results[id] === 'correct') return 'border-green-500';
        if (results[id] === 'incorrect') return 'border-red-500';
        return 'border-gray-300';
    };

    return (
        // استخدمنا flex فقط لتوسيط الحاوية الرئيسية في الصفحة
        <div className="flex justify-center">
            <div
                className="relative w-[650px] h-[900px] bg-contain bg-no-repeat bg-center mb-10"
                style={{ backgroundImage: `url(${treeBgImage})` }}
            >

                {familyMembers.map(member => (
                    <div key={member.id} className="absolute text-center" style={member.style}>
                        <div className="relative w-28 h-28">
                            <div className="absolute inset-0 border-4 border-dashed border-green-400 rounded-full"></div>
                            <img src={member.img} alt={member.correctName} className="max-w-full max-h-full object-contain p-2" />
                        </div>
                        <input
                            type="text"
                            value={inputs[member.id] || ''}
                            onChange={(e) => handleInputChange(member.id, e.target.value)}
                            className={`mt-2 w-24 p-1 text-center font-bold border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${getBorderColor(member.id)}`}
                            placeholder={['Théo', 'Anna'].includes(member.correctName) ? member.correctName : ''}
                            disabled={['Théo', 'Anna'].includes(member.correctName)}
                        />
                    </div>
                ))}
            </div>
            <div className="popup-buttons mt-4 flex gap-4">
                <button className="try-again-button" onClick={reset}>
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

export default Q2;
