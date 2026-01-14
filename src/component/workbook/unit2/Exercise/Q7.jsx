import React, { useState, useMemo } from 'react';
import './Q7.css'; // سنقوم بإنشاء هذا الملف للأنماط
import ValidationAlert from '../../../Popup/ValidationAlert';

const Q7 = () => {
    // 1. البيانات الأساسية
    const gridLetters = useMemo(() => [
        'g', 'h', 'j', 'r', 'l', 'u', 'n', 'd', 'i', 'h', 'g', 'i', 'd', 'l', 's', 's', 's', 'n', 'g', 'j',
        'm', 'a', 'r', 'd', 'i', 'h', 'j', 'f', 'j', 'f', 'd', 'j', 'f', 'd', 'd', 'k', 'j', 'd', 'l', 'k',
        'k', 'j', 'f', 'f', 'm', 'e', 'r', 'c', 'r', 'e', 'd', 'i', 'j', 'k', 'f', 'd', 'j', 'e', 'u', 'd',
        'i', 'l', 'd', 'h', 'a', 'v', 'z', 'f', 'v', 'e', 'n', 'd', 'r', 'e', 'd', 'i', 'k', 'l', 'p', 'o',
        'q', 'z', 'b', 's', 'a', 'm', 'e', 'd', 'i', 'b', 'f', 'h', 'j', 'd', 'i', 'm', 'a', 'n', 'c', 'h', 'e'
    ], []);

    const wordsToFind = useMemo(() => [
        "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"
    ], []);

    // 2. حالات المكون (State)
    const [isDragging, setIsDragging] = useState(false);
    const [selection, setSelection] = useState([]); // يخزن indices الحروف المحددة
    const [foundWords, setFoundWords] = useState([]); // يخزن الكلمات التي تم العثور عليها

    // 3. معالجات الأحداث (Event Handlers)
    const handleMouseDown = (index) => {
        setIsDragging(true);
        setSelection([index]); // ابدأ التحديد من الحرف الذي تم النقر عليه
    };

    const handleMouseEnter = (index) => {
        if (isDragging && !selection.includes(index)) {
            // أضف الحرف إلى التحديد الحالي
            setSelection(prev => [...prev, index]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (selection.length > 1) {
            // استخراج الكلمة من الحروف المحددة
            const selectedWord = selection.map(i => gridLetters[i]).join('');

            // التحقق مما إذا كانت الكلمة صحيحة وموجودة في القائمة
            if (wordsToFind.includes(selectedWord) && !foundWords.includes(selectedWord)) {
                setFoundWords(prev => [...prev, selectedWord]);
            }
        }
        // إعادة تعيين التحديد بعد انتهاء السحب
        setSelection([]);
    };

    // 4. دوال مساعدة
    const getCellClassName = (index) => {
        let classes = 'letter-cell';
        // إذا كان الحرف جزءًا من تحديد حالي
        if (selection.includes(index)) {
            classes += ' selected';
        }
        // إذا كان الحرف جزءًا من كلمة تم العثور عليها
        const word = foundWords.find(w => {
            const startIndex = gridLetters.join('').indexOf(w);
            return index >= startIndex && index < startIndex + w.length;
        });
        if (word) {
            classes += ' found';
        }
        return classes;
    };

    const checkAnswers = () => {
        const score = foundWords.length;
        const total = wordsToFind.length;
        if (!score) {
            ValidationAlert.warning();
        }
        else if (score === total) {
            ValidationAlert.success(`${score}/${total}`);
        } else {
            ValidationAlert.error(`${score}/${total}`);
        }
    };

    const handleTryAgain = () => {
        setFoundWords([]);
        setSelection([]);
    };

    const handleShowAnswer = () => {
        setFoundWords(wordsToFind);
    };

    return (
        <div className="word-search-container">

            {/* شبكة الحروف */}
            <div
                className="letter-grid"
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // لإلغاء التحديد إذا خرج الفأر من الشبكة
            >
                {gridLetters.map((letter, index) => (
                    <div
                        key={index}
                        className={getCellClassName(index)}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        {letter}
                    </div>
                ))}
            </div>



            {/* الأزرار */}
            <div className="popup-buttons">
                <button className="try-again-button" onClick={handleTryAgain}>Recommencer ↻</button>
                <button className="show-answer-btn" onClick={handleShowAnswer}>Afficher la réponse</button>
                <button className="check-button2" onClick={checkAnswers}>Vérifier ✓</button>
            </div>
            
        </div>
    );
};

export default Q7;
