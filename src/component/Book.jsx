import { useState, useEffect, useRef } from "react";
import Popup from "./Popup/Popup";
import { pageData } from "./pageData";
import Navbar from "./navbar";
import Footer from "./footer";

import Snowfall from 'react-snowfall';

const next = "/assets/next btn.svg";
const back = "/assets/back btn.svg";


export default function Book() {
  const [showSnow, setShowSnow] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const [activeTab, setActiveTab] = useState("studentbook");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isrightSidebarOpen, setIsrightSidebarOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState("spread");

  const [isPanning, setIsPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) elem.requestFullscreen();
    else document.exitFullscreen();
  };

  const goToIndex = () => setPageIndex(1);

  const handleGoToPage = (userInput) => {
    const pageNum = parseInt(userInput);

    // تحقق من صحة الرقم
    if (isNaN(pageNum) || pageNum < 1 || pageNum > pages.length) return;

    let newIndex = pageNum - 1;

    // إذا الرقم فردي، ارجع للصفحة السابقة
    if (pageNum % 2 !== 0 && newIndex > 0) {
      newIndex = newIndex - 1;
    }

    setPageIndex(newIndex);
  };

  useEffect(() => {
    if (activeTab === "studentbook") {
      setPageIndex(0);
    } else if (activeTab === "workbook") {
      setPageIndex(0);
    }
  }, [activeTab]);



  const currentBook = pageData.find(b => b.id === activeTab);

  const unitsForSidebar = currentBook.units.map((unit) => {
    const allPages = unit.sections.flatMap(sec => sec.pages);
    return {
      id: unit.id,
      label: unit.title,
      start: allPages[0].id,
      pages: allPages.length,
    };
  });

  const coverImage =
    currentBook.units[0].sections[0].pages[0].image;



  const [popupData, setPopupData] = useState({
    isOpen: false,
    questions: [],
    currentUnit: 1,
    currentSection: "A",
    startIndex: 0,
    questionText: "",
    audioSrc: null,
    content: null,
  });


  const openPopup = (data) => {
    // اطبع أي بيانات إضافية تحب
    console.log("DATA ID = " + (data.startIndex + 1) + "\nComponent number = " + data.questions[data.startIndex].component.name);

    setPopupData({ ...data, isOpen: true });
  };

  const closePopup = () => {
    setPopupData(prevData => ({ ...prevData, isOpen: false }));
  };


  const allPages = currentBook ? currentBook.units.flatMap(unit =>
    unit.sections.flatMap(section =>
      section.pages.map(page => {
        const Component = page.component;
        return (
          <Component
            key={page.id}
            bgImage={page.image}
            openPopup={openPopup}
          />
        );
      })
    )
  ) : [];

  // Use this flattened array for rendering
  const pages = allPages;


  const hideArrows = zoom > 1;
  const [isDragging, setIsDragging] = useState(false);
  const startPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (zoom === 1) return;

    setIsDragging(true);

    startPosition.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setOffset({
      x: e.clientX - startPosition.current.x,
      y: e.clientY - startPosition.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const nextPage = () => {
    if (isMobile || viewMode === "single") {
      if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
    } else {
      if (pageIndex === 0) setPageIndex(1);
      else if (pageIndex < pages.length - 2) setPageIndex(pageIndex + 2);
    }
  };

  const prevPage = () => {
    if (isMobile || viewMode === "single") {
      if (pageIndex > 0) setPageIndex(pageIndex - 1);
    } else {
      if (pageIndex === 1) setPageIndex(0);
      else if (pageIndex > 1) setPageIndex(pageIndex - 2);
    }
  };

  const handleMenuClick = (id) => {
    if (id === 1) goToIndex();
    if (id === 2) goToIndex();
  };

  return (
    <>
      {showSnow && <Snowfall />}
      <div
        className="w-full flex flex-col pb-20"
        style={{ overflowX: "hidden", overflowY: "auto" }}
      >

        {/* إخفاء Navbar عند فتح Popup */}
        {!popupData.isOpen && <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}
        {activeTab === "student" && <StudentBook />}
        {activeTab === "work" && <WorkBook />}
        
        <div className="content-wrapper overflow-auto lg:overflow-hidden">
          <div
            className="w-full h-[88vh] flex items-center justify-center relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* MOBILE VIEW */}
            {isMobile ? (
              <>
                {!hideArrows && (
                  <>
                    {pageIndex > 0 && (
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 90 90"
                        onClick={prevPage}
                        className="nav-btn absolute left-10 w-14 h-14 rounded-full flex items-center justify-center z-[9999] transition cursor-pointer"
                      >
                        <image href={back} x="0" y="0" width="90" height="90" />
                      </svg>
                    )}
                  </>
                )}

                <div
                  className="bg-white sm:w-auto h-[85vh] rounded-2xl shadow-2xl border flex items-center justify-center overflow-hidden"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center top",
                  }}
                >
                  {pages[pageIndex]}
                </div>

                {!hideArrows && pageIndex < pages.length - 1 && (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 90 90"
                    onClick={nextPage}
                    className="nav-btn absolute right-10 w-14 h-14 rounded-full flex items-center justify-center transition cursor-pointer"
                  >
                    <image href={next} x="0" y="0" width="90" height="90" />
                  </svg>
                )}
              </>
            ) : (
              <>
                {/* DESKTOP */}
                {pageIndex === 0 || pageIndex === pages.length - 1 || viewMode === "single" ? (
                  // SINGLE PAGE
                  <>
                    {!hideArrows && (
                      <>
                        {(pageIndex > 0 || pageIndex === pages.length - 1) && (
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 90 90"
                            onClick={prevPage}
                            className="nav-btn absolute left-10 w-14 h-14 rounded-full flex items-center justify-center z-[9999] transition cursor-pointer"
                          >
                            <image href={back} x="0" y="0" width="90" height="90" />
                          </svg>
                        )}
                      </>
                    )}

                    <div
                      className="bg-white sm:w-auto h-[85vh] rounded-2xl shadow-2xl border flex items-center justify-center overflow-hidden"
                      style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                        transformOrigin: "center top",
                        cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
                      }}
                    >
                      <div className="max-w-full max-h-full flex justify-center items-center">
                        {pages[pageIndex]}
                      </div>
                    </div>

                    {!hideArrows && pageIndex < pages.length - 1 && (
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 90 90"
                        onClick={nextPage}
                        className="nav-btn absolute right-10 w-14 h-14 rounded-full flex items-center justify-center transition cursor-pointer"
                      >
                        <image href={next} x="0" y="0" width="90" height="90" />
                      </svg>
                    )}
                  </>
                ) : (
                  <>
                    {!hideArrows && (
                      <>
                        {pageIndex > 0 && (
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 90 90"
                            onClick={prevPage}
                            className="nav-btn absolute left-10 w-14 h-14 rounded-full flex items-center justify-center z-[9999] transition cursor-pointer"
                          >
                            <image href={back} x="0" y="0" width="90" height="90" />
                          </svg>
                        )}
                      </>
                    )}

                    <div
                      className="bg-white sm:w-auto h-[85vh] rounded-2xl shadow-2xl border grid grid-cols-2 overflow-hidden"
                      style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                        transformOrigin: "center top",
                        cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
                      }}
                    >
                      <div className="flex justify-center items-center border-r">
                        {pages[pageIndex]}
                      </div>

                      <div className="flex justify-center items-center border-l">
                        {pages[pageIndex + 1]}
                      </div>
                    </div>

                    {!hideArrows && pageIndex < pages.length - 2 && (
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 90 90"
                        onClick={nextPage}
                        className="nav-btn absolute right-10 w-14 h-14 rounded-full flex items-center justify-center transition cursor-pointer"
                      >
                        <image href={next} x="0" y="0" width="90" height="90" />
                      </svg>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* FOOTER - إخفاءه أيضاً عند فتح Popup */}
        {!popupData.isOpen && (
          <Footer
            pageIndex={pageIndex}
            pages={pages}
            totalPages={pages.length}
            activeTab={activeTab}
            goToPage={handleGoToPage}
            isMobile={isMobile}
            viewMode={viewMode}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isrightSidebarOpen={isrightSidebarOpen}
            setIsrightSidebarOpen={setIsrightSidebarOpen}
            goToIndex={goToIndex}
            setZoom={setZoom}
            setOffset={setOffset}
            setIsPanning={setIsPanning}
            toggleFullScreen={toggleFullScreen}
            setViewMode={setViewMode}
            handleMenuClick={handleMenuClick}
            units={unitsForSidebar}
            book={{
              title: currentBook.title,
              pages: pages.length,
              cover: coverImage,
            }}
            showSnow={showSnow}
            setShowSnow={setShowSnow}
          />
        )}
      </div>

      <Popup
        isOpen={popupData.isOpen}
        onClose={closePopup}
        questions={popupData.questions}
        currentUnit={popupData.currentUnit}
        currentSection={popupData.currentSection}
        startIndex={popupData.startIndex}
        questionText={popupData.questionText}
        audioSrc={popupData.audioSrc}
        captions={popupData.captions}
        pausePoints={popupData.pausePoints || []}
      >
        {popupData.content}
      </Popup>
    </>
  );
}