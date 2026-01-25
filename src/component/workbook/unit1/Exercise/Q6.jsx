import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

// --- بيانات التمرين (تبقى كما هي) ---
const WORDS = [
    { id: 'word-1', text: 'Je m’appelle Éric.', correctMatch: 'img-1' },
    { id: 'word-2', text: 'Comment tu t’appelles ?', correctMatch: 'img-2' },
    { id: 'word-3', text: 'Salut !', correctMatch: 'img-3' },
]

const img1 = '/assets/workbook/unit1/page5/1.svg';
const img2 = '/assets/workbook/unit1/page5/2.svg';
const img3 = '/assets/workbook/unit1/page5/3.svg';

const IMAGES = [
    { id: 'img-2', src: img2, alt: 'Comme ci comme ça' },
    { id: 'img-3', src: img3, alt: 'Bien' },
    { id: 'img-1', src: img1, alt: 'Super' },
]

// --- المكون الرئيسي ---
const Q6 = () => {
    // اللوجيك يبقى كما هو
    const [connections, setConnections] = useState([]);
    const [activeLine, setActiveLine] = useState(null);
    const [feedback, setFeedback] = useState({});
    const svgContainerRef = useRef(null);

    const updatePointsCoordinates = () => {
    if (!svgContainerRef.current) return {};
    const newPoints = {};
    const container = svgContainerRef.current;
    const containerRect = container.getBoundingClientRect();

    container.querySelectorAll('[data-pointid]').forEach(el => {
        const rect = el.getBoundingClientRect();

        const isWord = el.dataset.pointid.startsWith('word');
        const isImage = el.dataset.pointid.startsWith('img');

        const x = rect.left + rect.width / 2 - containerRect.left;

        // أهم تعديل هنا:
        const y = isWord
            ? rect.top + rect.height - containerRect.top    // أسفل الكلمة
            : rect.top - containerRect.top;                 // أعلى الصورة

        newPoints[el.dataset.pointid] = { x, y };
    });

    return newPoints;
};




    const handlePointClick = (id, type) => {
        if (!activeLine && type === 'image') return;

        if (!activeLine) {
            setActiveLine({ startId: id, endPoint: null });
        } else {
            if (type === 'image' && activeLine.startId !== id) {
                const newConnection = { startId: activeLine.startId, endId: id };
                if (!connections.some(c => c.startId === newConnection.startId || c.endId === newConnection.endId)) {
                    setConnections([...connections, newConnection]);
                }
                setActiveLine(null);
            }
        }
    };


    useEffect(() => {
        const handleMouseMove = (e) => {
            if (activeLine && svgContainerRef.current) {
                const containerRect = svgContainerRef.current.getBoundingClientRect();
                setActiveLine(prev => ({ ...prev, endPoint: { x: e.clientX - containerRect.left, y: e.clientY - containerRect.top } }));
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeLine]);

    const checkAnswers = () => {
        if (connections.length < WORDS.length) {
            ValidationAlert.warning("Attention!", "Veuillez relier tous les mots aux images.");
            return;
        }
        const newFeedback = {};
        let correctCount = 0;
        connections.forEach((conn, index) => {
            const word = WORDS.find(w => w.id === conn.startId);
            const isCorrect = word.correctMatch === conn.endId;
            newFeedback[index] = isCorrect ? 'correct' : 'incorrect';
            if (isCorrect) correctCount++;
        });
        setFeedback(newFeedback);
        const total = WORDS.length;
        if (correctCount === total) {
            ValidationAlert.success(` ${correctCount} / ${total}`);
        } else {
            ValidationAlert.error(` ${correctCount} / ${total}`);
        }
    };

    const handleTryAgain = () => {
        setConnections([]);
        setActiveLine(null);
        setFeedback({});
    };

    const handleShowAnswer = () => {
        const correctConnections = WORDS.map(word => ({
            startId: word.id,
            endId: word.correctMatch
        }));

        setConnections(correctConnections);

        // ضع الـ feedback لجميع الإجابات على أنها صحيحة
        const newFeedback = {};
        correctConnections.forEach((conn, index) => {
            newFeedback[index] = 'correct';
        });
        setFeedback(newFeedback);
    };

    const getLinePoints = (connection) => {
        const points = updatePointsCoordinates();
        return { startPoint: points[connection.startId], endPoint: points[connection.endId] };
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div
                ref={svgContainerRef}
                className="relative bg-white rounded-2xl shadow-lg p-6"
                style={{
                    minHeight: '300px',
                }}
            >
                {/* SVG للخطوط */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                    {connections.map((conn, index) => {
                        const { startPoint, endPoint } = getLinePoints(conn);
                        if (!startPoint || !endPoint) return null;
                        const color =
                            feedback[index] === 'correct'
                                ? '#16a34a'
                                : feedback[index] === 'incorrect'
                                    ? '#dc2626'
                                    : '#3b82f6';
                        return (
                            <line
                                key={index}
                                x1={startPoint.x}
                                y1={startPoint.y}
                                x2={endPoint.x}
                                y2={endPoint.y}
                                stroke={color}
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                        );
                    })}
                    {activeLine && activeLine.endPoint && (() => {
                        const points = updatePointsCoordinates();
                        const startPoint = points[activeLine.startId];
                        if (!startPoint) return null;
                        return (
                            <line
                                x1={startPoint.x}
                                y1={startPoint.y}
                                x2={activeLine.endPoint.x}
                                y2={activeLine.endPoint.y}
                                stroke="#60a5fa"
                                strokeWidth="4"
                                strokeDasharray="6 6"
                            />
                        );
                    })()}
                </svg>

                {/* الكلمات في صف أفقي */}
                <div className="flex justify-around mb-16">
                    {WORDS.map((word) => (
                        <div
                            key={word.id}
                            data-pointid={word.id}
                            onClick={() => handlePointClick(word.id, 'word')}
                            className="p-4 rounded-lg shadow-sm cursor-pointer text-center border border-solid border-[#178e6e]"
                        >
                            <span className="font-semibold text-gray-800 text-xl">{word.text}</span>
                        </div>
                    ))}
                </div>

                {/* الصور في صف أفقي */}
                <div className="flex justify-around mt-16 max-h-35 lg:mt-55">
                    {IMAGES.map((image) => (
                        <div
                            key={image.id}
                            data-pointid={image.id}
                            onClick={() => handlePointClick(image.id, 'image')}
                            className="p-2 rounded-xl cursor-pointer"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-24 max-h-35 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* أزرار التحكم */}
            <div className="popup-buttons shrink-0 flex justify-center gap-4 mt-4">
                <button className="try-again-button" onClick={handleTryAgain}>
                    Recommencer
                </button>
                <button className="show-answer-btn" onClick={handleShowAnswer}>
                    Afficher la réponse
                </button>
                <button className="check-button2" onClick={checkAnswers}>
                    Vérifier la réponse
                </button>
            </div>
        </div>

    );
};



export default Q6;
