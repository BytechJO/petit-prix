import { useRef } from "react";
import "./Q1.css";
import ValidationAlert from "../../../Popup/ValidationAlert";

const backgroundImage = "/assets/unit3/secA/page34/cover.png";

// الإجابات الصحيحة للأسماء المذكورة في النص
const correctAnswers = [
  "Eloise",
  "Louis",
  "Sophie",
  "Jacob",
  "Céline",
  "Robert",
  "Isabelle",
];

// بيانات أماكن حقول الإدخال
const inputsData = [
  { placeholder: "Nom", top: "5%", left: "-15%" },
  { placeholder: "Nom", top: "20%", left: "10%" },
  { placeholder: "Nom", top: "18%", left: "70%" },
  { placeholder: "Nom", top: "16%", left: "92%" },
  { placeholder: "Nom", top: "30%", left: "115%" },
  { placeholder: "Nom", top: "42%", left: "-32%" },
  { placeholder: "Nom", top: "23%", left: "56%" },
];

const Q1 = () => {
  const inputRefs = useRef([]);

  const handleInput = (index) => {
    const input = inputRefs.current[index];
    if (!input) return;

    const minWidth = 4; // ch
    const maxWidth = 20; // ch
    const length = input.value.length || input.placeholder.length;
    const widthInCh = Math.min(Math.max(length + 1, minWidth), maxWidth);

    input.style.width = `${widthInCh}ch`;
  };

  const handleStartAgain = () => {
    inputRefs.current.forEach(input => {
      if (input) {
        input.value = "";
        input.style.width = "5%"; // إعادة العرض للحجم الأولي
      }
    });
  };

  const handleShowAnswer = () => {
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = correctAnswers[index];
        handleInput(index); // استدعاء الدالة لتحديث العرض
      }
    });
  };

  const handleCheck = () => {
    const hasEmpty = inputRefs.current.some(
      input => !input || input.value.trim() === ""
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
    const scoreMessage = `${score} / ${total}`;

    if (score === total) {
      ValidationAlert.success(scoreMessage);
    } else {
      ValidationAlert.error(scoreMessage);
    }
  };

  return (
    <div
      className="unit3-q1-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* حاوية النصوص على اليسار */}
      <div className="unit3-q1-text-container">
        <p>
          Bonjour, je m’appelle Eloise. Je vous présente ma famille. Mon père s’appelle Louis. Ma mère s’appelle Sophie.
        </p>
        </div>
        <div className="unit3-q1-text-container1">
        <p>
          Mon grand-père s’appelle Jacob. Ma grand-mère s’appelle Céline. J’ai un frère, Robert, et une soeur, Isabelle.
        </p>
      </div>

      {/* حاوية حقول الإدخال */}
      <div className="unit3-q1-inputs-wrapper">
        {inputsData.map((item, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            placeholder={item.placeholder}
            className="unit3-q1-stretch-input"
            style={{ top: item.top, left: item.left }}
            onInput={() => handleInput(index)}
            onChange={() => handleInput(index)}
          />
        ))}
      </div>

      {/* أزرار التحكم */}
      <div className="popup-buttons mt-4 flex gap-4">
        <button className="try-again-button" onClick={handleStartAgain}>
          Recommencer ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Vérifier la réponse ✓
        </button>
      </div>
    </div>
  );
};

export default Q1;
