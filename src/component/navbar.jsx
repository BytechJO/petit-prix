import React from "react";
const logo ="/assets/nav/PreissMurphy Logo-BGSDEhSA (1).svg";

const Navbar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "studentbook", label: "MÉTHODE DE FRANÇAIS" },
        { id: "workbook", label: "LIVRE DE GRAMMAIRE" },
    ];

    return (
        <nav className="w-full bg-white border-b shadow px-2 py-2 flex items-center justify-between">
            {/* LEFT SECTION */}
            <div className="flex items-center gap-10 ">
                {/* LOGO */}
                <a
                className="hover:scale-105 transition-transform"
                    href="https://preissmurphydigital.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={logo}
                        alt="J1 Logo"
                        style={{ height: "40px", width: "100px", cursor: "pointer" }}
                    />
                </a>


                {/* TABS */}
                <div className="flex items-center gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`cursor-pointer
                px-4 py-1 rounded-xl border font-medium transition-all duration-200 text-[15px]
                ${activeTab === tab.id
                                    ? "border-[#430f68] text-[#430f68] bg-[#f6f0ff] hover:scale-105 transition-transform"
                                    : "border-[#b99cfa] text-[#430f68] hover:bg-purple-50 hover:scale-105 transition-transform"
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
                <span className="cursor-pointer text-[#430f68] hover:opacity-75">
                    Student Edition
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
