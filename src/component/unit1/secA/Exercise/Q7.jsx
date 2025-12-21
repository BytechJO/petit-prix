import React from 'react';
import './Q7.css';

const characterImage = "/assets/unit1/secA/page7/conv.svg";
const characterImage1 = "/assets/unit1/secA/page7/conv2.svg";

const customsBubbles = [
  {
    top: "10%",
    left: "8%",
    isFlipped: true,
    content: (
      <>
        Je m’appelle Antoine. Et toi ?
      </>
    )
  },
  {
    top: "10%",
    left: "72%",
    isFlipped: false,
    content: (
      <>
        Moi, c’est Marie. Comment tu t’appelles ?
      </>
    )
  }
];
const Q7 = () => {
  return (
      <div className="popup-image-container3">

        <img src={characterImage1} alt="Character" className="character-images1" />
        <img src={characterImage} alt="Character" className="character-images1" />

        {customsBubbles.map((bubble, index) => (
          <div 
            key={index}
            className={`bubbles-cloud ${bubble.isFlipped ? "flipped" : ""}`}
            style={{ top: `calc(${bubble.top} - 60px)`, left: bubble.left }}
          >
            <div className="bubble-content">
              {bubble.content}
            </div>
            <button className="close" onClick={(e) => e.target.parentElement.style.display = 'none'}>×</button>
          </div>
        ))}
      </div>
  );
};

export default Q7;
