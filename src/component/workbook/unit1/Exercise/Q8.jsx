import React, { useState, useRef } from "react";
import ValidationAlert from "../../../Popup/ValidationAlert";
import domtoimage from 'dom-to-image-more';

const Q8 = () => {
    const img = '/assets/workbook/unit1/page6/2.svg';

    const [answer, setAnswer] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const pageRef = useRef(null);

    const checkAnswers = () => {
        if (!answer.trim()) {
            ValidationAlert.warning("Veuillez écrire votre réponse!");
            return;
        }

        setIsChecked(true);
        ValidationAlert.success("Bravo!");
    };

    

    const getInputStyle = () => {
        if (!isChecked) {
            return {
                border: '2px solid #ec4899',
                backgroundColor: 'white',
                color: '#1f2937'
            };
        }

        return {
            border: '2px solid #22c55e',
            backgroundColor: '#f0fdf4',
            color: '#15803d'
        };
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
        setAnswer("");
        setIsChecked(false);
    };


    return (
        <div className="flex flex-col items-center p-8 gap-8" ref={pageRef}>

            {/* المحتوى الرئيسي */}
            <div className="flex items-center gap-8 w-full max-w-5xl">
                {/* الصورة */}
                <div className="flex-shrink-0">
                    <img
                        src={img}
                        alt="Paul"
                        className="max-w-80 max-h-80 object-contain lg:ml-22"
                    />
                </div>

                {/* النص والـ Input */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Speech bubble */}
                    <div className="bg-white border-2 border-cyan-400 rounded-2xl px-6 py-4 shadow-lg relative bottom-20 right-10">
                        <div className="absolute -left-7 top-10 w-0 h-0 border-t-[15px] border-t-transparent border-r-[20px] border-r-cyan-400 border-b-[5px] border-b-transparent"></div>
                        <p className="text-lg font-semibold text-gray-800">
                            Je m'appelle Paul. Et toi ?
                        </p>
                    </div>

                    {/* Input field */}
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-gray-800">Je</span>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={isChecked}
                            className="flex-1 px-4 py-3 rounded-lg font-semibold text-lg"
                            style={{
                                ...getInputStyle(),
                                outline: 'none',
                                fontFamily: 'Fredoka One, cursive'
                            }}
                            placeholder="..................................................................."
                        />
                        <span className="text-lg font-semibold text-gray-800">.</span>
                    </div>
                </div>
            </div>

            {/* الأزرار */}
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

export default Q8;