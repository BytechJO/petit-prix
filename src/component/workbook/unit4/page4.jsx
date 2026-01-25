import React, { useState } from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';
import './page4.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound1 = "/assets/workbook/unit4/page30/1.wav";
const sound2 = "/assets/workbook/unit4/page30/2.wav";

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
                id="wu4page4q1"
                onClick={() => handleOpenQuestion(56)}
            >
                <img
                    src={arrow}
                    alt="Open question"
                    loading="lazy"
                />
            </button>
            
            <button
                className='btnopenpopup'
                id="wU4page30audioq1"
                onClick={() => openAudio(sound2, Wunit1SecAQuestions[57].captions)}
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
                id="wu4page4q2"
                onClick={() => handleOpenQuestion(57)}
            >
                <img
                    src={arrow}
                    alt="Open question"
                    loading="lazy"
                />
            </button>

            <button
                className='btnopenpopup'
                id="wU4page30audioq2"
                onClick={() => openAudio(sound1, Wunit1SecAQuestions[56].captions)}
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
                id="wu4page4q3"
                onClick={() => handleOpenQuestion(58)}
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