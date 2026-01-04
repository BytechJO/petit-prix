
import { unit1SecAQuestions } from '../../pageData';
import './page5.css';
const arrow = "/assets/arrow.svg";

const Page5 = ({ bgImage, openPopup }) => {


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
        id="u1rpage5q1"
        onClick={() => handleOpenQuestion(19)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="u1rpage5q2"
        onClick={() => handleOpenQuestion(20)}
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

export default Page5;