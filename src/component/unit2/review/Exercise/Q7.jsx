import React, { useState, useRef } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const backgroundImage = "/assets/unit2/review/page27/1.svg";

// الإجابات الصحيحة بالترتيب
const correctAnswers = ["c", "b", "d", "a"];

// بيانات مواضع القوائم المنسدلة على الصورة
const selectPositions = [
    { top: "78%", left: "68%" }, // يقابل الإجابة 'c'
    { top: "30%", left: "75%" }, // يقابل الإجابة 'b'
    { top: "78%", left: "13%" }, // يقابل الإجابة 'd'
    { top: "40%", left: "24%" }, // يقابل الإجابة 'a'
];

// قائمة الجمل التي ستعرض فوق الصورة
const sentencesList = [
    "Mike aime le vélo.",      // A
    "Alice aime la peinture.", // B
    "Alex aime le foot.",      // C
    "Anna aime le volley.",    // D
];

// الخيارات التي ستظهر في كل قائمة منسدلة
const options = ["a", "b", "c", "d"];

const Q7 = () => {
    // الحالة لتخزين اختيارات المستخدم لكل قائمة
    const getInitialState = () => ({ 0: "none", 1: "none", 2: "none", 3: "none" });
    const [userSelections, setUserSelections] = useState(getInitialState());

    // دالة لتحديث اختيار المستخدم
    const handleSelectChange = (index, value) => {
        setUserSelections(prev => ({ ...prev, [index]: value }));
    };

    // دالة لإعادة البدء
    const handleStartAgain = () => {
        setUserSelections(getInitialState());
    };

    // دالة لإظهار الإجابات الصحيحة
    const handleShowAnswer = () => {
        const correctSelections = {};
        correctAnswers.forEach((answer, index) => {
            correctSelections[index] = answer;
        });
        setUserSelections(correctSelections);
    };

    // دالة للتحقق من الإجابات
    const handleCheck = () => {
        // التأكد من أن المستخدم أجاب على جميع الأسئلة
        const allAnswered = Object.values(userSelections).every(val => val !== "none");
        if (!allAnswered) {
            ValidationAlert.warning(
                "Attention !",
                "Veuillez répondre à toutes les questions."
            );
            return;
        }

        // حساب النتيجة
        let score = 0;
        Object.keys(userSelections).forEach(key => {
            const index = parseInt(key, 10);
            if (userSelections[index] === correctAnswers[index]) {
                score++;
            }
        });

        const total = correctAnswers.length;
        const color = score === total ? "#16a34a" : "#dc2626";
        const scoreMessage = `${score} / ${total}`;

        if (score === total) {
            ValidationAlert.success(scoreMessage);
        } else {
            ValidationAlert.error(scoreMessage);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* --- عرض الجمل --- */}
            <div className="p-4 bg-gray-100 rounded-lg mb-4">
                <ul className="grid grid-cols-2 gap-2 list-inside list-[upper-alpha] font-bold">
                    {sentencesList.map((s, idx) => (
                        <li key={idx} className="text-black">{s}</li>
                    ))}
                </ul>
            </div>

            {/* --- الصورة مع القوائم المنسدلة --- */}
            <div
                className="relative w-full bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    paddingTop: "66.66%", // للحفاظ على نسبة أبعاد الصورة
                }}
            >
                {selectPositions.map((item, index) => (
                    <select
                        key={index}
                        value={userSelections[index]}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
                        className="shiny-bg absolute text-center border-2 border-gray-400 rounded-md p-1 text-lg font-semibold focus:border-blue-500 focus:ring-blue-500 bg-gradient-to-r from-blue-400 via-white/50 to-blue-400 bg-200% animate-shine cursor-pointer"
                        style={{
                            top: item.top,
                            left: item.left,
                            transform: "translate(-50%, -50%)",
                            width: "80px",
                            cursor: "pointer",
                        }}
                    >
                        <option value="none"  disabled>Select</option>
                        {options.map(opt => (
                            <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                        ))}
                    </select>
                ))}
            </div>

            {/* --- أزرار التحكم --- */}
            <div className="popup-buttons mt-4 flex gap-4 justify-center">
                <button
                    className="try-again-button px-4 py-2 bg-gray-200 rounded-lg font-semibold"
                    onClick={handleStartAgain}
                >
                    Recommencer ↻
                </button>
                <button
                    className="show-answer-btn px-4 py-2 bg-yellow-400 rounded-lg font-semibold"
                    onClick={handleShowAnswer}
                >
                    Afficher la réponse
                </button>
                <button
                    className="check-button2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold"
                    onClick={handleCheck}
                >
                    Vérifier la réponse ✓
                </button>
            </div>
        </div>
    );
};

export default Q7;
