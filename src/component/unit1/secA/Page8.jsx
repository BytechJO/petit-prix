import React, { useState } from 'react';
import './page8.css';
import {
    faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sound1 = "/assets/unit1/secA/page8/L3Q1.mp3";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page8 = ({ bgImage, openPopup }) => {

    const [audioData, setAudioData] = useState(null);

    const openAudio = (src, captions) => {
        setAudioData({ src, captions });
    };

    const handleOpenQuestion = (questionId) => {
        const q = unit1SecAQuestions.find(item => item.id === questionId);
        console.log("pausePoints:" + q.pausePoints)
        openPopup({
            questionText: q.text,
            questions: unit1SecAQuestions,
            currentUnit: 1,
            currentSection: "A",
            startIndex: questionId,
            audioSrc: q.audio,
            captions: q.captions,
            pausePoints: q.pausePoints || []
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
                onClick={() => openAudio(sound1, unit1SecAQuestions[5].captions)}
            >
                <img
                    src={audio}
                    className="icon"
                    alt="Open question"
                    loading="lazy"
                />
            </button>


            {audioData && (
                <AudioPopup
                    open={true}
                    onClose={() => setAudioData(null)}
                    src={audioData.src}
                    captions={audioData.captions}
                />
            )}

        </div>


    )
}

export default Page8;