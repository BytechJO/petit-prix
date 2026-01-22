import React, { useState } from 'react';
import './page4.css';

const sound1 = "/assets/unit3/secA/page31/1.wav";
const sound2 = "/assets/unit3/secA/page31/2.wav";

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

  const captions = [
    { start: 0.00, end: 1.15, text: "Unité 3," },
    { start: 1.15, end: 2.49, text: "leçon 2." },
    { start: 2.49, end: 4.90, text: "As-tu des frères ou des sœurs ?" },
    { start: 4.90, end: 6.75, text: "Exercice 1." },
    { start: 6.75, end: 8.78, text: "Écoute et lis." },
    { start: 8.78, end: 13.09, text: "A. Une sœur, un frère." },
    { start: 13.09, end: 15.56, text: "B. Des frères." },
    { start: 15.56, end: 16.82, text: "C. Des sœurs." },
  ];


  return (
    <div
      className="page_1-background"

    >
      <img src={bgImage} loading="lazy" />


      <button
        className='btnopenpopup'
        id="U3page4audioq1"
        onClick={() => openAudio(sound1, captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="U3page4audioq2"
        onClick={() => openAudio(sound2, unit1SecAQuestions[35].captions)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="U3page4q2"
        onClick={() => handleOpenQuestion(35)}
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