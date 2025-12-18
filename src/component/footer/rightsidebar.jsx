import React from "react";

const RightSidebar = ({
  isOpen,
  close,
  items,
}) => {
  return (
    <>
      <div
        className={`
          fixed right-0 bottom-0 w-64 h-full bg-white shadow-2xl z-[99999]
          rounded-tr-2xl transform transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl text-[#2c5287] font-semibold">Icon Key</h2>
          <button
            onClick={close}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <ul className="p-3 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 p-3 bg-purple-100 rounded-lg hover:bg-purple-300 cursor-pointer"
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{ height: "35px", width: "35px" }}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 z-[99998]"
        />
      )}
    </>
  );
};

export default RightSidebar;
