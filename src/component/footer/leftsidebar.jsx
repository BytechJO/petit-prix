import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function LeftSidebar({ isOpen, close, units, goToPage, book }) {
    const [openUnit, setOpenUnit] = useState(null);

    const toggleUnit = (unitId) => {
        setOpenUnit(openUnit === unitId ? null : unitId);
    };

    return (
        <>
            <div
                className={`fixed left-0 bottom-0 w-70 h-full bg-white shadow-xl 
  rounded-tr-2xl transition-transform duration-300 z-[99999]
  flex flex-col
  ${isOpen ? "translate-y-0" : "translate-y-full"}`}
            >
                {/* HEADER */}
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl text-[#430f68] font-semibold">
                        Table des matières
                    </h2>
                    <button onClick={close} className="text-2xl cursor-pointer">
                        ✕
                    </button>
                </div>
                {book && (
                    <div
  className={`bookInfo-div flex items-center gap-3 px-3 mb-4
  ${book.title === "Right 1 Grammar Poster" ? "grammar-info" : ""}`}
>
  {book.cover && (
    <img
      src={book.cover}
      className="rounded shadow"
      style={{ height: "80px", width: "auto" }}
    />
  )}

  <div className="text-left">
    <h3 className="text-base font-semibold text-[#430f68]">
      {book.title}
    </h3>
    <p className="text-sm text-gray-500">
      {book.pages} pages
    </p>
  </div>
</div>


                )}

                <div className="h-[calc(100%-70px)] overflow-y-auto px-2 py-0">
                    <ul className="space-y-1">
                        {units.map((u) => (
                            <li
                                key={u.id}
                                className="border-b border-gray-300 last:border-none"
                            >
                                <div
                                    onClick={() => toggleUnit(u.id)}
                                    className="flex justify-between items-center py-3 px-2 cursor-pointer select-none"
                                >
                                    <span className="text-gray-700 font-medium">{u.label}</span>

                                    {openUnit === u.id ? (
                                        <IoChevronUp size={20} className="text-blue-500" />
                                    ) : (
                                        <IoChevronDown size={20} className="text-gray-500" />
                                    )}
                                </div>

                                <div
    className={`
        overflow-hidden
        transition-all duration-1200 ease-out
        ${openUnit === u.id ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
    `}
>
    <ul className="ml-4 mb-2 space-y-1 pt-2">
        {Array.from({ length: u.pages }).map((_, i) => {
            const pageNumber = u.start + i;

            return (
                <li
                    key={pageNumber}
                    className="py-1 px-2 text-gray-600 cursor-pointer
                               transition-all duration-300
                               hover:text-blue-600"
                    onClick={() => {
                        goToPage(pageNumber);
                        close();
                    }}
                >
                    Page {pageNumber}
                </li>
            );
        })}
    </ul>
</div>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isOpen && (
                <div onClick={close} className="fixed inset-0 bg-black/40 z-[99998]" />
            )}
        </>
    );
}