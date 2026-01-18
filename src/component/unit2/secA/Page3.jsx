import React, { useState } from 'react';
import './page3.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sound1 = "/assets/unit2/secA/page18/1.wav";
const sound2 = "/assets/unit2/secA/page18/2.wav";
const sound3 = "/assets/unit2/secA/page18/4.wav";

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


  const captions1 = [
    { start: 0, end: 0.9, text: "Unité 1." },
    { start: 1.1, end: 2.1, text: "leçon 1." },
    { start: 2.45, end: 4.5, text: "Salut tout le monde !" },
    { start: 4.5, end: 5.5, text: "Exercice 1." },
    { start: 6.2, end: 6.6, text: "Écoute," },
    { start: 7.0, end: 8.0, text: "montre et écris." },
    { start: 9.2, end: 9.4, text: "A." },
    { start: 10.2, end: 11.1, text: "Salut Léo !" },
    { start: 11.9, end: 12.0, text: "Oh," },
    { start: 12.4, end: 13.3, text: "salut Lily !" },
    { start: 14.4, end: 14.9, text: "B." },
    { start: 15.1, end: 16.5, text: "Bonjour les enfants !" },
    { start: 17.0, end: 19.0, text: "Bonjour Madame Dubois !" },

  ];

  const captions2 = [
    { start: 0, end: 2.0, text: "Unité 1, Leçon 1" },
    { start: 2.0, end: 4.0, text: "Salut tout le monde !" },
    { start: 4.0, end: 5.0, text: "Exercice 2" },
    { start: 5.0, end: 9.0, text: "Écoute et lis !" },
    { start: 9.0, end: 11.0, text: "A. Salut Léo !" },
    { start: 11.0, end: 13.0, text: "Oh, salut Lily !" },
    { start: 13.0, end: 16.0, text: "B. Bonjour les enfants ! " },
    { start: 16.0, end: 18.0, text: "Bonjour Madame Dubois !" },
    { start: 18.0, end: 20.0, text: "Bonjour Madame Dubois !" },
  ];
  const captions3 = [
    { start: 0, end: 4.0, text: "Unité 1, Leçon 1. Salut tout le monde !" },
    { start: 4.0, end: 10.0, text: "Exercice 4. Écoute la chanson, mime et chante." },
    { start: 10.0, end: 25.0, text: "Je te dis bonjour, tu me dis bonjour, on se dit bonjour et bonne journée." },
  ];
  return (
    <div
      className="page_1-background"

    >
      <img src={bgImage} loading="lazy" />

      <button
        className='btnopenpopup'
        id="U2page3q1"
        onClick={() => handleOpenQuestion(17)}
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
        id="U2page3audioq1"
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
        id="U2page3q2"
        onClick={() => handleOpenQuestion(18)}
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
        id="U2page3audioq2"
        onClick={() => openAudio(sound2, captions2)}
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
        id="U2page3audioq4"
        onClick={() => openAudio(sound3, captions3)}
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