import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MousePointer, X, ArrowRight, Check, Image as ImageIcon, HelpCircle } from 'lucide-react';

const WordSearchTutorial = ({ isOpen, onClose }) => {
    const [tutorialStep, setTutorialStep] = useState(0);
    const [showDemo, setShowDemo] = useState(false);

    const tutorialSteps = [
        {
            title: "🔍 Jeu de mots cachés",
            description: "Trouvez les mots cachés dans la grille et associez-les aux images.",
            icon: <Search className="w-8 h-8" />,
            color: "from-blue-500 to-cyan-500",
            highlight: "Objectif"
        },
        {
            title: "🖱️ Comment jouer",
            description: "1. Cliquez sur une image\n2. Cliquez sur les lettres dans la grille\n3. Formez le mot correspondant",
            icon: <MousePointer className="w-8 h-8" />,
            color: "from-purple-500 to-pink-500",
            highlight: "Interaction"
        },
        {
            title: "✅ Vérification",
            description: "Après avoir trouvé tous les mots, cliquez sur 'Vérifier la réponse' pour voir votre score.",
            icon: <Check className="w-8 h-8" />,
            color: "from-emerald-500 to-green-500",
            highlight: "Résultat"
        }
    ];

    useEffect(() => {
        if (tutorialStep === 1 && isOpen) {
            const timer = setTimeout(() => {
                setShowDemo(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [tutorialStep, isOpen]);

    useEffect(() => {
        const completed = localStorage.getItem('wordsearch_tutorial_completed');
        if (!completed && isOpen) {
            setTutorialStep(0);
            setShowDemo(false);
        } else {
            onClose(); // لا تفتح الدليل إذا تم الانتهاء مسبقاً
        }
    }, [isOpen]);

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
        localStorage.setItem('wordsearch_tutorial_completed', 'true');
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
                                <div className="whitespace-pre-line text-gray-700">
                                    {currentStep.description.split('\n').map((line, i) => (
                                        <p key={i} className="mb-2 last:mb-0">{line}</p>
                                    ))}
                                </div>
                            </div>

                            {/* محاكاة للخطوة الثانية */}
                            {tutorialStep === 1 && (
                                <div className="mb-4">
                                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-blue-100">
                                        <div className="flex items-center justify-center mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 border-blue-300">
                                                    <span className="font-bold text-blue-700">B</span>
                                                </div>
                                                <div className="text-blue-600 font-bold">→</div>
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center border-2 border-purple-300 animate-pulse">
                                                    <span className="font-bold text-purple-700">A</span>
                                                </div>
                                                <div className="text-blue-600 font-bold">→</div>
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center border-2 border-green-300">
                                                    <span className="font-bold text-green-700">N</span>
                                                </div>
                                            </div>
                                        </div>

                                        {showDemo && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-center"
                                            >
                                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1.5 rounded-lg border border-purple-200">
                                                    <MousePointer className="w-4 h-4 text-purple-600" />
                                                    <span className="text-sm font-medium text-purple-700">
                                                        Cliquez sur les lettres pour former le mot
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* مؤشرات النقاط */}
                            <div className="flex justify-center gap-1.5 mb-4">
                                {tutorialSteps.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setTutorialStep(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === tutorialStep
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
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${tutorialStep === 0
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Précédent
                                </button>

                                <button
                                    onClick={handleNextStep}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${tutorialStep < tutorialSteps.length - 1
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
                                            Comprendre
                                            <Check className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* نص تلميح صغير */}
                            <div className="mt-3 text-center">
                                <p className="text-xs text-gray-500">
                                    Ce tutoriel ne s'affichera qu'une seule fois
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WordSearchTutorial;