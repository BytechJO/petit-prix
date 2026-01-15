import React, { useState } from 'react';

const Q15 = () => {
  // الحالة لتخزين إجابات المستخدم
  const [answers, setAnswers] = useState({
    today: '',
    tomorrow: ''
  });

  // تحديث الإجابات عند كتابة المستخدم
  const handleInputChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // زر Recommencer لمسح كل الإجابات
  const handleTryAgain = () => {
    setAnswers({ today: '', tomorrow: '' });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <p className="text-lg font-bold">
        J’habite avec{' '}
        <input
          type="text"
          value={answers.today}
          onChange={(e) => handleInputChange('today', e.target.value)}
          className="border-b-2 border-dashed border-gray-400 focus:border-blue-500 mx-1 px-1 text-center text-lg w-120"
          placeholder="Votre réponse"
        />
      </p>

      <div className="popup-buttons flex space-x-4 mt-6">
        <button
          className="try-again-button"
          onClick={handleTryAgain}
        >
          Recommencer ↻
        </button>
      </div>
    </div>
  );
};

export default Q15;
