import React, { useState, useEffect } from "react";
import "./AudioPopup.css";
import AudioWithCaption from "../AudioWithCaption";

const AudioPopup = ({ open, onClose, src, captions }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!open) setIsClosing(false);
  }, [open]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  if (!open) return null;

  return (
    <div className={`audio-popup-overlay ${isClosing ? "closing" : ""}`}>
      <div
        className={`audio-popup-container ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >

        <AudioWithCaption src={src} captions={captions} showClose={true}
  onClose={onClose} />
      </div>
    </div>
  );
};

export default AudioPopup;
