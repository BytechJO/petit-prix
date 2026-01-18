import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/workbook/unit3/page24/1.svg';

const Q13 = () => {

    const correctAnswers = {
        a: 'grand-père',
        b: 'grand-mère',
        c: 'mère',
        d: 'père',
        e: 'frère aîné'
    };

    const [answers, setAnswers] = useState({
        a: '',
        b: '',
        c: '',
        d: '',
        e: ''
    });

    const handleInputChange = (key, value) => {
        setAnswers(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleTryAgain = () => {
        setAnswers({
            a: '',
            b: '',
            c: '',
            d: '',
            e: ''
        });
    };

    const handleShowAnswer = () => {
        setAnswers({
            a: 'grand-père',
            b: 'grand-mère',
            c: 'mère',
            d: 'père',
            e: 'frère aîné'
        });
    };

    const checkAnswers = () => {
        const keys = Object.keys(correctAnswers);

        // تحقق إذا في أي input فاضي
        const emptyField = keys.some(key => answers[key].trim() === '');
        if (emptyField) {
            ValidationAlert.warning('Veuillez remplir tous les champs !');
            return;
        }

        // احسب عدد الإجابات الصحيحة
        let correctCount = 0;
        keys.forEach(key => {
            if (answers[key].trim().toLowerCase() === correctAnswers[key].toLowerCase()) {
                correctCount++;
            }
        });

        if (correctCount === keys.length) {
            ValidationAlert.success(`${correctCount}/${keys.length}`);
        } else {
            ValidationAlert.error(`${correctCount}/${keys.length}`);
        }
    };


    return (
        <div className="min-h-screen p-6 md:p-12">
            <div className="max-w-6xl mx-auto">


                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Side - Image */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-sm">
                            <img
                                src={img1}
                                alt="Illustration"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Side - Inputs */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 lg:mt-10">
                        <div className="space-y-20">
                            {['a', 'b', 'c', 'd', 'e'].map((key, index) => {
                                const names = ['Andrew', 'Bella', 'Sylvie', 'George', 'Rémi'];
                                return (
                                    <div className="flex items-center gap-3" key={key}>
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0">
                                            {key}
                                        </span>
                                        <div className="flex-grow">
                                            <p className="text-gray-800 font-medium">
                                                {names[index]} est{' '}
                                                <input
                                                    type="text"
                                                    value={answers[key]}
                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                    placeholder="___"
                                                    className="inline-block w-24 md:w-32 border-b-2 border-blue-400 focus:border-blue-600 focus:outline-none text-center font-semibold text-gray-700 bg-transparent placeholder-gray-300 transition-colors"
                                                />{' '}
                                                de Pierre.
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Buttons */}
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
                </div>
            </div>
        </div>
    );
};

export default Q13;
