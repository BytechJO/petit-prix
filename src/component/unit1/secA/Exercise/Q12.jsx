import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

// --- بيانات التمرين ---
const SENTENCES = [
  { id: 'sent-1', text: 'J’ai un robot jaune.', correctMatch: 'img-1' },
  { id: 'sent-2', text: 'J’ai un tracteur noir.', correctMatch: 'img-2' },
  { id: 'sent-3', text: 'J’ai une voiture rouge.', correctMatch: 'img-3' },
  { id: 'sent-4', text: 'J’ai un vélo vert.', correctMatch: 'img-4' },
]

const IMAGES = [
  { id: 'img-3', src: '/assets/unit1/secA/page9/dem3.svg', alt: 'Voiture rouge' },
  { id: 'img-2', src: '/assets/unit1/secA/page9/dem2.svg', alt: 'Tracteur noir' },
  { id: 'img-1', src: '/assets/unit1/secA/page9/dem1.svg', alt: 'Vélo vert' },
  { id: 'img-4', src: '/assets/unit1/secA/page9/dem4.svg', alt: 'Robot jaune' },
]

// --- المكون الرئيسي ---
const Q12 = () => {
  const [connections, setConnections] = useState([]);
  const [activeLine, setActiveLine] = useState(null);
  const [feedback, setFeedback] = useState({});
  const svgContainerRef = useRef(null);

  const updatePointsCoordinates = () => {
    const newPoints = {};
    document.querySelectorAll('[data-pointid]').forEach(el => {
      const rect = el.getBoundingClientRect();
      const containerRect = svgContainerRef.current.getBoundingClientRect();
      newPoints[el.dataset.pointid] = {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });
    return newPoints;
  };

  // التعامل مع نقرة على نقطة توصيل
  const handlePointClick = (id, type) => {
    if (!activeLine) {
      // بدء خط جديد إذا لم يكن هناك خط نشط
      if (type === 'sentence') {
        // لا يمكن بدء الخط من صورة
        setActiveLine({ startId: id, endPoint: null });
      }
    } else {
      // إكمال الخط الحالي
      if (type === 'image' && activeLine.startId !== id) {
        // التأكد من عدم توصيل جملة بنفسها أو صورة بصورة
        const newConnection = { startId: activeLine.startId, endId: id };
        // منع التوصيلات المكررة
        if (!connections.some(c => (c.startId === newConnection.startId && c.endId === newConnection.endId))) {
          setConnections([...connections, newConnection]);
        }
        setActiveLine(null); // إنهاء وضع الرسم
      }
    }
  };

  // تتبع حركة الماوس لرسم الخط النشط
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (activeLine) {
        const containerRect = svgContainerRef.current.getBoundingClientRect();
        setActiveLine(prev => ({
          ...prev,
          endPoint: {
            x: e.clientX - containerRect.left,
            y: e.clientY - containerRect.top,
          }
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeLine]);

  const checkAnswers = () => {
    if (connections.length === 0) {
      ValidationAlert.warning("Attention!", "Veuillez connecter les phrases aux images.");
      return;
    }

    const newFeedback = {};
    let correctCount = 0;

    connections.forEach((conn, index) => {
      const sentence = SENTENCES.find(s => s.id === conn.startId);
      const isCorrect = sentence.correctMatch === conn.endId;
      newFeedback[index] = isCorrect ? 'correct' : 'incorrect';
      if (isCorrect) correctCount++;
    });

    setFeedback(newFeedback);

    // عرض score
    if (correctCount === SENTENCES.length) {
      ValidationAlert.success(
        "Bravo!",
        `Toutes les connexions sont correctes ! Score: ${correctCount}/${SENTENCES.length}`
      );
    } else {
      ValidationAlert.error(
        "Oops !",
        `Certaines connexions sont incorrectes. Score: ${correctCount}/${SENTENCES.length}`
      );
    }
  };


  const handleTryAgain = () => {
    setConnections([]);
    setActiveLine(null);
    setFeedback({});
  };

  const handleShowAnswer = () => {
    const newConnections = SENTENCES.map(sentence => ({
      startId: sentence.id,
      endId: sentence.correctMatch
    }));

    const newFeedback = {};
    newConnections.forEach((conn, index) => {
      newFeedback[index] = 'correct';
    });

    setConnections(newConnections);
    setFeedback(newFeedback);
  };




  const getLinePoints = (connection) => {
    const points = updatePointsCoordinates();
    const startPoint = points[connection.startId];
    const endPoint = points[connection.endId];
    return { startPoint, endPoint };
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 relative" ref={svgContainerRef}>


      {/* حاوية SVG لرسم الخطوط */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* رسم الخطوط المكتملة */}
        {connections.map((conn, index) => {
          const { startPoint, endPoint } = getLinePoints(conn);
          if (!startPoint || !endPoint) return null;
          const color = feedback[index] === 'correct' ? '#22c55e' : feedback[index] === 'incorrect' ? '#ef4444' : '#60a5fa';
          return (
            <line
              key={index}
              x1={startPoint.x} y1={startPoint.y}
              x2={endPoint.x} y2={endPoint.y}
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
        {/* رسم الخط النشط الذي يتبع الماوس */}
        {activeLine && activeLine.endPoint && (() => {
          const points = updatePointsCoordinates();
          const startPoint = points[activeLine.startId];
          if (!startPoint) return null;
          return (
            <line
              x1={startPoint.x} y1={startPoint.y}
              x2={activeLine.endPoint.x} y2={activeLine.endPoint.y}
              stroke="#93c5fd"
              strokeWidth="3"
              strokeDasharray="5 5"
            />
          );
        })()}
      </svg>

      {/* الشبكة الرئيسية للعناصر */}
      <div className="grid grid-cols-2 gap-52 ">
        {/* عمود الجمل */}
        {/* عمود الجمل */}
        <div className="flex flex-col gap-28.5">
          {SENTENCES.map(sentence => (
            <div
              key={sentence.id}
              className="flex items-center justify-end gap-2 cursor-pointer"
              onClick={() => handlePointClick(sentence.id, 'sentence')} // النقرة على النص
            >
              <p className="p-3 bg-blue-100 text-blue-800 rounded-lg text-center font-semibold">
                {sentence.text}
              </p>
              <Point id={sentence.id} type="sentence" onClick={handlePointClick} />
            </div>
          ))}
        </div>


        {/* عمود الصور */}
        <div className="flex flex-col gap-14">
          {IMAGES.map(image => (
            <div key={image.id} className="flex items-center gap-3 md:gap-4 w-24 h-24">
              <Point id={image.id} type="image" onClick={handlePointClick} />
              <img
                src={image.src}
                alt={image.alt}
                className="w-24 h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* أزرار التحكم */}
      <div className="popup-buttons">
        <button className="try-again-button" onClick={handleTryAgain}>
          Recommencer ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Vérifier la réponse ✓
        </button>
      </div>
    </div>
  );
};

// مكون نقطة التوصيل
const Point = ({ id, type, onClick }) => (
  <div
    data-pointid={id}
    onClick={() => onClick(id, type)}
    className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full cursor-pointer hover:bg-blue-200 transition-all"
  />
);

export default Q12;
