import React, { useState, useRef } from 'react';

import Img1 from './assets/1.svg?react';
import Img2 from './assets/2.svg?react';
import Img3 from './assets/3.svg?react';
import Img4 from './assets/4.svg?react';

import domtoimage from 'dom-to-image-more';

import '../../unit1/Exercise/Q15.css';

const Q2 = () => {
    const [activeColor, setActiveColor] = useState('#FFD700'); 
    const pageRef = useRef(null);
    const colors = [
        '#000', '#ffffff', '#FF5733', '#33FF57', '#3357FF',
        '#FF8C00', '#00CED1', '#ADFF2F', '#FF1493', '#8A2BE2',
        '#00FA9A', '#DC143C', '#1E90FF', '#7FFF00', '#FF4500',
        '#40E0D0', '#BA55D3', '#FFDAB9', '#2E8B57', '#A52A2A',
        '#87CEEB', '#FF69B4', '#556B2F', '#00BFFF', '#C71585',
        '#F333FF', '#FFD700', 'rgba(164, 255, 8, 1)', 'rgba(102, 27, 0, 1)',
        '#4B0082','#00FF7F','#FFB6C1' 
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
                    link.download = 'Mypainting.png';
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



    return (
        <div className="container bg-white" ref={pageRef}>



            {/* حاوية صور SVG */}
            <div className="svg-container w-220 lg:mt-14">
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

export default Q2;
