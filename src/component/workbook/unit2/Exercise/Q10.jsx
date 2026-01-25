import React, { useState } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

const Q7 = () => {
  const images = [
    { id: 1, src: '/assets/unit4/secA/page45/1.svg', correctOrder: 1 },
    { id: 2, src: '/assets/unit4/secA/page45/2.svg', correctOrder: 2 },
    { id: 3, src: '/assets/unit4/secA/page45/3.svg', correctOrder: 3 },
    { id: 4, src: '/assets/unit4/secA/page45/4.svg', correctOrder: 4 },
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
    // التحقق من اختيار ترتيب لكل الصور
    const allSelected = images.every(img => selectedOrders[img.id]);
    if (!allSelected) {
      ValidationAlert.warning("Veuillez choisir un ordre pour toutes les images!");
      return;
    }

    // التحقق من عدم تكرار الأرقام
    const orders = Object.values(selectedOrders);
    const uniqueOrders = new Set(orders);
    if (orders.length !== uniqueOrders.size) {
      ValidationAlert.warning("Chaque numéro ne peut être utilisé qu'une seule fois!");
      return;
    }

    // حساب النتيجة
    let correctCount = 0;
    images.forEach(img => {
      if (selectedOrders[img.id] === img.correctOrder) {
        correctCount++;
      }
    });

    setIsChecked(true);

    const score = `${correctCount}/${images.length}`;

    if (correctCount === images.length) {
      ValidationAlert.success(score);
    } else {
      ValidationAlert.error(score);
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
              <option value="2">✔</option>
              <option value="3">❌</option>
              <option value="4">❌</option>
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

export default Q7;