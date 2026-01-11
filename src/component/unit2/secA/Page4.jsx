import React, { useState } from 'react';
import './page4.css';

const sound1 = "/assets/unit1/secA/page7/u1l2q1.wav";
const sound2 = "/assets/unit1/secA/page7/u1l2q2.wav";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

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
        id="U2page4q1"
        onClick={() => handleOpenQuestion(19)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>


      <button
        className='btnopenpopup'
        id="U2page4audioq1"
        onClick={() => openAudio(sound1, unit1SecAQuestions[19].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="U2page4audioq2"
        onClick={() => openAudio(sound2, unit1SecAQuestions[20].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="U2page4q2"
        onClick={() => handleOpenQuestion(20)}
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

export default Page4;