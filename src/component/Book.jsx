import { useState, useEffect, useRef } from "react";
import next from "../assets/next btn.svg";
import back from "../assets/back btn.svg";
import Popup from "./Popup/Popup";
import { pageData } from "./pageData";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Book() {
  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const [activeTab, setActiveTab] = useState("studentbook");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isrightSidebarOpen, setIsrightSidebarOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState("spread");
  const [selectedUnit, setSelectedUnit] = useState("unit1");
  const [selectedSection, setSelectedSection] = useState("secA");

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

  const goToUnit = (unitStartIndex) => {
    if (!isMobile) {
      const leftPage =
        unitStartIndex % 2 === 1 ? unitStartIndex : unitStartIndex - 1;
      setPageIndex(leftPage);
    } else {
      setPageIndex(unitStartIndex);
    }
  };


  const studentBook = pageData.find(b => b.id === "studentbook");

  const unitsForSidebar = studentBook.units.map((unit) => {
    const allPages = unit.sections.flatMap(sec => sec.pages);
    return {
      id: unit.id,
      label: unit.title,
      start: allPages[0].id,
      pages: allPages.length,
    };
  });

  const coverImage =
    studentBook.units[0].sections[0].pages[0].image;


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

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (data) => {
    setPopupData({ ...data, isOpen: true });
  };

  const closePopup = () => {
    setPopupData(prevData => ({ ...prevData, isOpen: false }));
  };

  // Fixed getPages function
  const getPages = (bookId, unitId, sectionId) => {
    const book = pageData.find(b => b.id === bookId);
    if (!book) return [];

    const unit = book.units.find(u => u.id === unitId);
    if (!unit) return [];

    const section = unit.sections.find(s => s.id === sectionId);
    if (!section) return [];

    return section.pages.map(p => {
      const Component = p.component;
      return (
        <Component
          key={p.id}
          bgImage={p.image}
          openPopup={openPopup}
        />
      );
    });
  };

  // Get pages based on current selection
  const pages = getPages(activeTab, selectedUnit, selectedSection);

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
                {pageIndex === 0 || viewMode === "single" ? (
                  // SINGLE PAGE
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
                  // SPREAD 2 PAGES
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
            goToPage={setPageIndex}
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
              title: "Student Book",
              pages: pages.length,
              cover: coverImage,
            }}
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
      >
        {popupData.content}
      </Popup>
    </>
  );
}