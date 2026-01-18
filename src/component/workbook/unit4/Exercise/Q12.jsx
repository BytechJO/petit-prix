import React, { useState, useRef } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

// 🔹 الصور كما هي
const imagesCol1 = [
  { id: "img1", src: '/assets/unit3/secA/page33/01.png' },
  { id: "img2", src: '/assets/unit3/secA/page33/02.png' },
  { id: "img3", src: '/assets/unit3/secA/page33/03.png' },
];

const imagesCol2 = [
  { id: "img4", src: '/assets/unit3/secA/page33/04.png' },
  { id: "img5", src: '/assets/unit3/secA/page33/04.png' },
  { id: "img6", src: '/assets/unit3/secA/page33/05.png' },
];

const imagesCol3 = [
  { id: "img7", src: '/assets/unit3/secA/page33/06.png' },
  { id: "img8", src: '/assets/unit3/secA/page33/07.png' },
  { id: "img9", src: '/assets/unit3/secA/page33/07.png' },
];

const imagesCol4 = [
  { id: "img10", src: '/assets/unit3/secA/page33/05.png' },
  { id: "img11", src: '/assets/unit3/secA/page33/05.png' },
  { id: "img12", src: '/assets/unit3/secA/page33/06.png' },
];

const correctMatches = [
  { sequence: ["img1","img4","img7","img10"] }, // مثال توضيحي للخطوط الصحيحة
];

const Q12 = () => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [firstPoint, setFirstPoint] = useState(null);
  const [locked, setLocked] = useState(false);

  const getDotCenter = (el) => {
    const rect = containerRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
  };

  const handleStart = (e) => {
    if (locked) return;
    const pos = getDotCenter(e.currentTarget);
    setFirstPoint({ id: e.currentTarget.dataset.id, x: pos.x, y: pos.y });
  };

  const handleEnd = (e) => {
    if (!firstPoint || locked) return;
    const pos = getDotCenter(e.currentTarget);
    setLines(prev => [...prev, { x1: firstPoint.x, y1: firstPoint.y, x2: pos.x, y2: pos.y }]);
    setFirstPoint({ id: e.currentTarget.dataset.id, x: pos.x, y: pos.y });
  };

  const handleTryAgain = () => {
    setLines([]);
    setFirstPoint(null);
    setLocked(false);
  };

  const handleShowAnswer = () => {
    const finalLines = [];
    correctMatches.forEach(match => {
      for (let i = 0; i < match.sequence.length - 1; i++) {
        const fromEl = document.querySelector(`[data-id="${match.sequence[i]}"]`);
        const toEl = document.querySelector(`[data-id="${match.sequence[i + 1]}"]`);
        if (!fromEl || !toEl) return;
        const p1 = getDotCenter(fromEl);
        const p2 = getDotCenter(toEl);
        finalLines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
      }
    });
    setLines(finalLines);
    setLocked(true);
  };

  const columns = [imagesCol1, imagesCol2, imagesCol3, imagesCol4];

  return (
    <div className="flex flex-col items-center p-8">
      <div ref={containerRef} className="flex justify-between w-full relative gap-4">
        {columns.map((col, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            {col.map(img => (
              <div
                key={img.id}
                data-id={img.id}
                className={`relative cursor-pointer border p-1 ${locked ? "opacity-50" : ""}`}
                onClick={firstPoint ? handleEnd : handleStart}
              >
                <div className="dot w-3 h-3 bg-red-500 rounded-full absolute top-1 left-1" />
                <img src={img.src} alt={img.id} className="max-w-24 max-h-24 object-cover border" />
              </div>
            ))}
          </div>
        ))}

        {/* خطوط SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="blue" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      </div>
      <div className="popup-buttons">
        <button className="try-again-button" onClick={handleTryAgain}>
          Recommencer ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        {/* <button className="check-button2" onClick={handleCheck}>
          Vérifier la réponse ✓
        </button> */}
      </div>
    </div>
  );
};

export default Q12;
