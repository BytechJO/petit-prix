import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Q15.css';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/unit2/review/page26/ch1.svg';
const img2 = '/assets/unit2/review/page26/ch2.svg';
const img3 = '/assets/unit2/review/page26/ch3.svg';
const img4 = '/assets/unit2/review/page26/ch3.svg';

const Q15 = () => {
    const grid = [
        ['d', 'a', 'n', 's', 'e', 'r', 'l'],
        ['y', 't', 'y', 'd', 'k', 'h', 'j'],
        ['n', 'c', 'u', 'p', 'd', 'j', 'k'],
        ['b', 'h', 'r', 'l', 'e', 'p', 'l'],
        ['v', 'a', 'f', 'i', 'h', 'f', 'd'],
        ['c', 'n', 'w', 'r', 'e', 'y', 'u'],
        ['t', 't', 'q', 'e', 'o', 'l', 'k'],
        ['r', 'e', 'x', 'v', 'n', 'k', 'l'],
        ['o', 'r', 'n', 'a', 'g', 'e', 'r'],
        ['c', 'n', 'w', 'r', 'e', 'y', 'u'],
    ];

    const correctWords = ['danser', 'lire', 'nager', 'chanter'];
    
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [foundCells, setFoundCells] = useState([]); // لتخزين الخلايا التي تم العثور عليها
    const [answers, setAnswers] = useState(new Array(4).fill(''));
    
    const wordSearchRef = useRef(null);

    // دالة للتحقق من أن الخلايا المحددة في خط مستقيم
    const isStraightLine = useCallback((cells) => {
        if (cells.length <= 1) return true;
        
        const first = cells[0];
        const last = cells[cells.length - 1];
        
        // أفقي
        if (first.row === last.row && Math.abs(first.col - last.col) === cells.length - 1) {
            return true;
        }
        // عمودي
        if (first.col === last.col && Math.abs(first.row - last.row) === cells.length - 1) {
            return true;
        }
        // قطري
        if (Math.abs(first.row - last.row) === cells.length - 1 && 
            Math.abs(first.col - last.col) === cells.length - 1) {
            return true;
        }
        
        return false;
    }, []);

    // دالة لفرز الخلايا بالترتيب الصحيح
    const sortCells = useCallback((cells) => {
        if (cells.length <= 1) return cells;
        
        // تحديد اتجاه الخلايا
        const first = cells[0];
        const last = cells[cells.length - 1];
        
        return [...cells].sort((a, b) => {
            if (first.row === last.row) { // أفقي
                return a.col - b.col;
            } else if (first.col === last.col) { // عمودي
                return a.row - b.row;
            } else { // قطري
                if (first.row < last.row) {
                    return a.row - b.row;
                } else {
                    return b.row - a.row;
                }
            }
        });
    }, []);

    // التحقق من الكلمة المحددة
    const checkSelectedWord = useCallback(() => {
        if (selectedCells.length < 2) {
            setSelectedCells([]);
            return;
        }

        if (!isStraightLine(selectedCells)) {
            setSelectedCells([]);
            return;
        }

        const sortedCells = sortCells(selectedCells);
        const selectedWord = sortedCells.map(cell => grid[cell.row][cell.col]).join('');
        const reversedSelectedWord = [...selectedWord].reverse().join('');

        let matchedWord = null;
        let matchedCells = [];

        if (correctWords.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            matchedWord = selectedWord;
            matchedCells = sortedCells;
        } else if (correctWords.includes(reversedSelectedWord) && !foundWords.includes(reversedSelectedWord)) {
            matchedWord = reversedSelectedWord;
            matchedCells = [...sortedCells].reverse();
        }

        if (matchedWord) {
            setFoundWords(prev => [...prev, matchedWord]);
            setFoundCells(prev => [...prev, ...matchedCells]);
            
            const newAnswers = [...answers];
            const emptyIndex = newAnswers.findIndex(ans => ans === '');
            if (emptyIndex !== -1) {
                newAnswers[emptyIndex] = matchedWord;
                setAnswers(newAnswers);
            }
        }
        
        setSelectedCells([]);
    }, [selectedCells, foundWords, answers, correctWords, grid, isStraightLine, sortCells]);

    // معالجات أحداث الفأرة
    const handleMouseDown = useCallback((row, col) => {
        setIsMouseDown(true);
        setSelectedCells([{ row, col }]);
    }, []);

    const handleMouseEnter = useCallback((row, col) => {
        if (!isMouseDown) return;
        
        const lastCell = selectedCells[selectedCells.length - 1];
        if (!lastCell) return;
        
        // التأكد من أن الخلية الجديدة مجاورة للخلية الأخيرة
        const rowDiff = Math.abs(row - lastCell.row);
        const colDiff = Math.abs(col - lastCell.col);
        
        if (rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff) > 0) {
            // منع التكرار
            if (!selectedCells.some(cell => cell.row === row && cell.col === col)) {
                setSelectedCells(prev => [...prev, { row, col }]);
            }
        }
    }, [isMouseDown, selectedCells]);

    const handleMouseUp = useCallback(() => {
        if (isMouseDown) {
            setIsMouseDown(false);
            checkSelectedWord();
        }
    }, [isMouseDown, checkSelectedWord]);

    // إضافة حدث mouseleave
    useEffect(() => {
        const handleMouseLeave = () => {
            if (isMouseDown) {
                setIsMouseDown(false);
                checkSelectedWord();
            }
        };

        const ref = wordSearchRef.current;
        if (ref) {
            ref.addEventListener('mouseleave', handleMouseLeave);
            return () => ref.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, [isMouseDown, checkSelectedWord]);

    // إضافة أحداث الفأرة العامة
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isMouseDown) {
                setIsMouseDown(false);
                checkSelectedWord();
            }
        };

        document.addEventListener('mouseup', handleGlobalMouseUp);
        return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
    }, [isMouseDown, checkSelectedWord]);

    // التحقق مما إذا كانت الخلية تم العثور عليها
    const isCellFound = useCallback((row, col) => {
        return foundCells.some(cell => cell.row === row && cell.col === col);
    }, [foundCells]);

    // التحقق مما إذا كانت الخلية مختارة
    const isCellSelected = useCallback((row, col) => {
        return selectedCells.some(cell => cell.row === row && cell.col === col);
    }, [selectedCells]);

    const handleReset = () => {
        setAnswers(new Array(4).fill(''));
        setFoundWords([]);
        setFoundCells([]);
        setSelectedCells([]);
        setIsMouseDown(false);
    };

    const handleCheckAll = () => {
        const allFound = correctWords.every(word => foundWords.includes(word));
        if (allFound) {
            ValidationAlert.success(`${foundWords.length}/${correctWords.length} ✔️`);
        } else {
            ValidationAlert.error(`${foundWords.length}/${correctWords.length} `);
        }
    };

    const activities = [
        { img: img1, prefix: 'Elle aime' },
        { img: img2, prefix: 'Il aime' },
        { img: img3, prefix: 'Elle aime' },
        { img: img4, prefix: 'Il aime' },
    ];

    return (
        <>
            <div className="container">
                <div className="main-content">
                    <div className="activities">
                        {activities.map((activity, i) => (
                            <div key={i} className="activity">
                                <img 
                                    src={activity.img} 
                                    alt={`Activity ${i + 1}`} 
                                    className="activity-image" 
                                />
                                <div className="sentence-box">
                                    {activity.prefix}
                                    <input
                                        type="text"
                                        className="sentence-input"
                                        value={answers[i]}
                                        readOnly
                                        placeholder="selected..."
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="word-search"
                        ref={wordSearchRef}
                        onMouseUp={handleMouseUp}
                    >
                        {grid.map((row, rowIndex) =>
                            row.map((char, colIndex) => {
                                const selected = isCellSelected(rowIndex, colIndex);
                                const found = isCellFound(rowIndex, colIndex);
                                
                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`grid-cell 
                                            ${selected ? 'selected' : ''} 
                                            ${found ? 'found' : ''}`}
                                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                    >
                                        {char}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <div className="popup-buttons mt-4 flex gap-4 justify-center">
                <button className="try-again-button" onClick={handleReset}>
                    Recommencer ↻
                </button>
                <button className="check-button2" onClick={handleCheckAll}>
                    Vérifier ✓
                </button>
            </div>
        </>
    );
};

export default Q15;