import { useRef } from "react";
import "./Q3.css";

const backgroundImage = "/assets/unit2/secA/page18/Q1.svg";

const sentences = [
  "livre",
  "…",
  "gomme",
  "bagage",
  "Crayons de couleur"
];

const inputsData = [
  { placeholder: "livre", top: "78%", left: "32%" },
  { placeholder: "stylo", top: "28%", left: "52%" },
  { placeholder: "gomme", top: "37%", left: "29%" },
  { placeholder: "bagage", top: "27%", left: "12%" },
  { placeholder: "Crayons de couleur", top: "65%", left: "35%" },
];



const Q3 = () => {
  const inputRefs = useRef([]);

  const handleInput = (index) => {
    const input = inputRefs.current[index];
    if (input) {
      input.style.width = "1ch";
      input.style.width = `${input.scrollWidth}px`;
    }
  };

  return (
    <div
      className="U2Q1image-U2Q1container"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="U2Q1inputs-U2Q1wrapper">
        {inputsData.map((item, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            placeholder={item.placeholder}
            className="U2Q1stretch-U2Q1input"
            style={{
              top: item.top,
              left: item.left
            }}
            onInput={() => handleInput(index)}
            dir="rtl"
          />
        ))}
      </div>

    </div>
  );
};

export default Q3;
