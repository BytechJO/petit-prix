import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import ValidationAlert from "../../../Popup/ValidationAlert"; 

import Img1 from './assets/01.svg?react';
import Img2 from './assets/02.svg?react';
import Img3 from './assets/03.svg?react';

const colors = [
  '#FFD700', // ذهبي
  '#000000', // أسود
  '#228B22', // أخضر غامق
  '#FF0000', // أحمر
  '#0000FF', // أزرق
  '#FFFFFF', // أبيض
  '#FFA500', // برتقالي
  '#800080', // بنفسجي
  '#00FFFF', // سماوي
  '#FFC0CB', // وردي فاتح
  '#A52A2A', // بني
  '#808080', // رمادي
];

const svg2CorrectAnswers = {};
for (let i = 0; i < 84; i++) {
  if (i === 83) continue;
  svg2CorrectAnswers[`svg2-path${i}`] = '#000000';
}

const correctAnswers = {
  'svg1-path0': '#FFD700', 
  'svg1-path1': '#FFD700',
  'svg1-path2': '#FFD700',
  'svg1-path3': '#FFD700',
  'svg1-path4': '#FFD700',
  'svg1-path5': '#FFD700',
  'svg1-path6': '#FFD700',
  'svg1-path7': '#FFD700',

  ...svg2CorrectAnswers,

  'svg3-path0': '#228B22', 
  'svg3-path1': '#228B22',
  'svg3-path2': '#228B22',
  'svg3-path3': '#228B22',
};

const Q15 = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [pathColors, setPathColors] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const imagesContainerRef = useRef(null);
  const svg1Ref = useRef(null);
  const svg2Ref = useRef(null);
  const svg3Ref = useRef(null);

  // تطبيق الألوان على الـ SVG elements
  useEffect(() => {
    const refs = [
      { ref: svg1Ref, id: 'svg1' },
      { ref: svg2Ref, id: 'svg2' },
      { ref: svg3Ref, id: 'svg3' }
    ];

    refs.forEach(({ ref, id }) => {
      if (!ref.current) return;
      
      // البحث عن جميع الـ path elements داخل الـ SVG
      const svgElement = ref.current.querySelector('svg');
      if (!svgElement) return;
      
      const paths = svgElement.querySelectorAll('path, circle, rect, polygon, polyline, ellipse');
      
      console.log(`${id} has ${paths.length} paths`); 
      
      paths.forEach((path, index) => {
        const uniqueId = `${id}-path${index}`;
        
        // إضافة data attribute للتتبع
        path.setAttribute('data-color-id', uniqueId);
        
        // تطبيق اللون إذا موجود
        if (pathColors[uniqueId]) {
          path.setAttribute('fill', pathColors[uniqueId]);
          path.style.fill = pathColors[uniqueId]; // للتأكيد
        }
        
        // تطبيق الـ cursor
        path.style.cursor = isLocked ? 'default' : 'pointer';
        
        // إزالة event listeners القديمة
        const newPath = path.cloneNode(true);
        path.parentNode.replaceChild(newPath, path);
        
        // إضافة event listener جديد
        if (!isLocked) {
          newPath.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Clicked:', uniqueId, 'Color:', selectedColor); // للتشخيص
            setPathColors(prev => ({ ...prev, [uniqueId]: selectedColor }));
          });
        }
      });
    });
  }, [pathColors, isLocked, selectedColor]);

  const handleStartAgain = () => {
  // إعادة الألوان الأصلية من كل SVG
  [svg1Ref, svg2Ref, svg3Ref].forEach(svgRef => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path, circle, rect, polygon, polyline, ellipse');
      paths.forEach(path => {
        // هنا نرجع اللون اللي كان في الـ SVG أصلاً
        const originalColor = path.getAttribute('data-original-fill') || '';
        path.setAttribute('fill', originalColor);
        path.style.fill = originalColor;
      });
    }
  });

  // مسح الألوان اللي اختارها المستخدم
  setPathColors({});
  setIsLocked(false);
};



  const handleShowAnswer = () => {
    setPathColors(correctAnswers);
    setIsLocked(false);
  };

  const handleCheck = () => {

    const svg1Paths = Object.keys(pathColors).filter(k => k.startsWith('svg1-'));
    const svg2Paths = Object.keys(pathColors).filter(k => k.startsWith('svg2-'));
    const svg3Paths = Object.keys(pathColors).filter(k => k.startsWith('svg3-'));
    
    let score = 0;
    
    const svg1Correct = svg1Paths.length > 0 && svg1Paths.every(p => pathColors[p]?.toLowerCase() === '#ffd700');
    const svg2Correct = svg2Paths.length > 0 && svg2Paths.every(p => pathColors[p]?.toLowerCase() === '#000000');
    const svg3Correct = svg3Paths.length > 0 && svg3Paths.every(p => pathColors[p]?.toLowerCase() === '#228b22');
    
    if (svg1Correct) score++;
    if (svg2Correct) score++;
    if (svg3Correct) score++;
    
    const total = 3;
    setIsLocked(false);
    const scoreMessage = `${score} / ${total}`;
    ValidationAlert[score === total ? 'success' : 'error'](scoreMessage);
  };

  const handleDownload = () => {
    if (!imagesContainerRef.current) return;
    toPng(imagesContainerRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'coloring-activity.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Oops, something went wrong!', err));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center font-sans">
      
      <div className="flex flex-wrap justify-center gap-3 p-4 mb-6 bg-gray-100 rounded-lg">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-12 h-12 rounded-full border-4 transition-transform duration-200 cursor-pointer ${selectedColor === color ? 'border-blue-500 scale-110' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>

      <div ref={imagesContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full bg-white p-4 rounded-lg">
        <div ref={svg1Ref}><Img1 /></div>
        <div ref={svg2Ref}><Img2 /></div>
        <div ref={svg3Ref}><Img3 /></div>
      </div>

      <div className="popup-buttons mt-8 flex gap-4 justify-center">
        <button className="try-again-button" onClick={handleStartAgain}>Recommencer</button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>Afficher la réponse</button>
        <button className="check-button2" onClick={handleCheck}>Vérifier la réponse</button>
        <button onClick={handleDownload} className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer p-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" />
          </svg>
        </button>
      </div>
    </div>
   );
};

export default Q15;