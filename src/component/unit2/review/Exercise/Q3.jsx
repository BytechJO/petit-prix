// WeeklyPlanner.jsx
import React, { useState } from "react";

const days = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const defaultEvents = Array(7).fill(""); // نص فارغ لكل يوم

export default function Q3() {
    const [events, setEvents] = useState(defaultEvents);

    const handleChange = (dayIndex, value) => {
        const updated = [...events];
        updated[dayIndex] = value;
        setEvents(updated);
    };

    const colors = [
        "bg-yellow-100",
        "bg-red-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-purple-100",
        "bg-pink-100",
        "bg-orange-100"
    ];

    const handleReset = () => {
        setEvents(Array(7).fill(""));
    };

    // تحميل البيانات كملف نصي
    const handleDownload = () => {
        const data = days.map((day, i) => `${day}: ${events[i]}`).join("\n");
        const blob = new Blob([data], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "semaine de planification.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  


    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 border text-left">Jour</th>
                            <th className="p-4 border text-left">Activité / Tâche</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day, dayIndex) => (
                            <tr
                                key={day}
                                className={`${colors[dayIndex]} hover:bg-opacity-50 transition`}
                            >
                                <td className="p-4 border font-semibold">{day}</td>
                                <td className="p-4 border">
                                    <textarea
                                        value={events[dayIndex]}
                                        onChange={(e) => handleChange(dayIndex, e.target.value)}
                                        className="w-full min-h-[60px] p-2 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
                                        placeholder="Écris ici ce que tu veux faire..."
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={handleReset}
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors cursor-pointer"
                    >
                        Recommencer
                    </button>

                    <button
                        onClick={handleDownload}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
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
}
