import React, { useRef } from "react";

const Q99 = () => {
  const cards = [
    {
      img: "/assets/workbook/unit1/page7/1.svg",
      audio: "/assets/workbook/unit1/page7/1.wav",
    },
    {
      img: "/assets/workbook/unit1/page7/2.svg",
      audio: "/assets/workbook/unit1/page7/2.wav",
    },
  ];

  const audioRef = useRef(null);
  const currentSrcRef = useRef(null);

  const handleClick = (src) => {
    // إذا نفس الصوت شغال → وقف
    if (
      audioRef.current &&
      currentSrcRef.current === src &&
      !audioRef.current.paused
    ) {
      audioRef.current.pause();
      return;
    }

    // أوقف القديم
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // شغل الجديد
    const newAudio = new Audio(src);
    audioRef.current = newAudio;
    currentSrcRef.current = src;

    newAudio.play();
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleClick(card.audio)}
            className="
              cursor-pointer
              bg-white
              rounded-3xl
              p-6
              flex
              items-center
              justify-center
              transition duration-300
              hover:scale-105
              hover:shadow-2xl
              active:scale-95
            "
          >
            <img
              src={card.img}
              alt={`card-${index}`}
              className="w-40 max-h-100 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Q99;
