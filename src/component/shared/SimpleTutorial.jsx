// SimpleTutorial.js
import React, { useState, useEffect } from 'react';

const SimpleTutorial = ({ localStorageKey = 'tutorialCompleted' }) => {
  const [step, setStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(localStorageKey);
    if (!completed) {
      setShowTutorial(true);
    }
  }, [localStorageKey]);

  const steps = [
    {
      title: "🔍 Cherchez les objets cachés",
      content: "Explorez les éléments de la page et trouvez les objets.",
      exampleIcons: ["❔", "❔", "❔", "❔"]
    },
    {
      title: "👆 Comment jouer ?",
      content: "Cliquez sur les zones interactives pour découvrir ce qu'elles contiennent.",
      hint: "Certains éléments sont petits, soyez attentifs !"
    },
    {
      title: "✅ Vérifiez votre réponse",
      content: "Après avoir trouvé tous les éléments, cliquez sur le bouton pour continuer.",
      actions: ["Recommencer", "Afficher réponse", "Vérifier"]
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      closeTutorial();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem(localStorageKey, 'true'); // تخزين حالة اكتمال التوتوريال
  };

  if (!showTutorial) return null;

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-[1px]"
        onClick={closeTutorial}
      />

      {/* البطاقة */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        
        {/* الهيدر */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200">
                <span className="text-xl">🎮</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Guide du jeu</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Étape {step + 1}/{steps.length}</span>
                  <div className="flex gap-1">
                    {steps.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${idx === step ? 'bg-blue-500' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={closeTutorial}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* المحتوى */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{currentStep.title}</h3>
            <p className="text-gray-600">{currentStep.content}</p>
          </div>

          {step === 0 && currentStep.exampleIcons && (
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <div className="flex justify-center gap-4">
                {currentStep.exampleIcons.map((icon, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-14 h-14 bg-white rounded-xl border border-gray-300 flex items-center justify-center text-2xl shadow-sm">
                      {icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && currentStep.hint && (
            <div className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-200">
              <div className="flex items-start gap-2">
                <span className="text-amber-600">💡</span>
                <p className="text-sm text-amber-800">{currentStep.hint}</p>
              </div>
            </div>
          )}

          {step === 2 && currentStep.actions && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 mb-3">Boutons disponibles :</p>
              <div className="flex flex-wrap gap-2">
                {currentStep.actions.map((action, idx) => (
                  <div key={idx} className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700">
                    {action}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* شريط التقدم */}
          <div className="mb-6">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex justify-between items-center">
            {step > 0 && (
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                ← Précédent
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {step === steps.length - 1 ? 'Commencer' : 'Suivant →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTutorial;
