import React from "react";
import logo from "../assets/nav/PreissMurphy Logo-BGSDEhSA (1).svg";


const Navbar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "student", label: "Student’s Book" },
        { id: "work", label: "Workbook" },
        { id: "teacher", label: "Teacher’s Book" },
        { id: "flash", label: "Flashcards" },
        { id: "poster", label: "Posters" },
    ];

    return (
        <nav className="w-full bg-white border-b shadow px-2 py-2 flex items-center justify-between">
            {/* LEFT SECTION */}
            <div className="flex items-center gap-10">
                {/* LOGO */}
                <img
                    src={logo}
                    alt="J1 Logo"
                    style={{ height: "40px", width: "100px" }}
                />

                {/* TABS */}
                <div className="flex items-center gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                px-4 py-1 rounded-xl border font-medium transition-all duration-200 text-[15px]
                ${activeTab === tab.id
                                    ? "border-[#6B40C8] text-[#6B40C8] bg-[#f6f0ff]"
                                    : "border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50"
                                }
              `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-4">
                <span className="cursor-pointer text-[#6B40C8] hover:opacity-75">
                    Student Edition
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
