import { useRef, useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q9 = () => {
  const audioRef = useRef(null);

  const [selected, setSelected] = useState([]);
  const [answered, setAnswered] = useState(false);

  // الصور الصحيحة
  const correctIndexes = [4, 5];

  const img1 = '/assets/unit2/secA/page21/1.png';
  const img2 = '/assets/unit2/secA/page21/2.png';
  const img3 = '/assets/unit2/secA/page21/3.png';
  const img4 = '/assets/unit2/secA/page21/4.png';
  const img5 = '/assets/unit2/secA/page21/5.png';
  const img6 = '/assets/unit2/secA/page21/6.png';

  const images = [img1, img2, img3, img4, img5, img6];

  const handleImageClick = (index) => {
    if (answered) return;

    if (selected.includes(index)) {
      // إزالة الاختيار
      setSelected(selected.filter(i => i !== index));
    } else {
      if (selected.length >= 2) return; // لا يسمح بأكثر من اختيارين
      setSelected([...selected, index]);
    }
  };

  const handleCheck = () => {
    if (selected.length !== 2) {
      ValidationAlert.warning("Veuillez sélectionner deux images");
      return;
    }

    setAnswered(true);

    // حساب السكور
    const score = selected.filter(i => correctIndexes.includes(i)).length;

    if (score === correctIndexes.length) {
      ValidationAlert.success(`${score} / ${correctIndexes.length}`);
      audioRef.current?.play();
    } else {
      ValidationAlert.error(`${score} / ${correctIndexes.length}`);
    }
  };


  const handleStartAgain = () => {
    setSelected([]);  // ✅ يجب أن تكون مصفوفة فارغة وليس null
    setAnswered(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  const handleShowAnswer = () => {
    setSelected(correctIndexes);
    setAnswered(true);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* الصور */}
      <div className="grid grid-cols-3 gap-6 mt-6 justify-items-center">
        {images.map((img, index) => {
          const isSelected = selected.includes(index);
          const isCorrect = correctIndexes.includes(index);

          return (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className={`
                cursor-pointer
                rounded-xl
                border-4
                transition-all
                duration-300
                ${isSelected
                  ? answered
                    ? isCorrect
                      ? "border-green-500 scale-105"
                      : "border-red-500 scale-105"
                    : "border-blue-400 scale-105"
                  : "border-transparent hover:border-gray-300"
                }
              `}
            >
              <img
                src={img}
                alt={`option-${index}`}
                className="max-w-60 max-h-90 object-contain"
              />
            </div>
          );
        })}
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

      {/* Audio (اختياري - أضف مسار الصوت إذا كان موجود) */}
      <audio ref={audioRef} src="/assets/sounds/success.mp3" />
    </div>
  );
};

export default Q9;