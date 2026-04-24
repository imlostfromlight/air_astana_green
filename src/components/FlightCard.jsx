const NAVY = '#1B2B4B'
const GOLD = '#B09040'

export default function FlightCard({ onNext }) {
  return (
    <div className="space-y-3">
      {/* Flight result card */}
      <div className="bg-white border rounded overflow-hidden" style={{ borderColor: '#e0e4eb' }}>
        {/* Card header */}
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: '#e0e4eb', background: '#f8f9fb' }}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#9aa5b4' }}>Доступный рейс</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ background: '#f5edd6', color: GOLD, border: `1px solid #e8d5a0` }}
          >
            🌿 Зелёный рейс
          </span>
        </div>

        <div className="px-5 py-5">
          {/* Route */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold" style={{ color: NAVY }}>06:30</p>
              <p className="text-base font-semibold mt-0.5" style={{ color: NAVY }}>ALA</p>
              <p className="text-xs text-gray-400">Алматы</p>
            </div>
            <div className="flex-1 mx-5 flex flex-col items-center gap-1">
              <p className="text-xs text-gray-400">1ч 45м · Прямой</p>
              <div className="w-full flex items-center gap-1">
                <div className="flex-1 h-px" style={{ background: '#e0e4eb' }} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: GOLD }}>
                  <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                </svg>
                <div className="flex-1 h-px" style={{ background: '#e0e4eb' }} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: NAVY }}>08:15</p>
              <p className="text-base font-semibold mt-0.5" style={{ color: NAVY }}>TSE</p>
              <p className="text-xs text-gray-400">Астана</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {['KC 121', 'Эконом', 'Airbus A320'].map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded"
                style={{ background: '#f2f4f7', color: '#6b7a99', border: '1px solid #e0e4eb' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#e0e4eb' }}>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Цена за 1 пассажира</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>52 377 ₸</p>
            </div>
            <button
              onClick={onNext}
              className="font-semibold px-7 py-3 text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ background: GOLD, color: '#fff', borderRadius: '2px' }}
            >
              Выбрать
            </button>
          </div>
        </div>
      </div>

      {/* Eco banner */}
      <div
        className="rounded px-4 py-3.5 flex gap-3 items-start"
        style={{ background: '#f5edd6', border: `1px solid #e8d5a0` }}
      >
        <span className="text-lg mt-0.5">🌱</span>
        <div>
          <p className="text-sm font-semibold" style={{ color: NAVY }}>Зелёный рейс Air Astana</p>
          <p className="text-xs mt-0.5 text-gray-500">
            Этот рейс использует экономичный режим полёта, сокращая выбросы CO₂ на 12% по сравнению со стандартным рейсом.
          </p>
        </div>
      </div>
    </div>
  )
}
