import React, { useState } from 'react';
import './page8.css';
import {
    faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sound1 = "/assets/unit1/secA/sounds/L1Q1.mp3";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page8 = ({ bgImage, openPopup }) => {

    const [showAudio, setShowAudio] = useState(false);

    const handleOpenQuestion = (questionIndex) => {
        const q = unit1SecAQuestions[questionIndex];

        openPopup({
            questionText: q.text,
            questions: unit1SecAQuestions,
            currentUnit: 1,
            currentSection: "A",
            startIndex: questionIndex,
            audioSrc: q.audio,
            captions: q.captions,
        });
    };

    return (
        <div
            className="page_1-background"

        >
            <img src={bgImage} loading="lazy" />

            <button
                className='btnopenpopup'
                id="page8q1"
                onClick={() => handleOpenQuestion(5)}
            >
                <img
                    src={arrow}
                    className="icon"
                    alt="Open question"
                    loading="lazy"
                />
            </button>


            <button
                className='btnopenpopup'
                id="page8audioq1"
                onClick={() => setShowAudio(true)}
            >
                <img
                    src={audio}
                    className="icon"
                    alt="Open question"
                    loading="lazy"
                />
            </button>


            <AudioPopup
                open={showAudio}
                onClose={() => setShowAudio(false)}
                src={sound1}
            />
        </div>


    )
}

export default Page8;