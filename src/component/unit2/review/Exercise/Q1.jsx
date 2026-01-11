import React from 'react';

const characterImage = "/assets/unit2/review/page22/boy.png";
const characterImage1 = "/assets/unit2/review/page22/girl.png";

const customsBubbles = [
    {
        top: "25%",
        left: "29%",
        isFlipped: false,
        content: (
            <>
                Lundi, Je vais me promener dans le parc.
                Mardi, je joue au foot avec mes amis
                Mercredi, je lis un livre.
            </>
        )
    },
    {
        top: "2%",
        left: "51%",
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
    }
];

const Q1 = () => {
    return (
        <div className="relative w-full h-full flex justify-center items-center">

            <img src={characterImage1} alt="Character" className="absolute top-20 left-30 max-w-100 max-h-100" />
            <img src={characterImage} alt="Character" className="absolute top-20 right-30 max-w-100 max-h-100" />

            {customsBubbles.map((bubble, index) => (
                <div
                    key={index}
                    className={`bubbles-cloud ${bubble.isFlipped ? "flipped" : ""}`}
                    style={{ top: `calc(${bubble.top} - -50px)`, left: bubble.left }}
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
