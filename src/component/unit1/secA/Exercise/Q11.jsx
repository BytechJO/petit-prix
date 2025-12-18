import React, { useState, useRef, useEffect } from 'react';
import { DndContext, useDroppable, useDraggable, closestCenter } from '@dnd-kit/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import './Q11.css';
import ValidationAlert from '../../../Popup/ValidationAlert';

import sound6 from '../../../../assets/unit1/secA/sounds/L3Q1.mp3';

import face1 from "../../../../assets/unit1/secA/page8/face1.svg";
import face2 from "../../../../assets/unit1/secA/page8/face2.png";
import face3 from "../../../../assets/unit1/secA/page8/face3.png";
import face4 from "../../../../assets/unit1/secA/page8/face4.png";
import face5 from "../../../../assets/unit1/secA/page8/face5.png";

const feelingsData = [
  { id: '0', name: 'Comment ça va', face: face1 },
  { id: '1', name: 'Mal', face: face2 },
  { id: '2', name: 'Comme ci, comme ça', face: face3 },
  { id: '3', name: 'Bien', face: face4 },
  { id: '4', name: 'Super', face: face5 },
];

// دالة لخلط عناصر المصفوفة
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function DraggableItem({ id, content, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable-item">
      {content}
    </div>
  );
}

function DroppableArea({ id, children, validationStatus, isOver }) {
  const { setNodeRef } = useDroppable({ id });

  const validationClass = validationStatus === true ? 'correct' : validationStatus === false ? 'incorrect' : '';
  const overClass = isOver ? 'is-over' : '';

  return (
    <div ref={setNodeRef} className={`droppable-area ${validationClass} ${overClass}`}>
      {children || <span className="placeholder-text">Déposer ici</span>}
    </div>
  );
}

const Q11 = ({ stopPoint }) => {
  const audioRef = useRef(null);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [containers, setContainers] = useState(() => ({
    options: shuffleArray(feelingsData.map(f => f.name)),
    ...feelingsData.reduce((acc, f) => ({ ...acc, [f.id]: [] }), {})
  }));
  const [validation, setValidation] = useState({});
  const [activeId, setActiveId] = useState(null);

  const stopPoints = [12.5, 15, 18, 20.5];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      // التحقق من نقطة التوقف الحالية
      if (currentSegment < stopPoints.length && audio.currentTime >= stopPoints[currentSegment]) {
        audio.pause();
        audio.currentTime = stopPoints[currentSegment];
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentSegment]);

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over) return;

    const activeContainer = Object.keys(containers).find(key => containers[key].includes(active.id));
    if (!activeContainer || activeContainer === over.id) return;

    setContainers(prev => {
      const newContainers = { ...prev };

      newContainers[activeContainer] = prev[activeContainer].filter(item => item !== active.id);

      if (prev[over.id].length > 0) {
        newContainers.options.push(prev[over.id][0]);
      }

      // إضافة العنصر الجديد إلى المنطقة المستهدفة
      newContainers[over.id] = [active.id];
      return newContainers;
    });
  };

  const handleCheckAll = () => {
    const newValidation = {};
    let allCorrect = true;
    const allFilled = feelingsData.every(h => containers[h.id]?.length > 0);

    if (!allFilled) {
      return ValidationAlert.warning("Attention", "Veuillez déposer une réponse pour chaque visage !");
    }

    let correctCount = 0; // عداد الإجابات الصحيحة

    feelingsData.forEach(h => {
      const droppedWord = containers[h.id][0];
      const isCorrect = droppedWord.toLowerCase() === h.name.toLowerCase();
      newValidation[h.id] = isCorrect;
      if (isCorrect) correctCount++;
      if (!isCorrect) allCorrect = false;
    });

    setValidation(newValidation);

    const scoreText = `${correctCount} / ${feelingsData.length}`; // مثال: 3 / 5

    if (allCorrect) {
      ValidationAlert.success("Bravo !", scoreText);
    } else {
      ValidationAlert.error("Oops...",scoreText);
    }
  };
  const checkAnswers = () => {
    handleCheckAll();
  };

  const handleShowAnswer = () => {
    const newContainers = {
      options: [],
      ...feelingsData.reduce((acc, f) => ({ ...acc, [f.id]: [] }), {})
    };

    feelingsData.forEach(f => {
      newContainers[f.id] = [f.name];
    });

    setContainers(newContainers);

    const newValidation = {};
    feelingsData.forEach(f => {
      newValidation[f.id] = true;
    });
    setValidation(newValidation);
  };

  const handleTryAgain = () => {
    handleReset();
  };



  const handleReset = () => {
    setContainers({
      options: shuffleArray(feelingsData.map(f => f.name)),
      ...feelingsData.reduce((acc, f) => ({ ...acc, [f.id]: [] }), {})
    });
    setValidation({});
    setCurrentSegment(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  return (
    <div className="feelings-quiz-container">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >

        <div className="faces-container">
          {feelingsData.map((feeling) => (
            <div key={feeling.id} className="face-item">
              <img src={feeling.face} alt={feeling.name} className="face-image" />
              <DroppableArea
                id={feeling.id}
                validationStatus={validation[feeling.id]}
              >
                {containers[feeling.id]?.[0] && (
                  <DraggableItem
                    id={containers[feeling.id][0]}
                    content={containers[feeling.id][0]}
                    isDragging={activeId === containers[feeling.id][0]}
                  />
                )}
              </DroppableArea>
            </div>
          ))}
        </div>

        <div className="options-container">
          {containers.options.map(word => (
            <DraggableItem
              key={word}
              id={word}
              content={word}
              isDragging={activeId === word}
            />
          ))}
        </div>
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
      </DndContext>
    </div>
  );
};

export default Q11;