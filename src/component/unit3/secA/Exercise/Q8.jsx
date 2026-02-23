import React, { useState, useRef } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";

// 🔹 الصور
const img1 = '/assets/unit3/secA/page33/01.png';
const img2 = '/assets/unit3/secA/page33/02.png';
const img3 = '/assets/unit3/secA/page33/03.png';
const img4 = '/assets/unit3/secA/page33/04.png';

const img5 = '/assets/unit3/secA/page33/05.png';
const img6 = '/assets/unit3/secA/page33/06.png';
const img7 = '/assets/unit3/secA/page33/07.png';
const img8 = '/assets/unit3/secA/page33/08.png';

const leftParts = [
  { id: 1, text: "Diane" },
  { id: 2, text: "Paul" },
  { id: 3, text: "Charles" },
  { id: 4, text: "Lucie" },
];

const images = [
  { id: "img1", src: img1 },
  { id: "img2", src: img2 },
  { id: "img3", src: img3 },
  { id: "img4", src: img4 },
];

const rightParts = [
  { id: "r1", src: img5 },
  { id: "r2", src: img6 },
  { id: "r3", src: img7 },
  { id: "r4", src: img8 },
];

const correctMatches = [
  { leftId: 1, centerId: "img4", rightId: "r1" },
  { leftId: 2, centerId: "img2", rightId: "r3" },
  { leftId: 3, centerId: "img1", rightId: "r2" },
  { leftId: 4, centerId: "img3", rightId: "r4" },
];



const Q8 = () => {
  const containerRef = useRef(null);

  const [lines, setLines] = useState([]);
  const [firstPoint, setFirstPoint] = useState(null);
  const [wrongLeft, setWrongLeft] = useState([]);
  const [written, setWritten] = useState({});
  const [locked, setLocked] = useState(false);
  const [checked, setChecked] = useState(false);

  /* ================= HELPERS ================= */

  const getDotCenter = (parent, selector) => {
    const rect = containerRef.current.getBoundingClientRect();
    const dot = parent.querySelector(selector);
    if (!dot) return null;

    const r = dot.getBoundingClientRect();
    return {
      x: r.left - rect.left + r.width / 2,
      y: r.top - rect.top + r.height / 2,
    };
  };

  const getDotCenterFromParent = (parent, dotSelector) => {
    const dot = parent.querySelector(dotSelector);
    if (!dot) return null;
    return getDotCenter(parent, dotSelector);
  };

  /* ================= CLICK HANDLERS ================= */
  const handleStart = (e) => {
    if (locked) return;

    const data = e.currentTarget.dataset;
    const type = data.leftId ? "left" : data.image ? "image" : null;
    if (!type) return;

    const pos = getDotCenterFromParent(e.currentTarget, ".dot");
    if (!pos) return;

    setFirstPoint({
      type,
      leftId: data.leftId ? Number(data.leftId) : null,
      image: data.image || null,
      x: pos.x,
      y: pos.y,
    });
  };

  const handleEnd = (e) => {
    if (!firstPoint || locked) return;

    const data = e.currentTarget.dataset;
    const endType = data.image ? "image" : null;
    if (!endType) {
      setFirstPoint(null);
      return;
    }

    const pos = getDotCenterFromParent(e.currentTarget, ".dot");
    if (!pos) return;

    const newLine = {
      x1: firstPoint.x,
      y1: firstPoint.y,
      x2: pos.x,
      y2: pos.y,
      leftId: firstPoint.leftId,
      image: firstPoint.image || data.image,
      type: firstPoint.type,
    };

    setLines((prev) => [...prev, newLine]);

    setFirstPoint({
      type: "image",
      image: data.image,
      x: pos.x,
      y: pos.y,
      leftId: firstPoint.leftId,
    });
  };

  const handleTryAgain = () => {
    setLines([]);
    setWritten({});
    setWrongLeft([]);
    setLocked(false);
    setChecked(false);
    setFirstPoint(null);
  };

  const handleShowAnswer = () => {
  const finalLines = [];

  correctMatches.forEach((c) => {
    const leftEl = document.querySelector(
      `[data-left-id="${c.leftId}"]`
    );

    const centerEl = document.querySelector(
      `[data-image="${c.centerId}"]`
    );

    const rightEl = document.querySelector(
      `[data-image="${c.rightId}"]`
    );

    if (!leftEl || !centerEl || !rightEl) return;

    const leftDot = getDotCenter(leftEl, ".dot");
    const centerDot = getDotCenter(centerEl, ".dot");
    const rightDot = getDotCenter(rightEl, ".dot");

    if (leftDot && centerDot) {
      finalLines.push({
        x1: leftDot.x,
        y1: leftDot.y,
        x2: centerDot.x,
        y2: centerDot.y,
        leftId: c.leftId,
        image: c.centerId,
      });
    }

    if (centerDot && rightDot) {
      finalLines.push({
        x1: centerDot.x,
        y1: centerDot.y,
        x2: rightDot.x,
        y2: rightDot.y,
        leftId: c.leftId,
        image: c.rightId,
      });
    }
  });

  setLines(finalLines);
  setLocked(true);
  setChecked(true);
};


  const checkAnswers = () => {
  if (lines.length === 0) {
    // لو ما جاوب المستخدم شيء
    ValidationAlert.warning("");
    return;
  }

  const wrong = [];
  let correctCount = 0;

  // تجميع التوصيلات حسب leftId
  const grouped = {};

  lines.forEach((line) => {
    if (!grouped[line.leftId]) {
      grouped[line.leftId] = [];
    }
    grouped[line.leftId].push(line.image);
  });

  correctMatches.forEach((match) => {
    const userImages = grouped[match.leftId];

    if (
      userImages &&
      userImages.includes(match.centerId) &&
      userImages.includes(match.rightId)
    ) {
      correctCount++;
    } else {
      wrong.push(match.leftId);
    }
  });

  setWrongLeft(wrong);
  setChecked(true);
  setLocked(true);

  if (wrong.length === 0) {
    ValidationAlert.success(`${correctCount} / ${correctMatches.length}`);
  } else {
    ValidationAlert.error(`${correctCount} / ${correctMatches.length}`);
  }
};


  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex justify-center items-center w-full relative gap-65" ref={containerRef}>
        {/* LEFT */}
        <div className=" flex flex-col gap-20">
          {leftParts.map((l, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 p-2 cursor-pointer ${locked ? "opacity-50" : ""}`}
              data-left-id={l.id}
              onClick={handleStart}
            >
              <span className="font-bold">{i + 1}.</span>
              <span>{l.text}</span>
              <div className="dot w-3 h-3 bg-red-500 rounded-full " />
              {wrongLeft.includes(l.id) && checked && <span className="text-red-500 ml-2 font-bold">✕</span>}
            </div>
          ))}
        </div>

        {/* MID IMAGES */}
        <div className="flex flex-col gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative cursor-pointer ${locked ? "opacity-50" : ""}`}
              data-image={img.id}
              onClick={(e) => (firstPoint ? handleEnd(e) : handleStart(e))}
            >
              <div className="dot w-3 h-3 bg-red-500 rounded-full absolute top-1 left-1" />
              <img src={img.src} alt="" className="max-w-50 max-h-24 object-cover" />
            </div>
          ))}
        </div>

        {/* RIGHT IMAGES */}
        <div className="flex flex-col gap-4">
          {rightParts.map((r) => (
            <div
              key={r.id}
              className={`relative cursor-pointer ${locked ? "opacity-50" : ""}`}
              data-image={r.id}
              onClick={(e) => (firstPoint ? handleEnd(e) : handleStart(e))}
            >
              <div className="dot w-3 h-3 bg-red-500 rounded-full absolute top-1 left-1" />
              <img src={r.src} alt="" className="max-w-35 max-h-24 object-cover" />
            </div>
          ))}
        </div>

        {/* LINES */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="blue" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      {/* BUTTONS */}
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
