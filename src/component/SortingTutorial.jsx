import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  GripVertical, 
  X, 
  ArrowRight, 
  Check, 
  RefreshCw,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SortingTutorial = ({ isOpen, onClose }) => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isDraggingDemo, setIsDraggingDemo] = useState(false);

  const tutorialSteps = [
    {
      title: "📝 Dialogue à réorganiser",
      description: "Remettez les phrases dans le bon ordre pour reconstituer le dialogue.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      highlight: "Objectif"
    },
    {
      title: "🖱️ Comment déplacer les phrases",
      description: "Cliquez sur ☰ et glissez la phrase vers le haut ou le bas pour changer sa position.",
      icon: <GripVertical className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      highlight: "Interaction"
    },
    {
      title: "✅ Comment vérifier",
      description: "Après avoir organisé toutes les phrases, cliquez sur 'Vérifier la réponse' pour voir votre score.",
      icon: <Check className="w-8 h-8" />,
      color: "from-emerald-500 to-green-500",
      highlight: "Vérification"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setTutorialStep(0);
      setIsDraggingDemo(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (tutorialStep === 1 && isOpen) {
      // محاكاة السحب بعد تأخير قصير
      setTimeout(() => {
        setIsDraggingDemo(true);
      }, 800);
    }
  }, [tutorialStep, isOpen]);

  const handleNextStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePreviousStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem('dialogue_sorting_tutorial_completed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  const currentStep = tutorialSteps[tutorialStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4"
        >
          {/* خلفية */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* بطاقة الدليل */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-md bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* الهيدر */}
            <div className={`bg-gradient-to-r ${currentStep.color} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {currentStep.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {currentStep.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs text-white font-medium">
                        {currentStep.highlight}
                      </span>
                      <span className="text-white/80 text-sm">
                        Étape {tutorialStep + 1}/{tutorialSteps.length}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* المحتوى */}
            <div className="p-4">
              {/* الوصف */}
              <div className="mb-4">
                <p className="text-gray-700">
                  {currentStep.description}
                </p>
              </div>

              {/* محاكاة للخطوة الثانية */}
              {tutorialStep === 1 && (
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="space-y-2">
                      {/* عنصر ثابت */}
                      <div className="p-3 rounded-lg border border-gray-200 bg-white flex items-center gap-3">
                        <div className="text-gray-500">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <span className="text-gray-800">Phrase fixe</span>
                      </div>
                      
                      {/* عنصر يتم سحبه */}
                      <motion.div
                        animate={
                          isDraggingDemo
                            ? {
                                y: [0, -50, 0],
                                boxShadow: ["0 2px 4px rgba(0,0,0,0.1)", "0 8px 16px rgba(0,0,0,0.15)", "0 2px 4px rgba(0,0,0,0.1)"],
                                backgroundColor: ["#f3f4f6", "#e0f2fe", "#f3f4f6"],
                              }
                            : {}
                        }
                        transition={
                          isDraggingDemo
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            : {}
                        }
                        className="p-3 rounded-lg border border-blue-300 bg-blue-50 flex items-center gap-3 cursor-grab"
                      >
                        <div className="text-blue-600">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <span className="text-blue-800 font-medium">Cliquez et glissez-moi</span>
                        {isDraggingDemo && (
                          <div className="ml-auto flex flex-col items-center text-blue-600">
                            <ChevronUp className="w-4 h-4" />
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        )}
                      </motion.div>

                      {/* عنصر ثابت آخر */}
                      <div className="p-3 rounded-lg border border-gray-200 bg-white flex items-center gap-3">
                        <div className="text-gray-500">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <span className="text-gray-800">Autre phrase fixe</span>
                      </div>
                    </div>

                    {isDraggingDemo && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-center"
                      >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1.5 rounded-lg border border-blue-200">
                          <GripVertical className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">
                            Glissez la phrase pour changer sa position
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* صورة للخطوة الأولى */}
              {tutorialStep === 0 && (
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-center mb-2">
                      <div className="text-4xl">🗣️</div>
                      <ArrowRight className="w-6 h-6 text-gray-400 mx-2" />
                      <div className="text-4xl">👤</div>
                    </div>
                    <p className="text-center text-sm text-gray-600">
                      Reconstituer la conversation entre deux personnes
                    </p>
                  </div>
                </div>
              )}

              {/* مثال للخطوة الثالثة */}
              {tutorialStep === 2 && (
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-800">Exemple de résultat</h4>
                        <p className="text-sm text-emerald-600">Score : 3/5</p>
                      </div>
                    </div>
                    <div className="text-sm text-emerald-700">
                      • Cliquez sur "Vérifier" pour voir votre score<br />
                      • Utilisez "Réessayer" pour recommencer<br />
                      • Utilisez "Afficher la réponse" si besoin d'aide
                    </div>
                  </div>
                </div>
              )}

              {/* مؤشرات النقاط */}
              <div className="flex justify-center gap-1.5 mb-4">
                {tutorialSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTutorialStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === tutorialStep 
                        ? `bg-gradient-to-r ${currentStep.color} w-6` 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* الأزرار */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousStep}
                  disabled={tutorialStep === 0}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    tutorialStep === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Précédent
                </button>

                <button
                  onClick={handleNextStep}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    tutorialStep < tutorialSteps.length - 1
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600'
                  }`}
                >
                  {tutorialStep < tutorialSteps.length - 1 ? (
                    <>
                      Suivant
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Commencer
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* نص تلميح صغير */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Conseil : La conversation doit avoir un sens logique
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SortingTutorial;