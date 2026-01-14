import React, { useState, useRef } from 'react';

import Img1 from './assets/01.svg?react';
import Img2 from './assets/02.svg?react';
import Img3 from './assets/03.svg?react';
import Img4 from './assets/03.svg?react';

import domtoimage from 'dom-to-image-more';

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
    const [activeColor, setActiveColor] = useState('#FFD700');
    const pageRef = useRef(null);
    const colors = [
        '#000', '#ffffff', '#FF5733', '#33FF57', '#3357FF',
        '#FF8C00', '#00CED1', '#ADFF2F', '#FF1493', '#8A2BE2',
        '#00FA9A', '#DC143C', '#1E90FF', '#7FFF00', '#FF4500',
        '#40E0D0', '#BA55D3', '#FFDAB9', '#2E8B57', '#A52A2A',
        '#87CEEB', '#FF69B4', '#556B2F', '#00BFFF', '#C71585',
        '#F333FF', '#FFD700', 'rgba(164, 255, 8, 1)', 'rgba(102, 27, 0, 1)',
        '#4B0082', '#00FF7F', '#FFB6C1'
    ];


    const handlePathClick = (event) => {
        event.target.style.fill = activeColor;
    };

    const handleDownload = () => {
        if (pageRef.current) {
            domtoimage.toPng(pageRef.current)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'EX4.png';
                    link.click();
                })
                .catch((error) => {
                    console.error('حدث خطأ أثناء تنزيل الصورة:', error);
                });
        }
    };
    const handleTryAgain = () => {
        if (!pageRef.current) return;

        // الحصول على جميع عناصر SVG داخل الصفحة
        const paths = pageRef.current.querySelectorAll('path, circle, rect, polygon, ellipse');

        paths.forEach((el) => {
            el.style.fill = ''; // إعادة اللون الافتراضي
        });
    };

    const handleInputChange = (key, value) => {
        setAnswers(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="container bg-white" ref={pageRef}>



            {/* حاوية صور SVG */}
            <div className="svg-container">
                <Img1 className="coloring-svg" onClick={handlePathClick} />
                <Img2 className="coloring-svg" onClick={handlePathClick} />
                <Img3 className="coloring-svg" onClick={handlePathClick} />
                <Img4 className="coloring-svg" onClick={handlePathClick} />
            </div>
            {/* لوحة الألوان */}
            <div className="color-palette">
                {colors.map((color) => (
                    <div
                        key={color}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        onClick={() => setActiveColor(color)}
                        title={`Choisir la couleur ${color}`}
                    />
                ))}
            </div>
            <div className="sentences-container">
                <p>
                    J’ai une trousse
                    <input
                        type="text"
                        value={answers.trousse}
                        onChange={(e) => handleInputChange('trousse', e.target.value)}
                    />
                </p>

                <p>
                    spa J’ai trois crayons : un crayon
                    <input
                        type="text"
                        value={answers.crayon1}
                        onChange={(e) => handleInputChange('crayon1', e.target.value)}
                    />
                </p>
                <p>
                    , un crayon
                    <input
                        type="text"
                        value={answers.crayon2}
                        onChange={(e) => handleInputChange('crayon2', e.target.value)}
                    />
                </p>
                <p>
                    et un crayon
                    <input
                        type="text"
                        value={answers.crayon3}
                        onChange={(e) => handleInputChange('crayon3', e.target.value)}
                    />
                </p>

                <p>
                    Mon livre est
                    <input
                        type="text"
                        value={answers.livre}
                        onChange={(e) => handleInputChange('livre', e.target.value)}
                    />
                </p>

                <p>
                    J’ai une gomme
                    <input
                        type="text"
                        value={answers.gomme}
                        onChange={(e) => handleInputChange('gomme', e.target.value)}
                    />
                </p>
            </div>

            <div className="popup-buttons shrink-0">
                <button className="try-again-button" onClick={handleTryAgain}>
                    Recommencer
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
                        className="lucide lucide-download"
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
