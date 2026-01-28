import React, { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const img1 = '/assets/workbook/unit4/page30/01.svg';
const img2 = '/assets/workbook/unit4/page30/02.svg';
const img3 = '/assets/workbook/unit4/page30/03.svg';
const img4 = '/assets/workbook/unit4/page30/04.svg';

const Q8 = () => {
  const images = [
    { id: 'img1', src: img1 },
    { id: 'img2', src: img2 },
    { id: 'img3', src: img3 },
    { id: 'img4', src: img4 },
  ];

  // الإجابات الصحيحة: true لـ "صح" و false لـ "خطأ"
  const correctAnswers = {
    img1: 'true',
    img2: 'false',
    img3: 'false',
    img4: 'true',
  };

  // الحالة الافتراضية، 'none' تعني أنه لم يتم الاختيار بعد
  const getInitialState = () => ({
    img1: 'none',
    img2: 'none',
    img3: 'none',
    img4: 'none',
  });

  const [selected, setSelected] = useState(getInitialState());

  const handleSelectChange = (id, value) => {
    setSelected(prev => ({ ...prev, [id]: value }));
  };

  const handleTryAgain = () => {
    setSelected(getInitialState());
  };

  const handleShowAnswer = () => {
    setSelected(correctAnswers);
  };

  const checkAnswers = () => {
    // تحقق مما إذا كان المستخدم قد أجاب على جميع الأسئلة
    const allAnswered = Object.values(selected).every(val => val !== 'none');
    if (!allAnswered) {
      ValidationAlert.warning("Attention!", "Veuillez répondre à toutes les questions avant de vérifier.");
      return;
    }

    // تحقق من عدد الإجابات الصحيحة
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (selected[key] === correctAnswers[key]) {
        correctCount++;
      }
    });

    // هنا نفترض أن هناك إجابتين صحيحتين فقط مطلوبتين للنجاح
    // يمكنك تغيير هذا المنطق حسب الحاجة
    const totalCorrectNeeded = 2; 
    let score = 0;
    if(selected['img1'] === correctAnswers['img1']) score++;
    if(selected['img4'] === correctAnswers['img4']) score++;


    if (score === totalCorrectNeeded && correctCount === Object.keys(correctAnswers).length) {
      ValidationAlert.success(`${totalCorrectNeeded}/${totalCorrectNeeded}`);
    } else {
      ValidationAlert.error(`${score}/${totalCorrectNeeded}`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto lg:ml-95">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map(img => (
          <div key={img.id} className="flex flex-col items-center gap-2">
            <img src={img.src} alt={img.id} className="max-w-60 max-h-80 object-contain" />
            <select
              value={selected[img.id]}
              onChange={(e) => handleSelectChange(img.id, e.target.value)}
              className="border-2 rounded-md p-2 cursor-pointer"
              style={{ width: '100px', textAlign: 'center' }}
            >
              <option value="none" disabled>select</option>
              <option value="true">✔️</option>
              <option value="false">❌</option>
            </select>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="popup-buttons shrink-0">
        <button className="try-again-button" onClick={handleTryAgain}>
          Recommencer
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Vérifier la réponse
        </button>
      </div>
    </div>
  );
};

export default Q8;
