import React, { useState } from 'react';
import './wpage4.css';
import {
    faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wunit1SecAQuestions } from '../../pageData';

const WPage4 = ({ bgImage, openPopup }) => {

    const [showAudio, setShowAudio] = useState(false);

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
            <img src={bgImage} loading="lazy"/>

            <button
                className='btnopenpopup'
                id="wpage4q1"
                onClick={() => handleOpenQuestion(2)}
            >
                <FontAwesomeIcon icon={faArrowPointer} />
            </button>

            <button
                className='btnopenpopup'
                id="wpage4q2"
                onClick={() => handleOpenQuestion(3)}
            >
                <FontAwesomeIcon icon={faArrowPointer} />
            </button>


        </div>


    )
}

export default WPage4;