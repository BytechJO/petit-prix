
import { unit1SecAQuestions } from '../../pageData';
import React, { useState } from 'react';
import './page7.css';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page7 = ({ bgImage, openPopup }) => {


  const [audioData, setAudioData] = useState(null);

  const openAudio = (src, captions) => {
    setAudioData({ src, captions });
  };

  console.log()

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
        id="U2page7"
        onClick={() => handleOpenQuestion(41)}
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

export default Page7;