import React, { useState } from 'react';
import './wpage3.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wunit1SecAQuestions } from '../../pageData';

const arrow = "/assets/arrow.svg";

const WPage3 = ({ bgImage, openPopup }) => {

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
        id="wpage3q1"
        onClick={() => handleOpenQuestion(0)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wpage3q2"
        onClick={() => handleOpenQuestion(1)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>


    </div>


  )
}

export default WPage3;