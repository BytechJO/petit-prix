import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const catImage = '/assets/unit3/secA/page33/01.png';
const fishImage = '/assets/unit3/secA/page33/01.png';
const parrotImage = '/assets/unit3/secA/page33/01.png';
const turtleImage = '/assets/unit3/secA/page33/01.png';







const Q17 = () => {
    const items = [
        { name: 'perroquet', colorClass: 'bg-red-500', image: parrotImage },
        { name: 'tortue', colorClass: 'bg-sky-400', image: turtleImage },
        { name: 'chat', colorClass: 'bg-pink-600', image: catImage },
        { name: 'poisson', colorClass: 'bg-green-500', image: fishImage },
    ];

    // الإجابات الصحيحة (مثال)
    const correctAnswers = {
        perroquet: 'grand-père',
        tortue: 'grand-mère',
        chat: 'père',
        poisson: 'mère'
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
        backgroundImage: 'linear-gradient(#eaf2f8 1px, transparent 1px)',
        backgroundSize: '100% 30px',
    };

    return (
        <div
            className="font-comic w-[900px] mx-auto my-5 p-5 relative bg-white"
            style={containerStyle}
        >
            <div className="grid grid-cols-4 gap-5 relative z-10 mt-16">
                {items.map((item) => (
                    <div key={item.name} className="flex flex-col items-center relative">
                        <div className={`text-white font-bold py-2 px-5 rounded-lg text-lg absolute -top-10 ${item.colorClass}`}>
                            {item.name}
                        </div>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
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
