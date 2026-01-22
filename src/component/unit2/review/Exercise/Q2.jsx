import { useState } from 'react';
import ValidationAlert from '../../../Popup/ValidationAlert';

const flipsound = "/assets/alert/drop.mp3";

const Q2 = () => {
    const animalimg = Array.from({ length: 11 }, (_, i) =>
        `/assets/unit2/review/page24/animal/${i + 1}.svg`
    );
    const otherimg = Array.from({ length: 11 }, (_, i) =>
        `/assets/unit2/review/page24/else/${i + 1}.svg`
    );
    const fruitsimg = Array.from({ length: 2 }, (_, i) =>
        `/assets/unit2/review/page24/fruits/${i + 1}.svg`
    );
    const vegetablesimg = ['/assets/unit2/review/page24/vegetables/1.svg'];

    const allImages = [
        ...animalimg.map((img, i) => ({ id: `animal-${i}`, src: img, category: 'animaux' })),
        ...otherimg.map((img, i) => ({ id: `other-${i}`, src: img, category: 'else' })),
        ...fruitsimg.map((img, i) => ({ id: `fruit-${i}`, src: img, category: 'fruits' })),
        ...vegetablesimg.map((img, i) => ({ id: `veg-${i}`, src: img, category: 'légumes' }))
    ];

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const [images, setImages] = useState(shuffleArray(allImages));
    const [categories, setCategories] = useState({
        animaux: [],
        légumes: [],
        fruits: [],
        else: []
    });
    const [draggedItem, setDraggedItem] = useState(null);
    const [feedback, setFeedback] = useState({});

    const handleDragStart = (e, image, from) => {
        setDraggedItem({ image, from });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetCategory) => {
        e.preventDefault();
        if (!draggedItem) return;

        const { image, from } = draggedItem;

        if (from === 'source') {
            setImages(prev => prev.filter(img => img.id !== image.id));
        } else {
            setCategories(prev => ({
                ...prev,
                [from]: prev[from].filter(img => img.id !== image.id)
            }));
        }

        setCategories(prev => ({
            ...prev,
            [targetCategory]: [...prev[targetCategory], image]
        }));

        const audio = new Audio(flipsound);
        audio.play();

        const isCorrect = image.category === targetCategory;
        setFeedback(prev => ({
            ...prev,
            [image.id]: isCorrect ? 'correct' : 'incorrect'
        }));

        setDraggedItem(null);
    };

    const CategoryBox = ({ title, categoryKey, letter }) => (
        <div
            className="border-2 border-dashed border-blue-400 rounded-lg p-3 bg-blue-50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, categoryKey)}
        >
            <h3 className="font-bold text-blue-700 mb-2 text-sm ">
                {letter} {title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {categories[categoryKey].map((img) => (
                    <div
                        key={img.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, img, categoryKey)}
                        className={`cursor-move transition-all rounded ${feedback[img.id] === 'correct'
                            ? 'ring-2 ring-green-500'
                            : feedback[img.id] === 'incorrect'
                                ? 'ring-2 ring-red-500'
                                : ''
                            }`}
                    >
                        <img
                            src={img.src}
                            alt=""
                            className="max-h-12 max-w-12 object-contain bg-white rounded p-1"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    const handleTryAgain = () => {
        setImages(shuffleArray(allImages)); // إعادة خلط الصور
        setCategories({
            animaux: [],
            légumes: [],
            fruits: [],
            else: []
        });
        setFeedback({});
    };

    const handleShowAnswer = () => {
        const newCategories = {
            animaux: allImages.filter(img => img.category === 'animaux'),
            légumes: allImages.filter(img => img.category === 'légumes'),
            fruits: allImages.filter(img => img.category === 'fruits'),
            else: allImages.filter(img => img.category === 'else')
        };

        setCategories(newCategories);
        setImages([]); // إزالة الصور من الصندوق الأصلي

        // تحديث الفيدباك لكل صورة
        const newFeedback = {};
        allImages.forEach(img => {
            newFeedback[img.id] = 'correct';
        });
        setFeedback(newFeedback);
    };

    const checkAnswers = () => {
        // التحقق أولاً إذا كانت كل الصور تم وضعها
        const totalImages = allImages.length;
        const placedCount = Object.values(categories).reduce(
            (acc, arr) => acc + arr.length,
            0
        );

        if (placedCount < totalImages) {
            ValidationAlert.warning(
                "Attention!",
                "Veuillez placer toutes les images dans les catégories."
            );
            return;
        }

        // التحقق من صحة كل صورة
        const newFeedback = {};
        let correctCount = 0;

        Object.entries(categories).forEach(([key, imgs]) => {
            imgs.forEach(img => {
                const isCorrect = img.category === key;
                newFeedback[img.id] = isCorrect ? 'correct' : 'incorrect';
                if (isCorrect) correctCount++;
            });
        });

        setFeedback(newFeedback);

        // عرض النتيجة
        if (correctCount === totalImages) {
            ValidationAlert.success(`${correctCount} / ${totalImages}`);
        } else {
            ValidationAlert.error(`${correctCount} / ${totalImages}`);
        }
    };


    return (
        <div className="max-w-full mx-auto p-6">
            <div className="flex gap-6 mb-4">
                <div className="flex flex-col gap-4 w-1/3">
                    <CategoryBox title="des animaux" categoryKey="animaux" letter="a" />
                    <CategoryBox title="des légumes" categoryKey="légumes" letter="b" />
                    <CategoryBox title="des fruits" categoryKey="fruits" letter="c" />
                    <CategoryBox title="else" categoryKey="else" letter="d" />
                </div>

                <div className="flex-1 border-2 border-gray-300 rounded-lg p-3 bg-gray-50 overflow-auto">
                    <div className="flex flex-wrap gap-2">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, img, 'source')}
                                className="cursor-move hover:scale-110 transition-transform"
                            >
                                <img
                                    src={img.src}
                                    alt=""
                                    //  ✅ التعديل هنا: تم توحيد حجم الصور
                                    className="max-w-30 max-h-30 object-contain bg-white rounded p-1 shadow-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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

export default Q2;
