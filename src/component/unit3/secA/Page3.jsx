import React, { useState } from 'react';
import './page3.css';

const sound1 = "/assets/unit3/secA/page30/1.wav";
const sound2 = "/assets/unit3/secA/page30/2.wav";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page3 = ({ bgImage, openPopup }) => {

  const [audioData, setAudioData] = useState(null);

  const openAudio = (src, captions) => {
    setAudioData({ src, captions });
  };


  const handleOpenQuestion = (index) => {
    openPopup({
      questionText: unit1SecAQuestions[index].text,
      questions: unit1SecAQuestions,
      currentUnit: 1,
      currentSection: "A",
      startIndex: index,
      audioSrc: unit1SecAQuestions[index].audio,
      captions: unit1SecAQuestions[index].captions,
    });
  };


  const captions = [
    { start: 0, end: 1.2, text: "Unité 3," },
    { start: 1.2, end: 2.3, text: "leçon 1," },
    { start: 2.3, end: 4.8, text: "où habites-tu ?" },
    { start: 4.8, end: 5.8, text: "Exercice 1." },
    { start: 6.5, end: 8.0, text: "Écoute et montre." },
    { start: 8.5, end: 11.0, text: "A. J'habite à la campagne." },
    { start: 11.0, end: 13.6, text: "B. J'habite à la montagne." },
    { start: 13.6, end: 16.5, text: "C. J'habite en ville." },
    { start: 17.0, end: 20.0, text: "D. J'habite à la mer." },
  ];

  
  return (
    <div
      className="page_1-background"

    >
      <img src={bgImage} loading="lazy" />


      <button
        className='btnopenpopup'
        id="U3page3audioq1"
        onClick={() => openAudio(sound1, captions)}
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
        id="U3page3q2"
        onClick={() => handleOpenQuestion(35)}
      >
        <img
          src={arrow}
          className="icon"
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="U3page3audioq2"
        onClick={() => openAudio(sound2, unit1SecAQuestions[34].captions)}
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

export default Page3;