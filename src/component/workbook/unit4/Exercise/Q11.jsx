import React, { useState, useEffect } from 'react';
import './Q11.css';
const flipsound = "/assets/unit2/secA/page20/flip.mp3";

const img1 = '/assets/workbook/unit4/page31/Q2-1.svg';
const img2 = '/assets/workbook/unit4/page31/Q2-2.svg';
const img3 = '/assets/workbook/unit4/page31/Q2-3.svg';
const img4 = '/assets/workbook/unit4/page31/Q2-4.svg';
const img5 = '/assets/workbook/unit4/page31/Q2-5.svg';
const img6 = '/assets/workbook/unit4/page31/Q2-6.svg';
const img7 = '/assets/workbook/unit4/page31/Q2-7.svg';
const img8 = '/assets/workbook/unit4/page31/Q2-8.svg';


const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8
];
const sounds = [
  '/assets/workbook/unit4/page31/16/1.mp3',
  '/assets/workbook/unit4/page31/16/2.mp3',
  '/assets/workbook/unit4/page31/16/3.mp3',
  '/assets/workbook/unit4/page31/16/4.mp3',
  '/assets/workbook/unit4/page31/16/5.mp3',
  '/assets/workbook/unit4/page31/16/6.mp3',
  '/assets/workbook/unit4/page31/16/7.mp3',
  '/assets/workbook/unit4/page31/16/8.mp3'
];
const redcard = '/assets/unit2/secA/page20/red.jpg';

const CardData = images.map((img, index) => ({
  id: index + 1,
  frontImage: redcard,
  backImage: img,
  sound: sounds[index]
}));

export default function Q11() {
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




    // بعد 1 ثانية (1000ms) افتح الـ Popup
    setTimeout(() => {
      setCurrentCard(card);
      setIsPopupOpen(true);
      // تشغيل الصوت فور قلب البطاقة
      if (audio) audio.pause();
      const newAudio = new Audio(card.sound);
      setAudio(newAudio);
      newAudio.play();
    }, 1000); // هنا المدة بالميلي ثانية
  };

  const handleStartAgain = () => {
    // قلب كل البطاقات مرة أخرى قبل إعادة تعيينها
    const flippedCardsArray = Array.from(flippedCards);

    // أضف class للبطاقات المقلوبة لتدور للخلف
    flippedCardsArray.forEach((id) => {
      const cardEl = document.querySelector(`.Q11-card[data-id='${id}'] .Q11-card-inner`);
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
        const cardEl = document.querySelector(`.Q11-card[data-id='${id}'] .Q11-card-inner`);
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
    <div className="Q11-container sm:ml-0">
      <div className="Q11-grid">
        {CardData.map((card) => (
          <div key={card.id} className="Q11-card" onClick={() => handleCardClick(card)}>
            <div className={`Q11-card-inner ${flippedCards.has(card.id) ? 'flipped' : ''}`}>
              <div className="Q11-card-front">
                <img src={card.frontImage} alt="Card Front" />
              </div>
              <div className="Q11-card-back">
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
        <div className="Q11-popup-overlay" onClick={closePopup}>
          <div className="Q11-popup" onClick={(e) => e.stopPropagation()}>
            <button className="Q11-popup-close" onClick={closePopup}>&times;</button>
            <img src={currentCard.backImage} alt="Story Content" />
          </div>
        </div>
      )}
    </div>
  );
}
