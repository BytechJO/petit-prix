import React, { useState, useRef } from 'react';
import Dice from 'react-dice-roll';
import './Q1.css';

const Q1 = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [diceValue, setDiceValue] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    const storyImages = Array.from({ length: 12 }, (_, i) =>
        `/assets/unit1/review/page10/${i + 1}.svg`
    );

    const storySounds = Array.from({ length: 12 }, (_, i) =>
        `/assets/unit1/review/page10/${i}.wav`
    );

    const audioRef = useRef(null);

    const playSound = (soundPath) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = new Audio(soundPath);
        audioRef.current = audio;
        audio.play().catch(err => console.log('Error playing sound:', err));
    };

    const handleDiceRoll = (value) => {
        setDiceValue(value);
        setIsRolling(false);

        setTimeout(() => {
            const newStep = Math.min(currentStep + value, storyImages.length - 1);
            setIsMoving(true);
            
            // تحريك الشخصية خطوة بخطوة
            let step = currentStep;
            const interval = setInterval(() => {
                step++;
                setCurrentStep(step);
                
                if (step >= newStep) {
                    clearInterval(interval);
                    setIsMoving(false);
                    
                    // عرض الـ popup بعد انتهاء الحركة
                    setTimeout(() => {
                        setShowPopup(true);
                        playSound(storySounds[newStep]);
                    }, 300);
                }
            }, 500); // كل خطوة تأخذ 500ms
        }, 500);
    };

    const handleRollClick = () => {
        if (!isRolling && currentStep < storyImages.length - 1 && !isMoving) {
            setIsRolling(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const resetGame = () => {
        setCurrentStep(0);
        setShowPopup(false);
        setDiceValue(1);
        setIsMoving(false);
    };

    // حساب موقع الشخصية
    const getCharacterPosition = () => {
        const row = currentStep < 6 ? 0 : 1;
        const col = currentStep % 6;
        const left = (col + 0.5) * (100 / 6); // توسيط داخل كل عمود
        const top = row * 150; // فرق الصفوف 150px
        return { left: `${left}%`, top: `${top}px` };
    };

    return (
        <div className="dice-game-container">
            <div className="game-header">
                {/* <div className="progress">
                    Étape {currentStep + 1} / {storyImages.length - 1}
                </div> */}
            </div>

            {/* مسار الخطوات */}
            <div className="steps-path">
                {/* الخط المتصل بين النقاط */}
                <svg className="path-line" viewBox="0 0 1000 400">
                    <path
                        d="M 50 100 L 200 100 L 350 100 L 500 100 L 650 100 L 800 100 L 950 100 L 950 300 L 800 300 L 650 300 L 500 300 L 350 300 L 200 300 L 50 300"
                        stroke="#e0cea0"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="15,10"
                    />
                </svg>

                {/* النقاط على المسار */}
                <div className="story-steps">
                    {storyImages.map((img, index) => {
                        const row = index < 6 ? 0 : 1;
                        const col = index % 6;
                        const left = `${(col + 0.5) * (100 / 6)}%`;
                        const top = `${row * 300}px`;

                        return (
                            <div
                                key={index}
                                className={`step-point ${index === currentStep ? 'active' : ''} ${index < currentStep + 1 ? 'completed' : ''}`}
                                style={{ left, top }}
                            >
                                <div className="step-number">{index}</div>
                                {index <= currentStep && (
                                    <div className="step-image-preview">
                                        <img src={img} alt={`étape ${index}`} />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* الشخصية المتحركة */}
                    <div
                        className={`character ${isMoving ? 'moving' : ''}`}
                        style={getCharacterPosition()}
                    >
                        <svg width="60" height="60" viewBox="0 0 100 100">
                            <circle cx="50" cy="30" r="20" fill="#667eea" />
                            <rect x="35" y="50" width="30" height="40" rx="5" fill="#764ba2" />
                            <circle cx="40" cy="30" r="4" fill="white" />
                            <circle cx="60" cy="30" r="4" fill="white" />
                            <path d="M 40 40 Q 50 45 60 40" stroke="white" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* النرد وزر الرمي */}
            <div className="dic">
                <Dice
                    onRoll={handleDiceRoll}
                    size={100}
                    disabled={isRolling || isMoving || currentStep >= storyImages.length - 1}
                    cheatValue={1}
                    defaultValue={diceValue}
                    rollingTime={1000}
                />

                {currentStep >= storyImages.length - 1 && (
                    <button className="reset-button" onClick={resetGame}>
                        Recommencer
                    </button>
                )}
            </div>

            {/* Popup لعرض الصورة */}
            {showPopup && (
                <div className="Q1popup-Q1overlay" onClick={closePopup}>
                    <div className="Q1popup-Q1content" onClick={(e) => e.stopPropagation()}>
                        <button className="Q1close-Q1button" onClick={closePopup}>
                            ✕
                        </button>
                        <div className="Q1popup-Q1image-Q1container">
                            <img
                                src={storyImages[currentStep]}
                                alt={`histoire ${currentStep}`}
                                className="Q1popup-Q1image"
                            />
                        </div>
                        <div className="Q1popup-Q1footer">
                            <p>Étape {currentStep + 1}</p>
                            <button className="continue-button" onClick={closePopup}>
                                Continuer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Q1;
