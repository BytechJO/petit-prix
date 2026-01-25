import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const catImage = '/assets/workbook/unit3/page25/1.png';
const fishImage = '/assets/workbook/unit3/page25/2.png';
const parrotImage = '/assets/workbook/unit3/page25/3.png';
const turtleImage = '/assets/workbook/unit3/page25/4.png';

const Q17 = () => {
    const items = [
        { name: 'chat', colorClass: 'bg-pink-600', image: catImage },
        { name: 'poisson', colorClass: 'bg-green-500', image: fishImage },
        { name: 'perroquet', colorClass: 'bg-red-500', image: parrotImage },
        { name: 'tortue', colorClass: 'bg-sky-400', image: turtleImage },
    ];

    // الإجابات الصحيحة (مثال)
    const correctAnswers = {
        perroquet: 'perroquet',
        tortue: 'tortue',
        chat: 'Chat',
        poisson: 'poisson'
    };

    const [answers, setAnswers] = useState({
        perroquet: '',
        tortue: '',
        chat: '',
        poisson: ''
    });

    const handleInputChange = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleTryAgain = () => {
        setAnswers({
            perroquet: '',
            tortue: '',
            chat: '',
            poisson: ''
        });
    };

    const handleShowAnswer = () => {
        setAnswers({ ...correctAnswers });
    };

    const checkAnswers = () => {
        const keys = Object.keys(correctAnswers);
        const emptyField = keys.some(key => answers[key].trim() === '');
        if (emptyField) {
            ValidationAlert.warning('Veuillez remplir tous les champs !');
            return;
        }

        let correctCount = 0;
        keys.forEach(key => {
            if (answers[key].trim().toLowerCase() === correctAnswers[key].toLowerCase()) {
                correctCount++;
            }
        });

        if (correctCount === keys.length) {
            ValidationAlert.success(`Score: ${correctCount}/${keys.length}`);
        } else {
            ValidationAlert.error(`Score: ${correctCount}/${keys.length}`);
        }
    };

    const containerStyle = {
        backgroundSize: '100% 30px',
    };

    return (
        <div
            className="font-comic w-[900px] mx-auto my-5 p-5 relative"
            style={containerStyle}
        >
            <div className="grid grid-cols-4 gap-5 relative z-10 mt-10">
                {items.map((item) => (
                    <div key={item.name} className="flex flex-col items-center relative">
                        <div className={`text-white font-bold py-2 px-5 rounded-lg text-lg absolute -top-10 ${item.colorClass}`}>
                            {item.name}
                        </div>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="bg-white p-1 border border-gray-300 rounded-lg mt-3 w-11/12 shadow-md">
                            <input
                                type="text"
                                value={answers[item.name]}
                                onChange={(e) => handleInputChange(item.name, e.target.value)}
                                className="w-full border-none outline-none text-lg tracking-widest text-center placeholder-gray-500 focus:placeholder-transparent"
                                placeholder="................"
                            />
                        </div>
                    </div>
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

export default Q17;
