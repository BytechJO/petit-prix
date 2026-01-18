import React, { useState } from 'react';
import './Q12.css';
import ValidationAlert from '../../../Popup/ValidationAlert';

const Q12 = () => {
  const img1 = '/assets/workbook/unit3/page23/1.svg';

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
    input5: 'père',
    input3: 'mère',
    input7: 'Sœur',
    input6: 'frère'
  };

  const handleInputChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setInputStatus(prev => ({ ...prev, [key]: '' }));
  };

  const checkAnswers = () => {
    const keys = Object.keys(answers);

    // تحقق من وجود حقول فاضية
    const hasEmpty = keys.some(
      key => !inputs[key] || inputs[key].trim() === ''
    );

    if (hasEmpty) {
      ValidationAlert.warning();
      return;
    }

    let correctCount = 0;
    const newStatus = {};

    keys.forEach(key => {
      const userAnswer = inputs[key].trim().toLowerCase();
      const correctAnswer = answers[key].toLowerCase();

      if (userAnswer === correctAnswer) {
        newStatus[key] = 'correct';
        correctCount++;
      } else {
        newStatus[key] = 'incorrect';
      }
    });

    setInputStatus(newStatus);

    const total = keys.length;

    if (correctCount === total) {
      ValidationAlert.success(`${correctCount}/${total}`);
    } else {
      ValidationAlert.error(`${correctCount}/${total}`);
    }
  };




  const resetAll = () => {
    setInputs({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: ''
    });
    setInputStatus({});
    setFeedback({ show: false, type: '', message: '' });
  };

  const handleShowAnswer = () => {
    // تعبئة جميع الحقول بالإجابات الصحيحة
    setInputs({
      input1: answers.input1,
      input2: answers.input2,
      input3: answers.input3,
      input4: answers.input4,
      input5: answers.input5,
      input6: answers.input6,
      input7: answers.input7, // إذا ما عنده إجابة ثابتة، خليه فاضي
    });

    // اعتبرها صحيحة بصريًا
    const status = {};
    Object.keys(answers).forEach(key => {
      status[key] = 'correct';
    });
    setInputStatus(status);

    // رسالة اختيارية
    setFeedback({
      show: true,
      type: 'success',
      message: '✔️ هذه هي الإجابات الصحيحة'
    });
  };


  return (
    <>
      <div className="q2-container">

        <div className="q2-content">
          <div className="family-photo-wrapper">
            {/* Input 1 - Top Left Pink */}
            {/* Example of small expandable input */}
            <div className="label-box pink top-13 left-[-20%]">
              <input
                type="text"
                className={`label-input ${inputStatus.input1 || ''}`}
                value={inputs.input1}
                onChange={(e) => handleInputChange('input1', e.target.value)}
                placeholder="..."
                style={{
                  width: '200px',         // البداية صغيرة جدًا
                  minWidth: '50px',
                  maxWidth: '200px',      // أقصى حجم يتمدد له
                  transition: 'width 0.3s',
                }}
                onInput={(e) => {
                  e.target.style.width = `${Math.min(Math.max(e.target.value.length * 8, 50), 200)}px`;
                }}
              />
            </div>


            {/* Input 2 - Top Right Teal */}
            {/* Example of small expandable input */}
            <div className="label-box pink middle-left w-20 h-10">
              <span className="static-text">Moi</span>
            </div>


            {/* Input 3 - Middle Left Pink (Moi - pre-filled) */}
            {/* Example of small expandable input */}
            <div className="label-box pink top-75 left-[-15%]">
              <input
                type="text"
                className={`label-input ${inputStatus.input3 || ''}`}
                value={inputs.input3}
                onChange={(e) => handleInputChange('input3', e.target.value)}
                placeholder="..."
                style={{
                  width: '150px',         // البداية صغيرة جدًا
                  minWidth: '50px',
                  maxWidth: '200px',      // أقصى حجم يتمدد له
                  transition: 'width 0.3s',
                }}
                onInput={(e) => {
                  e.target.style.width = `${Math.min(Math.max(e.target.value.length * 8, 50), 200)}px`;
                }}
              />
            </div>


            {/* Input 4 - Middle Right Teal */}
            <div className="label-box teal middle-right w-40">
              <span className="static-text">Grand-mère</span>
            </div>

            {/* Input 5 - Bottom Left Pink */}
            {/* Example of small expandable input */}

            <div className="label-box teal top-[5%] left-103">

              <input
                type="text"
                className={`label-input ${inputStatus.input5 || ''}`}
                value={inputs.input5}
                onChange={(e) => handleInputChange('input5', e.target.value)}
                placeholder="..."
                style={{
                  width: '100px',         // البداية صغيرة جدًا
                  minWidth: '50px',
                  maxWidth: '200px',      // أقصى حجم يتمدد له
                  transition: 'width 0.3s',
                }}
                onInput={(e) => {
                  e.target.style.width = `${Math.min(Math.max(e.target.value.length * 8, 50), 200)}px`;
                }}
              />
            </div>


            {/* Input 6 - Bottom Right Teal with number */}
            {/* Example of small expandable input */}
            <div className="label-box teal top-88 left-122">
              <input
                type="text"
                className={`label-input ${inputStatus.input6 || ''}`}
                value={inputs.input6}
                onChange={(e) => handleInputChange('input6', e.target.value)}
                placeholder="..."
                style={{
                  width: '50px',         // البداية صغيرة جدًا
                  minWidth: '50px',
                  maxWidth: '200px',      // أقصى حجم يتمدد له
                  transition: 'width 0.3s',
                }}
                onInput={(e) => {
                  e.target.style.width = `${Math.min(Math.max(e.target.value.length * 8, 50), 200)}px`;
                }}
              />
            </div>

            {/* Input 7 - Bottom Right Teal with number */}
            {/* Example of small expandable input */}
            <div className="label-box teal top-50 left-118">
              <input
                type="text"
                className={`label-input ${inputStatus.input7 || ''}`}
                value={inputs.input7}
                onChange={(e) => handleInputChange('input7', e.target.value)}
                placeholder="..."
                style={{
                  width: '100px',         // البداية صغيرة جدًا
                  minWidth: '50px',
                  maxWidth: '200px',      // أقصى حجم يتمدد له
                  transition: 'width 0.3s',
                }}
                onInput={(e) => {
                  e.target.style.width = `${Math.min(Math.max(e.target.value.length * 8, 50), 200)}px`;
                }}
              />
            </div>


            {/* Family Photo */}
            <div className="family-photo">
              <img
                src={img1}
                alt="Family"
                onError={(e) => {
                  e.target.style.display = 'none';
                  // e.target.parentElement.innerHTML = '<div class="family-emoji">👴👵👨👩👦👧</div>';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="popup-buttons shrink-0">
        <button className="try-again-button" onClick={resetAll}>
          Recommencer ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Vérifier la réponse ✓
        </button>
      </div>
    </>
  );
};

export default Q12;