import React, { useState } from 'react';
import './Q12.css';

const Q12 = () => {
  const img1 = '/assets/workbook/unit2/page11/1.svg';

  const [inputs, setInputs] = useState({
    input1: '', // Top pink - Grand-père
    input2: '', // Top teal - Frère
    input3: '', // Middle pink (Moi)
    input4: '', // Right teal - Grand-mère
    input5: '', // Bottom pink - Mère
    input6: '', // Bottom teal (23) - Père
  });

  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [inputStatus, setInputStatus] = useState({});

  const answers = {
    input1: 'grand-père',
    input2: 'frère',
    input3: 'moi',
    input4: 'grand-mère',
    input5: 'mère',
    input6: 'père'
  };

  const handleInputChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setInputStatus(prev => ({ ...prev, [key]: '' }));
  };

  const checkAnswers = () => {
    let allCorrect = true;
    const newStatus = {};

    Object.keys(answers).forEach(key => {
      const userAnswer = inputs[key].trim().toLowerCase();
      const correctAnswer = answers[key].toLowerCase();
      
      if (userAnswer === correctAnswer) {
        newStatus[key] = 'correct';
      } else {
        newStatus[key] = 'incorrect';
        allCorrect = false;
      }
    });

    setInputStatus(newStatus);
    
    if (allCorrect) {
      setFeedback({
        show: true,
        type: 'success',
        message: '🎉 ممتاز! جميع الإجابات صحيحة!'
      });
    } else {
      setFeedback({
        show: true,
        type: 'error',
        message: '❌ بعض الإجابات غير صحيحة. حاول مرة أخرى!'
      });
    }
  };

  const resetAll = () => {
    setInputs({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: ''
    });
    setInputStatus({});
    setFeedback({ show: false, type: '', message: '' });
  };

  return (
    <div className="q2-container">

      <div className="q2-content">
        <div className="family-photo-wrapper">
          {/* Input 1 - Top Left Pink */}
          <div className="label-box pink top-left">
            <input
              type="text"
              className={`label-input ${inputStatus.input1 || ''}`}
              value={inputs.input1}
              onChange={(e) => handleInputChange('input1', e.target.value)}
              placeholder="........................"
            />
          </div>

          {/* Input 2 - Top Right Teal */}
          <div className="label-box teal top-right">
            <input
              type="text"
              className={`label-input ${inputStatus.input2 || ''}`}
              value={inputs.input2}
              onChange={(e) => handleInputChange('input2', e.target.value)}
              placeholder="........................"
            />
          </div>

          {/* Input 3 - Middle Left Pink (Moi - pre-filled) */}
          <div className="label-box pink middle-left static">
            <span className="static-text">Moi</span>
          </div>

          {/* Input 4 - Middle Right Teal */}
          <div className="label-box teal middle-right">
            <span className="static-text">Grand-mère</span>
          </div>

          {/* Input 5 - Bottom Left Pink */}
          <div className="label-box pink bottom-left">
            <input
              type="text"
              className={`label-input ${inputStatus.input5 || ''}`}
              value={inputs.input5}
              onChange={(e) => handleInputChange('input5', e.target.value)}
              placeholder="........................"
            />
          </div>

          {/* Input 6 - Bottom Right Teal with number */}
          <div className="label-box teal bottom-right with-number">
            <input
              type="text"
              className={`label-input ${inputStatus.input6 || ''}`}
              value={inputs.input6}
              onChange={(e) => handleInputChange('input6', e.target.value)}
              placeholder="........................"
            />
            <div className="number-badge">23</div>
          </div>

          {/* Family Photo */}
          <div className="family-photo">
            <img 
              src={img1} 
              alt="Family" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="family-emoji">👴👵👨👩👦👧</div>';
              }}
            />
          </div>
        </div>

        <div className="controls">
          <button className="btn btn-check" onClick={checkAnswers}>
            ✓ تحقق من الإجابات
          </button>
          <button className="btn btn-reset" onClick={resetAll}>
            ↺ إعادة تعيين
          </button>
        </div>

        {feedback.show && (
          <div className={`feedback ${feedback.type}`}>
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Q12;