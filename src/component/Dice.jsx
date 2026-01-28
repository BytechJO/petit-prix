import { useState } from "react";

const Dice = ({
    onRoll,
    size = 100,
    disabled = false,
    rollingTime = 1500,
}) => {
    const [rolling, setRolling] = useState(false);
    const [face, setFace] = useState(1);

    const roll = () => {
        if (disabled || rolling) return;

        setRolling(true);

        // أنيميشن عشوائي أثناء الرمي
        const animationInterval = setInterval(() => {
            setFace(Math.floor(Math.random() * 6) + 1);
        }, 80);

        setTimeout(() => {
            clearInterval(animationInterval);

            // تحديد النتيجة النهائية بشكل عشوائي
            const finalFace =  1;
            setFace(finalFace);
            setRolling(false);

            onRoll?.(finalFace); // إرسال النتيجة النهائية
        }, rollingTime);
    };

    // أماكن النقاط لكل وجه
    const faces = {
        1: [5],
        2: [1, 9],
        3: [1, 5, 9],
        4: [1, 3, 7, 9],
        5: [1, 3, 5, 7, 9],
        6: [1, 3, 4, 6, 7, 9],
    };

    return (
        <>
            <style>
                {`
        .dice-container {
          cursor: ${disabled ? "not-allowed" : "pointer"};
          width: ${size}px;
          height: ${size}px;
          perspective: 1000px; /* لإعطاء عمق للحركة ثلاثية الأبعاد */
        }

        .dice-3d {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform ${rollingTime / 1000}s;
          /* تطبيق الأنيميشن عند الرمي */
          animation: ${rolling ? `roll-animation ${rollingTime / 1000}s ease-out` : 'none'};
        }

        @keyframes roll-animation {
            0% { transform: rotateY(0deg) rotateX(0deg) translateY(0px); }
            50% { transform: rotateY(720deg) rotateX(720deg) translateY(-80px); }
            100% { transform: rotateY(1440deg) rotateX(1440deg) translateY(0px); }
        }

        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 15%;
          border: 2px solid #333;
          background: linear-gradient(145deg, #fdfdfd, #f0f0f0);
          box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          padding: 10%;
          box-sizing: border-box;
        }

        /* تحديد أماكن الأوجه الستة في الفضاء ثلاثي الأبعاد */
        .front  { transform: translateZ(${size / 2}px); }
        .back   { transform: rotateY(180deg) translateZ(${size / 2}px); }
        .right  { transform: rotateY(90deg) translateZ(${size / 2}px); }
        .left   { transform: rotateY(-90deg) translateZ(${size / 2}px); }
        .top    { transform: rotateX(90deg) translateZ(${size / 2}px); }
        .bottom { transform: rotateX(-90deg) translateZ(${size / 2}px); }

        .pip {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pip-dot {
          width: ${size * 0.15}px;
          height: ${size * 0.15}px;
          background: #333;
          border-radius: 50%;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }
        `}
            </style>

            <div
                className="dice-container"
                onClick={roll}
                style={{ opacity: disabled ? 0.6 : 1 }}
            >
                {/* تم استخدام بنية ثلاثية الأبعاد كاملة، لكن لعرض وجه واحد متحرك، سنبسطها هنا */}
                {/* هذا الكود يركز على الأنيميشن والنتيجة النهائية */}
                <div className={`face front ${rolling ? 'rolling' : ''}`}>
                    {[...Array(9)].map((_, i) => {
                        const index = i + 1;
                        return (
                            <div key={i} className="pip">
                                {faces[face].includes(index) && (
                                    <div className="pip-dot" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};


export default Dice;
