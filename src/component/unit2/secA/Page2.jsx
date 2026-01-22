import React, { useState } from 'react';
import './page2.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page2 = ({ bgImage, openPopup }) => {

  const [showAudio, setShowAudio] = useState(false);

   const caption = [
      { start: 0, end: 1.3, text: "Unité 1." },
      { start: 1.3, end: 1.8, text: "Bonjour." },
      { start: 3.0, end: 4.5, text: "Exercice 2." },
      { start: 5.0, end: 6.5, text: "Écoute et montre." },
      { start: 7.3, end: 7.8, text: "A." },
      { start: 8.3, end: 9.1, text: "Salut Robert." },
      { start: 9.8, end: 10.7, text: "Salut Théo." },
      { start: 10.7, end: 10.8, text: "B." },
      { start: 13.3, end: 14.1, text: "Qu'est-ce que c'est ?" },
      { start: 14.7, end: 15.8, text: "C'est un crayon pour toi." },
      { start: 16.0, end: 16.4, text: "C." },
      { start: 18.4, end: 20.1, text: "Qu'est-ce que c'est ?" },
      { start: 20.3, end: 20.9, text: "C'est une fleur." },

    ];


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
        id="U2page2q1"
        onClick={() => handleOpenQuestion(16)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

    </div >
  )
}
export default Page2;