import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

// --- بيانات التمرين (تبقى كما هي) ---
const WORDS = [
    { id: 'word-1', text: 'Travis', correctMatch: 'img-1' },
    { id: 'word-2', text: 'Antoine', correctMatch: 'img-2' },
    { id: 'word-3', text: 'Nicole', correctMatch: 'img-3' },
    { id: 'word-4', text: 'Julie', correctMatch: 'img-4' }
]

const img1 = '/assets/unit4/secA/page45/01.svg';
const img2 = '/assets/unit4/secA/page45/02.svg';
const img3 = '/assets/unit4/secA/page45/03.svg';
const img4 = '/assets/unit4/secA/page45/04.svg';

const IMAGES = [
    { id: 'img-1', src: img1, alt: 'Travis' },
    { id: 'img-2', src: img2, alt: 'Antoine' },
    { id: 'img-3', src: img3, alt: 'Nicole' },
    { id: 'img-4', src: img4, alt: 'Julie' },
]

// --- المكون الرئيسي ---
const Q8 = () => {
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

            // نحدد اتجاه البداية والنهاية حسب نوع العنصر
            const isWord = el.dataset.pointid.startsWith('word');
            const isImage = el.dataset.pointid.startsWith('img');

            newPoints[el.dataset.pointid] = {
                x: isWord
                    ? rect.right - containerRect.left  // نهاية الجملة (يمين الـ div)
                    : rect.left - containerRect.left,  // بداية الصورة (يسار الـ div)
                y: rect.top + rect.height / 2 - containerRect.top, // منتصف العنصر عمودياً
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
            ValidationAlert.success( ` ${correctCount} / ${total}`);
        } else {
            ValidationAlert.error( ` ${correctCount} / ${total}`);
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
                className="relative bg-white pl-6 pr-6 rounded-2xl"
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
                                        className="p-3 flex items-center gap-4">
                                        <span className="font-semibold text-gray-800 text-xl">{word.text}</span>

                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div
                                        data-pointid={image.id}
                                        onClick={() => handlePointClick(image.id, 'image')}
                                        className="p-2 rounded-xl">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="max-w-70 max-h-24 max-w-24 max-h-24 object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="popup-buttons shrink-0">
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



export default Q8;
