import React, { useState } from 'react';
import './page5.css';


const sound1 = "/assets/unit4/secA/page44/1.wav";
const sound2 = "/assets/unit4/secA/page44/2.wav";
const sound3 = "/assets/unit4/secA/page44/3.wav";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page5 = ({ bgImage, openPopup }) => {

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
                id="U4page20q1"
                onClick={() => handleOpenQuestion(54)}
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
                id="U4page20audioq1"
                onClick={() => openAudio(sound1, unit1SecAQuestions[21].captions)}
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
                id="U4page20q2"
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
                id="U4page20audioq2"
                onClick={() => openAudio(sound2, unit1SecAQuestions[22].captions)}
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
                id="U4page20audioq4"
                onClick={() => openAudio(sound3, unit1SecAQuestions[22].captions)}
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

export default Page5;