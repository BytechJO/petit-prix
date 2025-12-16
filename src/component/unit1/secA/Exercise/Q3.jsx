import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';
import './Q3.css';
import characterImage from '../../../../assets/unit1/secA/page6/characters1.png';
import characterImage1 from '../../../../assets/unit1/secA/page6/character2.png';

const answerOptions = ["Salut", "Bonjour"].sort(() => Math.random() - 0.5);

const Q3 = ({
  title,
  questionNumber,
  audioSrc,
  correctAnswers = [],
}) => {
  if (!correctAnswers) {
    console.error("Q3 missing correctAnswers prop");
    return null;
  }

  const [answers, setAnswers] = useState(
    Array(correctAnswers.length || 0).fill("")
  );

  const [checkResult, setCheckResult] = useState(null);
  const [isSecondPart, setIsSecondPart] = useState(false);
  const audioRef = useRef(null);
  const [showAnswer, setShowAnswer] = useState(false);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!isSecondPart && audio.currentTime >= 16) {
        audio.pause();
        audio.currentTime = 16;
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isSecondPart]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleCheck = () => {
    const correctCount = answers.reduce((count, answer, index) => {
      return (
        count +
        (answer &&
          answer.toLowerCase() === correctAnswers[index].toLowerCase()
          ? 1
          : 0)
      );
    }, 0);

    const total = correctAnswers.length;
    const scoreText = `${correctCount} / ${total}`;

    if (correctCount === total) {
      ValidationAlert.success(
        "Bravo!",
        `🎉 Très bien! Vous avez ${scoreText} bonnes réponses.`,
        scoreText
      );
    } else {
      ValidationAlert.error(
        "Oops!",
        `Vous avez seulement ${scoreText}. Essaie encore!`,
        scoreText
      );
    }
  };

  const handleStartAgain = () => {
    setAnswers(Array(correctAnswers.length).fill(""));
    setCheckResult(null);
    setShowAnswer(false);
  };


  const handleShowAnswer = () => {
    setAnswers([...correctAnswers]);
    setShowAnswer(true);
  };


  return (
    <React.Fragment>
      <div className="qustion1">
        <h5>
          <span className="qusetionnum">{questionNumber}.</span> {title}
        </h5>
      </div>


      <div className="l2q1-page-container">

        <div className="content-container">
          <div className="images-flex-container">
            {/* Character 1 */}
            <div className="image-box">
              <img src={characterImage} alt="Character 1" className="character-img" />
              <select
                value={answers[0]}
                onChange={(e) => handleAnswerChange(0, e.target.value)}
                className="answer-select"
              >
                <option value="" disabled>Choisis...</option>
                {answerOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Character 2 */}
            <div className="image-box">
              <img src={characterImage1} alt="Character 2" className="character-img" />
              <select
                value={answers[1]}
                onChange={(e) => handleAnswerChange(1, e.target.value)}
                className="answer-select"
              >
                <option value="" disabled>Choisis...</option>
                {answerOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="popup-buttons">
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
      </div>
    </React.Fragment>
  );
};

export default Q3;
