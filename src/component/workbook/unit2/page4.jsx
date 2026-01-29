import React, { useState } from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

import './page4.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound = "/assets/workbook/unit2/page14/1.wav";

const captions = [
    { start: 0.03, end: 1.15, text: "Unité 2," },
    { start: 1.15, end: 2.46, text: "L'école." },
    { start: 2.46, end: 3.90, text: "Leçon 2," },
    { start: 3.90, end: 6.47, text: "C'est quel jour aujourd'hui ?" },
    { start: 6.47, end: 8.93, text: "Exercice 3." },
    { start: 8.93, end: 9.63, text: "Écoute," },
    { start: 9.63, end: 13.11, text: "choisis et dis la phrase." },
    { start: 13.11, end: 14.21, text: "C'est jeudi," },
    { start: 14.21, end: 15.75, text: "j'ai un cartable rouge," },
    { start: 15.75, end: 17.65, text: "je suis avec Pierre." },
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
                id="wu2page4q1"
                onClick={() => handleOpenQuestion(22)}
            >
                <img
                    src={arrow}
                    alt="Open question"
                    loading="lazy"
                />
            </button>

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
                id="wu2page4q2"
                onClick={() => handleOpenQuestion(24)}
            >
                <img
                    src={arrow}
                    alt="Open question"
                    loading="lazy"
                />
            </button>

            <button
                className='btnopenpopup'
                id="wu2page4q3"
                onClick={() => handleOpenQuestion(23)}
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