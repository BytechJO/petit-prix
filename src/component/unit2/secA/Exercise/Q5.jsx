import React, { useState, useEffect } from 'react';
import './Q7.css';

const flipsound = "/assets/unit2/secA/page20/flip.mp3";

const images = [
  "/assets/unit2/secA/page19/1.png",
  "/assets/unit2/secA/page19/2.png",
  "/assets/unit2/secA/page19/3.png",
  "/assets/unit2/secA/page19/4.png",
  "/assets/unit2/secA/page19/5.png",
  "/assets/unit2/secA/page19/6.png",
  "/assets/unit2/secA/page19/6.png",
];
const sounds = [
  "/assets/unit2/secA/page20/12.mp3",
  "/assets/unit2/secA/page20/13.mp3",
  "/assets/unit2/secA/page20/14.mp3",
  "/assets/unit2/secA/page20/15.mp3",
  "/assets/unit2/secA/page20/16.mp3"
];
const redcard = '/assets/unit2/secA/page20/red.jpg';

const CardData = images.map((img, index) => ({
  id: index + 1,
  frontImage: redcard,
  backImage: img,
  sound: sounds[index]
}));

export default function Q5() {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const flipsoundAudio = new Audio(flipsound);

  const handleCardClick = (card) => {
    if (flippedCards.has(card.id)) return;

    // قلب البطاقة
    const newFlippedCards = new Set(flippedCards);
    newFlippedCards.add(card.id);
    setFlippedCards(newFlippedCards);

    flipsoundAudio.currentTime = 0;
    flipsoundAudio.play();


    // تشغيل الصوت فور قلب البطاقة
    if (audio) audio.pause();
    const newAudio = new Audio(card.sound);
    setAudio(newAudio);
    newAudio.play();

    // بعد 1 ثانية (1000ms) افتح الـ Popup
    setTimeout(() => {
      setCurrentCard(card);
      setIsPopupOpen(true);
    }, 1000); // هنا المدة بالميلي ثانية
  };

  const handleStartAgain = () => {
    // قلب كل البطاقات مرة أخرى قبل إعادة تعيينها
    const flippedCardsArray = Array.from(flippedCards);

    // أضف class للبطاقات المقلوبة لتدور للخلف
    flippedCardsArray.forEach((id) => {
      const cardEl = document.querySelector(`.Q7-card[data-id='${id}'] .Q7-card-inner`);
      if (cardEl) {
        cardEl.classList.add('reverse-flip'); // class خاص لدوران للخلف
      }
    });

    // بعد مدة الأنيميشن (مثلاً 0.7s) نعيد الحالة
    setTimeout(() => {
      setFlippedCards(new Set());
      setCurrentCard(null);
      setIsPopupOpen(false);

      // إزالة class الأنيميشن
      flippedCardsArray.forEach((id) => {
        const cardEl = document.querySelector(`.Q7-card[data-id='${id}'] .Q7-card-inner`);
        if (cardEl) {
          cardEl.classList.remove('reverse-flip');
        }
      });
    }, 700); // مدة الأنيميشن
  };



  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentCard(null);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div className="Q7-container sm:ml-0">
      <div className="Q7-grid">
        {CardData.map((card) => (
          <div key={card.id} className="Q7-card" onClick={() => handleCardClick(card)}>
            <div className={`Q7-card-inner ${flippedCards.has(card.id) ? 'flipped' : ''}`}>
              <div className="Q7-card-front">
                <img src={card.frontImage} alt="Card Front" />
              </div>
              <div className="Q7-card-back">
                <img src={card.backImage} alt="Card Back" />
              </div>
            </div>
          </div>
        ))}
        <div className="popup-buttons mt-4 flex gap-4">
          <button className="try-again-button" onClick={handleStartAgain}>
            Recommencer ↻
          </button>
        </div>
      </div>

      {isPopupOpen && currentCard && (
        <div className="Q7-popup-overlay" onClick={closePopup}>
          <div className="Q7-popup" onClick={(e) => e.stopPropagation()}>
            <button className="Q7-popup-close" onClick={closePopup}>&times;</button>
            <img src={currentCard.backImage} alt="Story Content" />
          </div>
        </div>
      )}
    </div>
  );
}
