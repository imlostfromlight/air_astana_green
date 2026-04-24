export default function FlightCard({ onNext }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-sky-700 text-white px-6 py-4">
          <p className="text-sky-200 text-sm">Выберите рейс</p>
          <h2 className="text-xl font-bold mt-0.5">Алматы → Астана</h2>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">06:30</p>
              <p className="text-sm text-slate-500">ALA</p>
              <p className="text-xs text-slate-400">Алматы</p>
            </div>
            <div className="flex-1 mx-4 flex flex-col items-center gap-1">
              <p className="text-xs text-slate-400">1ч 45м</p>
              <div className="w-full flex items-center gap-1">
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="text-slate-400 text-lg">✈</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <p className="text-xs text-green-600 font-medium">Прямой</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">08:15</p>
              <p className="text-sm text-slate-500">TSE</p>
              <p className="text-xs text-slate-400">Астана</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">KC 121</span>
            <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">Эконом</span>
            <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">Airbus A320</span>
            <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200 font-medium">
              🌿 Зелёный рейс
            </span>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Цена за 1 пассажира</p>
              <p className="text-2xl font-bold text-slate-800">52 377 ₸</p>
            </div>
            <button
              onClick={onNext}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Выбрать →
            </button>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex gap-3">
        <span className="text-2xl">🌱</span>
        <div>
          <p className="text-green-800 font-semibold text-sm">Зелёный рейс Air Astana</p>
          <p className="text-green-700 text-sm mt-0.5">
            Этот рейс использует экономичный режим полёта, сокращая выбросы CO₂ на 12% по сравнению со стандартным рейсом.
          </p>
        </div>
      </div>
    </div>
  )
}
