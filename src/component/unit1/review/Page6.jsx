
import { unit1SecAQuestions } from '../../pageData';
import './page6.css';
const arrow = "/assets/arrow.svg";

const Page6 = ({ bgImage, openPopup }) => {


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
        id="u1rpage6q1"
        onClick={() => handleOpenQuestion(13)}
      >
        <img
          src={arrow}
          alt="Open question"
          loading="lazy"
        />
      </button>

      <button
        className='btnopenpopup'
        id="u1rpage6q2"
        onClick={() => handleOpenQuestion(14)}
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

export default Page6;