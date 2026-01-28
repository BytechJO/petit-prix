import React, { useState } from 'react';
import './page3.css';
import AudioPopup from '../../Popup/AudioPopup';
import { Wunit1SecAQuestions } from '../../pageData';
import { unit1SecAQuestions } from '../../pageData';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound = "/assets/workbook/unit1/Lesson1/1.wav";

const WPage3 = ({ bgImage, openPopup }) => {

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
        id="wpage3q1"
        onClick={() => handleOpenQuestion(0)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wU1page3audioq1"
        onClick={() => openAudio(sound, Wunit1SecAQuestions[0].captions)}
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
        id="wpage3q2"
        onClick={() => handleOpenQuestion(1)}
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

export default WPage3;