import React, { useState, useEffect } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';
import SortingTutorial from '../../../SortingTutorial';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// البيانات لم تتغير
const initialSentences = [
  { id: 'a', text: 'Mais j’ai un frère.' },
  { id: 'b', text: 'Je m’appelle Lucas.' },
  { id: 'c', text: 'J’habite avec ma mère, mon grand-père et ma soeur.' },
  { id: 'd', text: 'Salut tout le monde !' },
  { id: 'e', text: 'Je n’ai pas de soeurs.' },
];

const correctOrder = ['d', 'b', 'e', 'a', 'c'];
const correctedSentenceC = 'J’habite avec ma mère et mon grand-père.';

// مكوّن العنصر القابل للفرز (Sortable Item)
function SortableItem({ id, text, isCorrected }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-lg border flex items-center transition-all duration-200
        ${isDragging ? 'bg-blue-100 shadow-lg' : 'bg-gray-50 border-gray-200'}
        ${isCorrected ? 'border-green-500 bg-green-50' : ''}
      `}
    >
      <span className="text-gray-500 font-bold mr-4 cursor-grab select-none">☰</span>
      <p className="text-gray-800">{text}</p>
    </li>
  );
}

const Q5 = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [sentences, setSentences] = useState(() =>
    [...initialSentences].sort(() => Math.random() - 0.5)
  );
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSentences((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setFeedback({ message: '', type: '' });
    }
  };

  const checkAnswers = () => {
    const userOrder = sentences.map(s => s.id);

    const total = correctOrder.length;

    // احسب كم عنصر في مكانه الصحيح
    let score = 0;
    for (let i = 0; i < total; i++) {
      if (userOrder[i] === correctOrder[i]) {
        score++;
      }
    }

    const scoreMessage = `${score} / ${total}`;

    const isCorrect = score === total;

    if (isCorrect) {
      ValidationAlert.success(
        scoreMessage
      );

      const updatedSentences = sentences.map(s =>
        s.id === 'c' ? { ...s, text: correctedSentenceC } : s
      );

      setSentences(updatedSentences);
    } else if (score === 0) {
      ValidationAlert.warning(
        scoreMessage
      );
    } else {
      ValidationAlert.error(
        scoreMessage
      );
    }
  };





  const handleTryAgain = () => {
    setSentences([...initialSentences].sort(() => Math.random() - 0.5));
    setFeedback({ message: '', type: '' });
  };

  const handleShowAnswer = () => {
    // رتب الجمل حسب correctOrder
    const newOrder = correctOrder.map(id =>
      sentences.find(s => s.id === id)
    );

    // صحح الجملة c
    const updatedSentences = newOrder.map(s =>
      s.id === 'c' ? { ...s, text: correctedSentenceC } : s
    );

    setSentences(updatedSentences);
  };


  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('dialogue_sorting_tutorial_completed');

    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('dialogue_sorting_tutorial_completed', 'true');
  };

  // زر مساعدة صغير يمكن إضافته في Q11
  const handleShowHelp = () => {
    setShowTutorial(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg font-sans">
      <SortingTutorial
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sentences} strategy={verticalListSortingStrategy}>
          <ul className="space-y-3">
            {sentences.map((sentence) => (
              <SortableItem
                key={sentence.id}
                id={sentence.id}
                text={sentence.text}
                isCorrected={feedback.type === 'success' && sentence.id === 'c'}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

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

export default Q5;
