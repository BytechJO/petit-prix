import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import ValidationAlert from "../../../Popup/ValidationAlert";

import Img1 from './assets/001.svg?react';
import Img2 from './assets/002.svg?react';
import Img3 from './assets/003.svg?react';
import Img4 from './assets/004.svg?react';

import './Q4.css';

const Q4 = () => {
  const [answers, setAnswers] = useState({
    trousse: '',
    crayon1: '',
    crayon2: '',
    crayon3: '',
    livre: '',
    gomme: ''
  });
  
  const [selectedColor, setSelectedColor] = useState('#FFD700');
  const [pathColors, setPathColors] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  
  const pageRef = useRef(null);
  const svg1Ref = useRef(null);
  const svg2Ref = useRef(null);
  const svg3Ref = useRef(null);
  const svg4Ref = useRef(null);

  const colors = [
    '#FFD700', // أصفر/ذهبي (jaune)
    '#0000FF', // أزرق (bleu)
    '#FF0000', // أحمر (rouge)
    '#000000', // أسود (noir)
    '#008000', // أخضر (vert)
    '#FFFFFF', // أبيض
    '#FF5733',
    '#33FF57',
    '#FF8C00',
    '#00CED1',
    '#ADFF2F',
    '#FF1493',
    '#8A2BE2',
    '#00FA9A',
    '#DC143C',
    '#1E90FF',
    '#7FFF00',
    '#FF4500',
    '#40E0D0',
    '#BA55D3',
    '#FFDAB9',
    '#2E8B57',
    '#A52A2A',
    '#87CEEB',
    '#FF69B4',
    '#556B2F',
    '#00BFFF',
    '#C71585',
    '#F333FF',
    'rgba(164, 255, 8, 1)',
    'rgba(102, 27, 0, 1)',
    '#4B0082',
    '#00FF7F',
    '#FFB6C1'
  ];

  // الإجابات الصحيحة للنصوص
  const correctTextAnswers = {
    trousse: 'bleue',
    crayon1: 'rouge',
    crayon2: 'noir',
    crayon3: 'vert',
    livre: 'bleu',
    gomme: 'jaune'
  };

const correctColorAnswers = {};

function addPaths(svgName, from, to, color, exclude = []) {
  for (let i = from; i <= to; i++) {
    if (exclude.includes(i)) continue; // ← تجاهل الرقم
    correctColorAnswers[`${svgName}-path${i}`] = color;
  }
}

// أمثلة
addPaths('svg1', 0, 15, '#0000FF', [14]);   // استثناء 3 و 7
addPaths('svg2', 0, 6,  '#0000FF', [0,3,4,5,6]);
addPaths('svg3', 0, 31, '#FFD700',[30]);
addPaths('svg4', 0, 22, '#008000');
addPaths('svg4', 23, 47, '#000000');
addPaths('svg4', 48, 70, '#FF0000');

console.log(correctColorAnswers);


  // تطبيق الألوان على الـ SVG elements
  useEffect(() => {
    const refs = [
      { ref: svg1Ref, id: 'svg1' },
      { ref: svg2Ref, id: 'svg2' },
      { ref: svg3Ref, id: 'svg3' },
      { ref: svg4Ref, id: 'svg4' }
    ];

    refs.forEach(({ ref, id }) => {
      if (!ref.current) return;
      
      const svgElement = ref.current.querySelector('svg');
      if (!svgElement) return;
      
      const paths = svgElement.querySelectorAll('path, circle, rect, polygon, polyline, ellipse');
      
      console.log(`${id} has ${paths.length} paths`);
      
      paths.forEach((path, index) => {
        const uniqueId = `${id}-path${index}`;
        
        // حفظ اللون الأصلي
        if (!path.getAttribute('data-original-fill')) {
          path.setAttribute('data-original-fill', window.getComputedStyle(path).fill || '');
        }
        
        path.setAttribute('data-color-id', uniqueId);
        
        if (pathColors[uniqueId]) {
          path.setAttribute('fill', pathColors[uniqueId]);
          path.style.fill = pathColors[uniqueId];
        }
        
        path.style.cursor = isLocked ? 'default' : 'pointer';
        
        const newPath = path.cloneNode(true);
        path.parentNode.replaceChild(newPath, path);
        
        if (!isLocked) {
          newPath.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Clicked:', uniqueId, 'Color:', selectedColor);
            setPathColors(prev => ({ ...prev, [uniqueId]: selectedColor }));
          });
        }
      });
    });
  }, [pathColors, isLocked, selectedColor]);

  const handleInputChange = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStartAgain = () => {
    // إعادة الألوان الأصلية
    [svg1Ref, svg2Ref, svg3Ref, svg4Ref].forEach(svgRef => {
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path, circle, rect, polygon, polyline, ellipse');
        paths.forEach(path => {
          const originalColor = path.getAttribute('data-original-fill') || '';
          path.setAttribute('fill', originalColor);
          path.style.fill = originalColor;
        });
      }
    });

    // مسح كل الإجابات
    setPathColors({});
    setAnswers({
      trousse: '',
      crayon1: '',
      crayon2: '',
      crayon3: '',
      livre: '',
      gomme: ''
    });
    setIsLocked(false);
  };

  const handleShowAnswer = () => {
    // إظهار الألوان الصحيحة
    setPathColors(correctColorAnswers);
    
    // إظهار النصوص الصحيحة
    setAnswers(correctTextAnswers);
    
    setIsLocked(false);
  };

  const handleCheck = () => {
    let score = 0;
    let total = 0;

    // التحقق من النصوص
    Object.keys(correctTextAnswers).forEach(key => {
      total++;
      const userAnswer = answers[key]?.trim().toLowerCase();
      const correctAnswer = correctTextAnswers[key].toLowerCase();
      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    // التحقق من الألوان
    Object.keys(correctColorAnswers).forEach(pathId => {
      total++;
      if (pathColors[pathId]?.toLowerCase() === correctColorAnswers[pathId]?.toLowerCase()) {
        score++;
      }
    });

    setIsLocked(false);
    const scoreMessage = `${score} / ${total}`;
    ValidationAlert[score === total ? 'success' : 'error'](scoreMessage);
  };

  const handleDownload = () => {
    if (!pageRef.current) return;
    toPng(pageRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'EX4.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Oops, something went wrong!', err));
  };

  return (
    <div className="container bg-white" ref={pageRef}>
      {/* لوحة الألوان */}
      <div className="color-palette">
        {colors.map((color) => (
          <div
            key={color}
            className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
            style={{ 
              backgroundColor: color,
              border: selectedColor === color ? '3px solid blue' : '1px solid #ccc',
              transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)'
            }}
            onClick={() => setSelectedColor(color)}
            title={`Choisir la couleur ${color}`}
          />
        ))}
      </div>

      {/* حاوية صور SVG */}
      <div className="svg-container">
        <div ref={svg1Ref}><Img1 className="coloring-svg" /></div>
        <div ref={svg2Ref}><Img2 className="coloring-svg" /></div>
        <div ref={svg3Ref}><Img3 className="coloring-svg" /></div>
        <div ref={svg4Ref}><Img4 className="coloring-svg" /></div>
      </div>

      {/* الجمل مع الإجابات */}
      <div className="sentences-container">
        <p>
          J'ai une trousse{' '}
          <input
            type="text"
            value={answers.trousse}
            onChange={(e) => handleInputChange('trousse', e.target.value)}
            disabled={isLocked}
          />
        </p>

        <p>
          J'ai trois crayons : un crayon{' '}
          <input
            type="text"
            value={answers.crayon1}
            onChange={(e) => handleInputChange('crayon1', e.target.value)}
            disabled={isLocked}
          />
          </p>
          <p>
          , un crayon{' '}
          <input
            type="text"
            value={answers.crayon2}
            onChange={(e) => handleInputChange('crayon2', e.target.value)}
            disabled={isLocked}
          />
          </p>
          <p>
          {' '}et un crayon{' '}
          <input
            type="text"
            value={answers.crayon3}
            onChange={(e) => handleInputChange('crayon3', e.target.value)}
            disabled={isLocked}
          />
        </p>

        <p>
          Mon livre est{' '}
          <input
            type="text"
            value={answers.livre}
            onChange={(e) => handleInputChange('livre', e.target.value)}
            disabled={isLocked}
          />
        </p>

        <p>
          J'ai une gomme{' '}
          <input
            type="text"
            value={answers.gomme}
            onChange={(e) => handleInputChange('gomme', e.target.value)}
            disabled={isLocked}
          />
        </p>
      </div>

      {/* الأزرار */}
      <div className="popup-buttons shrink-0">
        <button className="try-again-button" onClick={handleStartAgain}>
          Recommencer
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Vérifier la réponse
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer p-1 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 15V3" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Q4;