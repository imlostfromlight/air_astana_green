function fmt(n) {
  return n.toLocaleString('ru')
}

export default function PaymentStep({
  basePrice, baggageFee, subtotal,
  roundUp, setRoundUp,
  donation, total, roundedTotal,
  onNext, onBack
}) {
  return (
    <div className="space-y-4">
      {/* Order summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Итог заказа</h2>
          <p className="text-sm text-slate-500">Алматы → Астана · 25 апреля 2026</p>
        </div>
        <div className="px-6 py-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Билет (эконом)</span>
            <span className="font-medium text-slate-800">{fmt(basePrice)} ₸</span>
          </div>
          {baggageFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Дополнительный багаж</span>
              <span className="font-medium text-slate-800">+{fmt(baggageFee)} ₸</span>
            </div>
          )}
          {roundUp && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600 flex items-center gap-1">
                <span>🌿</span> Округление (донат природе)
              </span>
              <span className="font-medium text-green-600">+{fmt(donation)} ₸</span>
            </div>
          )}
          <div className="border-t border-slate-100 pt-3 flex justify-between">
            <span className="font-bold text-slate-800">Итого</span>
            <span className="font-bold text-xl text-slate-800">{fmt(total)} ₸</span>
          </div>
        </div>
      </div>

      {/* Green round-up card */}
      <div
        onClick={() => setRoundUp(!roundUp)}
        className={`rounded-2xl border-2 cursor-pointer transition-all overflow-hidden
          ${roundUp ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white hover:border-green-300'}`}
      >
        <div className="px-5 py-4 flex items-start gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 mt-0.5
            ${roundUp ? 'bg-green-500' : 'bg-slate-100'}`}>
            {roundUp ? '✓' : '🌱'}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={`font-bold text-sm ${roundUp ? 'text-green-800' : 'text-slate-800'}`}>
                Округлить до {fmt(roundedTotal)} ₸
              </p>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                +{fmt(donation)} ₸ природе
              </span>
            </div>
            <p className={`text-sm mt-1 ${roundUp ? 'text-green-700' : 'text-slate-500'}`}>
              Разница пойдёт в фонд посадки деревьев и компенсации выбросов CO₂ от авиарейсов Казахстана.
            </p>
            {roundUp && (
              <p className="text-xs text-green-600 mt-2 font-medium">
                🌳 Ваш взнос поможет посадить деревья, которые поглотят выбросы этого рейса
              </p>
            )}
          </div>
        </div>

        {!roundUp && (
          <div className="bg-slate-50 border-t border-slate-100 px-5 py-2">
            <p className="text-xs text-slate-400 text-center">
              Нажмите чтобы добавить — всего {fmt(donation)} ₸
            </p>
          </div>
        )}
      </div>

      {/* CO2 stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '✈️', label: 'Выброс рейса', value: '~87 кг CO₂' },
          { icon: '🌳', label: 'Деревьев на год', value: '4 дерева' },
          { icon: '💚', label: 'Ваш взнос', value: roundUp ? `${fmt(donation)} ₸` : '0 ₸' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
            <p className="text-xl">{s.icon}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            <p className={`text-sm font-bold mt-0.5 ${s.label === 'Ваш взнос' && roundUp ? 'text-green-600' : 'text-slate-700'}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pay button */}
      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 border-2 border-slate-300 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors">
          ← Назад
        </button>
        <button
          onClick={onNext}
          className="flex-grow bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3 rounded-xl transition-colors text-base"
        >
          Оплатить {fmt(total)} ₸
        </button>
      </div>
    </div>
  )
}
