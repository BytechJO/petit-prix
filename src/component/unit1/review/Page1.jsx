
import './Page1.css';

import { unit1SecAQuestions } from '../../pageData';

const arrow = "/assets/arrow.svg";

const Page1 = ({ bgImage, openPopup }) => {

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



  return (
    <div
      className="page_1-background"
    >
      <img src={bgImage} loading="lazy" />

      <button
        className='btnopenpopup'
        id="u1rpage1q1"
        onClick={() => handleOpenQuestion(15)}
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

export default Page1;