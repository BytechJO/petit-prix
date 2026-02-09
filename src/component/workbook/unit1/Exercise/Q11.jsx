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

const img = '/assets/workbook/unit1/page8/1.png';

// البيانات لم تتغير
const initialSentences = [
    { id: 'a', text: 'Bella : Super. Et toi ?' },
    { id: 'b', text: 'Charles : Salut, Bella !' },
    { id: 'c', text: 'Charles : Moi, ça va bien.' },
    { id: 'd', text: 'Charles : Comment ça va ?' },
    { id: 'e', text: 'Bella : Salut, Charles !' },
];

const correctOrder = ['b', 'e', 'd', 'a', 'c'];

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

const Q11 = () => {
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

    const handleTryAgain = () => {
        setSentences([...initialSentences].sort(() => Math.random() - 0.5));
        setFeedback({ message: '', type: '' });
    };

    const handleShowAnswer = () => {
        // رتب الجمل حسب correctOrder
        const orderedSentences = correctOrder.map(id =>
            initialSentences.find(s => s.id === id)
        );

        setSentences(orderedSentences);
        setFeedback({ message: 'Voici la bonne réponse!', type: 'success' });
    };

    const checkAnswers = () => {
        const userOrder = sentences.map(s => s.id);

        // حساب عدد الجمل الصحيحة في مكانها الصحيح
        let correctCount = 0;
        userOrder.forEach((id, index) => {
            if (id === correctOrder[index]) {
                correctCount++;
            }
        });

        const score = correctCount; // من 5
        const isAllCorrect = correctCount === correctOrder.length;

        if (isAllCorrect) {
            ValidationAlert.success(`${score}/5`);
            setFeedback({ message: 'Bravo! L\'ordre est correct!', type: 'success' });
        } else {
            ValidationAlert.error(`${score}/5`);
            setFeedback({ message: 'Essaie encore!', type: 'error' });
        }
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

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg font-sans">
            <SortingTutorial
                isOpen={showTutorial}
                onClose={handleCloseTutorial}
            />
            <img
                src={img}
                alt=""
                className="object-cover rounded-md max-h-40 m-6 mx-auto"
            />


            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={sentences} strategy={verticalListSortingStrategy}>
                    <ul className="space-y-3 cursor-grab ">
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

export default Q11;
