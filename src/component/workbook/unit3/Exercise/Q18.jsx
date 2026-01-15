import React, { useRef } from 'react';

// الرجاء تحديث هذه المسارات لتطابق ملفات الصور الصحيحة في مشروعك
const parrotImage = '/assets/unit3/secA/page33/01.png';
const fishImage = '/assets/unit3/secA/page33/01.png';
const turtleImage = '/assets/unit3/secA/page33/01.png';
const catImage = '/assets/unit3/secA/page33/01.png';
const hamsterImage = '/assets/unit3/secA/page33/01.png';
const Q18 = () => {
    // دوال وهمية للأزرار، يمكنك إضافة المنطق الخاص بك هنا
    const handleTryAgain = () => console.log("Try Again Clicked");
    const handleShowAnswer = () => console.log("Show Answer Clicked");
    const checkAnswers = () => console.log("Check Answers Clicked");

    const inputsRef = useRef([]);

    // دالة للتعامل مع إدخال الحروف والتنقل التلقائي
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        // الانتقال إلى الحقل التالي فقط إذا كان هناك إدخال والحقل الحالي ليس الأخير
        if (value.length > 0 && index < inputsRef.current.length - 1) {
            const nextInput = inputsRef.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    // دالة للتعامل مع الحذف (Backspace) والرجوع للخلف
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            const prevInput = inputsRef.current[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    // دالة لإنشاء حقول الإدخال
    const renderInput = (index) => (
        <input
            ref={el => inputsRef.current[index] = el}
            type="text"
            maxLength="1"
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-2xl font-bold border-2 border-cyan-300 uppercase focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
    );

    return (
        // لاستخدام خط مخصص، تأكد من إضافته في tailwind.config.js
        <div className="p-8 font-sans flex flex-col items-center bg-white">

            {/* حاوية الشبكة والصور */}
            <div className="relative w-[720px] h-[480px]">
                {/* الصور (موضوعة باستخدام absolute positioning) */}
                <img src={parrotImage} alt="Parrot" className="absolute max-w-24 max-h-24 z-10 bottom-105 right-105"  />
                <img src={fishImage} alt="Fish" className="absolute max-w-24 max-h-24 z-10 top-5 right-128" />
                <img src={turtleImage} alt="Turtle" className="absolute max-w-24 max-h-24 z-10 top-45 right-135"  />
                <img src={catImage} alt="Cat" className="absolute max-w-24 max-h-24 z-10 top-75 right-160"  />
                <img src={hamsterImage} alt="Hamster" className="absolute max-w-24 max-h-24 z-10 top-110 right-180" />

                {/* شبكة الكلمات المتقاطعة - تم استخدام grid-cols-[13] لإنشاء 13 عمودًا */}
                <div className="absolute top-0 left-0 grid grid-cols-12 grid-rows-12 w-auto h-auto gap-1 lg:mb-[350px] ">
                    {/* div1 */}
                    <div className="col-start-11 col-end-12 row-start-2 row-end-3">{renderInput(0)}</div>
                    {/* div2 */}
                    <div className="col-start-10 col-end-11 row-start-2 row-end-3">{renderInput(1)}</div>
                    {/* div3 */}
                    <div className="col-start-9 col-end-10 row-start-2 row-end-3">{renderInput(2)}</div>
                    {/* div4 */}
                    <div className="col-start-8 col-end-9 row-start-2 row-end-3">{renderInput(3)}</div>
                    {/* div5 */}
                    <div className="col-start-7 col-end-8 row-start-2 row-end-3">{renderInput(4)}</div>
                    {/* div6 */}
                    <div className="col-start-6 col-end-7 row-start-2 row-end-3">{renderInput(5)}</div>
                    {/* div7 */}
                    <div className="col-start-5 col-end-6 row-start-2 row-end-3">{renderInput(6)}</div>
                    {/* div8 */}
                    <div className="col-start-5 col-end-6 row-start-3 row-end-4">{renderInput(7)}</div>
                    {/* div9 */}
                    <div className="col-start-5 col-end-6 row-start-4 row-end-5">{renderInput(8)}</div>
                    {/* div10 */}
                    <div className="col-start-5 col-end-6 row-start-5 row-end-6">{renderInput(9)}</div>
                    {/* div11 */}
                    <div className="col-start-5 col-end-6 row-start-6 row-end-7">{renderInput(10)}</div>
                    {/* div12 */}
                    <div className="col-start-5 col-end-6 row-start-7 row-end-8">{renderInput(11)}</div>
                    {/* div13 */}
                    <div className="col-start-5 col-end-6 row-start-8 row-end-9">{renderInput(12)}</div>
                    {/* div14 */}
                    <div className="col-start-5 col-end-6 row-start-9 row-end-10">{renderInput(13)}</div>
                    {/* div15 */}
                    <div className="col-start-5 col-end-6 row-start-10 row-end-11">{renderInput(14)}</div>
                    {/* div16 */}
                    <div className="col-start-7 col-end-8 row-start-10 row-end-11">{renderInput(15)}</div>
                    {/* div17 */}
                    <div className="col-start-6 col-end-7 row-start-10 row-end-11">{renderInput(16)}</div>
                    {/* div18 */}
                    <div className="col-start-4 col-end-5 row-start-10 row-end-11">{renderInput(17)}</div>
                    {/* div19 */}
                    <div className="col-start-3 col-end-4 row-start-10 row-end-11">{renderInput(18)}</div>
                    {/* div20 */}
                    <div className="col-start-2 col-end-3 row-start-10 row-end-11">{renderInput(19)}</div>
                    {/* div21 */}
                    <div className="col-start-1 col-end-2 row-start-10 row-end-11">{renderInput(20)}</div>
                    {/* div22 */}
                    <div className="col-start-2 col-end-3 row-start-11 row-end-12">{renderInput(21)}</div>
                    {/* div23 */}
                    <div className="col-start-2 col-end-3 row-start-9 row-end-10">{renderInput(22)}</div>
                    {/* div24 */}
                    <div className="col-start-2 col-end-3 row-start-8 row-end-9">{renderInput(23)}</div>
                    {/* div25 */}
                    <div className="col-start-4 col-end-5 row-start-6 row-end-7">{renderInput(24)}</div>
                    {/* div26 */}
                    <div className="col-start-6 col-end-7 row-start-6 row-end-7">{renderInput(25)}</div>
                    {/* div27 */}
                    <div className="col-start-7 col-end-8 row-start-6 row-end-7">{renderInput(26)}</div>
                    {/* div28 */}
                    <div className="col-start-8 col-end-9 row-start-6 row-end-7 ">{renderInput(27)}</div>
                    {/* div29 */}
                    <div className="col-start-9 col-end-10 row-start-6 row-end-7 ">{renderInput(28)}</div>


                </div>

            </div >
            <div className="mt-20"></div>
            {/* الأزرار مع كلاسات Tailwind */}
            <div className="popup-buttons shrink-0">
                <button className="try-again-button" onClick={handleTryAgain}>
                    Recommencer ↻
                </button>
                <button className="show-answer-btn" onClick={handleShowAnswer}>
                    Afficher la réponse
                </button>
                <button className="check-button2" onClick={checkAnswers}>
                    Vérifier la réponse ✓
                </button>
            </div>
        </div>
    );
};

export default Q18;
