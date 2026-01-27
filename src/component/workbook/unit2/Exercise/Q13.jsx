import React, { useState } from 'react';

const Q8 = () => {
  const [answers, setAnswers] = useState({
    today: '',
    tomorrow: ''
  });

  const handleInputChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTryAgain = () => {
    setAnswers({ today: '', tomorrow: '' });
  };

  // ستايل مشترك للـ input
  const inputStyle =
    "w-44 text-center text-lg font-semibold border-2 border-dashed border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200";

  return (
    <div className="lg:mt-10 flex items-center justify-center p-6">

      {/* Card */}
      <div className="bg-[#aae1fa] w-full max-w-xl rounded-2xl p-10 space-y-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Complétez
        </h2>

        {/* Sentence 1 */}
        <p className="text-xl font-medium text-gray-700 flex flex-wrap items-center gap-2">
          J’aime
          <input
            type="text"
            value={answers.today}
            onChange={(e) => handleInputChange('today', e.target.value)}
            className={inputStyle}
            placeholder="Votre réponse"
          />
        </p>

        {/* Sentence 2 */}
        <p className="text-xl font-medium text-gray-700 flex flex-wrap items-center gap-2">
          déteste
          <input
            type="text"
            value={answers.tomorrow}
            onChange={(e) => handleInputChange('tomorrow', e.target.value)}
            className={inputStyle}
            placeholder="Votre réponse"
          />
        </p>
      </div>
      <div className="popup-buttons">
          <button className="try-again-button" onClick={handleTryAgain}>Recommencer ↻</button>
        </div>
    </div>
  );
};

export default Q8;
