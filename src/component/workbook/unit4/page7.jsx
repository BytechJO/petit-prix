import React from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import './page7.css';
const arrow = "/assets/arrow.svg";
const Page7 = ({ bgImage, openPopup }) => {

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
        id="wu4page7q1"
        onClick={() => handleOpenQuestion(46)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wu4page7q2"
        onClick={() => handleOpenQuestion(47)}
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

export default Page7;