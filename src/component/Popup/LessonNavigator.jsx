import { useState } from "react";
import Swal from "sweetalert2";
import "./LessonNavigator.css";
import next from "../../../public/assets/next btn.svg";
import back from "../../../public/assets/back btn.svg";

export default function LessonNavigator({
    questions = [],
    currentUnit = 1,
    currentSection = "A",
    onFinish = null
})
 {
    const [index, setIndex] = useState(0);
    const CurrentQuestion = questions[index]?.component || (() => <div>No question available</div>);
    const currentQuestionData = questions[index] || {};

    const handleNext = () => {
        const question = questions[index];

        // آخر سؤال في القسم
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

    return (
        <div className="w-full">
            
            <div
                className="nav-buttons"
                style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: "30px",
                    gap: "20px",
                    justifyContent: "space-between",
                    backgroundColor: "#430f68",
                    padding: "10px 20px",
                    borderRadius: "8px",
                }}
            >
                
                {/* Previous Button */}
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
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 90 90"
                        style={{
                            padding: "10px",
                        }}
                        className="nav-btn w-10 h-10 rounded-full transition"
                    >
                        <image href={back} x="0" y="0" width="90" height="90" />
                    </svg>
                    Previous Exercise
                </button>

                {/* Progress Indicator */}
                <div style={{
                    color: "white",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <span>Question {index + 1} of {questions.length}</span>
                    <div style={{
                        width: "100px",
                        height: "6px",
                        backgroundColor: "rgba(255,255,255,0.3)",
                        borderRadius: "3px",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            width: `${((index + 1) / questions.length) * 100}%`,
                            height: "100%",
                            backgroundColor: "white",
                            transition: "width 0.3s ease"
                        }} />
                    </div>
                </div>

                {/* Next Button */}
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
                    }}
                >
                    Next Exercise
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 90 90"
                        style={{
                            padding: "10px",
                        }}
                        className="nav-btn w-10 h-10 rounded-full transition"
                    >
                        <image href={next} x="0" y="0" width="90" height="90" />
                    </svg>
                </button>
            </div>

            <div className="question-container">
                <CurrentQuestion />
            </div>
        </div>
    );
}