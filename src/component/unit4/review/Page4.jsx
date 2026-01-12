
import { unit1SecAQuestions } from '../../pageData';
import React, { useState } from 'react';

import './page4.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page4 = ({ bgImage, openPopup }) => {


  const [audioData, setAudioData] = useState(null);

  const openAudio = (src, captions) => {
    setAudioData({ src, captions });
  };

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
      <img src={bgImage} loading="lazy" />


      <button
        className='btnopenpopup'
        id="R4page4"
        onClick={() => handleOpenQuestion(30)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="R4page4audio"
        onClick={() => openAudio(sound2, unit1SecAQuestions[30].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="R4page4q2"
        onClick={() => handleOpenQuestion(31)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="R4page4audioq2"
        onClick={() => openAudio(sound2, unit1SecAQuestions[31].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>



      {audioData && (
        <AudioPopup
          open={true}
          onClose={() => setAudioData(null)}
          src={audioData.src}
          captions={audioData.captions}
        />
      )}

    </div >
  )
}

export default Page4;