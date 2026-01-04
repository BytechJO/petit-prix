import React, { useState, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const imgs1 = "/assets/unit1/secA/page9/dem1.svg";
const imgs2 = "/assets/unit1/secA/page9/dem2.svg";
const imgs3 = "/assets/unit1/secA/page9/dem3.svg";
const imgs4 = "/assets/unit1/secA/page9/dem4.svg";

const Q12 = () => {
  const items = [
    { id: 1, name: 'vélo', correctColor: 'vert', audioText: 'J\'ai un vélo vert.', imagePlaceholder: imgs1 },
    { id: 2, name: 'tracteur', correctColor: 'jaune', audioText: 'J\'ai un tracteur jaune.', imagePlaceholder: imgs2 },
    { id: 3, name: 'voiture', correctColor: 'rouge', audioText: 'J\'ai une voiture rouge.', imagePlaceholder: imgs3 },
    { id: 4, name: 'robot', correctColor: 'bleu', audioText: 'J\'ai un robot bleu.', imagePlaceholder: imgs4 },
  ];

  // الألوان المتاحة للتصحيح
  const colors = [
    { name: 'vert', hex: 'bg-green-500', label: 'Vert' },
    { name: 'jaune', hex: 'bg-yellow-400', label: 'Jaune' },
    { name: 'rouge', hex: 'bg-red-500', label: 'Rouge' },
    { name: 'bleu', hex: 'bg-blue-500', label: 'Bleu' },
  ];

  // حالة اللعبة: سنبدأ بألوان خاطئة ليقوم المستخدم بتصحيحها
  const [userSelections, setUserSelections] = useState({
    1: 'rouge', // خطأ (يجب أن يكون أخضر)
    2: 'bleu',  // خطأ (يجب أن يكون أصفر)
    3: 'vert',  // خطأ (يجب أن يكون أحمر)
    4: 'jaune', // خطأ (يجب أن يكون أزرق)
  });

  const [feedback, setFeedback] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleColorChange = (itemId, colorName) => {
    setUserSelections(prev => ({ ...prev, [itemId]: colorName }));
    // مسح التغذية الراجعة عند التغيير
    setFeedback(prev => ({ ...prev, [itemId]: null }));
  };

  // 👁️ إظهار الإجابة
  const handleShowAnswer = () => {
    setSelectedIndices(CORRECT_INDICES);
    setShowAnswer(true);
    setShowResult(true);
  };

  // 🔄 إعادة المحاولة
  const handleStartAgain = () => {
    setUserSelections({
      1: 'rouge',
      2: 'bleu',
      3: 'vert',
      4: 'jaune',
    });
    setFeedback({});
  };


  const handleCheck = () => {
    const newFeedback = {};
    let allCorrect = true;

    items.forEach(item => {
      if (userSelections[item.id] === item.correctColor) {
        newFeedback[item.id] = 'correct';
      } else {
        newFeedback[item.id] = 'incorrect';
        allCorrect = false;
      }
    });

    setFeedback(newFeedback);

    if (allCorrect) {
      ValidationAlert.success("Bravo!", "Toutes les réponses sont correctes");
    } else {
      ValidationAlert.error("Oops!", "Certaines réponses sont incorrectes");
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto p-6  rounded-3xl font-sans" dir="ltr">

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative p-6 rounded-2xl bg-white border-2 transition-all ${feedback[item.id] === 'correct' ? 'border-green-400 bg-green-50' :
              feedback[item.id] === 'incorrect' ? 'border-red-400 bg-red-50' : 'border-slate-100 shadow-md'
              }`}
          >
            <div className="flex items-center gap-6">
              {/* Image/Icon Placeholder */}
              <div className={`text-6xl p-2 rounded-xl bg-slate-100 flex items-center justify-center w-24 h-24 transition-colors ${userSelections[item.id] === 'vert' ? 'text-green-500' :
                userSelections[item.id] === 'jaune' ? 'text-yellow-500' :
                  userSelections[item.id] === 'rouge' ? 'text-red-500' :
                    userSelections[item.id] === 'bleu' ? 'text-blue-500' : 'text-slate-400'
                }`}>
                  <img
                    src={item.imagePlaceholder}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                

              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 capitalize mb-3">Le {item.name}</h3>

                {/* Color Selection */}
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(item.id, color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${color.hex} ${userSelections[item.id] === color.name ? 'border-slate-900 scale-125 shadow-md' : 'border-transparent opacity-60'
                        }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Feedback Icon */}
              <div className="absolute top-4 right-4">
                {feedback[item.id] === 'correct' && <CheckCircle2 className="text-green-500" size={28} />}
                {feedback[item.id] === 'incorrect' && <XCircle className="text-red-500" size={28} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="popup-buttons">
        <button className="try-again-button" onClick={handleStartAgain}>
          Recommencer ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Afficher la réponse
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Vérifier la réponse ✓
        </button>
      </div>

      {/* Success Message */}
      {Object.values(feedback).every(v => v === 'correct') && Object.keys(feedback).length > 0 && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-xl text-center font-bold animate-bounce">
          Bravo ! Tu as corrigé toutes les erreurs ! 🎉
        </div>
      )}
    </div>
  );
};

export default Q12;