import { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/workbook/unit3/page19/1.png';
const img2 = '/assets/workbook/unit3/page19/2.png';
const img3 = '/assets/workbook/unit3/page19/3.png';

const Q1 = () => {
    const correctAnswers = ['jouer aux jeux vidéo', 'lire des livres', 'chanter'];
    const [answers, setAnswers] = useState(new Array(correctAnswers.length).fill(''));
    const [showAnswer, setShowAnswer] = useState(false);

    const handleChange = (value, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(new Array(correctAnswers.length).fill(''));
        setShowAnswer(false);
    };

    const handleShowAnswerAll = () => {
        setShowAnswer(true);
    };

    const handleCheckAll = () => {
        if (answers.includes('')) {
            ValidationAlert.warning('Veuillez remplir tous les champs!');
            return;
        }

        const correctCount = answers.reduce((acc, ans, i) => {
            return acc + (ans.trim().toLowerCase() === correctAnswers[i].toLowerCase() ? 1 : 0);
        }, 0);

        if (correctCount === correctAnswers.length) {
            ValidationAlert.success(`${correctCount}/${correctAnswers.length} ✔️`);
        } else {
            ValidationAlert.error(`${correctCount}/${correctAnswers.length} ❌`);
        }
    };

    const activities = [
        { img: img1, prefix: 'Elle aime' },
        { img: img2, prefix: 'Il aime' },
        { img: img3, prefix: 'Elle aime' },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* كل صورة مع الـ input */}
            <div className="space-y-5">
                {activities.map((activity, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-6 bg-white p-5 rounded-2xl hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={activity.img}
                            alt={`Activity ${i + 1}`}
                            className="max-w-32 max-h-32 object-contain rounded-lg border-2 border-gray-200"
                        />
                        <div className="flex-1 flex flex-col">
                            <span className="font-semibold text-gray-800 mb-2 text-lg">{activity.prefix}</span>
                            <input
                                type="text"
                                value={answers[i]}
                                onChange={(e) => handleChange(e.target.value, i)}
                                placeholder="Tapez ici..."
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700 text-base"
                            />
                            {showAnswer && (
                                <span className="text-green-600 mt-2 font-medium text-sm">
                                    Réponse: {correctAnswers[i]}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* الأزرار */}
            <div className="popup-buttons mt-6 flex gap-4 justify-center flex-wrap">
                <button className="try-again-button" onClick={handleReset}>
                    Recommencer ↻
                </button>
                <button className="show-answer-btn" onClick={handleShowAnswerAll}>
                    Afficher la réponse
                </button>
                <button className="check-button2" onClick={handleCheckAll}>
                    Vérifier la réponse ✓
                </button>
            </div>
        </div>
    );
};

export default Q1;
