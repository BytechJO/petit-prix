import React, { useState } from 'react';
import './page6.css';

const sound1 = "/assets/unit4/secA/page45/1.wav";
const sound2 = "/assets/unit4/secA/page45/2.wav";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page6 = ({ bgImage, openPopup }) => {

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
                id="U4page21q1"
                onClick={() => handleOpenQuestion(55)}
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
                id="U4page21audioq1"
                onClick={() => openAudio(sound1, unit1SecAQuestions[23].captions)}
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
                id="U4page21q2"
                onClick={() => handleOpenQuestion(56)}
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
                id="U4page21audioq2"
                onClick={() => openAudio(sound2, unit1SecAQuestions[24].captions)}
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

export default Page6;