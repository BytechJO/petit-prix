import React, { useState } from 'react';
import './page6.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sound1 from '../../../../public/assets/unit1/secA/sounds/L1Q1.mp3';

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const Page6 = ({ bgImage, openPopup }) => {

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
        id="page6q1"
        onClick={() => handleOpenQuestion(0)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>


      <button
        className='btnopenpopup'
        id="page6audioq1"
        onClick={() => setShowAudio(true)}
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </button>

      <button
        className='btnopenpopup'
        id="page6audioq2"
        onClick={() => setShowAudio(true)}
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </button>

      <button
        className='btnopenpopup'
        id="page6audioq4"
        onClick={() => setShowAudio(true)}
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </button>


      <AudioPopup
        open={showAudio}
        onClose={() => setShowAudio(false)}
        src={sound1}
      />


    </div>


  )
}

export default Page6;