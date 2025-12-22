import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import "./AudioWithCaption.css";

const AudioWithCaption = ({ 
  src, 
  captions, 
  onCaptionChange, 
  showClose = false, 
  onClose,
  pausePoints = [] // ⭐ إضافة جديدة: مصفوفة نقاط التوقف
}) => {
  const audioRef = useRef(null);
  const settingsRef = useRef(null);
  const captionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const lastPausePoint = useRef(-1); // ⭐ لتتبع آخر نقطة توقف تم تفعيلها

  // تحديث الهايلايت حسب الوقت
  const updateCaption = (time) => {
    if (!captions || captions.length === 0) return;

    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end
    );

    setActiveIndex(index);
    if (onCaptionChange) onCaptionChange(index);
  };

  // ⭐ وظيفة جديدة: فحص نقاط التوقف
  const checkPausePoints = (currentTime) => {
    if (!pausePoints || pausePoints.length === 0) return;

    for (let i = 0; i < pausePoints.length; i++) {
      const pausePoint = pausePoints[i];
      
      // إذا وصلنا لنقطة توقف جديدة (لم نتوقف عندها من قبل)
      if (currentTime >= pausePoint && lastPausePoint.current < i) {
        lastPausePoint.current = i;
        audioRef.current.pause();
        setIsPlaying(false);
        break;
      }
    }
  };

  // تشغيل/إيقاف
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      if (captions) setShowCaption(false);
    }
    setIsPlaying(!isPlaying);
  };

  // إغلاق settings عند الضغط خارج
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeIndex === -1) return;

    const activeElement = document.getElementById(`caption-${activeIndex}`);

    if (activeElement) {
      activeElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className={`audio-popup ${showClose ? "with-close" : ""}`}>
      
      <div className="audio-inner player-ui">
        {showClose && onClose && (
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        )}

        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={(e) => {
            const currentTime = e.target.currentTime;
            setCurrent(currentTime);
            updateCaption(currentTime);
            checkPausePoints(currentTime); // ⭐ فحص نقاط التوقف
          }}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => {
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setActiveIndex(-1);
            lastPausePoint.current = -1; // ⭐ إعادة تعيين نقاط التوقف
          }}
        />
        {/* الوقت - السلايدر - الوقت */}
        <div className="top-row">
          <span className="audio-time">
            {new Date(current * 1000).toISOString().substring(14, 19)}
          </span>

          <input
            type="range"
            className="audio-slider"
            min="0"
            max={duration}
            value={current}
            onChange={(e) => {
              const newTime = Number(e.target.value);
              audioRef.current.currentTime = newTime;
              updateCaption(newTime);
              
              // ⭐ إعادة ضبط نقاط التوقف عند تحريك السلايدر
              const passedPausePoints = pausePoints.filter(point => newTime >= point).length;
              lastPausePoint.current = passedPausePoints - 1;
            }}
            style={{
              background: `linear-gradient(to right, #430f68 ${(current / duration) * 100
                }%, #d9d9d9ff ${(current / duration) * 100}%)`,
            }}
          />

          <span className="audio-time">
            {new Date(duration * 1000).toISOString().substring(14, 19)}
          </span>
        </div>
        {/* الأزرار 3 أزرار بنفس السطر */}
        <div className="bottom-row">
          {/* فقاعة */}
          {captions && captions.length > 0 ? (
            <div
              className={`round-btn ${showCaption ? "active" : ""}`}
              onClick={() => setShowCaption(!showCaption)}
            >
              <TbMessageCircle size={40} />
            </div>
          ) : (
            <div></div>
          )}

          {/* Play */}
          <button className="play-btn2" onClick={togglePlay}>
            {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
          </button>

          {/* Settings */}
          <div className="settings-wrapper" ref={settingsRef}>
            <button
              className={`round-btn ${showSettings ? "active" : ""}`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <IoMdSettings size={40} />
            </button>

            {showSettings && (
              <div className="settings-popup">
                <label>Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(e.target.value);
                    audioRef.current.volume = e.target.value;
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {/* الكابشن تحت الأزرار */}
        {captions && captions.length > 0 && showCaption && (
          <>
            <h3 style={{ fontSize: "20px", fontWeight: "500" }}>
              Audio Transcript:
            </h3>
            <div className="caption-box" ref={captionRef}>
              {captions.map((cap, i) => (
                <p
                  key={i}
                  id={`caption-${i}`}
                  className={i === activeIndex ? "active-caption" : ""}
                >
                  {cap.text}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioWithCaption;