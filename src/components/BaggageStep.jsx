const NAVY = '#1B2B4B'
const GOLD = '#B09040'

const OPTIONS = [
  { kg: 0,  label: 'Только ручная кладь', desc: '1 сумка до 8 кг', price: 0,    icon: '🎒' },
  { kg: 23, label: 'Стандарт',            desc: '1 место до 23 кг', price: 0,    icon: '🧳' },
  { kg: 32, label: 'Дополнительный',      desc: '1 место до 32 кг', price: 8100, icon: '📦' },
]

function co2Tip(kg) {
  if (kg === 0)  return { text: 'Отлично! Минимальный багаж снижает вес самолёта и экономит топливо.', level: 'great' }
  if (kg === 23) return { text: 'Хороший выбор. Стандартный багаж — оптимальный баланс.', level: 'ok' }
  return { text: 'Тяжёлый багаж увеличивает расход топлива. Взяли бы только нужное — самолёт потратит меньше топлива и меньше CO₂ попадёт в атмосферу.', level: 'warn' }
}

export default function BaggageStep({ baggageKg, setBaggageKg, baggageFee, onNext, onBack }) {
  const tip = co2Tip(baggageKg)

  return (
    <div className="space-y-3">
      <div className="bg-white border rounded overflow-hidden" style={{ borderColor: '#e0e4eb' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: '#e0e4eb', background: '#f8f9fb' }}>
          <p className="font-bold text-base" style={{ color: NAVY }}>Выберите багаж</p>
          <p className="text-xs text-gray-400 mt-0.5">Алматы → Астана · 1 пассажир · 25 апреля 2026</p>
        </div>

        <div className="p-4 space-y-2.5">
          {OPTIONS.map(opt => {
            const selected = baggageKg === opt.kg
            return (
              <button
                key={opt.kg}
                onClick={() => setBaggageKg(opt.kg)}
                className="w-full flex items-center gap-4 p-4 text-left transition-all"
                style={{
                  border: `2px solid ${selected ? GOLD : '#e0e4eb'}`,
                  background: selected ? '#fdf8ee' : '#fff',
                  borderRadius: '2px',
                }}
              >
                <span className="text-2xl">{opt.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: selected ? NAVY : '#374151' }}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                </div>
                <div className="text-right flex items-center gap-2">
                  {opt.price === 0
                    ? <span className="text-sm font-semibold" style={{ color: '#16a34a' }}>Включено</span>
                    : <span className="text-sm font-semibold" style={{ color: NAVY }}>+{opt.price.toLocaleString('ru')} ₸</span>
                  }
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: selected ? GOLD : '#d1d5db', background: selected ? GOLD : 'transparent' }}
                  >
                    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Eco tip */}
      <div
        className="rounded px-4 py-3.5 flex gap-3 items-start"
        style={
          tip.level === 'warn'
            ? { background: '#fffbeb', border: '1px solid #fde68a' }
            : { background: '#f5edd6', border: `1px solid #e8d5a0` }
        }
      >
        <span className="text-lg mt-0.5">{tip.level === 'warn' ? '⚠️' : '🌿'}</span>
        <div>
          <p className="text-sm font-semibold" style={{ color: NAVY }}>
            {tip.level === 'warn' ? 'Возьмите меньше багажа' : 'Экологичный выбор'}
          </p>
          <p className="text-xs mt-0.5 text-gray-500">{tip.text}</p>
          {tip.level === 'warn' && (
            <p className="text-xs mt-1.5 font-medium" style={{ color: GOLD }}>
              💡 Каждый лишний кг на борту — дополнительные граммы CO₂ в атмосфере
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
          style={{ border: `1px solid #e0e4eb`, color: NAVY, borderRadius: '2px', background: '#fff' }}
        >
          ← Назад
        </button>
        <button
          onClick={onNext}
          className="grow py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
          style={{ background: GOLD, color: '#fff', borderRadius: '2px' }}
        >
          Продолжить
        </button>
      </div>
    </div>
  )
}
