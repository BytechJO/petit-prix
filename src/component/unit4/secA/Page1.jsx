
import './page1.css';

import { unit1SecAQuestions } from '../../pageData';

const arrow = "/assets/arrow.svg";

const Page1 = ({ bgImage, openPopup }) => {


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
        id="u4page1q1"
        onClick={() => handleOpenQuestion(48)}
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