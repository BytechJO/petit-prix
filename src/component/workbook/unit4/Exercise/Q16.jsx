import React, { useState, useRef } from "react";
import { Download } from "lucide-react"; // تأكد من تثبيت مكتبة lucide-react أو استخدم أي أيقونة عندك
import domtoimage from 'dom-to-image';

const Q16 = () => {
    const letterRef = useRef(null);

    const [answers, setAnswers] = useState({
        a: "",
        b: "",
        c: ""
    });

    const handleChange = (e, key) => {
        setAnswers((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleReset = () => {
        setAnswers({ a: "", b: "", c: "" });
    };

    const handleDownload = () => {
        if (!letterRef.current) return;

        domtoimage.toPng(letterRef.current)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'letter.png';
                link.click();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl space-y-6" ref={letterRef}>
            <h2 className="text-2xl font-bold mb-4">Réponds aux questions</h2>

            {/* السؤال A */}
            <div className="flex flex-col space-y-2">
                <label className="font-semibold">a Qu’est-ce que tu fais le lundi ?</label>
                <textarea
                    value={answers.a}
                    onChange={(e) => handleChange(e, "a")}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="..............................................................................."
                />
            </div>

            {/* السؤال B */}
            <div className="flex flex-col space-y-2">
                <label className="font-semibold">b Qu’est-ce que tu fais le samedi ?</label>
                <textarea
                    value={answers.b}
                    onChange={(e) => handleChange(e, "b")}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="..............................................................................."
                />
            </div>

            {/* السؤال C */}
            <div className="flex flex-col space-y-2">
                <label className="font-semibold">c À la fête de l’école, on fait ...</label>
                <textarea
                    value={answers.c}
                    onChange={(e) => handleChange(e, "c")}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="..............................................................................."
                />
            </div>

            {/* أزرار التحكم */}
            <div className="popup-buttons shrink-0 flex gap-4 justify-center mt-4">
                <button className="try-again-button" onClick={handleReset}>
                    Recommencer
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white rounded-lg  hover:bg-blue-600 transition-colors cursor-pointer p-1 flex items-center justify-center"
                >
                    <Download size={20} />
                </button>
            </div>
        </div>
    );
};

export default Q16;
