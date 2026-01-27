import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/workbook/unit4/page30/01.svg';
const img2 = '/assets/workbook/unit4/page30/02.svg';
const img3 = '/assets/workbook/unit4/page30/03.svg';
const img4 = '/assets/workbook/unit4/page30/04.svg';

const Q8 = () => {
  const images = [
    { id: 'img1', src: img1 },
    { id: 'img2', src: img2 },
    { id: 'img3', src: img3 },
    { id: 'img4', src: img4 },
  ];

  // هنا نفترض الإجابة الصحيحة (مثال: img2 و img4 غير موجودة)
  const correctAnswers = {
    img1: true,
    img2: false,
    img3: false,
    img4: true,
  };

  const [selected, setSelected] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  const handleToggle = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTryAgain = () => {
    setSelected({
      img1: false,
      img2: false,
      img3: false,
      img4: false,
    });
  };

  const handleShowAnswer = () => {
    setSelected(correctAnswers);
  };

  const checkAnswers = () => {
    // تحقق من إذا لم يختر أي مربع
    const anySelected = Object.values(selected).some(val => val);
    if (!anySelected) {
      ValidationAlert.warning("Attention!", "Veuillez cocher au moins un carré avant de vérifier.");
      return;
    }

    // تحقق كل إجابة
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (selected[key] === correctAnswers[key]) correctCount++;
    });

    if (correctCount === Object.keys(correctAnswers).length) {
      ValidationAlert.success(`Bravo! Toutes les réponses correctes: ${correctCount}/${Object.keys(correctAnswers).length}`);
    } else {
      ValidationAlert.error(`Vous avez ${correctCount}/${Object.keys(correctAnswers).length} réponses correctes`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto lg:ml-95">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map(img => (
          <div key={img.id} className="flex flex-col items-center gap-2">
            <img src={img.src} alt={img.id} className="max-w-60 max-h-80 object-contain" />
            <button
              onClick={() => handleToggle(img.id)}
              className={`w-8 h-8 border-2 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                selected[img.id] ? 'bg-green-500 text-white' : 'bg-white text-black'
              }`}
            >
              {selected[img.id] && '✓'}
            </button>
          </div>
        ))}
      </div>

      {/* Buttons */}
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

export default Q8;
