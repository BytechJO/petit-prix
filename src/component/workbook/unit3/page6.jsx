import React from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import './page6.css';
const arrow = "/assets/arrow.svg";
const WPage2 = ({ bgImage, openPopup }) => {

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
        id="wu3page6q1"
        onClick={() => handleOpenQuestion(43)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wu3page6q2"
        onClick={() => handleOpenQuestion(44)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wu3page6q3"
        onClick={() => handleOpenQuestion(45)}
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

export default WPage2;