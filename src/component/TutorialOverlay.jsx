import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, X, ArrowLeft, ArrowRight, Check } from 'lucide-react';

const TutorialOverlay = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);

    // عرض الدليل عند فتح الصفحة (مرة واحدة)
    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('swipe_tutorial_seen');
        if (!hasSeenTutorial) {
            // تأخير بسيط لظهور الدليل
            const timer = setTimeout(() => {
                setShowTutorial(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleTutorialComplete = () => {
        setShowTutorial(false);
        localStorage.setItem('swipe_tutorial_seen', 'true');
    };

    const handleNextStep = () => {
        if (tutorialStep < tutorialSteps.length - 1) {
            setTutorialStep(prev => prev + 1);
        } else {
            handleTutorialComplete();
        }
    };

    const handlePreviousStep = () => {
        if (tutorialStep > 0) {
            setTutorialStep(prev => prev - 1);
        }
    };

    const tutorialSteps = [
        {
            title: "Comment jouer ?",
            description: "Faites glisser les cartes vers la gauche ou la droite pour choisir votre réponse.",
            icon: <Hand className="w-8 h-8" />,
            position: "center",
            arrowDirection: null,
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: "Glisser vers la gauche",
            description: "Glissez la carte vers la gauche pour choisir l'option de gauche.",
            icon: <ArrowLeft className="w-8 h-8" />,
            position: "left",
            arrowDirection: "left",
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Glisser vers la droite",
            description: "Glissez la carte vers la droite pour choisir l'option de droite.",
            icon: <ArrowRight className="w-8 h-8" />,
            position: "right",
            arrowDirection: "right",
            color: "from-green-500 to-emerald-600"
        },
        {
            title: "Prêt à jouer !",
            description: "Sélectionnez la bonne couleur pour chaque image. Bonne chance !",
            icon: <Check className="w-8 h-8" />,
            position: "center",
            arrowDirection: null,
            color: "from-emerald-500 to-green-500"
        }
    ];

    if (!showTutorial) return null;

    return (
        <AnimatePresence>
            {showTutorial && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl border border-blue-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* زر الإغلاق */}
                        <button
                            onClick={handleTutorialComplete}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 cursor-pointer"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* رأس الدليل */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${tutorialSteps[tutorialStep].color} text-white shadow-lg`}>
                                {tutorialSteps[tutorialStep].icon}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                    {tutorialSteps[tutorialStep].title}
                                </h2>
                                <p className="text-gray-600 text-sm md:text-base">
                                    {tutorialSteps[tutorialStep].description}
                                </p>
                            </div>
                        </div>

                        {/* تمثيل مرئي للبطاقة */}
                        <div className="relative flex justify-center items-center my-8">
                            {/* البطاقة الوهمية */}
                            <motion.div
                                animate={
                                    tutorialSteps[tutorialStep].arrowDirection === 'left'
                                        ? { x: [0, -40, 0] }
                                        : tutorialSteps[tutorialStep].arrowDirection === 'right'
                                        ? { x: [0, 40, 0] }
                                        : { scale: [1, 1.05, 1] }
                                }
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut"
                                }}
                                className="w-48 h-64 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-xl border-4 border-white relative overflow-hidden"
                            >
                                {/* تأثير داخل البطاقة */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 opacity-30" />
                                </div>
                                
                                {/* أيقونة اليد في المنتصف */}
                                {tutorialSteps[tutorialStep].position === 'center' && (
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.5
                                        }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Hand className="w-12 h-12 text-blue-500" />
                                    </motion.div>
                                )}

                                {/* أسهم التوجيه */}
                                {tutorialSteps[tutorialStep].arrowDirection === 'left' && (
                                    <motion.div
                                        animate={{
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2"
                                    >
                                        <ArrowLeft className="w-10 h-10 text-blue-600" />
                                    </motion.div>
                                )}

                                {tutorialSteps[tutorialStep].arrowDirection === 'right' && (
                                    <motion.div
                                        animate={{
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        <ArrowRight className="w-10 h-10 text-green-600" />
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* نص التوجيه */}
                            {tutorialSteps[tutorialStep].arrowDirection === 'left' && (
                                <motion.div
                                    animate={{
                                        x: [0, -10, 0],
                                    }}
                                    className="absolute -left-24 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200 shadow-md"
                                >
                                    <p className="text-sm font-semibold text-blue-700 whitespace-nowrap">
                                        Glisser ici
                                    </p>
                                </motion.div>
                            )}

                            {tutorialSteps[tutorialStep].arrowDirection === 'right' && (
                                <motion.div
                                    animate={{
                                        x: [0, 10, 0],
                                    }}
                                    className="absolute -right-24 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-200 shadow-md"
                                >
                                    <p className="text-sm font-semibold text-green-700 whitespace-nowrap">
                                        Glisser ici
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* نقاط التقدم */}
                        <div className="flex justify-center gap-2 mb-6">
                            {tutorialSteps.map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: index === tutorialStep ? 1.2 : 1 }}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === tutorialStep 
                                            ? 'w-6 bg-gradient-to-r from-blue-500 to-indigo-500' 
                                            : 'w-2 bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* أزرار التنقل */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={handlePreviousStep}
                                disabled={tutorialStep === 0}
                                className={`px-5 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                                    tutorialStep === 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:bg-blue-50 hover:shadow-sm'
                                }`}
                            >
                                Précédent
                            </button>

                            <div className="text-sm text-gray-500">
                                {tutorialStep + 1} / {tutorialSteps.length}
                            </div>

                            <button
                                onClick={handleNextStep}
                                className={`px-6 py-2 rounded-xl font-medium transition-all shadow-md cursor-pointer ${
                                    tutorialStep < tutorialSteps.length - 1
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                                        : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600'
                                }`}
                            >
                                {tutorialStep < tutorialSteps.length - 1 ? 'Suivant' : 'Commencer'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TutorialOverlay;