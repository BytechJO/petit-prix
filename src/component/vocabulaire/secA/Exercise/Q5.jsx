
import React, { useState } from 'react';
import './Q5.css';
import ValidationAlert from '../../../Popup/ValidationAlert';


const boyImage = "/assets/unit1/secA/page7/Q11.webp";
const girlImage = "/assets/unit1/secA/page7/Q12.webp";

const Q5 = ({ sound }) => {
  const [boyName, setBoyName] = useState('');
  const [girlName, setGirlName] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const checkAnswers = () => {
    const correctBoyName = 'Antoine';
    const correctGirlName = 'aime';

    if (!boyName.trim() || !girlName.trim()) {
      ValidationAlert.warning(
        "Attention!",
        "Veuillez remplir les deux champs.",
        "0/2"
      );
      return;
    }

    const isBoyCorrect =
      boyName.trim().toLowerCase() === correctBoyName.toLowerCase();
    const isGirlCorrect =
      girlName.trim().toLowerCase() === correctGirlName.toLowerCase();

    const score =
      (isBoyCorrect ? 1 : 0) +
      (isGirlCorrect ? 1 : 0);

    const scoreText = `${score}/2`;

    if (score === 2) {
      ValidationAlert.success(
        "Bravo!",
        scoreText
      );
    } else {
      ValidationAlert.error(
        "Essayez encore!",
        scoreText
      );
    }
  };



  const handleTryAgain = () => {
    setBoyName('');
    setGirlName('');
    if (ValidationAlert && typeof ValidationAlert.close === 'function') {
      ValidationAlert.close();
    }
  };

  const handleShowAnswer = () => {
    setBoyName('Antoine');
    setGirlName('aime');
  };


  return (
    <div className="q5-activity-container">


      <div className="q5-body">
        <div className="q5-character-group">
          <img src={boyImage} alt="Garçon" className="q5-character-img" />
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setBoyName('Antoine')}
              className={`px-5 py-2 rounded-xl font-bold border transition cursor-pointer
      ${boyName === 'Antoine'
                  ? 'bg-[#430f68] text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                }
    `}
            >
              A
            </button>

            <button
              onClick={() => setBoyName('Paul')}
              className={`px-5 py-2 rounded-xl font-bold border transition cursor-pointer
      ${boyName === 'Paul'
                  ? 'bg-[#430f68] text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                }
    `}
            >
              B
            </button>
          </div>


        </div>

        <div className="q5-character-group">
          <img src={girlImage} alt="Fille" className="q5-character-img" />
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setGirlName('deteste')}
              className={`px-5 py-2 rounded-xl font-bold border transition cursor-pointer
      ${girlName === 'deteste'
                  ? 'bg-[#430f68] text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                }
    `}
            >
              A
            </button>

            <button
              onClick={() => setGirlName('aime')}
              className={`px-5 py-2 rounded-xl font-bold border transition cursor-pointer
      ${girlName === 'aime'
                  ? 'bg-[#430f68] text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                }
    `}
            >
              B
            </button>
          </div>


        </div>
      </div>

      <div className="popup-buttons">
        <button className="try-again-button" onClick={handleTryAgain}>
          Recommencer ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Vérifier la réponse ✓
        </button>
      </div>
    </div>
  );
};

export default Q5;
