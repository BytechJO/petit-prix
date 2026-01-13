import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q3 = () => {
    const characters = [
        { id: 1, image: '/assets/unit1/secA/page9/1.svg', name: 'Eloise' },
        { id: 2, image: '/assets/unit1/secA/page9/1.svg', name: 'Pierre' },
        { id: 3, image: '/assets/unit1/secA/page9/1.svg', name: 'Marie' },
        { id: 4, image: '/assets/unit1/secA/page9/1.svg', name: 'Lucas' }
    ];

    const rows = [
        { id: 'nom', label: 'Nom' },
        { id: 'age', label: 'Âge' },
        { id: 'jaime', label: "J'aime" },
        { id: 'jenaime', label: "Je n'aime pas" }
    ];

    // البيانات الصحيحة
    const correctAnswers = {
        1: { nom: 'Eloise', age: 'six ans', jaime: 'La natation', jenaime: 'Le sport' },
        2: { nom: 'Pierre', age: 'huit ans', jaime: 'Le volley', jenaime: 'Le football' },
        3: { nom: 'Marie', age: 'sept ans', jaime: 'La danse', jenaime: 'Le basket' },
        4: { nom: 'Lucas', age: 'neuf ans', jaime: 'Le tennis', jenaime: 'Le cyclisme' }
    };

    // القيم المعبأة مسبقاً
    const prefilledData = {
        1: { nom: 'Eloise', age: '', jaime: '', jenaime: 'Le sport' },
        2: { nom: '', age: '', jaime: 'Le volley', jenaime: 'Le football' },
        3: { nom: '', age: 'sept ans', jaime: '', jenaime: '' },
        4: { nom: '', age: '', jaime: '', jenaime: '' }
    };

    const [answers, setAnswers] = useState(prefilledData);
    const [isChecked, setIsChecked] = useState(false);

    const handleInputChange = (charId, rowId, value) => {
        setAnswers({
            ...answers,
            [charId]: {
                ...answers[charId],
                [rowId]: value
            }
        });
    };

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const checkAnswer = (userAnswer, correctAnswer) => {
        return normalizeText(userAnswer) === normalizeText(correctAnswer);
    };

    const checkAnswers = () => {
        // التحقق من ملء جميع الحقول
        let allFilled = true;
        characters.forEach(char => {
            rows.forEach(row => {
                if (!answers[char.id]?.[row.id]?.trim()) {
                    allFilled = false;
                }
            });
        });

        if (!allFilled) {
            ValidationAlert.warning("Veuillez remplir tous les champs!");
            return;
        }

        // حساب النتيجة
        let correctCount = 0;
        let totalCount = 0;

        characters.forEach(char => {
            rows.forEach(row => {
                totalCount++;
                if (checkAnswer(answers[char.id]?.[row.id] || '', correctAnswers[char.id][row.id])) {
                    correctCount++;
                }
            });
        });

        setIsChecked(true);

        const score = `${correctCount}/${totalCount}`;

        if (correctCount === totalCount) {
            ValidationAlert.success(score);
        } else {
            ValidationAlert.error(score);
        }
    };

    const handleShowAnswer = () => {
        setAnswers(correctAnswers);
        setIsChecked(true);
    };

    const handleTryAgain = () => {
        setAnswers(prefilledData);
        setIsChecked(false);
    };

    const getInputStyle = (charId, rowId) => {
        const isPrefilled = prefilledData[charId]?.[rowId];
        const userAnswer = answers[charId]?.[rowId] || '';
        const correctAnswer = correctAnswers[charId][rowId];

        if (isPrefilled) {
            return {
                backgroundColor: '#9bcc91',
                border: '2px solid #9bcc91',
                color: '#1f2937',
                cursor: 'not-allowed'
            };
        }

        if (!isChecked) {
            return {
                backgroundColor: 'white',
                border: '2px solid #9bcc91',
                color: '#1f2937'
            };
        }

        if (checkAnswer(userAnswer, correctAnswer)) {
            return {
                backgroundColor: '#f0fdf4',
                border: '2px solid #22c55e',
                color: '#15803d'
            };
        } else {
            return {
                backgroundColor: '#fef2f2',
                border: '2px solid #ef4444',
                color: '#dc2626'
            };
        }
    };

    return (
        <div className="flex flex-col items-center p-8 gap-8">

            {/* الجدول */}
            <div className="w-full max-w-4xl overflow-x-auto lg:ml-50">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-2 border-gray-400 p-3 "></th>
                            {characters.map(char => (
                                <th key={char.id} className="border-2 border-gray-400 p-3 bg-[#9bcc91]">
                                    <div className="flex flex-col items-center gap-2">
                                        <img
                                            src={char.image}
                                            alt={char.name}
                                            className="max-w-24 max-h-24 object-contain rounded-lg"
                                        />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row.id}>
                                <td className="border-2 border-gray-400 p-3 bg-[#9bcc91] font-bold text-center">
                                    {row.label}
                                </td>
                                {characters.map(char => (
                                    <td key={char.id} className="border-2 border-gray-400 p-2">
                                        <input
                                            type="text"
                                            value={answers[char.id]?.[row.id] || ''}
                                            onChange={(e) => handleInputChange(char.id, row.id, e.target.value)}
                                            disabled={prefilledData[char.id]?.[row.id] || isChecked}
                                            className="w-full px-3 py-2 rounded-lg text-center font-semibold"
                                            style={{
                                                ...getInputStyle(char.id, row.id),
                                                outline: 'none'
                                            }}
                                            placeholder={
                                                prefilledData[char.id]?.[row.id]
                                                    ? ''
                                                    : correctAnswers[char.id][row.id]
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* الأزرار */}
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

export default Q3;