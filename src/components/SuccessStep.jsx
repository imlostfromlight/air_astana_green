function fmt(n) {
  return n.toLocaleString('ru')
}

export default function SuccessStep({ total, roundUp, donation }) {
  return (
    <div className="space-y-4 text-center">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto">
          ✅
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Билет оплачен!</h2>
        <p className="text-slate-500 mt-2">Подтверждение отправлено на вашу почту</p>

        <div className="mt-6 bg-slate-50 rounded-xl p-4 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Маршрут</span>
            <span className="font-medium text-slate-800">Алматы → Астана</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Рейс</span>
            <span className="font-medium text-slate-800">KC 121 · 25 апреля 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Вылет</span>
            <span className="font-medium text-slate-800">06:30</span>
          </div>
          <div className="flex justify-between text-sm border-t border-slate-200 pt-2 mt-2">
            <span className="text-slate-700 font-semibold">Итого оплачено</span>
            <span className="font-bold text-slate-800">{fmt(total)} ₸</span>
          </div>
        </div>
      </div>

      {roundUp && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl px-6 py-5">
          <div className="text-4xl mb-3">🌳</div>
          <h3 className="text-green-800 font-bold text-lg">Спасибо за заботу о природе!</h3>
          <p className="text-green-700 mt-1 text-sm">
            Вы пожертвовали <span className="font-bold">{fmt(donation)} ₸</span> в фонд компенсации выбросов CO₂.
          </p>
          <p className="text-green-600 text-sm mt-2">
            Эти средства пойдут на посадку деревьев в рамках программы Green Kazakhstan.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: '🌱', val: '1', label: 'рейс' },
              { icon: '🌳', val: '4', label: 'дерева' },
              { icon: '💨', val: '87 кг', label: 'CO₂ компенсировано' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xl">{s.icon}</p>
                <p className="font-bold text-green-700 text-base">{s.val}</p>
                <p className="text-xs text-green-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!roundUp && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-4 text-left">
          <p className="text-sky-700 text-sm">
            💡 В следующий раз попробуйте округлить сумму — небольшой взнос поможет компенсировать CO₂ от перелёта.
          </p>
        </div>
      )}

      <button
        onClick={() => window.location.reload()}
        className="w-full border-2 border-slate-300 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors"
      >
        Купить ещё один билет
      </button>
    </div>
  )
}
