import React, { useState } from 'react';
import { Wunit1SecAQuestions } from '../../pageData';
import { unit1SecAQuestions } from '../../pageData';
import AudioPopup from '../../Popup/AudioPopup';

import './page7.css';
const arrow = "/assets/arrow.svg";
const audio = "/assets/audio.svg";

const sound1 = "/assets/workbook/unit1/page7/1.wav";
const sound2 = "/assets/workbook/unit1/page7/2.wav";

const captions = [
  { start: 0.06, end: 1.09, text: "" },
  { start: 1.09, end: 2.49, text: "" },
  { start: 2.49, end: 4.48, text: "" },
  { start: 4.48, end: 6.98, text: "" },

  { start: 6.98, end: 7.58, text: "" },
  { start: 7.58, end: 8.94, text: "" },
  { start: 8.94, end: 11.38, text: "" },

  { start: 11.38, end: 12.68, text: "" },
  { start: 12.68, end: 13.73, text: "" },
  { start: 13.73, end: 14.94, text: "" },

  { start: 14.94, end: 16.00, text: "" },
];

const Page7 = ({ bgImage, openPopup }) => {

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

  const captions = [
      { start: 0.13, end: 1.31, text: "Unité 1." },
      { start: 1.31, end: 2.53, text: "Bonjour." },
      { start: 2.53, end: 3.93, text: "Leçon 3." },
      { start: 3.93, end: 5.71, text: "Comment ça va ?" },
      { start: 5.71, end: 7.68, text: "Exercice 1." },
      { start: 7.68, end: 10.03, text: "Écoute et répète." },
      { start: 10.03, end: 10.63, text: "A." },
      { start: 10.63, end: 11.90, text: "Comment ça va ?" },
      { start: 11.90, end: 14.71, text: "Ça va mal." },
      { start: 14.71, end: 15.45, text: "B." },
      { start: 15.45, end: 16.81, text: "Comment ça va ?" },
      { start: 16.81, end: 18.20, text: "Ça va bien." },
    ];

  return (
    <div
      className="page_1-background"

    >
      <img src={bgImage} loading="lazy" />

      <button
        className='btnopenpopup'
        id="wU1page7audioq1"
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
        id="wpage7q1"
        onClick={() => handleOpenQuestion(9)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="wU1page7audioq2"
        onClick={() => openAudio(sound2, Wunit1SecAQuestions[9].captions)}
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

export default Page7;