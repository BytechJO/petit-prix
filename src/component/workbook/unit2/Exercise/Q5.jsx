import React, { useState } from 'react';
// افترض أن هذا المكون يعرض التنبيهات بشكل مناسب
import ValidationAlert from '../../../Popup/ValidationAlert';



const Q5 = () => {
    const blanks = {
        lundi: ['u'],
        jeudi: ['i'],
        samedi: ['a'],
        vendredi: ['d'],
        dimanche: ['m'],
        mardi: ['e'],
        mercredi: ['r']
    };

    const [answers, setAnswers] = useState({
        lundi: [''],
        jeudi: [''],
        samedi: [''],
        vendredi: [''],
        dimanche: [''],
        mardi: [''],
        mercredi: ['']
    });

    const handleInputChange = (word, index, value) => {
        // اسمح فقط بالحروف الأبجدية
        const filteredValue = value.replace(/[^a-zA-Z]/g, '');
        setAnswers(prev => ({
            ...prev,
            [word]: prev[word].map((val, i) => (i === index ? filteredValue : val))
        }));
    };

    const checkAnswers = () => {
        let score = 0;
        let allEmpty = true;
        let hasWrong = false;
        const totalBlanks = Object.values(blanks).flat().length;

        Object.keys(blanks).forEach(word => {
            blanks[word].forEach((letter, i) => {
                const answer = answers[word][i].toLowerCase();
                if (answer !== '') allEmpty = false;
                if (answer === letter) {
                    score++;
                } else if (answer !== '') {
                    hasWrong = true;
                }
            });
        });

        if (allEmpty) {
            ValidationAlert.warning('Veuillez remplir les champs !');
        } else if (hasWrong || score < totalBlanks) {
            ValidationAlert.error(`${score} / ${totalBlanks}`);
        } else {
            ValidationAlert.success(`${score} / ${totalBlanks}`);
        }
    };

    const handleTryAgain = () => {
        setAnswers({
            lundi: [''], jeudi: [''], samedi: [''], vendredi: [''],
            dimanche: [''], mardi: [''], mercredi: ['']
        });
    };

    const handleShowAnswer = () => {
        setAnswers(blanks);
    };

    // --- مكون فرعي لتمثيل الكلمة ---
    const Word = ({ children, color }) => (
        <div className={`bg-white p-4 rounded-xl shadow-md flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 text-${color}-500`}>
            {children}
        </div>
    );

    // --- مكون فرعي لحقل الإدخال ---
    const BlankInput = ({ word, index, value, color }) => (
        <input
            className={`w-10 h-10 mx-1 text-center text-2xl font-semibold bg-transparent border-b-2 border-dashed border-gray-300 focus:outline-none focus:border-${color}-500 focus:bg-gray-100 rounded-t-md transition-colors`}
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(word, index, e.target.value)}
        />
    );

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-3xl lg:ml-95">

                {/* شبكة أيام الأسبوع */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Word color="red">
                        L<BlankInput word="lundi" index={0} value={answers.lundi[0]} color="red" />ndi
                    </Word>
                    <Word color="blue">
                        Jeud<BlankInput word="jeudi" index={0} value={answers.jeudi[0]} color="blue" />
                    </Word>
                    <Word color="green">
                        S<BlankInput word="samedi" index={0} value={answers.samedi[0]} color="green" />medi
                    </Word>
                    <Word color="purple">
                        Ven<BlankInput word="vendredi" index={0} value={answers.vendredi[0]} color="purple" />redi
                    </Word>
                    <Word color="pink">
                        Di<BlankInput word="dimanche" index={0} value={answers.dimanche[0]} color="pink" />anche
                    </Word>
                    <Word color="yellow">
                        Mercr<BlankInput word="mardi" index={0} value={answers.mardi[0]} color="yellow" />di
                    </Word>
                    <Word color="teal">
                        Ma<BlankInput word="mercredi" index={0} value={answers.mercredi[0]} color="teal" />di
                    </Word>
                </div>

                {/* الأزرار (لم يتم تعديلها حسب الطلب) */}
                <div className="popup-buttons mt-12">
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
        </div>
    );
};

export default Q5;
