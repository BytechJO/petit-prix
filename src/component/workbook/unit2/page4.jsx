import React, { useState } from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

import './page4.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound = "/assets/workbook/unit2/page14/1.wav";

const captions = [
    { start: 0.06, end: 1.09, text: "" },
    { start: 1.09, end: 2.49, text: "" },
    { start: 2.49, end: 4.48, text: "" },
    { start: 4.48, end: 6.98, text: "" },
    { start: 6.98, end: 7.58, text: "" },
    { start: 7.58, end: 8.94, text: "" },
    { start: 8.94, end: 11.38, text: "" },
    { start: 11.38, end: 12.68, text: "" },
    { start: 12.68, end: 13.73, text: "" },
    { start: 13.73, end: 14.94, text: "" },
    { start: 14.94, end: 16.00, text: "" },
];

const WPage4 = ({ bgImage, openPopup }) => {

    const [audioData, setAudioData] = useState(null);

    const openAudio = (src, captions) => {
        setAudioData({ src, captions });
    };

    const handleOpenQuestion = (questionIndex) => {
        const q = Wunit1SecAQuestions[questionIndex];

        openPopup({
            questionText: q.text,
            questions: Wunit1SecAQuestions,
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
                id="wU1page14audioq1"
                onClick={() => openAudio(sound, captions)}
            >
                <img
                    src={audio}
                    className="icon"
                    alt="Open question"
                    loading="lazy"
                />
            </button>

            <button
                className='btnopenpopup'
                id="wu2page4q1"
                onClick={() => handleOpenQuestion(21)}
            >
                <img
                    src={arrow}
                    alt="Open question"
                    loading="lazy"
                />
            </button>

            <button
                className='btnopenpopup'
                id="wu2page4q2"
                onClick={() => handleOpenQuestion(22)}
            >
                <img
                    src={arrow}
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

export default WPage4;