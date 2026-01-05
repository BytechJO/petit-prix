import React, { useRef, useEffect, useState } from 'react';

const scissorsIconUrl = '/assets/icons/scissors.svg';

// المكون الرئيسي للتمرين
const Q4 = () => {
    const canvasRef = useRef(null);
    const [isCutting, setIsCutting] = useState(false); // هل المستخدم يقوم بالقص حالياً؟
    const [lastPosition, setLastPosition] = useState(null);
    const cutSoundRef = useRef(null);

    useEffect(() => {
        cutSoundRef.current = new Audio('/assets/sounds/scissors.mp3');
        cutSoundRef.current.loop = true;
        cutSoundRef.current.volume = 0.6;
    }, []);

    // إعداد لوحة الرسم عند تحميل المكون
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // تعيين أبعاد اللوحة لتناسب حجم الحاوية
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // رسم خلفية الورقة (لون أصفر فاتح كورق الملاحظات)
        context.fillStyle = '#FFFACD'; // لون ورقي
        context.fillRect(0, 0, canvas.width, canvas.height);

        // إضافة خطوط زرقاء خفيفة لمحاكاة ورقة دفتر
        context.strokeStyle = 'rgba(173, 216, 230, 0.5)'; // Light blue
        context.lineWidth = 1;
        for (let i = 30; i < canvas.height; i += 30) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.stroke();
        }

    }, []);

    // دالة لبدء عملية القص
    const startCutting = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsCutting(true);
        setLastPosition({ x: offsetX, y: offsetY });
        if (cutSoundRef.current) {
            cutSoundRef.current.currentTime = 0;
            cutSoundRef.current.play();
        }
    };

    // دالة لإيقاف عملية القص
    const stopCutting = () => {
        setIsCutting(false);
        setLastPosition(null);
        if (cutSoundRef.current) {
            cutSoundRef.current.pause();
            cutSoundRef.current.currentTime = 0;
        }
    };

    // دالة الرسم أثناء تحريك المقص
    const cut = ({ nativeEvent }) => {
        if (!isCutting) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { offsetX, offsetY } = nativeEvent;

        // إعدادات خط القص
        context.strokeStyle = '#333333'; // لون داكن للقص
        context.lineWidth = 3;
        context.lineCap = 'round'; // نهايات دائرية للخط
        context.setLineDash([8, 8]); // خط متقطع لمحاكاة القص

        context.beginPath();
        context.moveTo(lastPosition.x, lastPosition.y);
        context.lineTo(offsetX, offsetY);
        context.stroke();

        setLastPosition({ x: offsetX, y: offsetY });
    };

    // دالة لمسح اللوحة والبدء من جديد
    const handleReset = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        // إعادة رسم الخلفية
        context.fillStyle = '#FFFACD';
        context.fillRect(0, 0, canvas.width, canvas.height);
        // إعادة رسم الخطوط
        context.strokeStyle = 'rgba(173, 216, 230, 0.5)';
        for (let i = 30; i < canvas.height; i += 30) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.stroke();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6  rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Et maintenant, crée ton prénom !
            </h2>
            <p className="text-center text-gray-600 mb-6">
                Utilise les ciseaux pour découper les lettres de ton prénom dans le papier.
            </p>

            {/* حاوية لوحة الرسم مع تنسيق مؤشر المقص */}
            <div
                className="relative w-full h-96 bg-white rounded-lg shadow-inner overflow-hidden"
                style={{
                    cursor: `url('${scissorsIconUrl}') 10 10, crosshair`
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                    onMouseDown={startCutting}
                    onMouseUp={stopCutting}
                    onMouseLeave={stopCutting} // إيقاف القص عند خروج الماوس
                    onMouseMove={cut}
                />
            </div>

            {/* زر لإعادة المحاولة */}
            <div className="text-center mt-6">
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
                >
                    Recommencer
                </button>
            </div>
        </div>
    );
};

export default Q4;
