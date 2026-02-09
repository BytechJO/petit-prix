import { useRef } from "react";
import "./Q3.css";
import ValidationAlert from "../../../Popup/ValidationAlert";

const backgroundImage = "/assets/unit2/secA/page18/Q1.svg";

const correctAnswers = [
  "livre",
  "stylo",
  "gomme",
  "bagage",
  "Crayons de couleur",
];


const inputsData = [
  { placeholder: "livre", top: "78%", left: "32%" },
  { placeholder: "stylo", top: "28%", left: "52%" },
  { placeholder: "gomme", top: "37%", left: "29%" },
  { placeholder: "bagage", top: "27%", left: "12%" },
  { placeholder: "Crayons de couleur", top: "65%", left: "35%" },
];



const Q3 = () => {
  const inputRefs = useRef([]);

  const handleInput = (index) => {
    const input = inputRefs.current[index];
    if (!input) return;

    // أقل وأقصى عرض
    const minWidth = 3; // حروف
    const maxWidth = 25;

    const length = input.value.length || input.placeholder.length;

    const widthInCh = Math.min(
      Math.max(length + 1, minWidth),
      maxWidth
    );

    input.style.width = `${widthInCh}ch`;
  };


  const handleStartAgain = () => {
    inputRefs.current.forEach(input => {
      if (input) {
        input.value = "";
        input.style.width = "5%";
      }
    });
  };

  const handleShowAnswer = () => {
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = correctAnswers[index];
        input.style.width = `${input.scrollWidth}px`;
      }
    });
  };

  const handleCheck = () => {
    // 1️⃣ تحقق إذا في حقل فاضي
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

    // 2️⃣ حساب السكور
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

    const scoreMessage = ` ${score} / ${total} `;

    // 3️⃣ عرض النتيجة
    if (score === total) {
      ValidationAlert.success(scoreMessage);
    } else {
      ValidationAlert.error(scoreMessage);
    }
  };



  return (
    <div
      className="U2Q1image-U2Q1container"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="U2Q1inputs-U2Q1wrapper">
        {inputsData.map((item, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            placeholder={item.placeholder}
            className="U2Q1stretch-U2Q1input"
            style={{
              top: item.top,
              left: item.left
            }}
            onInput={() => handleInput(index)}
            onChange={() => handleInput(index)}
          />
        ))}
      </div>

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

export default Q3;
