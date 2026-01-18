import React, { useState, useRef } from 'react';
import { RotateCcw, Star, CheckCircle2, Trophy } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert';

export default function Q1() {
    const alphabetData = [
        // Page 1
        { letter: 'S', word: 'SAUCISSE', emoji: '🌭', color: '#FFB347', bgColor: '#FFF3E0' },
        { letter: 'T', word: 'TOMATE', emoji: '🍅', color: '#FF6B9D', bgColor: '#FCE4EC' },
        { letter: 'B', word: 'BONBON', emoji: '🍬', color: '#FF9800', bgColor: '#FFF8E1' },
        { letter: 'K', word: 'KARATÉ', emoji: '🥋', color: '#9C27B0', bgColor: '#F3E5F5' },
        { letter: 'X', word: 'XYLOPHONE', emoji: '🎵', color: '#4CAF50', bgColor: '#E8F5E9' },
        { letter: 'F', word: 'FOURMI', emoji: '🐜', color: '#E91E63', bgColor: '#FCE4EC' },
        { letter: 'V', word: 'VIOLET', emoji: '💜', color: '#673AB7', bgColor: '#EDE7F6' },
        { letter: 'Z', word: 'ZÈBRE', emoji: '🦓', color: '#8BC34A', bgColor: '#F1F8E9' },
        { letter: 'J', word: 'JOURNAL', emoji: '📰', color: '#FF9800', bgColor: '#FFF3E0' },
        { letter: 'D', word: 'DINOSAURE', emoji: '🦕', color: '#00BCD4', bgColor: '#E0F7FA' },
        { letter: 'W', word: 'WAGON', emoji: '🚂', color: '#795548', bgColor: '#EFEBE9' },
        { letter: 'M', word: 'MONSTRE', emoji: '👾', color: '#9C27B0', bgColor: '#F3E5F5' },
        { letter: 'I', word: 'INSECTE', emoji: '🐛', color: '#FF9800', bgColor: '#FFF3E0' },
        // Page 2
        { letter: 'R', word: 'ROI', emoji: '👑', color: '#9C27B0', bgColor: '#F3E5F5' },
        { letter: 'Y', word: 'YAOURT', emoji: '🥛', color: '#FF6B9D', bgColor: '#FCE4EC' },
        { letter: 'Q', word: 'QUESTION', emoji: '❓', color: '#8BC34A', bgColor: '#F1F8E9' },
        { letter: 'O', word: 'ORANGE', emoji: '🍊', color: '#FF9800', bgColor: '#FFF3E0' },
        { letter: 'E', word: 'ESCARGOT', emoji: '🐌', color: '#3F51B5', bgColor: '#E8EAF6' },
        { letter: 'C', word: 'CHIEN', emoji: '🐕', color: '#4CAF50', bgColor: '#E8F5E9' },
        { letter: 'G', word: 'GRENOUILLE', emoji: '🐸', color: '#F44336', bgColor: '#FFEBEE' },
        { letter: 'U', word: 'UNICORNE', emoji: '🦄', color: '#E91E63', bgColor: '#FCE4EC' },
        { letter: 'P', word: 'POIVRON', emoji: '🫑', color: '#4CAF50', bgColor: '#E8F5E9' },
        { letter: 'N', word: 'NOISETTE', emoji: '🥜', color: '#795548', bgColor: '#EFEBE9' },
        { letter: 'A', word: 'ANANAS', emoji: '🍍', color: '#FF5252', bgColor: '#FFEBEE' },
        { letter: 'H', word: 'HÉRISSON', emoji: '🦔', color: '#9C27B0', bgColor: '#F3E5F5' },
        { letter: 'L', word: 'LAPIN', emoji: '🐰', color: '#00BCD4', bgColor: '#E0F7FA' }
    ];

    const correctOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const [userOrder, setUserOrder] = useState([]);
    const [availableLetters, setAvailableLetters] = useState([...alphabetData]);
    const [isChecked, setIsChecked] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);
    const draggedOverIndex = useRef(null);

    const handleDragStart = (item, fromUserOrder = false) => {
        setDraggedItem({ item, fromUserOrder });
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        draggedOverIndex.current = index;
    };

    const handleDrop = (e, dropToUserOrder = false) => {
        e.preventDefault();
        if (!draggedItem) return;

        const { item, fromUserOrder } = draggedItem;

        if (dropToUserOrder && !fromUserOrder) {
            // Moving from available to user order
            setUserOrder(prev => {
                const newOrder = [...prev];
                if (draggedOverIndex.current !== null) {
                    newOrder.splice(draggedOverIndex.current, 0, item);
                } else {
                    newOrder.push(item);
                }
                return newOrder;
            });
            setAvailableLetters(prev => prev.filter(l => l.letter !== item.letter));
        } else if (!dropToUserOrder && fromUserOrder) {
            // Moving from user order back to available
            setUserOrder(prev => prev.filter(l => l.letter !== item.letter));
            setAvailableLetters(prev => [...prev, item]);
        } else if (dropToUserOrder && fromUserOrder) {
            // Reordering within user order
            setUserOrder(prev => {
                const newOrder = prev.filter(l => l.letter !== item.letter);
                if (draggedOverIndex.current !== null) {
                    newOrder.splice(draggedOverIndex.current, 0, item);
                } else {
                    newOrder.push(item);
                }
                return newOrder;
            });
        }

        setDraggedItem(null);
        draggedOverIndex.current = null;
        setIsChecked(false);
    };

    const handleLetterClick = (item) => {
        // Move to user order
        setUserOrder(prev => [...prev, item]);
        setAvailableLetters(prev => prev.filter(l => l.letter !== item.letter));
        setIsChecked(false);
    };

    const handleRemoveLetter = (item) => {
        setUserOrder(prev => prev.filter(l => l.letter !== item.letter));
        setAvailableLetters(prev => [...prev, item]);
        setIsChecked(false);
    };

    const handleTryAgain = () => {
        setUserOrder([]);
        setAvailableLetters([...alphabetData]);
        setIsChecked(false);
    };


    const handleCheck = () => {
        if (userOrder.length < alphabetData.length) {
            ValidationAlert.warning("Attention!", "Veuillez placer toutes les lettres avant de vérifier.");
            return;
        }

        setIsChecked(true);

        const correctCount = userOrder.filter((item, index) => item.letter === correctOrder[index]).length;

        if (correctCount === alphabetData.length) {
            ValidationAlert.success(`${correctCount} / ${alphabetData.length}`);
        } else {
            ValidationAlert.error(`${correctCount} / ${alphabetData.length}`);
        }
    };

    const handleShowAnswer = () => {
        const fullOrder = correctOrder.map(letter => alphabetData.find(l => l.letter === letter));
        setUserOrder(fullOrder);
        setAvailableLetters([]);
        setIsChecked(true);
    };


    const isCorrect = isChecked &&
        userOrder.length === alphabetData.length &&
        userOrder.every((item, index) => item.letter === correctOrder[index]);

    const getLetterStatus = (letter, index) => {
        if (!isChecked) return 'neutral';
        if (correctOrder[index] === letter) return 'correct';
        return 'incorrect';
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Available Letters */}
                <div className="bg-white rounded-3xl p-6 md:p-8 mb-6 shadow-xl">
                    {availableLetters.length === 0 ? (
                        <p className="text-gray-400 text-center py-8 text-lg italic">
                            Toutes les lettres sont placées ! 🎉
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {availableLetters.map((item, index) => (
                                <div
                                    key={`available-${item.letter}`}
                                    draggable
                                    onDragStart={() => handleDragStart(item, false)}
                                    onClick={() => handleLetterClick(item)}
                                    className="cursor-pointer group"
                                    style={{
                                        animation: `popIn 0.4s ease-out ${index * 0.03}s backwards`
                                    }}
                                >
                                    <div className="relative">
                                        <div
                                            className="rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 hover:rotate-2 hover:shadow-2xl"
                                            style={{ backgroundColor: item.bgColor }}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className="text-5xl md:text-6xl font-black mb-2 drop-shadow-lg"
                                                    style={{ color: item.color }}
                                                >
                                                    {item.letter}
                                                </div>
                                                <div className="text-3xl mb-2">{item.emoji}</div>
                                                <div
                                                    className="text-xs md:text-sm font-bold uppercase tracking-wide"
                                                    style={{ color: item.color }}
                                                >
                                                    {item.word}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* User Order Area */}
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 md:p-8 mb-6 shadow-xl border-4 border-dashed border-purple-300">
                    <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                        <Trophy className="text-purple-600" />
                        Ton ordre alphabétique
                    </h2>

                    <div
                        onDragOver={(e) => handleDragOver(e, userOrder.length)}
                        onDrop={(e) => handleDrop(e, true)}
                        className="min-h-[200px]"
                    >
                        {userOrder.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4 opacity-50">📝</div>
                                <p className="text-purple-500 text-xl font-semibold italic">
                                    Clique sur les lettres pour commencer...
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                                {userOrder.map((item, index) => {
                                    const status = getLetterStatus(item.letter, index);
                                    return (
                                        <div
                                            key={`user-${item.letter}-${index}`}
                                            draggable
                                            onDragStart={() => handleDragStart(item, true)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDrop={(e) => handleDrop(e, true)}
                                            onClick={() => handleRemoveLetter(item)}
                                            className="cursor-pointer group relative"
                                            style={{
                                                animation: `slideUp 0.3s ease-out`
                                            }}
                                        >
                                            <div
                                                className={`rounded-2xl p-3 transition-all duration-300 transform hover:scale-110 hover:-rotate-3 shadow-lg ${status === 'correct' ? 'ring-4 ring-green-500' :
                                                    status === 'incorrect' ? 'ring-4 ring-red-500' : ''
                                                    }`}
                                                style={{ backgroundColor: item.bgColor }}
                                            >
                                                <div className="text-center">
                                                    <div
                                                        className="text-4xl md:text-5xl font-black drop-shadow"
                                                        style={{ color: item.color }}
                                                    >
                                                        {item.letter}
                                                    </div>
                                                    {status === 'correct' && (
                                                        <CheckCircle2
                                                            className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full"
                                                            size={24}
                                                        />
                                                    )}
                                                    {status === 'incorrect' && (
                                                        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                                                            <span className="text-red-500 font-bold text-lg">✗</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="popup-buttons">
                    <button className="try-again-button" onClick={handleTryAgain}>
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

            <style jsx>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
      `}</style>
        </div>
    );
}