import { useState } from 'react';
import '../../unit1/Exercise/Q15.css';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/unit2/review/page26/ch1.svg';
const img2 = '/assets/unit2/review/page26/ch2.svg';
const img3 = '/assets/unit2/review/page26/ch3.svg';
const img4 = '/assets/unit2/review/page26/ch3.svg';

const Q1 = () => {
    // const grid = [
    //     ['d', 'a', 'n', 's', 'e', 'r', 'l'],
    //     ['y', 't', 'y', 'd', 'k', 'h', 'j'],
    //     ['n', 'c', 'u', 'p', 'd', 'j', 'k'],
    //     ['b', 'h', 'r', 'l', 'e', 'p', 'l'],
    //     ['v', 'a', 'f', 'i', 'h', 'f', 'd'],
    //     ['c', 'n', 'w', 'r', 'e', 'y', 'u'],
    //     ['t', 't', 'q', 'e', 'o', 'l', 'k'],
    //     ['r', 'e', 'x', 'v', 'n', 'k', 'l'],
    //     ['o', 'r', 'n', 'a', 'g', 'e', 'r'],
    //     ['c', 'n', 'w', 'r', 'e', 'y', 'u'],
    //     ['n', 'c', 'u', 'p', 'd', 'j', 'k'],
    //     ['d', 'a', 'n', 's', 'e', 'r', 'l'],
    // ];

    const correctAnswers = ['jouer aux jeux vidéo', 'lire des livres', 'chanter', 'nager'];

    // حالة الكتابة
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
        { img: img4, prefix: 'Il aime' },
    ];

    return (
        <>
            <div className="container">
                <div className="main-content">
                    <div className="activities">
                        {activities.map((activity, i) => (
                            <div key={i} className="activity">
                                <img src={activity.img} alt={`Activity ${i + 1}`} className="activity-image" />

                            </div>
                        ))}
                    </div>

                    <div className="word-search">
                        <div className="activities">
                            {activities.map((activity, i) => (
                                <div key={i} className="activity">

                                    <div className="sentence-box">
                                        {activity.prefix}{' '}
                                        <input
                                            type="text"
                                            className="sentence-input"
                                            value={answers[i]}
                                            onChange={(e) => handleChange(e.target.value, i)}
                                            placeholder="Tapez ici..."
                                        />
                                        {showAnswer && (
                                            <div className="correct-answer">
                                                Réponse: {correctAnswers[i]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* الأزرار */}

                </div>
            </div>
            <div className="popup-buttons mt-4 flex gap-4 justify-center">
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
        </>
    );
};

export default Q1;
