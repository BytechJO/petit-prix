import React from 'react';
import './Q1.css';

const characterImage = "/assets/unit1/secA/page7/conv.svg";
const characterImage1 = "/assets/unit1/secA/page7/conv2.svg";

const customsBubbles = [
    {
        top: "12%",
        left: "13%",
        isFlipped: true,
        content: (
            <>
                Jeudi, je fais du judo.
                Vendredi, je finis mon école.
                Samedi, je rends visite à mes
                grands-parents.
                Dimanche, je suis prêt pour l’école.
            </>
        )
    },
    {
        top: "2%",
        left: "68%",
        isFlipped: false,
        content: (
            <>
                Lundi, Je vais me promener dans le parc.
                Mardi, je joue au foot avec mes amis
                Mercredi, je lis un livre.
            </>
        )
    }
];
const Q1 = () => {
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

export default Q1;
