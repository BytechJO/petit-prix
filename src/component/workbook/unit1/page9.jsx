import React, { useState } from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';
import './page9.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound1 = "/assets/workbook/unit1/page9/1.wav";
const sound2 = "/assets/workbook/unit1/page9/1.wav";

const Page9 = ({ bgImage, openPopup }) => {
  const [audioData, setAudioData] = useState(null);

  const openAudio = (src, captions) => {
    setAudioData({ src, captions });
  };

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
        id="wpage9q1"
        onClick={() => handleOpenQuestion(13)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>
      
      <button
        className='btnopenpopup'
        id="wU1page9audioq1"
        onClick={() => openAudio(sound1, Wunit1SecAQuestions[13].captions)}
      >
        <img
          src={audio}
          className="icon"
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wpage9q2"
        onClick={() => handleOpenQuestion(14)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wU1page9audioq2"
        onClick={() => openAudio(sound2, Wunit1SecAQuestions[14].captions)}
      >
        <img
          src={audio}
          className="icon"
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

export default Page9;