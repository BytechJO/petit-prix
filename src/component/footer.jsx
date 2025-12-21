// src/components/Footer.js

import React from "react";
const menu = "/assets/footer/menu.svg";

const home = "/assets/footer/home.svg";
const zoomIn = "/assets/footer/zoom in.svg";
const zoomOut = "/assets/footer/zoom out.svg";
const fullScreen = "/assets/footer/fullscreen.svg";
const onePage = "/assets/footer/one page.svg";
const openBook = "/assets/footer/open-book.svg";

import { FaKey } from "react-icons/fa";

// rightbar
const quiz = "/assets/footer/icons/1.svg";
const audio = "/assets/footer/icons/2.svg";
const backbtn = "/assets/footer/icons/3.svg";
const Fullscreen = "/assets/footer/icons/4.svg";
const homee = "/assets/footer/icons/5.svg";
const menuu = "/assets/footer/icons/6.svg";
const next = "/assets/footer/icons/7.svg";
const onepage = "/assets/footer/icons/8.svg";
const twopage = "/assets/footer/icons/9.svg";
const logo = "/assets/footer/icons/10.svg";
const zoomin = "/assets/footer/icons/11.svg";
const zoomout = "/assets/footer/icons/12.svg";


const rightItems = [
    { id: 1, label: "logo", icon: logo },
    { id: 2, label: "ouvrir le son", icon: audio },
    { id: 3, label: "revenir", icon: backbtn },
    { id: 4, label: "Plein écran", icon: Fullscreen },
    { id: 5, label: "rentrer à la maison", icon: homee },
    { id: 6, label: "Ouvrir le menu", icon: menuu },
    { id: 7, label: "allez ensuite", icon: next },
    { id: 8, label: "vue d'une page", icon: onepage },
    { id: 9, label: "vue sur deux pages", icon: twopage },
    { id: 10, label: "questions ouvertes", icon: quiz },
    { id: 11, label: "zoomer", icon: zoomin },
    { id: 12, label: "dézoomer", icon: zoomout },
];

import RightSidebar from "./footer/rightsidebar";
import LeftSidebar from "./footer/leftsidebar";

const Footer = ({
    pageIndex,
    totalPages,
    activeTab,
    goToPage,
    isMobile,
    viewMode,
    isSidebarOpen,
    setIsSidebarOpen,
    isrightSidebarOpen,
    setIsrightSidebarOpen,
    goToIndex,
    setZoom,
    setOffset,
    setIsPanning,
    toggleFullScreen,
    setViewMode,
    handleMenuClick,
    units,
    book,
}) => {




    return (
        <>
            <footer
                className="w-full bg-white border-t border-gray-300 shadow
           flex items-center justify-center gap-3 
           py-0 fixed bottom-0 left-0 z-[9999]"
            >
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 90 90"
                    onClick={() => setIsSidebarOpen(true)}
                    className="absolute left-3 text-white p-0.5 rounded-lg shadow hover:bg-[#bc90ff] transition cursor-pointer"
                >
                    <image href={menu} x="0" y="0" width="90" height="90" />
                </svg>

                {pageIndex !== 1 && pageIndex !== 2 && (
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 90 90"
                        onClick={goToIndex}
                        className="absolute left-12 text-white rounded-lg p-0.5 shadow hover:bg-[#bc90ff] transition cursor-pointer"
                    >
                        <image href={home} x="0" y="0" width="90" height="90" />
                    </svg>
                )}

                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 90 90"
                    onClick={() => setZoom((z) => z + 0.2)}
                    className="text-white rounded-lg p-0.5 shadow hover:bg-[#bc90ff] transition cursor-pointer"
                >
                    <image href={zoomIn} x="0" y="0" width="90" height="90" />
                </svg>
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 90 90"
                    onClick={() => {
                        setZoom(1);
                        setOffset({ x: 0, y: 0 });
                        setIsPanning(false);
                    }}
                    className="text-white rounded-lg p-0.5 shadow hover:bg-[#bc90ff] transition cursor-pointer"
                >
                    <image href={zoomOut} x="0" y="0" width="90" height="90" />
                </svg>

                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 90 90"
                    onClick={toggleFullScreen}
                    className="text-white rounded-lg p-0.5 shadow hover:bg-[#bc90ff] transition cursor-pointer"
                >
                    <image href={fullScreen} x="0" y="0" width="90" height="90" />
                </svg>

                <div className="flex items-center gap-1 px-2 py-0.5 border-2 border-[#430f68] rounded text-sm ">
                    {activeTab === "work" ? (
                        <>
                            {" "}
                            <input
                                type="text"
                                onKeyDown={(e) =>
                                    e.key === "Enter" && goToPage(Number(e.target.value))
                                }
                                className="w-10 text-center outline-none text-[#430f68] text-sm"
                                placeholder={pageIndex + 1}
                            />
                            <span className="text-[#430f68] text-sm">| {totalPages}</span>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                onKeyDown={(e) =>
                                    e.key === "Enter" && goToPage(Number(e.target.value))
                                }
                                className="w-10 text-center outline-none text-[#430f68] text-sm"
                                placeholder={
                                    viewMode === "spread" && pageIndex > 0
                                        ? `${pageIndex + 1}-${pageIndex + 2}`
                                        : `${pageIndex + 1}`
                                }
                            />
                            <span className="text-[#430f68] text-sm">| {totalPages}</span>
                        </>
                    )}
                </div>

                {!isMobile && (
                    <>
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 90 90"
                            onClick={() => setViewMode("single")}
                            className={`rounded-lg p-0.5 shadow hover:bg-[#bc90ff] transition ${viewMode === "single" ? "text-white" : " text-gray-900 cursor-pointer"
                                }`}
                        >
                            <image href={onePage} x="0" y="0" width="90" height="90" />
                        </svg>
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 90 90"
                            onClick={() => setViewMode("spread")}
                            className={`cursor-pointer rounded-lg p-0.5 shadow hover:bg-[#bc90ff] transition ${viewMode === "spread" ? " text-white" : " text-gray-900 "
                                }`}
                        >
                            <image href={openBook} x="0" y="0" width="90" height="90" />
                        </svg>
                    </>
                )}


                <div
                    onClick={() => setIsrightSidebarOpen(true)}
                    className="absolute right-0 flex items-center gap-2
               text-white px-2 py-1 rounded-lg shadow
               hover:bg-[#bc90ff] transition cursor-pointer"
                >
                    <span className="text-[#430f68] text-sm font-medium">
                        Clé d'icône
                    </span>
                    <FaKey size={24} className="text-[#430f68]" />
                </div>



            </footer>

            <LeftSidebar
                isOpen={isSidebarOpen}
                close={() => setIsSidebarOpen(false)}
                units={units}
                goToPage={goToPage}
                book={book}
            />

            <RightSidebar
                isOpen={isrightSidebarOpen}
                close={() => setIsrightSidebarOpen(false)}
                items={rightItems}
            />




        </>
    );
};

export default Footer;
