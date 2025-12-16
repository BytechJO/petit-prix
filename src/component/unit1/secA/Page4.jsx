import React from 'react'
import Q1 from './Exercise/Q1';
import './page4.css';
import {
    faArrowPointer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Page4 = ({ bgImage, openPopup }) => {

  const questions = [
    { id: 1, component: Q1, audio: null, text: "Question 1" },
  ];
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


  const handleOpenQuestion = (startIndex) => {
    openPopup({
      questionText: `Observe et trouve`,
      questions: questions,
      currentUnit: 1,
      currentSection: "A",
      startIndex: startIndex,
      audioSrc: null,
      captions: caption,
    });
  };



  return (
    <div
      className="page_1-background"
    >
      <img src={bgImage} />

      <button
        id="u1saq1btn"
        onClick={() => handleOpenQuestion(0)}
      >
        <FontAwesomeIcon icon={faArrowPointer} />
      </button>

    </div >
  )
}

export default Page4;