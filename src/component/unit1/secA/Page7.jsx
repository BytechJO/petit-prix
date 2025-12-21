import React, { useState } from 'react';
import './page7.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sound1 = "/assets/unit1/secA/sounds/L1Q1.mp3";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const Page7 = ({ bgImage, openPopup }) => {

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
        id="page7q1"
        onClick={() => handleOpenQuestion(3)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>


      <button
        className='btnopenpopup'
        id="page7audioq1"
        onClick={() => setShowAudio(true)}
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </button>

      <button
        className='btnopenpopup'
        id="page7audioq2"
        onClick={() => setShowAudio(true)}
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </button>

      <button
        className='btnopenpopup'
        id="page7q2"
        onClick={() => handleOpenQuestion(4)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>


      <AudioPopup
        open={showAudio}
        onClose={() => setShowAudio(false)}
        src={sound1}
      />


    </div>


  )
}

export default Page7;