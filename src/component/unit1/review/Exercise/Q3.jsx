import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert';

export default function Q3() {
    const [selectedAnswers, setSelectedAnswers] = useState(new Set());
    const [feedback, setFeedback] = useState('');
    const correctColors = new Set(['yellow', 'blue', 'green']);

    const img = '/assets/unit1/secA/page12/eiffeltower.png';

    const colorOptions = [
        {
            id: 'yellow',
            label: 'jaune',
            color: 'bg-yellow-300',
            description: 'jaune',
        },
        {
            id: 'noir',
            label: 'noir',
            color: 'bg-black',
            description: 'noir',
        },
        {
            id: 'blue',
            label: 'bleu',
            color: 'bg-blue-500',
            description: 'bleu',
        },
        {
            id: 'rouge',
            label: 'rouge',
            color: 'bg-red-500',
            description: 'rouge',
        },
        {
            id: 'green',
            label: 'vert',
            color: 'bg-green-500',
            description: 'vert',
        },
    ];

    const handleColorSelect = (colorId) => {
        const newSelected = new Set(selectedAnswers);

        if (newSelected.has(colorId)) {
            newSelected.delete(colorId);
            setFeedback('');
        } else {
            newSelected.add(colorId);
            setFeedback('');
        }

        setSelectedAnswers(newSelected);
    };

    const totalScore = correctColors.size; 
    const checkAnswers = () => {
        if (selectedAnswers.size === 0) {
            ValidationAlert.warning("Please select colors", "");
            return;
        }

        let score = 0;

        // حساب النقاط
        selectedAnswers.forEach(color => {
            if (correctColors.has(color)) {
                score++;
            }
        });

        const isPerfect = score === totalScore && selectedAnswers.size === totalScore;
        const scoreMessage = `${score} / ${selectedAnswers.size}`;
        if (isPerfect) {
            ValidationAlert.success( scoreMessage);
            setFeedback(`صحيح ✅ (${score}/${totalScore})`);
        } else {
            ValidationAlert.error(
                scoreMessage
            );
        }
    };


    const handleTryAgain = () => {
        setSelectedAnswers(new Set());
        setFeedback('');
    };

    const handleShowAnswer = () => {
        setSelectedAnswers(new Set(['yellow', 'blue', 'green']));
        setFeedback('');
    };


    const isSelected = (colorId) => selectedAnswers.has(colorId);

    return (
        <div className="w-full max-w-5xl mx-auto p-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex items-center justify-center">
                    <div className="rounded-lg overflow-hidden shadow-lg border-4 border-gray-200">
                        <img
                            src={img}
                            alt="Eiffel Tower with autumn colors"
                            className="w-full h-auto max-h-96 object-cover"
                        />
                    </div>
                </div>

                {/* Color Selection Section */}
                <div className="flex flex-col justify-center">
                    <div className="space-y-4">

                        {colorOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleColorSelect(option.id)}
                                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 cursor-pointer ${isSelected(option.id)
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 bg-white hover:border-gray-400'
                                    }`}
                            >
                                {/* Color Circle */}
                                <div
                                    className={`w-12 h-12 rounded-full ${option.color} shadow-md flex-shrink-0`}
                                ></div>

                                {/* Text */}
                                <div className="flex-1 text-left">
                                    <div className="font-bold text-lg text-gray-800">
                                        {option.label}
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    {isSelected(option.id) ? (
                                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                   
                </div>
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
        </div>
    );
}
