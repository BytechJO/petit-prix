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

const captions = [
  { start: 0, end: 1.7, text: "Unité 2," },
  { start: 1.7, end: 3.0, text: "Leçon 1, qu'est-ce que c'est ?" },
  { start: 3.0, end: 5.5, text: "Exercice 4" },
  { start: 5.5, end: 7.0, text: "Écoute la chanson, mime et chante." },
  { start: 7.0, end: 9.5, text: "L'école Je suis grand, je vais à l'école sans ma maman." },
  { start: 9.5, end: 11.7, text: "Mais qu'est-ce qu'on rigole ? Je prends mon cartable, je prends ma gomme," },
  { start: 11.7, end: 14.0, text: "je prends ma trousse et mes crayons de couleur. Maman," },
  { start: 14.0, end: 17.0, text: "je n'ai rien oublié ! Ton livre !" }
];

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
        onClick={() => openAudio(sound1, unit1SecAQuestions[17].captions)}
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
        onClick={() => openAudio(sound2, unit1SecAQuestions[18].captions)}
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
        onClick={() => openAudio(sound3, captions)}
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