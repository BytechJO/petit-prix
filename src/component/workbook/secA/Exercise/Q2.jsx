import React, { useState } from "react";

const wordsToWrite = [
    { id: 1, label: "bonjour", correct: "bonjour" },
    { id: 2, label: "salut", correct: "salut" },
];

const Q2 = () => {
    const [userInputs, setUserInputs] = useState({
        1: "",
        2: "",
    });

    const handleInputChange = (id, value) => {
        setUserInputs((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div className="min-h-145 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 space-y-10">

                {/* العنوان */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#2c5287]">
                         Écris chaque mot correctement ✍️
                    </h2>
                </div>

                {/* الأسئلة */}
                <div className="space-y-12">
                    {wordsToWrite.map((word) => {
                        const isCorrect =
                            userInputs[word.id].trim().toLowerCase() ===
                            word.correct;

                        return (
                            <div key={word.id} className="relative">
                                <label className="block mb-3 text-lg font-semibold text-gray-600">
                                    {word.label}
                                </label>

                                <input
                                    type="text"
                                    value={userInputs[word.id]}
                                    onChange={(e) =>
                                        handleInputChange(word.id, e.target.value)
                                    }
                                    placeholder="Écrivez ici..."
                                    className={`
                                        w-full text-4xl font-handwriting
                                        bg-transparent border-b-4 px-2 py-3
                                        transition-all duration-300
                                        focus:outline-none
                                        ${
                                            isCorrect
                                                ? "border-green-500 text-green-600"
                                                : "border-gray-300 focus:border-[#2c5287] text-gray-700"
                                        }
                                    `}
                                />

                                {/* علامة الصح */}
                                {isCorrect && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl shadow-lg animate-bounce">
                                            ✓
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Q2;
