import React, { useState } from 'react';
import './page9.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sound1 from '../../../../public/assets/unit1/secA/sounds/L1Q1.mp3';

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const Page9 = ({ bgImage, openPopup }) => {

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
      <img src={bgImage} />

      <button
        className='btnopenpopup'
        id="page9audioq1"
        onClick={() => setShowAudio(true)}
      >
        <FontAwesomeIcon icon={faHeadphones} />
      </button>

      <button
        className='btnopenpopup'
        id="page9q2"
        onClick={() => handleOpenQuestion(6)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>


      <button
        className='btnopenpopup'
        id="page9audioq2"
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

export default Page9;