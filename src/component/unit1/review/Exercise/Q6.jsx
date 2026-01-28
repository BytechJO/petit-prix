import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/unit1/review/page14/ch1.svg';
const img2 = '/assets/unit1/review/page14/ch2.svg';

const dropZonesData = [
    { id: 'zone-1', image: img1, correctAnswerId: 'conv-a', title: 'Image 1' },
    { id: 'zone-2', image: img2, correctAnswerId: 'conv-b', title: 'Image 2' },
];

const conversationsData = [
    { id: 'conv-a', content: "- Salut ! Comment tu t’appelles ?\n- Salut ! Je m’appelle Robert.\n- Et moi, je m’appelle Antoine." },
    { id: 'conv-b', content: "- Salut, Lili. C’est Marie.\n- Salut, Marie !\n- Salut !" },
];

const Q6 = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const handleSelect = (zoneId, convId) => {
        setSelectedAnswers(prev => ({ ...prev, [zoneId]: convId }));
    };

    const handleTryAgain = () => {
        setSelectedAnswers({});
        setFeedback({});
    };

    const handleShowAnswer = () => {
        const correctAnswers = {};
        dropZonesData.forEach(zone => {
            correctAnswers[zone.id] = zone.correctAnswerId;
        });
        setSelectedAnswers(correctAnswers);
    };

    const checkAnswers = () => {
        const newFeedback = {};
        let correctCount = 0;

        dropZonesData.forEach(zone => {
            const selected = selectedAnswers[zone.id];
            if (selected === zone.correctAnswerId) {
                correctCount++;
                newFeedback[zone.id] = 'correct';
            } else {
                newFeedback[zone.id] = 'incorrect';
            }
        });

        setFeedback(newFeedback);

        if (correctCount === dropZonesData.length) {
            ValidationAlert.success(`${correctCount}/${dropZonesData.length}`);
        } else {
            ValidationAlert.error(`${correctCount}/${dropZonesData.length}`);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-8 rounded-3xl flex flex-col gap-10">

            <div className="flex flex-col md:flex-row gap-12 justify-center">
                {dropZonesData.map(zone => (
                    <div key={zone.id} className="flex flex-col items-center gap-5 w-full">
                        <img 
                            src={zone.image} 
                            alt={zone.title} 
                            className="max-w-full max-h-60 object-cover rounded-xl shadow-lg border border-gray-200"
                        />
                        <div className="flex flex-col gap-4 w-full">
                            {conversationsData.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => handleSelect(zone.id, conv.id)}
                                    className={`cursor-pointer
                                        p-3 rounded-xl text-sm text-left font-medium transition-colors duration-200
                                        ${
                                          selectedAnswers[zone.id] === conv.id ? 'bg-blue-200 border border-blue-400' :
                                          'bg-white border border-gray-300 hover:bg-gray-100'}
                                    `}
                                >
                                    {conv.content.split('\n').map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* أزرار التحكم */}
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
    );
};

export default Q6;
