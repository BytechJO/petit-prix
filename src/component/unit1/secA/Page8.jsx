import React, { useState } from 'react';
import './page8.css';
import {
    faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sound1 ="/assets/unit1/secA/sounds/L1Q1.mp3";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';
import Character from './Character';

const winkStaticsvg = "/assets/unit1/secA/page8/1.svg";
const winkAnimatedsvg = "/assets/unit1/secA/page8/2.svg";
const happyStaticsvg = "/assets/unit1/secA/page8/3.svg";
const happyAnimatedsvg = "/assets/unit1/secA/page8/4.svg";

const winkStatic = "/assets/unit1/secA/page8/1.gif";
const winkAnimated = "/assets/unit1/secA/page8/2.gif";
const happyStatic = "/assets/unit1/secA/page8/3.gif";
const happyAnimated = "/assets/unit1/secA/page8/4.gif";


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
            <img src={bgImage} loading="lazy"/>

            <button
                className='btnopenpopup'
                id="page8q1"
                onClick={() => handleOpenQuestion(5)}
            >
                <FontAwesomeIcon icon={faArrowPointer} />
            </button>


            <button
                className='btnopenpopup'
                id="page8audioq1"
                onClick={() => setShowAudio(true)}
            >
                <FontAwesomeIcon icon={faHeadphones} />
            </button>


            <AudioPopup
                open={showAudio}
                onClose={() => setShowAudio(false)}
                src={sound1}
            />

            <div className="characters-wrapper">
                <Character
                    staticImg={winkStaticsvg}
                    animatedImg={winkStatic}
                    altText="Winking boy"
                />

                <Character
                    staticImg={happyStaticsvg}
                    animatedImg={happyStatic}
                    altText="Happy boy"
                />

                <Character
                    staticImg={winkAnimatedsvg}
                    animatedImg={winkAnimated}
                    altText="Happy boy"
                />

                <Character
                    staticImg={happyAnimatedsvg}
                    animatedImg={happyAnimated}
                    altText="Happy boy"
                />
            </div>
        </div>


    )
}

export default Page8;