import { useRef } from "react";
import "./Q7.css";
import ValidationAlert from "../../../Popup/ValidationAlert";

const backgroundImage = "/assets/unit2/review/page27/1.svg";

const correctAnswers = ["c", "b", "d", "a"];

const inputsData = [
    { placeholder: "X", top: "78%", left: "68%" },
    { placeholder: "X", top: "30%", left: "75%" },
    { placeholder: "X", top: "78%", left: "13%" },
    { placeholder: "X", top: "40%", left: "24%" },
];

// قائمة الجمل قبل الصورة
const sentencesList = [
    "Mike aime le vélo.",
    "Alice aime la peinture.",
    "Alex aime le foot.",
    "Anna aime le volley.",
];

const Q7 = () => {
    const inputRefs = useRef([]);

    const handleInput = (index) => {
        const input = inputRefs.current[index];
        if (!input) return;

        const minWidth = 3; // حروف
        const maxWidth = 25;

        const length = input.value.length || input.placeholder.length;
        const widthInCh = Math.min(Math.max(length + 1, minWidth), maxWidth);
        input.style.width = `${widthInCh}ch`;
    };

    const handleStartAgain = () => {
        inputRefs.current.forEach((input) => {
            if (input) {
                input.value = "";
                input.style.width = "3ch"; // إعادة الحجم الابتدائي
            }
        });
    };

    const handleShowAnswer = () => {
        inputRefs.current.forEach((input, index) => {
            if (input) {
                input.value = correctAnswers[index];
                input.style.width = `${correctAnswers[index].length + 1}ch`;
            }
        });
    };

    const handleCheck = () => {
        const hasEmpty = inputRefs.current.some(
            (input) => !input || input.value.trim() === ""
        );

        if (hasEmpty) {
            ValidationAlert.warning(
                "Attention !",
                "Veuillez répondre à toutes les questions."
            );
            return;
        }

        let score = 0;
        inputRefs.current.forEach((input, index) => {
            if (
                input.value.trim().toLowerCase() ===
                correctAnswers[index].toLowerCase()
            ) {
                score++;
            }
        });

        const total = correctAnswers.length;
        const color = score === total ? "#16a34a" : "#dc2626";
        const scoreMessage = `
      <div style="font-size:20px; text-align:center; margin-top:10px;">
        <span style="color:${color}; font-weight:bold;">
          Score : ${score} / ${total}
        </span>
      </div>
    `;

        if (score === total) {
            ValidationAlert.success(scoreMessage);
        } else {
            ValidationAlert.error(scoreMessage);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* --- عرض الجمل --- */}
            <div className="p-4 bg-gray-100 rounded-lg">
                <ul className="grid grid-cols-2 gap-2 list-inside list-[upper-alpha] font-bold">
                    {sentencesList.map((s, idx) => (
                        <li key={idx} className="text-black">{s}</li>
                    ))}
                </ul>
            </div>


            <div
                className="relative w-full bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    paddingTop: "66.66%", // يحافظ على نسبة العرض إلى الارتفاع للصورة
                }}
            >
                <div>
                    {inputsData.map((item, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            placeholder={item.placeholder}
                            className="bg-white absolute text-center border-2 border-gray-400 rounded-md p-1 text-lg font-semibold focus:border-blue-500 focus:ring-blue-500"
                            style={{
                                top: item.top,
                                left: item.left,
                                transform: "translate(-50%, -50%)", // لتوسيط الحقل بالضبط
                                width: "5ch", // عرض ابتدائي
                            }}
                            onInput={() => handleInput(index)}
                            maxLength={1}
                        />
                    ))}
                </div>
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
