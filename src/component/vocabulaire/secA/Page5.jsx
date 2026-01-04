
import { unit1SecAQuestions } from '../../pageData';

const arrow = "/assets/arrow.svg";

const Page4 = ({ bgImage, openPopup }) => {


  const handleOpenQuestion = () => {
    openPopup({
      questionText: unit1SecAQuestions[0].text,
      questions: unit1SecAQuestions,
      currentUnit: 1,
      currentSection: "A",
      startIndex: 0,
      audioSrc: unit1SecAQuestions[0].audio,
      captions: unit1SecAQuestions[0].captions,
    });
  };



  return (
    <div
      className="page_1-background"
    >
      <img src={bgImage} loading="lazy" />

    </div >
  )
}

export default Page4;