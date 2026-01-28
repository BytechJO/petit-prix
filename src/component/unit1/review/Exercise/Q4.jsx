import React, { useRef, useEffect, useState } from 'react';

const scissorsIconUrl = '/assets/icons/scissors.svg';

const Q4 = () => {
    const canvasRef = useRef(null);
    const [isCutting, setIsCutting] = useState(false);
    const [lastPosition, setLastPosition] = useState(null);
    const cutSoundRef = useRef(null);
    const scissorsRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });


    useEffect(() => {
        cutSoundRef.current = new Audio('/assets/sounds/scissors.mp3');
        cutSoundRef.current.loop = true;
        cutSoundRef.current.volume = 0.6;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        context.fillStyle = '#FFFACD';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = 'rgba(173, 216, 230, 0.5)';
        context.lineWidth = 1;
        for (let i = 30; i < canvas.height; i += 30) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.stroke();
        }

    }, []);

    const startCutting = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsCutting(true);
        setLastPosition({ x: offsetX, y: offsetY });
        if (cutSoundRef.current) {
            cutSoundRef.current.currentTime = 0;
            cutSoundRef.current.play();
        }
    };

    const stopCutting = () => {
        setIsCutting(false);
        setLastPosition(null);
        if (cutSoundRef.current) {
            cutSoundRef.current.pause();
            cutSoundRef.current.currentTime = 0;
        }
    };

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

    const handleReset = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#FFFACD';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgba(173, 216, 230, 0.5)';
        for (let i = 30; i < canvas.height; i += 30) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.stroke();
        }
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();

        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        cut(e);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;

        // تحويل الكانفاس إلى صورة
        const imageUrl = canvas.toDataURL('image/png');

        // إنشاء رابط تحميل
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'cutting-result.png';
        link.click();
    };



    return (
        <div className="w-full max-w-4xl mx-auto p-6  rounded-2xl shadow-lg">


            <div
                className="relative w-full h-96 bg-white rounded-lg shadow-inner overflow-hidden"
                style={{
                    cursor: `none`
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                    onMouseDown={startCutting}
                    onMouseUp={stopCutting}
                    onMouseLeave={stopCutting}
                    onMouseMove={handleMouseMove}
                />
                <img
                    ref={scissorsRef}
                    src={scissorsIconUrl}
                    alt="scissors"
                    className="absolute pointer-events-none select-none"
                    style={{
                        left: mousePos.x - 20,
                        top: mousePos.y - 20,
                        width: 40,
                        height: 40,
                        transform: isCutting ? 'rotate(-15deg)' : 'rotate(0deg)',
                        transition: 'transform 0.1s ease',
                    }}
                />

            </div>

            <div className="popup-buttons flex justify-center gap-4">
  <button
    className="try-again-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    onClick={handleReset}
  >
    Recommencer
  </button>

  <button
    className="check-button2 px-4 py-2 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600"
    onClick={handleDownload}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
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
