
import React, { useState } from 'react';
import './Q5.css';
import ValidationAlert from '../../../Popup/ValidationAlert';


const boyImage  ="/assets/unit1/secA/page7/Q11.webp";
const girlImage ="/assets/unit1/secA/page7/Q12.webp";

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
          <input
            type="text"
            id="q5-boy-name"
            value={boyName}
            onChange={handleInputChange(setBoyName)}
            placeholder="Antoine"
            className="q5-input"
          />
        </div>

        <div className="q5-character-group">
          <img src={girlImage} alt="Fille" className="q5-character-img" />
          <input
            type="text"
            id="q5-girl-name"
            value={girlName}
            onChange={handleInputChange(setGirlName)}
            placeholder="aime"
            className="q5-input"
          />
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
