import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q10 = () => {
  const images = [
    { id: 1, src: '/assets/workbook/unit2/page15/1.png', correctOrder: 1 },
    { id: 2, src: '/assets/workbook/unit2/page15/2.png', correctOrder: 1 },
    { id: 3, src: '/assets/workbook/unit2/page15/3.png', correctOrder: 2 },
    { id: 4, src: '/assets/workbook/unit2/page15/4.png', correctOrder: 2 },
  ];

  const [selectedOrders, setSelectedOrders] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleOrderChange = (imageId, order) => {
    setSelectedOrders({
      ...selectedOrders,
      [imageId]: parseInt(order)
    });
  };

  const checkAnswers = () => {
    // 1. التحقق من اختيار إجابة لكل الصور
    const allSelected = images.every(img => selectedOrders[img.id]);
    if (!allSelected) {
      ValidationAlert.warning("Veuillez répondre à toutes les questions !");
      return;
    }

    // 2. التحقق من صحة الإجابات
    const wrongImages = images.filter(img => selectedOrders[img.id] !== img.correctOrder);
    setIsChecked(true);
    const score = `${images.length - wrongImages.length}/${images.length}`;
    if (wrongImages.length === 0) {
      ValidationAlert.success(`${score}`);
    } else {
      ValidationAlert.error(`${score}`);
    }
  };


  const handleShowAnswer = () => {
    const correctAnswers = {};
    images.forEach(img => {
      correctAnswers[img.id] = img.correctOrder;
    });
    setSelectedOrders(correctAnswers);
    setIsChecked(true);
  };

  const handleTryAgain = () => {
    setSelectedOrders({});
    setIsChecked(false);
  };

  const getSelectStyle = (imageId) => {
    if (!isChecked) {
      return {
        border: '3px solid #3b82f6',
        backgroundColor: 'white',
        color: '#1f2937'
      };
    }

    const image = images.find(img => img.id === imageId);
    const isCorrect = selectedOrders[imageId] === image.correctOrder;

    if (isCorrect) {
      return {
        border: '3px solid #22c55e',
        backgroundColor: '#22c55e',
        color: 'white'
      };
    } else {
      return {
        border: '3px solid #ef4444',
        backgroundColor: '#ef4444',
        color: 'white'
      };
    }
  };

  return (
    <div className="flex flex-col items-center p-8 gap-8">

      {/* الصور */}
      <div className="grid grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative">
            {/* الصورة */}
            <div className="w-56 h-56 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={image.src}
                alt={`Image ${image.id}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Select absolute في الزاوية */}
            <select
              value={selectedOrders[image.id] || ""}
              onChange={(e) => handleOrderChange(image.id, e.target.value)}
              disabled={isChecked}
              className="absolute top-3 left-3 px-4 py-2 rounded-lg font-bold text-xl cursor-pointer"
              style={{
                ...getSelectStyle(image.id),
                outline: 'none',
                appearance: 'none',
                textAlign: 'center',
                width: '60px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}
            >
              <option value="" disabled>?</option>
              <option value="1">✔</option>
              <option value="2">❌</option>
            </select>
          </div>
        ))}
      </div>

      {/* الأزرار */}
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

export default Q10;