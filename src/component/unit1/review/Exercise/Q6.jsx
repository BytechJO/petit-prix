import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

// --- مسارات الصور ---
const img1 = '/assets/unit1/secA/page7/Q12.webp';
const img2 = '/assets/unit1/secA/page7/Q11.webp';

// --- بيانات التمرين ---
const dropZonesData = [
    { id: 'zone-1', image: img1, correctAnswerId: 'conv-a', title: 'Image 1' },
    { id: 'zone-2', image: img2, correctAnswerId: 'conv-b', title: 'Image 2' },
];

const conversationsData = [
    { id: 'conv-a', content: "- Salut ! Comment tu t’appelles ?\n- Salut ! Je m’appelle Robert.\n- Et moi, je m’appelle Antoine." },
    { id: 'conv-b', content: "- Salut, Lili. C’est Marie.\n- Salut, Marie !\n- Salut !" },
];

const Q6WithAlerts = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    // اختيار محادثة
    const handleSelect = (zoneId, convId) => {
        setSelectedAnswers(prev => ({ ...prev, [zoneId]: convId }));
    };

    // زر: إعادة المحاولة
    const handleTryAgain = () => {
        setSelectedAnswers({});
        setFeedback({});
    };

    // زر: عرض الإجابات
    const handleShowAnswer = () => {
        const correctAnswers = {};
        dropZonesData.forEach(zone => {
            correctAnswers[zone.id] = zone.correctAnswerId;
        });
        setSelectedAnswers(correctAnswers);
        ValidationAlert.success("Voici les réponses correctes !", "Toutes les images sont maintenant associées correctement.");
    };

    // زر: التحقق من الإجابات
    const checkAnswers = () => {
        const newFeedback = {};
        let correctCount = 0;

        dropZonesData.forEach(zone => {
            const selected = selectedAnswers[zone.id];
            if (selected === zone.correctAnswerId) {
                correctCount++;
            }
        });

        setFeedback(newFeedback);

        if (correctCount === dropZonesData.length) {
            ValidationAlert.success("Bravo !", `Vous avez tout juste : ${correctCount}/${dropZonesData.length}`);
        } else {
            ValidationAlert.error("Certaines réponses sont incorrectes", `Correct: ${correctCount}/${dropZonesData.length}`);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-8">

            <div className="flex flex-col md:flex-row gap-40 justify-center">
                {dropZonesData.map(zone => (
                    <div key={zone.id} className="flex flex-col items-center gap-6 w-full h-full max-h-140">
                        <img src={zone.image} alt={zone.title} className="w-full h-full max-h-70 object-cover rounded-lg shadow-md" />
                        <div className="flex flex-col gap-6 w-full">
                            {conversationsData.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => handleSelect(zone.id, conv.id)}
                                    className={`
  p-2 text-xs rounded-lg shadow-sm w-full text-left
  ${feedback[zone.id] === 'correct' ? 'bg-green-200 border border-green-500' :
                                            feedback[zone.id] === 'incorrect' ? 'bg-red-200 border border-red-500' :
                                                selectedAnswers[zone.id] === conv.id ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'
                                        }
  transition-colors
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
            <div className="popup-buttons shrink-0 flex justify-center gap-4">
                <button onClick={handleTryAgain} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors">
                    Recommencer
                </button>
                <button onClick={handleShowAnswer} className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors">
                    Afficher la réponse
                </button>
                <button onClick={checkAnswers} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    Vérifier la réponse
                </button>
            </div>
        </div>
    );
};

export default Q6WithAlerts;
