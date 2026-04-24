const NAVY = '#1B2B4B'
const GOLD = '#B09040'

function fmt(n) { return n.toLocaleString('ru') }

export default function PaymentStep({
  basePrice, baggageFee, subtotal,
  roundUp, setRoundUp,
  donation, total, roundedTotal,
  onNext, onBack,
}) {
  return (
    <div className="space-y-3">
      {/* Order summary */}
      <div className="bg-white border rounded overflow-hidden" style={{ borderColor: '#e0e4eb' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: '#e0e4eb', background: '#f8f9fb' }}>
          <p className="font-bold text-base" style={{ color: NAVY }}>Итог заказа</p>
          <p className="text-xs text-gray-400 mt-0.5">Алматы → Астана · 25 апреля 2026 · KC 121</p>
        </div>
        <div className="px-5 py-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Билет (эконом)</span>
            <span className="font-medium" style={{ color: NAVY }}>{fmt(basePrice)} ₸</span>
          </div>
          {baggageFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Дополнительный багаж</span>
              <span className="font-medium" style={{ color: NAVY }}>+{fmt(baggageFee)} ₸</span>
            </div>
          )}
          {roundUp && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1" style={{ color: '#16a34a' }}>
                <span>🌿</span> Green Fund (округление)
              </span>
              <span className="font-medium" style={{ color: '#16a34a' }}>+{fmt(donation)} ₸</span>
            </div>
          )}
          <div className="pt-3 border-t flex justify-between items-baseline" style={{ borderColor: '#e0e4eb' }}>
            <span className="font-bold text-sm" style={{ color: NAVY }}>ИТОГО</span>
            <span className="text-2xl font-bold" style={{ color: NAVY }}>{fmt(total)} ₸</span>
          </div>
        </div>
      </div>

      {/* Green round-up block */}
      <div
        className="border rounded overflow-hidden cursor-pointer transition-all"
        style={{
          borderColor: roundUp ? GOLD : '#e0e4eb',
          background: roundUp ? '#fdf8ee' : '#fff',
        }}
        onClick={() => setRoundUp(!roundUp)}
      >
        <div className="px-5 py-4 flex items-start gap-4">
          {/* Custom checkbox */}
          <div
            className="w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
            style={{
              borderColor: roundUp ? GOLD : '#d1d5db',
              background: roundUp ? GOLD : '#fff',
            }}
          >
            {roundUp && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>
                Округлить сумму до {fmt(roundedTotal)} ₸
              </p>
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ background: '#f5edd6', color: GOLD, border: `1px solid #e8d5a0` }}
              >
                +{fmt(donation)} ₸
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Разница пойдёт в фонд посадки деревьев и компенсации выбросов CO₂ от авиарейсов Казахстана.
            </p>
            {roundUp && (
              <p className="text-xs mt-2 font-medium" style={{ color: '#16a34a' }}>
                🌳 Ваш взнос поможет компенсировать выбросы этого рейса
              </p>
            )}
          </div>
        </div>

        {!roundUp && (
          <div className="px-5 py-2 border-t text-center" style={{ borderColor: '#e0e4eb', background: '#f8f9fb' }}>
            <p className="text-xs text-gray-400">Нажмите, чтобы добавить — всего {fmt(donation)} ₸</p>
          </div>
        )}
      </div>

      {/* CO₂ stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '✈️', label: 'Выброс рейса', value: '~87 кг CO₂' },
          { icon: '🌳', label: 'Деревьев на год', value: '4 дерева' },
          { icon: '💚', label: 'Ваш взнос', value: roundUp ? `${fmt(donation)} ₸` : '0 ₸', highlight: roundUp },
        ].map(s => (
          <div
            key={s.label}
            className="p-3 text-center border rounded"
            style={{ background: '#fff', borderColor: '#e0e4eb' }}
          >
            <p className="text-xl">{s.icon}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: s.highlight ? '#16a34a' : NAVY }}>
              {s.value}
            </p>
          </div>
        ))}
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
          className="grow py-3.5 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-90"
          style={{ background: GOLD, color: '#fff', borderRadius: '2px' }}
        >
          Оплатить {fmt(total)} ₸
        </button>
      </div>
    </div>
  )
}
