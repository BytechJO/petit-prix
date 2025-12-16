import React, { useState } from 'react';
import Q2 from './Exercise/Q2';
import './page5.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sound1 from '../../../assets/unit1/secA/sounds/L1Q1.mp3';

import { unit1SecAQuestions } from '../../pageData';

const Page6 = ({ bgImage, openPopup }) => {

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
      <img src={bgImage}/>

      <button
        id="u1saq2btn"
        onClick={() => handleOpenQuestion(0)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>


    </div>

    
  )
}

export default Page6;