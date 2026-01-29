
import { unit1SecAQuestions } from '../../pageData';
import React, { useState } from 'react';
import AudioPopup from '../../Popup/AudioPopup';

import './page1.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound1 = "/assets/unit4/review/page48/1.wav";

const Page1 = ({ bgImage, openPopup }) => {


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
        id="R4page1audio"
        onClick={() => openAudio(sound1, unit1SecAQuestions[26].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="R4page1"
        onClick={() => handleOpenQuestion(59)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="R4page1Q2"
        onClick={() => handleOpenQuestion(60)}
      >
        <img
          src={arrow}
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

export default Page1;