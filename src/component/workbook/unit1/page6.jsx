import React, { useState } from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';
import './page6.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound = "/assets/workbook/unit1/page6/1.wav";

const WPage2 = ({ bgImage, openPopup }) => {

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
        id="wpage6q1"
        onClick={() => handleOpenQuestion(6)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wU1page6audioq1"
        onClick={() => openAudio(sound, Wunit1SecAQuestions[6].captions)}
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
        id="wpage6q2"
        onClick={() => handleOpenQuestion(7)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wpage6q3"
        onClick={() => handleOpenQuestion(8)}
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

export default WPage2;