import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ValidationAlert from '../../../Popup/ValidationAlert';

const eiffelTowerImage = "/assets/workbook/Unit1/Lesson1/L1Q4.svg";
// تعريف نوع العنصر للسحب والإفلات (Drag and Drop)
const ItemTypes = {
    ANSWER: 'answer',
};

// بيانات الأسئلة مع الإجابات الصحيحة المرتبطة بها
const questions = [
    { id: 1, text: 'a) Est-ce que ce monument est réel ?', correctAnswer: 'Oui' },
    { id: 2, text: 'b) Qu’est-ce que c’est ?', correctAnswer: 'La Tour Eiffel' },
    { id: 3, text: 'c) C’est un monument de quel pays ?', correctAnswer: 'La France' },
];

// بنك الإجابات الذي سيتم عرضه بترتيب عشوائي
const answerBank = ['La Tour Eiffel', 'La France', 'Oui'].sort(() => Math.random() - 0.5);

// مكون "بطاقة الإجابة" القابلة للسحب
const DraggableAnswer = ({ answer }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ANSWER,
        item: { answer },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-3 m-2 bg-white border-2 border-blue-400 rounded-lg shadow-md cursor-grab text-center font-semibold text-blue-700 transition-opacity hover:bg-blue-50 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            {answer}
        </div>
    );
};

// مكون "منطقة الإفلات" لكل سؤال
const DropZone = ({ questionId, droppedAnswer, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ANSWER,
        drop: (item) => onDrop(questionId, item.answer),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`flex-grow p-4 border-2 border-dashed rounded-lg text-center transition-colors ${isOver ? 'border-green-500 bg-green-100' : 'border-gray-300'} ${droppedAnswer ? 'bg-blue-100 border-solid border-blue-400' : ''}`}
        >
            {droppedAnswer || 'Déposez la réponse ici'}
        </div>
    );
};

// المكون الرئيسي للتمرين
const Q2 = () => {
    const [droppedAnswers, setDroppedAnswers] = useState({ 1: null, 2: null, 3: null });

    const handleDrop = (questionId, answer) => {
        setDroppedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleTryAgain = () => {
        setDroppedAnswers({ 1: null, 2: null, 3: null });
    };

    const handleShowAnswer = () => {
        setDroppedAnswers({
            1: 'Oui',
            2: 'La Tour Eiffel',
            3: 'La France',
        });
    };

    const checkAnswers = () => {
        const allAnswered = Object.values(droppedAnswers).every(answer => answer !== null);
        if (!allAnswered) {
            ValidationAlert.warning("Attention !", "Veuillez répondre à toutes les questions.");
            return;
        }

        let correctCount = 0;
        questions.forEach(q => {
            if (droppedAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const scoreMessage = `${correctCount} / ${questions.length}`;
        if (correctCount === questions.length) {
            ValidationAlert.success("Excellent ! Toutes les réponses sont correctes.", scoreMessage);
        } else {
            ValidationAlert.error("Bon effort ! Essaie encore.", scoreMessage);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-6xl bg-white rounded-2xl flex flex-col h-auto md:h-130">
                    {/* المحتوى الرئيسي */}
                    <div className="grid grid-cols-1 md:grid-cols-2 flex-grow overflow-hidden gap-1 p-5">
                        {/* القسم الأيسر: الصورة وبنك الإجابات */}
                        <div className="flex flex-col items-center justify-center space-y-6 ml-50">
                            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={eiffelTowerImage}
                                    alt="La Tour Eiffel"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="w-full p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-center font-bold text-gray-700 mb-2">Banque de réponses</h3>
                                <div className="flex flex-wrap justify-center">
                                    {answerBank.map((answer, index) => (
                                        <DraggableAnswer key={index} answer={answer} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* القسم الأيمن: الأسئلة ومناطق الإجابة */}
                        <div className="flex flex-col justify-center space-y-6 max-w-sm mx-auto ml-50">
                            {questions.map((q) => (
                                <div key={q.id} className="flex flex-col space-y-4">
                                    <p className="font-semibold text-lg text-gray-800">{q.text}</p>
                                    <DropZone
                                        questionId={q.id}
                                        droppedAnswer={droppedAnswers[q.id]}
                                        onDrop={handleDrop}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* أزرار التحكم */}
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
            </div>
        </DndProvider>
    );
};

export default Q2;
