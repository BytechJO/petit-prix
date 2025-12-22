import React, { useState, useMemo } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import ValidationAlert from '../../../Popup/ValidationAlert';
import { image } from 'framer-motion/client';


const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const blue = "";
const green = "";
const yellow = "";
const red = "";
const white = "";
const black = "";

const colorData = [
    { id: 'blue', name: 'bleu', image: blue },
    { id: 'green', name: 'vert', image: green },
    { id: 'yellow', name: 'jaune', image: yellow },
    { id: 'red', name: 'rouge', image: red },
    { id: 'white', name: 'blanc', image: white },
    { id: 'black', name: 'noir', image: black },
];




const Q13 = () => {
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);

    const shuffledWords = useMemo(() => shuffleArray(colorData), []);
    const shuffledColors = useMemo(() => shuffleArray(colorData), []);

    const handleWordClick = (word) => {
        if (matchedPairs.find(p => p.id === word.id)) return;
        setSelectedWord(word);
        checkForMatch(word, selectedColor);
    };

    const handleColorClick = (color) => {
        if (matchedPairs.find(p => p.id === color.id)) return;
        setSelectedColor(color);
        checkForMatch(selectedWord, color);
    };

    const checkForMatch = (word, color) => {
        if (word && color) {
            if (word.id === color.id) {
                const newMatch = { id: word.id, wordId: `word-${word.id}`, colorId: `color-${color.id}` };
                setMatchedPairs([...matchedPairs, newMatch]);
            } else {

            }

            setTimeout(() => {
                setSelectedWord(null);
                setSelectedColor(null);
                if (word.id !== color.id) {
                    return ValidationAlert.warning("Attention", "Veuillez déposer une réponse pour chaque visage !");
                }
            });
        }
    };

    const isComplete = matchedPairs.length === colorData.length;

    const resetGame = () => {
        setSelectedWord(null);
        setSelectedColor(null);
        setMatchedPairs([]);
    };

    const handleShowAnswer = () => {
        const allMatches = colorData.map(item => ({
            id: item.id,
            wordId: `word-${item.id}`,
            colorId: `color-${item.id}`,
        }));

        setMatchedPairs(allMatches);
    };

    const handleCheck = () => {
        const score = matchedPairs.length;
        const total = colorData.length;

        const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;
        if (score === total) {
            ValidationAlert.success(
                "Bravo ! 🎉",
                scoreMessage
            );
        }
        else if (score === 0) {
            ValidationAlert.warning(
                "Oups !",
                "Essayez de relier les couleurs aux mots."
            );
        }
        else {
            ValidationAlert.error(
                "Continue !",
                scoreMessage
            );
        }
    };

    return (
        <div dir="ltr" className="w-full max-w-4xl mx-auto p-8 rounded-xl font-sans">

            <Xwrapper>
                <>
                    <div className="flex justify-between items-start relative">
                        {/* Words Column */}
                        <div className="flex flex-col items-center space-y-4 w-1/2 pr-4">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">mots</h3>
                            {shuffledWords.map((word) => (
                                <button
                                    id={`word-${word.id}`}
                                    key={word.id}
                                    onClick={() => handleWordClick(word)}
                                    disabled={matchedPairs.find(p => p.id === word.id)}
                                    className={`w-48 py-3 px-6 text-lg font-bold rounded-lg shadow-md transition-all duration-200 ${matchedPairs.find(p => p.id === word.id)
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : selectedWord?.id === word.id
                                            ? 'bg-blue-500 text-white ring-4 ring-blue-300 transform scale-105'
                                            : 'bg-white text-gray-800 hover:bg-blue-100'
                                        }`}
                                >
                                    {word.name}
                                </button>
                            ))}
                        </div>

                        {/* Colors Column */}
                        <div className="flex flex-col items-center space-y-4 w-1/2 pl-4">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">couleurs</h3>
                            {shuffledColors.map((color) => (
                                <button
                                    id={`color-${color.id}`}
                                    key={color.id}
                                    onClick={() => handleColorClick(color)}
                                    disabled={matchedPairs.find(p => p.id === color.id)}
                                    className={`w-48 h-14 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center bg-white ${matchedPairs.find(p => p.id === color.id)
                                            ? 'opacity-30 cursor-not-allowed'
                                            : selectedColor?.id === color.id
                                                ? 'ring-4 ring-blue-300 transform scale-105'
                                                : 'hover:scale-105'
                                        }`}
                                >
                                    <img
                                        src={color.image}
                                        alt={color.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </button>

                            ))}
                        </div>

                        {/* Lines for matched pairs */}
                        {matchedPairs.map(pair => (
                            <Xarrow
                                key={pair.id}
                                start={pair.wordId}
                                end={pair.colorId}
                                strokeWidth={3}
                                color="#4ade80"
                                path="smooth"
                                dashness={false}
                                showHead={false}
                            />
                        ))}

                        {/* Line for selection in progress */}
                        {selectedWord && selectedColor && selectedWord.id !== selectedColor.id && (
                            <Xarrow
                                start={`word-${selectedWord.id}`}
                                end={`color-${selectedColor.id}`}
                                strokeWidth={4}
                                color="#ef4444"
                                path="grid"
                                dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: -2 }}
                            />

                        )}

                    </div>
                </>

            </Xwrapper>
            <div className="popup-buttons">
                <button className="try-again-button" onClick={resetGame}>
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
    );
};

export default Q13;
