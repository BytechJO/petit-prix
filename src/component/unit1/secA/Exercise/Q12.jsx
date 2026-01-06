import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

// --- بيانات التمرين (تبقى كما هي) ---
const WORDS = [
    { id: 'word-1', text: 'J’ai un vélo ve rt.', correctMatch: 'img-4' },
    { id: 'word-2', text: 'J’ai un tracteur no ir.', correctMatch: 'img-2' },
    { id: 'word-3', text: 'J’ai une voiture ro uge.', correctMatch: 'img-3' },
    { id: 'word-4', text: 'J’ai un robot jaune.', correctMatch: 'img-1' },
]

const img1 = '/assets/unit1/secA/page9/dem1.svg';
const img2 = '/assets/unit1/secA/page9/dem2.svg';
const img3 = '/assets/unit1/secA/page9/dem3.svg';
const img4 = '/assets/unit1/secA/page9/dem4.svg';

const IMAGES = [
    { id: 'img-1', src: img1, alt: 'J’ai un vélo ve rt.' },
    { id: 'img-2', src: img2, alt: 'J’ai un tracteur no ir.' },
    { id: 'img-3', src: img3, alt: 'J’ai une voiture ro uge.' },
    { id: 'img-4', src: img4, alt: 'J’ai un robot jaune.' },
]

// --- المكون الرئيسي ---
const Q12 = () => {
    // اللوجيك يبقى كما هو
    const [connections, setConnections] = useState([]);
    const [activeLine, setActiveLine] = useState(null);
    const [feedback, setFeedback] = useState({});
    const svgContainerRef = useRef(null);

    const updatePointsCoordinates = () => {
        if (!svgContainerRef.current) return {};
        const newPoints = {};
        svgContainerRef.current.querySelectorAll('[data-pointid]').forEach(el => {
            const rect = el.getBoundingClientRect();
            const containerRect = svgContainerRef.current.getBoundingClientRect();
            newPoints[el.dataset.pointid] = {
                x: rect.left + rect.width / 2 - containerRect.left,
                y: rect.top + rect.height / 2 - containerRect.top,
            };
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
            ValidationAlert.success("Excellent!", `Score : ${correctCount} / ${total}`);
        } else {
            ValidationAlert.error("Bon effort!", `Score : ${correctCount} / ${total}`);
        }
    };

    const tryAgain = () => {
        setConnections([]);
        setActiveLine(null);
        setFeedback({});
    };

    const getLinePoints = (connection) => {
        const points = updatePointsCoordinates();
        return { startPoint: points[connection.startId], endPoint: points[connection.endId] };
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div
                ref={svgContainerRef}
                className="relative bg-white pl-6 pr-6 rounded-2xl shadow-lg"
                style={{
                    backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 39px, #E0E7FF 40px, #E0E7FF 41px)`,
                    backgroundSize: '100% 42px',
                }}
            >
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                    {connections.map((conn, index) => {
                        const { startPoint, endPoint } = getLinePoints(conn);
                        if (!startPoint || !endPoint) return null;
                        const color = feedback[index] === 'correct' ? '#16a34a' : feedback[index] === 'incorrect' ? '#dc2626' : '#3b82f6';
                        return <line key={index} x1={startPoint.x} y1={startPoint.y} x2={endPoint.x} y2={endPoint.y} stroke={color} strokeWidth="5" strokeLinecap="round" />;
                    })}
                    {activeLine && activeLine.endPoint && (() => {
                        const points = updatePointsCoordinates();
                        const startPoint = points[activeLine.startId];
                        if (!startPoint) return null;
                        return <line x1={startPoint.x} y1={startPoint.y} x2={activeLine.endPoint.x} y2={activeLine.endPoint.y} stroke="#60a5fa" strokeWidth="4" strokeDasharray="6 6" />;
                    })()}
                </svg>

                <div className="space-y-12 relative py-4">
                    {WORDS.map((word, index) => {
                        const image = IMAGES[index];
                        return (
                            <div key={word.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <div
                                        data-pointid={word.id}
                                        onClick={() => handlePointClick(word.id, 'word')}
                                        className="bg-[#FEF0E8] p-3 rounded-lg shadow-sm flex items-center gap-4">
                                        <span className="font-semibold text-gray-800 text-xl">{word.text}</span>

                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* --- التغيير الوحيد هنا: إعادة الكلاسات الأصلية لحجم الصورة --- */}
                                    <div
                                        data-pointid={image.id}
                                        onClick={() => handlePointClick(image.id, 'image')}
                                        className="bg-white p-2 rounded-xl shadow-md">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-24 h-24 max-w-24 max-h-24 object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="popup-buttons mt-8">
                <button className="try-again-button" onClick={tryAgain}>Recommencer ↻</button>
                <button className="check-button2" onClick={checkAnswers}>Vérifier ✓</button>
            </div>
        </div>
    );
};



export default Q12;
