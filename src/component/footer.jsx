// src/components/Footer.js

import React from "react";
import menu from "../assets/footer/menu.svg";
import home from "../assets/footer/home.svg";
import zoomIn from "../assets/footer/zoom in.svg";
import zoomOut from "../assets/footer/zoom out.svg";
import fullScreen from "../assets/footer/fullscreen.svg";
import onePage from "../assets/footer/one page.svg";
import openBook from "../assets/footer/open-book.svg";

import { FaKey } from "react-icons/fa";

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

    const rightItems = [
        { id: 1, label: "Home", icon: home },
        { id: 2, label: "Zoom In", icon: zoomIn },
        { id: 3, label: "Zoom Out", icon: zoomOut },
        { id: 4, label: "Full Screen", icon: fullScreen },
        { id: 5, label: "One Page", icon: onePage },
        { id: 6, label: "Open Book", icon: openBook },
    ];


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
