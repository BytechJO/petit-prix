import React from 'react';
import './InteractiveHotspotQuestion.css';

const InteractiveHotspotQuestion = ({
  imageSources = [],
  selectedIndices = [],
  correctIndices = [],
  showResult = false,
  onSelect = () => {}
}) => {

  const getStatusClass = (index) => {
    if (!selectedIndices.includes(index)) return '';

    if (!showResult) return 'selected';

    return correctIndices.includes(index)
      ? 'correct'
      : 'wrong';
  };

  return (
    <div className="interactive-question-container">
      <div className="images-container">
        {imageSources.map((src, index) => (
          <div
            key={index}
            className={`image-wrapper ${getStatusClass(index)}`}
            onClick={() => onSelect(index)}
          >
            <img src={src} alt={`img-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveHotspotQuestion;
