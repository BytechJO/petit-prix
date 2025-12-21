import { useRef, useState, useEffect } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import "./AudioWithCaption.css";

const AudioWithCaption = ({
  src,
  captions,
  segments = [],
  onCaptionChange,
  showClose = false,
  onClose,
}) => {
  const audioRef = useRef(null);
  const settingsRef = useRef(null);
  const captionRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  // 🔹 حالات جديدة لإدارة المقاطع والتشغيل
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  // دالة لتحديث الكابشن بناءً على الوقت الحالي
  const updateCaption = (time) => {
    if (!captions || captions.length === 0) return;
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end
    );
    setActiveIndex(index);
    if (onCaptionChange) onCaptionChange(index);
  };

  // 🔹 دالة التشغيل/الإيقاف الموحدة للمقاطع
  const toggleSegmentPlay = () => {
    if (isPlaying) {
      // إذا كان الصوت يعمل، أوقفه
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // إذا كان الصوت متوقفًا، قم بتشغيل المقطع الحالي
      playCurrentSegment();
    }
  };

  // 🔹 دالة لتشغيل المقطع المحدد
  const playCurrentSegment = () => {
    if (!segments.length || currentSegmentIndex >= segments.length) return;

    const audio = audioRef.current;
    const { start } = segments[currentSegmentIndex];

    audio.currentTime = start;
    audio.play();
    setIsPlaying(true);
  };

  // 🔹 useEffect لمراقبة الوقت وإيقاف الصوت عند نهاية المقطع
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;

    const { end } = segments[currentSegmentIndex];

    const checkTime = () => {
      if (audio.currentTime >= end) {
        audio.pause();
        setIsPlaying(false);
        // الانتقال للمقطع التالي استعدادًا للضغطة القادمة
        setCurrentSegmentIndex((prev) => prev + 1);
      }
    };

    audio.addEventListener("timeupdate", checkTime);
    return () => {
      audio.removeEventListener("timeupdate", checkTime);
    };
  }, [isPlaying, currentSegmentIndex, segments]);


  // تأثيرات أخرى (بدون تغيير)
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
      activeElement.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [activeIndex]);

  const isFinished = currentSegmentIndex >= segments.length;

  return (
    <div className="audio-popup">
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
            setCurrent(e.target.currentTime);
            updateCaption(e.target.currentTime);
          }}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => {
            // عند انتهاء الملف الصوتي بالكامل
            setIsPlaying(false);
            setCurrentSegmentIndex(segments.length); // تأكد من أنه في النهاية
          }}
        />

        {/* الوقت + السلايدر */}
        <div className="top-row">
          <span className="audio-time">
            {new Date(current * 1000).toISOString().substring(14, 19)}
          </span>
          <input
            type="range"
            className="audio-slider"
            min="0"
            max={duration || 0}
            value={current}
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              updateCaption(Number(e.target.value));
            }}
            style={{
              background: `linear-gradient(to right, #430f68 ${
                (current / duration) * 100
              }%, #d9d9d9ff ${(current / duration) * 100}%)`,
            }}
          />
          <span className="audio-time">
            {new Date(duration * 1000).toISOString().substring(14, 19)}
          </span>
        </div>

        {/* الأزرار */}
        <div className="bottom-row">
          {captions && captions.length > 0 ? (
            <div
              className={`round-btn ${showCaption ? "active" : ""}`}
              onClick={() => setShowCaption(!showCaption)}
            >
              <TbMessageCircle size={40} />
            </div>
          ) : (
            <div />
          )}

          {/* 🔹 زر التشغيل/الإيقاف الموحد للمقاطع */}
          <button
            className="play-btn2"
            onClick={toggleSegmentPlay}
            disabled={isFinished}
          >
            {isFinished ? "✔" : isPlaying ? <FaStop size={26} /> : <FaPlay size={26} />}
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

        {/* الكابشن */}
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
