import React, { useState, useEffect, useRef } from 'react';

const flipsound = "/assets/unit2/secA/page20/flip.mp3";
const images = [
  "/assets/unit2/secA/page19/1.png",
  "/assets/unit2/secA/page19/2.png",
];
const sounds = [
  "/assets/unit2/secA/page19/01.mp3",
  "/assets/unit2/secA/page19/02.mp3",
];
const redcard = '/assets/unit2/secA/page20/red.jpg';

const CardData = images.map((img, index) => ({
  id: index + 1,
  frontImage: redcard,
  backImage: img,
  sound: sounds[index]
}));

export default function Q99() {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [audio, setAudio] = useState(null);
  const flipAudioRef = useRef(null);

  // تهيئة صوت الوجه
  useEffect(() => {
    flipAudioRef.current = new Audio(flipsound);
  }, []);

  // تنظيف الصوت عند إغلاق المكون
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (flipAudioRef.current) {
        flipAudioRef.current.pause();
        flipAudioRef.current.currentTime = 0;
      }
    };
  }, [audio]);

  const handleCardClick = (card) => {
    if (flippedCards.has(card.id)) return;

    // قلب البطاقة
    const newFlippedCards = new Set(flippedCards);
    newFlippedCards.add(card.id);
    setFlippedCards(newFlippedCards);

    // تشغيل صوت الوجه
    if (flipAudioRef.current) {
      flipAudioRef.current.currentTime = 0;
      flipAudioRef.current.play();
    }

    // بعد 1 ثانية افتح الـ Popup
    setTimeout(() => {
      setCurrentCard(card);
      setIsPopupOpen(true);

      // إيقاف أي صوت سابق وتشغيل الصوت الجديد
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const newAudio = new Audio(card.sound);
      setAudio(newAudio);
      newAudio.play();
    }, 1000);
  };

  const handleStartAgain = () => {
    // إضافة تأثير الدوران العكسي
    const flippedCardsArray = Array.from(flippedCards);

    flippedCardsArray.forEach((id) => {
      const cardEl = document.querySelector(`.card-inner[data-id='${id}']`);
      if (cardEl) {
        cardEl.classList.add('reverse-flip');
      }
    });

    // بعد مدة الأنيميشن نعيد الحالة
    setTimeout(() => {
      setFlippedCards(new Set());
      setCurrentCard(null);
      setIsPopupOpen(false);

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // إزالة class الأنيميشن
      flippedCardsArray.forEach((id) => {
        const cardEl = document.querySelector(`.card-inner[data-id='${id}']`);
        if (cardEl) {
          cardEl.classList.remove('reverse-flip');
        }
      });
    }, 700);
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
    <div className="flex  sm:ml-[10%]">
      <div className="grid ml-100 grid-cols-2 gap-[5.5rem]">
        {CardData.map((card) => (
          <div
            key={card.id}
            className="perspective-[1000px] cursor-pointer w-40 h-58 shadow-lg"
            onClick={() => handleCardClick(card)}
          >
            <div
              data-id={card.id}
              className={`card-inner w-full h-full transition-transform duration-[0.7s] [transform-style:preserve-3d] relative ${flippedCards.has(card.id) ? '[transform:rotateY(180deg)]' : ''
                }`}
            >
              {/* الوجه الأمامي */}
              <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={card.frontImage}
                  alt="Card Front"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* الوجه الخلفي */}
              <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={card.backImage}
                  alt="Card Back"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="popup-buttons">
          <button
            className="try-again-button"
            onClick={handleStartAgain}
          >
            Recommencer ↻
          </button>
        </div>
      </div>

      {isPopupOpen && currentCard && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="rounded-lg max-w-md w-full mx-4 relative animate-[fade-in-up_0.5s_ease-out_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center font-bold text-xl cursor-pointer z-10"
              onClick={closePopup}
            >
              &times;
            </button>
            <img
              src={currentCard.backImage}
              alt="Story Content"
              className="w-full h-auto max-h-[80vh] mx-auto rounded"
            />
          </div>
        </div>
      )}


      {/* أنيميشن reverse-flip */}
      <style jsx>{`
        .reverse-flip {
          animation: reverseFlip 0.7s ease-in-out forwards;
        }
        
        @keyframes reverseFlip {
          0% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
        
        @keyframes Q7-fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}