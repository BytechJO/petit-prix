import React from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import './page5.css';
const arrow = "/assets/arrow.svg";
const Page5 = ({ bgImage, openPopup }) => {

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
      <img src={bgImage} loading="lazy" />

      <button
        className='btnopenpopup'
        id="wu3page5q1"
        onClick={() => handleOpenQuestion(41)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wu3page5q2"
        onClick={() => handleOpenQuestion(42)}
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

export default Page5;