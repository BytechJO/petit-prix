import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const LU = '/assets/workbook/unit2/page13/LU.svg';
const DI = '/assets/workbook/unit2/page13/DI.svg';
const DI2 = '/assets/workbook/unit2/page13/DI2.svg';
const SA = '/assets/workbook/unit2/page13/SA.svg';
const JE = '/assets/workbook/unit2/page13/JE.svg';
const MAR = '/assets/workbook/unit2/page13/MAR.svg';
const MER = '/assets/workbook/unit2/page13/MER.svg';
const NDI = '/assets/workbook/unit2/page13/NDI.svg';
const VEN = '/assets/workbook/unit2/page13/VEN.svg';
const CREDI = '/assets/workbook/unit2/page13/CREDI.svg';
const DREDI2 = '/assets/workbook/unit2/page13/DREDI.svg';
const MEDI = '/assets/workbook/unit2/page13/MEDI.svg';
const MANCHE = '/assets/workbook/unit2/page13/MANCHE.svg';
const UDI = '/assets/workbook/unit2/page13/UDI.svg';


const WORDS = [
    { id: 'word-1', src: LU , correctMatch: 'img-5' },
    { id: 'word-2', src: MAR , correctMatch: 'img-7' },
    { id: 'word-3', src: MER , correctMatch: 'img-1' },
    { id: 'word-4', src: JE , correctMatch: 'img-3' },
    { id: 'word-5', src: VEN , correctMatch: 'img-2' },
    { id: 'word-6', src: SA , correctMatch: 'img-4' },
    { id: 'word-7', src: DI2 , correctMatch: 'img-6' },
]



const IMAGES = [
    { id: 'img-1', src: CREDI, alt: 'Super' },
    { id: 'img-2', src: DREDI2, alt: 'Comme ci comme ça' },
    { id: 'img-3', src: UDI, alt: 'Bien' },
    { id: 'img-4', src: MEDI, alt: 'Super' },
    { id: 'img-5', src: NDI, alt: 'Comme ci comme ça' },
    { id: 'img-6', src: MANCHE, alt: 'Bien' },
    { id: 'img-7', src: DI, alt: 'Super' },
]

const Q6 = () => {
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
            ValidationAlert.success(`${correctCount} / ${total}`);
        } else {
            ValidationAlert.error(`${correctCount} / ${total}`);
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

                <div className="relative py-4">
                    {WORDS.map((word, index) => {
                        const image = IMAGES[index];
                        return (
                            <div key={word.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <div
                                        data-pointid={word.id}
                                        onClick={() => handlePointClick(word.id, 'word')}
                                        className="p-3 flex items-center gap-4">
                                        <img 
                                        src={word.src} 
                                        className="w-36 h-36 max-w-36 max-h-28 object-contain" />

                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* --- التغيير الوحيد هنا: إعادة الكلاسات الأصلية لحجم الصورة --- */}
                                    <div
                                        data-pointid={image.id}
                                        onClick={() => handlePointClick(image.id, 'image')}
                                        className="p-2">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-36 h-36 max-w-36 max-h-28 object-contain"
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



export default Q6;
