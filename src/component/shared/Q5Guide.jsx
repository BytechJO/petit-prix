import React, { useState, useEffect } from 'react';

const Q5Guide = ({ localStorageKey = 'q5_tutorial_completed' }) => {
  const [step, setStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(localStorageKey);
    if (!completed) {
      setShowTutorial(true);
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [localStorageKey]);

  const steps = [
    {
      icon: "🔍",
      title: "Cherchez les objets cachés",
      content: "Explorez les éléments de la page et trouvez les objets.",
      demo: "icons",
      icons: ["❔", "❔", "❔", "❔"]
    },
    {
      icon: "👆",
      title: "Comment jouer ?",
      content: "Cliquez sur les zones interactives pour découvrir ce qu'elles contiennent.",
      demo: "hint",
      hint: "Certains éléments sont petits, soyez attentifs !"
    },
    {
      icon: "✅",
      title: "Vérifiez votre réponse",
      content: "Après avoir trouvé tous les éléments, cliquez sur le bouton pour continuer.",
      demo: "actions",
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
    setIsVisible(false);
    setTimeout(() => {
      setShowTutorial(false);
      localStorage.setItem(localStorageKey, 'true');
    }, 300);
  };

  if (!showTutorial) return null;

  const currentStep = steps[step];

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/90 backdrop-blur-[1px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeTutorial}
      />

      {/* البطاقة الرئيسية */}
      <div className={`relative w-full max-w-md transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          
          {/* الهيدر */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200 shadow-sm">
                  <span className="text-2xl">{currentStep.icon}</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Guide du jeu interactif</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Étape {step + 1}/{steps.length}</span>
                    <div className="flex gap-1">
                      {steps.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === step ? 'bg-blue-500' : idx < step ? 'bg-blue-300' : 'bg-gray-300'}`}
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* محتوى الخطوة */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{currentStep.title}</h3>
              <p className="text-gray-600 leading-relaxed">{currentStep.content}</p>
            </div>

            {/* منطقة العرض التوضيحي */}
            {currentStep.demo === 'icons' && currentStep.icons && (
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-5 mb-6 border border-blue-100">
                <p className="text-sm text-gray-600 mb-4 text-center">Exemple d'éléments à trouver :</p>
                <div className="flex justify-center gap-4">
                  {currentStep.icons.map((icon, idx) => (
                    <div key={idx} className="text-center animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="w-16 h-16 bg-white rounded-xl border border-gray-300 flex items-center justify-center text-3xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                        {icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep.demo === 'hint' && currentStep.hint && (
              <div className="bg-gradient-to-b from-amber-50 to-white rounded-xl p-5 mb-6 border border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl text-amber-600">💡</span>
                  </div>
                  <div>
                    <p className="font-medium text-amber-800 mb-1">Astuce importante</p>
                    <p className="text-sm text-amber-700">{currentStep.hint}</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep.demo === 'actions' && currentStep.actions && (
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-5 mb-6 border border-gray-200">
                <p className="text-sm text-gray-700 mb-3 font-medium">Fonctionnalités disponibles :</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStep.actions.map((action, idx) => (
                    <div key={idx} className="text-center">
                      <div className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium shadow-sm hover:shadow transition-all cursor-default">
                        {action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* شريط التقدم مع النسبة */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progression</span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(((step + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all duration-500 relative"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex justify-between items-center">
              <div>
                {step > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Précédent
                  </button>
                )}
              </div>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {step === steps.length - 1 ? (
                  <>
                    Commencer
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                ) : (
                  <>
                    Suivant
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* تأثيرات زخرفية */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-blue-400 rounded-full opacity-20" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-2 border-indigo-400 rounded-full opacity-20" />
      </div>
    </div>
  );
};

export default Q5Guide;
