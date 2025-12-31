import React, { useState } from 'react';
import './page5.css';
import {
  faArrowPointer, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const sound1 = "/assets/unit1/secA/sounds/L1Q1.mp3";
import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const Page5 = ({ bgImage, openPopup }) => {

  const [showAudio, setShowAudio] = useState(false);

  const caption = [
    {
      start: 0,
      end: 4.23,
      text: "Page 8. Right Activities. Exercise A, number 1. ",
    },
    {
      start: 4.25,
      end: 8.28,
      text: "Listen and write the missing letters. Number the pictures.  ",
    },
    { start: 8.3, end: 11.05, text: "1-tiger." },
    { start: 11.07, end: 13.12, text: "2-taxi." },
    { start: 13.14, end: 15.14, text: "3-duck." },
    { start: 15.16, end: 17.13, text: "4-deer." },
  ];


  const handleOpenQuestion = () => {
    openPopup({
      questionText: unit1SecAQuestions[1].text,
      questions: unit1SecAQuestions,
      currentUnit: 1,
      currentSection: "A",
      startIndex: 1,
      audioSrc: unit1SecAQuestions[1].audio,
      captions: unit1SecAQuestions[1].captions,
      pausePoints: unit1SecAQuestions[1].pausePoints,
    });
  };


  return (
    <div
      className="page_1-background"
    >
      <img src={bgImage} loading="lazy" />
      <button
        className='btnopenpopup'
        id="page5q1"
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
        id="page5audio"
        onClick={() => setShowAudio(true)}
      >
        <img
          src={audio}
          alt="Open question"
          loading="lazy"
        />
      </button>
      <AudioPopup
        open={showAudio}
        onClose={() => setShowAudio(false)}
        src={sound1}
        captions={caption}

      />
    </div >
  )
}
export default Page5;