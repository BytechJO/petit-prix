import React, { useState } from 'react';
import './page7.css';

const sound1 = "/assets/unit1/secA/page7/u1l2q1.wav";
const sound2 = "/assets/unit1/secA/page7/u1l2q2.wav";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";


const Page7 = ({ bgImage, openPopup }) => {

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
        id="page7q1"
        onClick={() => handleOpenQuestion(3)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>


      <button
        className='btnopenpopup'
        id="page7audioq1"
        onClick={() => openAudio(sound1, unit1SecAQuestions[3].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="page7audioq2"
        onClick={() => openAudio(sound2, unit1SecAQuestions[4].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="page7q2"
        onClick={() => handleOpenQuestion(4)}
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


    </div>


  )
}

export default Page7;