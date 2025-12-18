import React, { useState } from 'react';
import './wpage4.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wunit1SecAQuestions } from '../../pageData';

const WPage4 = ({ bgImage, openPopup }) => {

  const [showAudio, setShowAudio] = useState(false);

  const handleOpenQuestion = () => {
    openPopup({
      questionText: Wunit1SecAQuestions[1].text,
      questions: Wunit1SecAQuestions,
      currentUnit: 1,
      currentSection: "A",
      startIndex: 2,
      audioSrc: Wunit1SecAQuestions[1].audio,
      captions: Wunit1SecAQuestions[1].captions,
    });
  };

  return (
    <div
      className="page_1-background"

    >
      <img src={bgImage} />

      <button
        className='btnopenpopup'
        id="wpage4q1"
        onClick={() => handleOpenQuestion(0)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>

      <button
        className='btnopenpopup'
        id="wpage4q2"
        onClick={() => handleOpenQuestion(0)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>


    </div>


  )
}

export default WPage4;