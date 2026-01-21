import React, { useState } from 'react';
import { unit1SecAQuestions } from '../../pageData';
import './page3.css';
import AudioPopup from '../../Popup/AudioPopup';

const arrow = "/assets/arrow.svg";

const Page3 = ({ bgImage, openPopup }) => {

  const [audioData, setAudioData] = useState(null);

  const openAudio = (src, captions) => {
    setAudioData({ src, captions });
  };

  const audio = "/assets/audio.svg";
  const sound1 = "/assets/unit1/secA/page12/1.wav";

  const handleOpenQuestion = (questionIndex) => {
    const q = unit1SecAQuestions[questionIndex];

    console.log(openPopup);
    console.log(unit1SecAQuestions.length);


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
    { start: 0, end: 0.9, text: "Unité un." },
    { start: 1.1, end: 3.0, text: "C'est ma peinture préférée !" },
    { start: 3.5, end: 5.0, text: "Exercice trois." },
    { start: 5.5, end: 8.0, text: "Écoute et répète." },
    { start: 8.5, end: 15.0, text: "C'est le monument et le symbole de la France. Le nom de ce monument est la tour Eiffel.," },
    { start: 15.0, end: 19.0, text: "La tour Eiffel a été construite par Gustave Eiffel." },
  ];
  return (
    <div
      className="page_1-background"
    >
      <img src={bgImage} loading="lazy" />

      <button
        className='btnopenpopup'
        id="u1rpage3q1"
        onClick={() => handleOpenQuestion(8)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="u1rpage3q2"
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
        id="page12audioq3"
        onClick={() => openAudio(sound1, captions1)}
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