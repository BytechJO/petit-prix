import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

// بيانات الكلمات: الكلمة، هل هي فرنسية، والخط المقترح
// تم تصحيح "mercie" إلى "Merci"
const wordsData = [
    { text: 'Bonjour', isFrench: true, font: "'Pacifico', cursive" },
    { text: 'hello', isFrench: false, font: "'Roboto', sans-serif" },
    { text: 'Merci', isFrench: true, font: "'Caveat', cursive" },
    { text: 'أهلاً وسهلاً', isFrench: false, font: "'Noto Kufi Arabic', sans-serif" },
].sort(() => Math.random() - 0.5); // عرض الكلمات بترتيب عشوائي في كل مرة

// مكون الكلمة القابلة للنقر
const Word = ({ text, isFrench, font, onSelect, isSelected, isCorrect }) => {
    const getBorderColor = () => {
        if (!isSelected) return 'border-transparent'; // لا يوجد إطار قبل الاختيار
        return isCorrect ? 'border-green-500' : 'border-red-500'; // أخضر للصحيح، أحمر للخاطئ
    };

    return (
        <div
            onClick={() => onSelect(text, isFrench)}
            className={`
                p-4 m-3 rounded-full border-4 transition-all duration-300 cursor-pointer
                hover:scale-110 transform hover:shadow-lg
                ${getBorderColor()}
                ${isSelected && !isCorrect ? 'animate-shake' : ''} // إضافة اهتزاز للإجابة الخاطئة
            `}
            style={{ fontFamily: font }}
        >
            <span className="text-2xl md:text-3xl font-bold text-gray-700">{text}</span>
        </div>
    );
};

// المكون الرئيسي للتمرين
const Q5 = () => {
    const [selections, setSelections] = useState({}); // لتخزين اختيارات المستخدم

    const handleSelectWord = (text, isFrench) => {
        setSelections(prev => ({
            ...prev,
            [text]: { isSelected: true, isCorrect: isFrench },
        }));

        // إذا كانت الإجابة خاطئة، أزل الدائرة الحمراء بعد فترة قصيرة
        if (!isFrench) {
            setTimeout(() => {
                setSelections(prev => {
                    const newSelections = { ...prev };
                    delete newSelections[text];
                    return newSelections;
                });
            }, 500); // إزالة بعد ثانية واحدة
        }
    };

    const handleTryAgain = () => {
        setSelections({}); // مسح كل الاختيارات
        setShowAnswer(false); // إخفاء الإجابات إذا كانت ظاهرة
    };

    const handleShowAnswer = () => {
        const newSelections = {};
        wordsData.forEach(word => {
            newSelections[word.text] = { isSelected: true, isCorrect: word.isFrench };
        });
        setSelections(newSelections); // تعيين جميع الإجابات الصحيحة
        setShowAnswer(true);
    };

    const checkAnswers = () => {
        let correctCount = 0;
        wordsData.forEach(word => {
            const userChoice = selections[word.text];
            if (userChoice?.isCorrect) correctCount++;
        });

        if (correctCount === wordsData.filter(w => w.isFrench).length) {
            ValidationAlert.success("Toutes les réponses sont correctes !", `Score: ${correctCount}/${wordsData.filter(w => w.isFrench).length}`);
        } else if (correctCount === 0) {
            ValidationAlert.error("Aucune réponse correcte.", `Score: ${correctCount}/${wordsData.filter(w => w.isFrench).length}`);
        } else {
            ValidationAlert.warning("Presque !", `Score: ${correctCount}/${wordsData.filter(w => w.isFrench).length}`);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-sky-50 rounded-2xl shadow-lg mt-7">
            

            {/* حاوية الكلمات */}
            <div className="flex flex-wrap justify-center items-center gap-5 p-8 min-h-[400px]">
                {wordsData.map(word => (
                    <Word
                        key={word.text}
                        {...word}
                        onSelect={handleSelectWord}
                        isSelected={selections[word.text]?.isSelected || false}
                        isCorrect={selections[word.text]?.isCorrect || false}
                    />
                ))}
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
    );
};

export default Q5;
