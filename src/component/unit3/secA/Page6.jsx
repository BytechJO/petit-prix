import React, { useState } from 'react';
import './page6.css';

const sound1 = "/assets/unit3/secA/page33/1.wav";
const sound2 = "/assets/unit3/secA/page33/2.wav";
const sound3 = "/assets/unit3/secA/page33/3.wav";

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

    const captions = [
        { start: 0.00, end: 2.50, text: "Unité 3, leçon 4." },
        { start: 2.50, end: 4.32, text: "Tu as des animaux ?" },

        { start: 4.32, end: 6.56, text: "Exercice 4." },
        { start: 6.56, end: 9.92, text: "Écoute la chanson, mime et chante." },

        { start: 9.92, end: 12.13, text: "La famille tortue." },
        { start: 12.13, end: 13.98, text: "Jamais on n'a vu," },
        { start: 13.98, end: 16.48, text: "jamais on ne verra." },

        { start: 16.48, end: 19.44, text: "La famille tortue courir après" },
        { start: 19.44, end: 20.58, text: "les rats." },

        { start: 20.58, end: 23.77, text: "Le papa tortue et la maman" },
        { start: 23.77, end: 25.89, text: "tortue et les enfants" },
        { start: 25.89, end: 27.52, text: "tortue iront toujours." },
    ];


    return (
        <div
            className="page_1-background"
        >
            <img src={bgImage} loading="lazy" />

            <button
                className='btnopenpopup'
                id="U3page21q1"
                onClick={() => handleOpenQuestion(39)}
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
                id="U3page21audioq1"
                onClick={() => openAudio(sound1, unit1SecAQuestions[38].captions)}
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
                id="U3page21q2"
                onClick={() => handleOpenQuestion(40)}
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
                id="U3page21audioq2"
                onClick={() => openAudio(sound2, unit1SecAQuestions[39].captions)}
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
                id="U3page21audioq3"
                onClick={() => openAudio(sound3, captions)}
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