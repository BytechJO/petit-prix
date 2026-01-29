import React, { useState } from 'react';
import './page5.css';
import {
    faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sound1 = "/assets/unit3/secA/page32/1.wav";
const sound2 = "/assets/unit3/secA/page32/2.wav";
const sound3 = "/assets/unit3/secA/page32/3.wav";

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

    const captions = [
        { start: 0.03, end: 1.25, text: "Unité 3." },
        { start: 1.25, end: 2.61, text: "Leçon 3." },
        { start: 2.61, end: 4.71, text: "Tu habites seul ?" },
        { start: 4.71, end: 6.49, text: "Exercice 1." },
        { start: 6.49, end: 8.73, text: "Écoute et répète." },
        { start: 8.73, end: 9.91, text: "Père," },
        { start: 9.91, end: 11.13, text: "mère," },
        { start: 11.13, end: 12.48, text: "grand-père," },
        { start: 12.48, end: 13.89, text: "grand-mère," },
        { start: 13.89, end: 14.33, text: "moi," },
    ];

    return (
        <div
            className="page_1-background"
        >
            <img src={bgImage} loading="lazy" />



            <button
                className='btnopenpopup'
                id="U3page20audioq1"
                onClick={() => openAudio(sound1, captions)}
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
                id="U3page20q2"
                onClick={() => handleOpenQuestion(37)}
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
                id="U3page20audioq2"
                onClick={() => openAudio(sound2, unit1SecAQuestions[36].captions)}
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
                id="U3page20q3"
                onClick={() => handleOpenQuestion(38)}
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
                id="U3page20audioq3"
                onClick={() => openAudio(sound3, unit1SecAQuestions[37].captions)}
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