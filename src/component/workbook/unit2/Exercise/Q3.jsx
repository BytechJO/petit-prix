import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const Q3 = () => {
    const img1 = '/assets/workbook/unit2/page12/1.svg';
    const img2 = '/assets/workbook/unit2/page12/2.svg';
    const img3 = '/assets/workbook/unit2/page12/3.svg';
    const img4 = '/assets/workbook/unit2/page12/04.svg';
    const img5 = '/assets/workbook/unit2/page12/05.svg';
    const img6 = '/assets/workbook/unit2/page12/06.svg';
    const img7 = '/assets/workbook/unit2/page12/07.svg';
    const img8 = '/assets/workbook/unit2/page12/08.svg';
    const img9 = '/assets/workbook/unit2/page12/09.svg';

    const items = [
        { id: 'a', img: img4, name: 'trousse', correctBag: 'une' },
        { id: 'b', img: img5, name: 'règle', correctBag: 'une' },
        { id: 'c', img: img6, name: 'stylo', correctBag: 'un' },
        { id: 'd', img: img7, name: 'crayons de couleur', correctBag: 'une' }, // تعديل الاسم ليكون كاملاً
        { id: 'e', img: img8, name: 'gomme', correctBag: 'des' },
        { id: 'f', img: img9, name: 'livres', correctBag: 'des' } // تعديل الاسم ليكون كاملاً
    ];

    const bags = [
        { id: 'un', img: img1, label: 'un', color: 'bg-blue-100' },
        { id: 'une', img: img2, label: 'une', color: 'bg-green-100' },
        { id: 'des', img: img3, label: 'des', color: 'bg-red-100' }
    ];

    // 1. تحديد الإجابات النصية الصحيحة لكل حقيبة
    const correctTextAnswers = {
        un: "stylo",
        une: "gomme règle trousse",
        des: "crayons de couleur livres"
    };

    const [draggedItem, setDraggedItem] = useState(null);
    const [bagContents, setBagContents] = useState({ un: [], une: [], des: [] });
    const [availableItems, setAvailableItems] = useState(items);
    const [answers, setAnswers] = useState({ un: '', une: '', des: '' });
    const [showResults, setShowResults] = useState(false);

    const handleDragStart = (item) => setDraggedItem(item);
    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (bagId) => {
        if (draggedItem) {
            setBagContents(prev => ({ ...prev, [bagId]: [...prev[bagId], draggedItem] }));
            setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
            setDraggedItem(null);
        }
    };

    const handleRemoveFromBag = (bagId, itemId) => {
        const item = bagContents[bagId].find(i => i.id === itemId);
        setBagContents(prev => ({ ...prev, [bagId]: prev[bagId].filter(i => i.id !== itemId) }));
        setAvailableItems(prev => [...prev, item]);
    };

    const handleAnswerChange = (bagId, value) => {
        setAnswers(prev => ({ ...prev, [bagId]: value }));
    };

    const calculateScore = () => {
        let score = 0;

        bags.forEach(bag => {
            if (isBagCorrect(bag.id)) score++;
            if (isAnswerCorrect(bag.id)) score++;
        });

        return score;
    };


    const checkAnswers = () => {
    const score = calculateScore();
    const total = bags.length * 2; // 6

    setShowResults(true);

    if (score === total) {
        ValidationAlert.success(`Excellent! Score: ${score}/${total}`);
    } else {
        ValidationAlert.error(`Score: ${score}/${total}`);
    }
};



    const handleTryAgain = () => {
        setBagContents({ un: [], une: [], des: [] });
        setAvailableItems(items);
        setAnswers({ un: '', une: '', des: '' });
        setShowResults(false);
    };

    // 4. إضافة دالة إظهار الإجابة الصحيحة
    const handleShowAnswer = () => {
        setAnswers(correctTextAnswers);
    };

    // 3. تعديل دالة التحقق من الإجابة النصية لتكون أكثر دقة
    const isAnswerCorrect = (bagId) => {
        const userInput = answers[bagId].toLowerCase().trim().split(' ').filter(Boolean).sort().join(' ');
        const correctAnswer = correctTextAnswers[bagId].toLowerCase().trim().split(' ').filter(Boolean).sort().join(' ');
        return userInput === correctAnswer;
    };

    const isBagCorrect = (bagId) => {
        const bagItems = bagContents[bagId];
        if (bagItems.length === 0 && items.filter(i => i.correctBag === bagId).length > 0) return false;
        return bagItems.every(item => item.correctBag === bagId) && bagItems.length === items.filter(i => i.correctBag === bagId).length;
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
            <div className="grid grid-cols-3 gap-6 mb-8">
                {bags.map(bag => (
                    <div key={bag.id} className="flex flex-col items-center">
                        <div
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(bag.id)}
                            className={`w-full ${bag.color} border-4 border-dashed border-gray-300 rounded-xl p-4 min-h-[280px] transition-all hover:border-gray-400 ${showResults && isBagCorrect(bag.id) ? 'border-green-500' : ''} ${showResults && !isBagCorrect(bag.id) ? 'border-red-500' : ''}`}
                        >
                            <img src={bag.img} alt={bag.label} className="max-w-32 max-h-32 mx-auto mb-2" />
                            <div className="bg-white px-6 py-2 rounded-lg text-center text-xl font-bold mb-3 mx-auto w-fit">
                                {bag.label}
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
                                {bagContents[bag.id].map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => !showResults && handleRemoveFromBag(bag.id, item.id)}
                                        className="relative cursor-pointer hover:scale-110 transition-transform"
                                    >
                                        <img src={item.img} alt={item.id} className="max-w-16 max-h-16" />
                                        <span className="absolute -top-1 -right-1 bg-gray-700 text-white text-xs px-1.5 py-0.5 rounded-full">
                                            {item.id}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <input
                                type="text"
                                value={answers[bag.id]}
                                onChange={(e) => handleAnswerChange(bag.id, e.target.value)}
                                disabled={showResults}
                                className={`w-full border-b-2 border-dotted border-gray-400 py-2 text-center text-lg focus:outline-none focus:border-gray-600 ${showResults && isAnswerCorrect(bag.id) ? 'bg-green-50 border-green-500' : ''} ${showResults && !isAnswerCorrect(bag.id) && answers[bag.id] ? 'bg-red-50 border-red-500' : ''}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Les fournitures scolaires:</h3>
                <div className="grid grid-cols-6 gap-4">
                    {availableItems.map(item => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(item)}
                            className="flex flex-col items-center p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 hover:shadow-md transition-all"
                        >
                            <img src={item.img} alt={item.id} className="max-w-20 max-h-20 mb-2" />
                            <span className="bg-white border-2 border-gray-300 px-3 py-1 rounded-md text-sm font-semibold">
                                {item.id}
                            </span>
                        </div>
                    ))}
                </div>
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

export default Q3;
