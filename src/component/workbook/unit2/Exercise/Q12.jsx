import React, { useRef, useEffect, useState } from 'react';
import { Download, Brush } from 'lucide-react';

const Q12 = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPos, setLastPos] = useState(null);
    const soundRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const sound = '/assets/sounds/paint.mp3';

    useEffect(() => {
        // تحميل الصوت
        soundRef.current = new Audio(sound);
        soundRef.current.loop = true;
        soundRef.current.volume = 0.4;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // خلفية الرسم
        ctx.fillStyle = '#FFFACD';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        setLastPos({ x: offsetX, y: offsetY });
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play().catch(() => {
                // بعض المتصفحات تمنع التشغيل التلقائي قبل تفاعل المستخدم
            });
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        setLastPos(null);
        if (soundRef.current) {
            soundRef.current.pause();
            soundRef.current.currentTime = 0;
        }
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = nativeEvent;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#000'; // لون الرسم
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        setLastPos({ x: offsetX, y: offsetY });
    };

    const handleReset = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFACD';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'drawing.png';
        link.click();
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        draw(e);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 rounded-2xl shadow-lg">
            <div
                className="relative w-full h-115 rounded-lg shadow-inner overflow-hidden"
                style={{ cursor: 'none' }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onMouseMove={handleMouseMove}
                />
                <Brush
                    size={30} // حجم الفرشاة
                    className="absolute pointer-events-none text-black"
                    style={{
                        left: mousePos.x - 15, // مركز الأيقونة على الماوس
                        top: mousePos.y - 15,
                    }}
                />
            </div>
            <div className="popup-buttons mt-4 flex gap-4">
                <button className="try-again-button" onClick={handleReset}>
                    Recommencer ↻
                </button>
                <button className="check-button2 flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-lg" onClick={handleDownload}>
                    <Download size={20} />
                </button>
            </div>
        </div>
    );
};

export default Q12;
