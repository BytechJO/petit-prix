import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';
import LessonNavigator from './LessonNavigator';
import { useState } from "react";
import Swal from "sweetalert2";
import "./LessonNavigator.css";
import next from "../../assets/next btn.svg";
import back from "../../assets/back btn.svg";
import AudioWithCaption from '../AudioWithCaption';
import '../AudioWithCaption.css'

const Popup = (
    {
        isOpen,
        onClose,
        isAudio = false,
        questions = [],
        startIndex = 0,
        currentUnit = 1,
        currentSection = "A",
        onFinish = null
    }
) => {
    if (!isOpen) return null;

    const [index, setIndex] = useState(startIndex);
    const currentQuestionData = questions[index] || {};


    useEffect(() => {
        setIndex(startIndex);
    }, [startIndex, isOpen]);

    const CurrentQuestion = questions[index]?.component || (() => <div>No question available</div>);

    const handleNext = () => {
        const question = questions[index];

        if (index === questions.length - 1) {
            Swal.fire({
                html: `
              <div class="custom-popup-content">
                <h2 style="font-size:25px;color:black">
                  Congratulations! You've finished all exercises in Unit ${currentUnit} - Section ${currentSection} 🎉
                  <br/>Do you want to continue?
                </h2>
              </div>
            `,
                imageWidth: 200,
                imageHeight: 200,
                icon: "success",
                background: "#dfeaf6",
                confirmButtonText: "Continue",
                cancelButtonText: "Stay Here",
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                buttonsStyling: false,
                customClass: {
                    popup: "my-popup",
                    image: "my-image",
                    title: "my-title",
                    content: "my-content",
                    confirmButton: "my-button",
                    cancelButton: "my-button1",
                },
            }).then((res) => {
                if (res.isConfirmed && onFinish) {
                    onFinish(); // Callback to parent component
                }
            });
            return;
        }

        // انتقال عادي للسؤال التالي
        setIndex(index + 1);
    };

    const handlePrevious = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    return ReactDOM.createPortal(
        <div className="popup-overlay">
            <button className={`popup-close-btn ${isAudio ? "audio" : ""}`} onClick={onClose} style={{ zIndex: "99999999999" }}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* nav */}
            <div className="w-full">
                <div
                    className="nav-buttons"
                    style={{
                        display: "flex",
                        width: "100%",
                        marginBottom: "30px",
                        gap: "20px",
                        justifyContent: "center", // الآن كل العناصر بالوسط
                        alignItems: "center",
                        backgroundColor: "#430f68",
                        padding: "10px 20px",
                    }}
                >
                    <button
                        onClick={handlePrevious}
                        disabled={index === 0}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: index === 0 ? "not-allowed" : "pointer",
                            opacity: index === 0 ? 0.5 : 1,
                            background: "none",
                            border: "none",
                            transition: "opacity 0.3s",
                            marginRight: "20px", // مسافة بسيطة بين الزرين
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 90 90">
                            <image href={back} x="0" y="0" width="90" height="90" />
                        </svg>
                        Previous Exercise
                    </button>

                    {/* ممكن تحط مؤشر التقدم لو حاب */}
                    <div style={{ color: "white", fontSize: "14px" }}>
                        Question {index + 1} of {questions.length}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={index === questions.length - 1 && !onFinish}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            transition: "opacity 0.3s",
                            marginLeft: "20px", // مسافة بسيطة بين الزرين
                        }}
                    >
                        Next Exercise
                        <svg width="20" height="20" viewBox="0 0 90 90">
                            <image href={next} x="0" y="0" width="90" height="90" />
                        </svg>
                    </button>
                </div>


                <div
                    className="popup-question-container"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10%",
                        width: "100%",
                    }}
                >
                    {currentQuestionData.text && (
                        <p className="question-text">
                            <span className="qusetionnum" style={{ fontWeight: "bold" }}>
                                {index + 1}.
                            </span>{" "}
                            {currentQuestionData.text}
                        </p>
                    )}


                    {currentQuestionData.audio && (
  <div style={{ width: "30%", transform: "scale(0.75)" }}>
    <AudioWithCaption
      src={currentQuestionData.audio}
      captions={currentQuestionData.captions || []}
    />
  </div>
)}

                </div>





                {/* الـ content */}
                <div className="question-container">
                    <CurrentQuestion />
                </div>
            </div>

        </div>,
        document.body
    );
};

export default Popup;