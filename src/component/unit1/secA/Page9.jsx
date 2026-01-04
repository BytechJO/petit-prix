import React, { useState } from 'react';
import './page9.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sound1 = "/assets/unit1/secA/page9/u1l4q1.wav";
const sound2 = "/assets/unit1/secA/page9/u1l4q2.wav";

import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page9 = ({ bgImage, openPopup }) => {

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

  const captions1 = [
    { start: 0, end: 4.0, text: "Unité un, leçon quatre.De quelle couleur c'est ?" },
    { start: 4.0, end: 6.0, text: "Exercice un." },
    { start: 6.0, end: 9.0, text: "Écoute et trouve un objet dans la classe." },
    { start: 9.5, end: 12.0, text: "A- bleu" },
    { start: 12.5, end: 14.0, text: "B- vert" },
    { start: 14.0, end: 16.0, text: "C- jaune" },
    { start: 16.0, end: 18.0, text: "D- rouge," },
    { start: 18.0, end: 20.0, text: "E- blanc" },
    { start: 20.5, end: 22.5, text: "F- noir." },
  ];
    
  return (
    <div
      className="page_1-background"

    >
      <img src={bgImage} loading="lazy" />

      {/* <button
        className='btnopenpopup'
        id="page9q1"
        onClick={() => handleOpenQuestion(7)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button> */}

      <button
        className='btnopenpopup'
        id="page9audioq1"
        onClick={() => openAudio(sound1, captions1)}
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
        id="page9q2"
        onClick={() => handleOpenQuestion(6)}
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
        id="page9audioq2"
        onClick={() => openAudio(sound2, unit1SecAQuestions[6].captions)}
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