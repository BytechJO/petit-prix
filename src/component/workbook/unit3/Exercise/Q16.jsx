import React, { useState, useRef } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";



const Q14 = () => {
  const audioRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [answered, setAnswered] = useState(false);

  // الصور الصحيحة (index = 1, 4, 8)
  const correctIndex = [0, 4, 7];

  // 🔹 الصور
  const img1 = '/assets/workbook/unit3/page25/01.svg';
  const img2 = '/assets/workbook/unit3/page25/02.svg';
  const img3 = '/assets/workbook/unit3/page25/03.svg';

  const img4 = '/assets/workbook/unit3/page25/1.svg';
  const img5 = '/assets/workbook/unit3/page25/2.svg';
  const img6 = '/assets/workbook/unit3/page25/001.svg';

  const img7 = '/assets/workbook/unit3/page25/3.svg';
  const img8 = '/assets/workbook/unit3/page25/002.svg';
  const img9 = '/assets/workbook/unit3/page25/003.svg';

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  const handleImageClick = (index) => {
    if (answered) return; // منع التغيير بعد التحقق

    if (selected.includes(index)) {
      // إزالة الاختيار
      setSelected(selected.filter(i => i !== index));
    } else {
      // إضافة الاختيار
      setSelected([...selected, index]);
    }
  };

  const handleCheck = () => {
    if (selected.length === 0) {
      ValidationAlert.warning("Veuillez sélectionner au moins une image!");
      return;
    }

    setAnswered(true);

    // التحقق من التطابق التام
    const sortedSelected = [...selected].sort((a, b) => a - b);
    const sortedCorrect = [...correctIndex].sort((a, b) => a - b);

    const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);

    if (isCorrect) {
      ValidationAlert.success(`${correctIndex.length}/${correctIndex.length}`);
      audioRef.current?.play();
    } else {
      // حساب عدد الإجابات الصحيحة
      const correctCount = selected.filter(i => correctIndex.includes(i)).length;
      ValidationAlert.error(`${correctCount}/${correctIndex.length}`);
    }
  };

  const handleStartAgain = () => {
    setSelected([]);
    setAnswered(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  const handleShowAnswer = () => {
    setSelected(correctIndex);
    setAnswered(true);
  };

  const getBorderStyle = (index) => {
    if (!answered) {
      // قبل التحقق - إذا محدد يكون أزرق
      return selected.includes(index)
        ? "border-blue-400 scale-105"
        : "border-transparent";
    }

    // بعد التحقق
    const isCorrect = correctIndex.includes(index);
    const isSelected = selected.includes(index);

    if (isCorrect && isSelected) {
      // صحيح ومحدد - أخضر
      return "border-green-500 scale-105";
    } else if (!isCorrect && isSelected) {
      // خاطئ ومحدد - أحمر
      return "border-red-500 scale-105";
    } else if (isCorrect && !isSelected) {
      // صحيح لكن غير محدد - أخضر فاتح (لإظهار الجواب الصحيح)
      return "border-green-300";
    }

    return "border-transparent";
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* الصور */}
      <div className="grid grid-cols-3 gap-6 mt-6 max-w-150">
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
                            ${getBorderStyle(index)}
                        `}
          >
            <img
              src={img}
              alt={`option-${index}`}
              className="w-full max-h-50 object-contain rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* الأزرار */}
      <div className="popup-buttons mt-4 flex gap-4">
        <button className="try-again-button" onClick={handleStartAgain}>
          Recommencer
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Vérifier la réponse
        </button>
      </div>
    </div>
  );
};

export default Q14;