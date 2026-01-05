import { unit1SecAQuestions } from '../../pageData';
import './page3.css';
const arrow = "/assets/arrow.svg";



const Page3 = ({ bgImage, openPopup }) => {

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

    </div>
  )
}

export default Page3;