import { useRef, useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q6 = () => {
  const audioRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  // الصورة الصحيحة دائمًا الصورة الثالثة (index = 2)
  const correctIndex = 2;

  const images = [
    "/assets/unit2/secA/page19/jeudi.svg",
    "/assets/unit2/secA/page19/mardi.svg",
    "/assets/unit2/secA/page19/mercredi.svg",
    "/assets/unit2/secA/page19/vendredi.svg"
  ];

  const handleImageClick = (index) => {
    if (answered) return; // بعد الإجابة، لا يمكن تغيير الاختيار
    setSelected(index);
  };

  const handleCheck = () => {
    if (selected === null) {
      ValidationAlert.warning("Please select an image", "");
      return;
    }

    setAnswered(true);

    if (selected === correctIndex) {
      ValidationAlert.success("Correct!", "Bien joué");
      audioRef.current?.play();
    } else {
      ValidationAlert.error("Wrong answer", "Try again");
    }
  };

  const handleStartAgain = () => {
    setSelected(null);
    setAnswered(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  const handleShowAnswer = () => {
    setSelected(correctIndex);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* الصور */}
      <div className="flex gap-12 mt-6">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={`
              cursor-pointer
              rounded-xl
              border-4
              transition-all
              duration-300
              ${
                selected === index
                  ? answered
                    ? selected === correctIndex
                      ? "border-green-500 scale-105"
                      : "border-red-500 scale-105"
                    : "border-blue-400 scale-105"
                  : "border-transparent"
              }
            `}
          >
            <img
              src={img}
              alt={`option-${index}`}
              className="max-w-60 max-h-90 object-contain"
            />
          </div>
        ))}
      </div>

      {/* الأزرار */}
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

export default Q6;
