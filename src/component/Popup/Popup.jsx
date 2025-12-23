import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';
import { useState } from "react";
import Swal from "sweetalert2";
import "./LessonNavigator.css";

const next ="/assets/next btn white.svg";
const back = "/assets/back btn white.svg";

import AudioWithCaption from '../AudioWithCaption';
import '../AudioWithCaption.css'
import Snowfall from 'react-snowfall';

const Popup = (
    {
        isOpen,
        onClose,
        isAudio = false,
        questions = [],
        startIndex = 0,
        currentUnit = 1,
        currentSection = "A",
        onFinish = null,
        pausePoints = []
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
                        marginBottom: "30px",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: "#430f68",
                        padding: "10px 3px",
                    }}
                >
                    <button
                        onClick={handlePrevious}
                        disabled={index === 0}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "white",
                            fontSize: "14px",
                            cursor: index === 0 ? "not-allowed" : "pointer",
                            opacity: index === 0 ? 0.5 : 1,
                            background: "none",
                            border: "none",
                            transition: "opacity 0.3s",
                        }}
                    >
                        <img
                            src={back}
                            alt="back"
                            style={{ width: "10px", height: "20px", marginRight: "8px" }}
                        />
                        Exercice précédent
                    </button>



                    <button
                        onClick={handleNext}
                        disabled={index === questions.length - 1 && !onFinish}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "white",
                            fontSize: "14px",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            transition: "opacity 0.3s",
                            marginLeft: "20px",
                        }}
                    >
                        Exercice suivant
                        <img
                            src={next}
                            alt="next"
                            style={{
                                width: "10px",
                                height: "20px",
                                marginLeft: "8px",
                            }}
                        />
                    </button>
                </div>


                <div className="main-content-area">
                <div
                    className="popup-question-container"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "15px",
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
                        <div className= "popaud" style={{ marginTop: "1%",marginLeft:"36%",marginBottom: "2%" }}>
                            <AudioWithCaption
                                src={currentQuestionData.audio}
                                captions={currentQuestionData.captions || []}
                                pausePoints={pausePoints}
                            />
                        </div>
                    )}


                </div>
                
                {/* الـ content */}
                <div className="question-container">
                    <CurrentQuestion />
                </div>
                </div>
            </div>

        </div>,
        document.body
    );
};

export default Popup;