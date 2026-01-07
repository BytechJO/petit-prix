import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ValidationAlert from '../../../Popup/ValidationAlert';

export default function Q10() {
  const activities = ['Danser', 'Jouer au foot', 'Dessiner', 'Chanter'];

  // تخزين الاختيارات
  const [selected, setSelected] = useState(new Set());

  // حالة التحقق من الإجابات
  const [answered, setAnswered] = useState(false);

  // الإجابات الصحيحة
  const correctAnswers = new Set([
    'Lundi-Il-Chanter',
    'Lundi-Elle-Danser',
    'Mardi-Il-Jouer au foot',
    'Mardi-Elle-Dessiner'
  ]);

  // التعامل مع النقر على الخلية
  const handleCellClick = (day, gender, activity) => {
    // منع التغيير بعد التحقق
    const key = `${day}-${gender}-${activity}`;
    const newSelected = new Set(selected);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelected(newSelected);
  };

  // للتحقق إذا الخلية مختارة
  const isCellSelected = (day, gender, activity) => {
    return selected.has(`${day}-${gender}-${activity}`);
  };

  // إعادة الكل
  const handleStartAgain = () => {
    setSelected(new Set());
    setAnswered(false);
  };

  // عرض الإجابات الصحيحة
  const handleShowAnswer = () => {
    setSelected(new Set(correctAnswers));
    setAnswered(true);
  };

  // التحقق من الإجابات
  const handleCheck = () => {
    if (!selected || selected.size === 0) {
      ValidationAlert.warning("Please select at least one answer", "");
      return;
    }
    let correctCount = 0;
    selected.forEach(key => {
      if (correctAnswers.has(key)) correctCount++;
    });

    const score = `Score: ${correctCount} / ${correctAnswers.size}`;

    if (correctCount === correctAnswers.size) {
      // كل الإجابات صحيحة
      ValidationAlert.success("Bravo !", score);
    } else {
      // بعض الإجابات خاطئة أو ناقصة
      ValidationAlert.error("Certaines réponses sont incorrectes", score);
    }

    setAnswered(true);
  };

return (
  <div className="lg:ml-100 lg:mt-25 w-full max-w-4xl mx-auto p-6">
    {/* Table */}
    <div className="border-2 border-red-400 rounded-lg overflow-hidden bg-white">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-r-2 border-b-2 border-red-400 bg-gray-50 p-3 text-left text-sm font-semibold text-gray-700 w-24"></th>
            <th colSpan={2} className="border-r-2 border-b-2 border-red-400 bg-gray-50 p-3 text-center font-semibold font-black">
              Lundi
            </th>
            <th colSpan={2} className="border-b-2 border-red-400 bg-gray-50 p-3 text-center font-semibold text-gray-800">
              Mardi
            </th>
          </tr>
          <tr>
            <th className="border-r-2 border-b-2 border-red-400 bg-gray-50 p-2"></th>
            <th className="border-r-2 border-b-2 border-red-400 bg-gray-50 p-2 text-center text-sm font-semibold text-gray-700">Il</th>
            <th className="border-r-2 border-b-2 border-red-400 bg-gray-50 p-2 text-center text-sm font-semibold text-gray-700">Elle</th>
            <th className="border-r-2 border-b-2 border-red-400 bg-gray-50 p-2 text-center text-sm font-semibold text-gray-700">Il</th>
            <th className="border-b-2 border-red-400 bg-gray-50 p-2 text-center text-sm font-semibold text-gray-700">Elle</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={activity}>
              <td className={` border-r-2 border-red-400 p-3 font-semibold text-gray-800 text-sm ${idx !== activities.length - 1 ? 'border-b-2 border-red-400' : ''}`}>
                {activity}
              </td>

              {['Lundi-Il', 'Lundi-Elle', 'Mardi-Il', 'Mardi-Elle'].map(col => {
                const [day, gender] = col.split('-');
                const selectedCell = isCellSelected(day, gender, activity);
                return (
                  <td
                    key={col}
                    onClick={() => handleCellClick(day, gender, activity)}
                    className={`border-r-2 border-red-400 p-4 text-center cursor-pointer transition-all ${idx !== activities.length - 1 ? 'border-b-2 border-red-400' : ''} ${selectedCell ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white hover:bg-gray-50'
                      }`}
                  >
                    {selectedCell && <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto" />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Buttons */}
    <div className="popup-buttons mt-4 flex gap-4">
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
  </div>
);
}
