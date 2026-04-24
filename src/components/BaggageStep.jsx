const OPTIONS = [
  { kg: 0, label: 'Только ручная кладь', desc: '1 сумка до 8 кг', price: 0, icon: '🎒' },
  { kg: 23, label: 'Стандарт', desc: '1 место до 23 кг', price: 0, icon: '🧳' },
  { kg: 32, label: 'Дополнительный', desc: '1 место до 32 кг', price: 8100, icon: '📦' },
]

function co2Tip(kg) {
  if (kg === 0) return { text: 'Отлично! Минимальный багаж снижает вес самолёта и экономит топливо.', level: 'great' }
  if (kg === 23) return { text: 'Хороший выбор. Стандартный багаж — оптимальный баланс.', level: 'ok' }
  return { text: 'Тяжёлый багаж увеличивает расход топлива. Взяли бы только нужное — самолёт потратит меньше топлива и меньше CO₂ попадёт в атмосферу.', level: 'warn' }
}

export default function BaggageStep({ baggageKg, setBaggageKg, baggageFee, onNext, onBack }) {
  const tip = co2Tip(baggageKg)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5">
          <h2 className="text-lg font-bold text-slate-800">Выберите багаж</h2>
          <p className="text-sm text-slate-500 mt-0.5">Алматы → Астана · 1 пассажир</p>
        </div>

        <div className="px-4 pb-5 space-y-3">
          {OPTIONS.map(opt => (
            <button
              key={opt.kg}
              onClick={() => setBaggageKg(opt.kg)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
                ${baggageKg === opt.kg
                  ? 'border-sky-500 bg-sky-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${baggageKg === opt.kg ? 'text-sky-700' : 'text-slate-700'}`}>
                  {opt.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
              </div>
              <div className="text-right">
                {opt.price === 0
                  ? <p className="text-green-600 font-semibold text-sm">Включено</p>
                  : <p className="text-slate-800 font-semibold text-sm">+{opt.price.toLocaleString('ru')} ₸</p>
                }
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Eco tip */}
      <div className={`rounded-xl px-5 py-4 flex gap-3 border
        ${tip.level === 'great' ? 'bg-green-50 border-green-200' :
          tip.level === 'ok' ? 'bg-sky-50 border-sky-200' :
          'bg-amber-50 border-amber-200'}`}>
        <span className="text-2xl mt-0.5">
          {tip.level === 'great' ? '🌿' : tip.level === 'ok' ? '✅' : '⚠️'}
        </span>
        <div>
          <p className={`font-semibold text-sm
            ${tip.level === 'great' ? 'text-green-800' :
              tip.level === 'ok' ? 'text-sky-800' :
              'text-amber-800'}`}>
            {tip.level === 'warn' ? 'Возьмите меньше багажа' : 'Экологичный выбор'}
          </p>
          <p className={`text-sm mt-0.5
            ${tip.level === 'great' ? 'text-green-700' :
              tip.level === 'ok' ? 'text-sky-700' :
              'text-amber-700'}`}>
            {tip.text}
          </p>
          {tip.level === 'warn' && (
            <p className="text-xs text-amber-600 mt-1 font-medium">
              💡 Каждый лишний кг на борту — это дополнительные граммы CO₂ в атмосфере
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 border-2 border-slate-300 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors">
          ← Назад
        </button>
        <button onClick={onNext} className="flex-2 flex-grow bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
          Продолжить →
        </button>
      </div>
    </div>
  )
}
