import React, { useState } from 'react';
import './wpage3.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { unit1SecAQuestions } from '../../pageData';

const WPage3 = ({ bgImage, openPopup }) => {

  const [showAudio, setShowAudio] = useState(false);

  const handleOpenQuestion = () => {
    openPopup({
      questionText: unit1SecAQuestions[1].text,
      questions: unit1SecAQuestions,
      currentUnit: 1,
      currentSection: "A",
      startIndex: 2,
      audioSrc: unit1SecAQuestions[1].audio,
      captions: unit1SecAQuestions[1].captions,
    });
  };

  return (
    <div
      className="page_1-background"

    >
      <img src={bgImage} />

      <button
        className='btnopenpopup'
        id="wpage3q1"
        onClick={() => handleOpenQuestion(0)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>

      <button
        className='btnopenpopup'
        id="wpage3q2"
        onClick={() => handleOpenQuestion(0)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>


    </div>


  )
}

export default WPage3;