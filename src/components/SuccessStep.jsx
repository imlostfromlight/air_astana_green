const NAVY = '#1B2B4B'
const GOLD = '#B09040'

function fmt(n) { return n.toLocaleString('ru') }

export default function SuccessStep({ total, roundUp, donation }) {
  return (
    <div className="space-y-3">
      {/* Confirmation card */}
      <div className="bg-white border rounded overflow-hidden text-center" style={{ borderColor: '#e0e4eb' }}>
        <div className="px-5 pt-8 pb-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto"
            style={{ background: '#f5edd6', border: `2px solid ${GOLD}` }}
          >
            ✓
          </div>
          <h2 className="text-xl font-bold mt-4" style={{ color: NAVY }}>Билет оплачен!</h2>
          <p className="text-sm text-gray-400 mt-1">Подтверждение отправлено на вашу почту</p>
        </div>

        <div className="mx-5 mb-5 p-4 rounded text-left space-y-2.5" style={{ background: '#f8f9fb', border: '1px solid #e0e4eb' }}>
          {[
            { label: 'Маршрут',  value: 'Алматы → Астана' },
            { label: 'Рейс',     value: 'KC 121 · 25 апреля 2026' },
            { label: 'Вылет',    value: '06:30' },
          ].map(row => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-gray-400">{row.label}</span>
              <span className="font-medium" style={{ color: NAVY }}>{row.value}</span>
            </div>
          ))}
          <div className="pt-2.5 border-t flex justify-between items-baseline" style={{ borderColor: '#e0e4eb' }}>
            <span className="font-bold text-sm" style={{ color: NAVY }}>ИТОГО ОПЛАЧЕНО</span>
            <span className="font-bold text-xl" style={{ color: NAVY }}>{fmt(total)} ₸</span>
          </div>
        </div>
      </div>

      {/* Green donation result */}
      {roundUp && (
        <div className="border rounded overflow-hidden" style={{ borderColor: '#e8d5a0', background: '#fdf8ee' }}>
          <div className="px-5 py-4 text-center">
            <div className="text-3xl mb-2">🌳</div>
            <p className="font-bold text-base" style={{ color: NAVY }}>Спасибо за заботу о природе!</p>
            <p className="text-sm text-gray-500 mt-1">
              Вы передали <span className="font-semibold" style={{ color: GOLD }}>{fmt(donation)} ₸</span> в фонд компенсации выбросов CO₂
            </p>
          </div>
          <div className="grid grid-cols-3 border-t" style={{ borderColor: '#e8d5a0' }}>
            {[
              { icon: '🌱', val: '1',     label: 'рейс' },
              { icon: '🌳', val: '4',     label: 'дерева' },
              { icon: '💨', val: '87 кг', label: 'CO₂' },
            ].map((s, i) => (
              <div key={s.label} className="py-3 text-center" style={{ borderRight: i < 2 ? `1px solid #e8d5a0` : 'none' }}>
                <p className="text-xl">{s.icon}</p>
                <p className="font-bold text-sm mt-0.5" style={{ color: NAVY }}>{s.val}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!roundUp && (
        <div
          className="rounded px-4 py-3.5 text-sm"
          style={{ background: '#f5edd6', border: `1px solid #e8d5a0`, color: '#78580a' }}
        >
          💡 В следующий раз попробуйте округлить сумму — небольшой взнос поможет компенсировать CO₂ от перелёта.
        </div>
      )}

      <button
        onClick={() => window.location.reload()}
        className="w-full py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
        style={{ border: `1px solid #e0e4eb`, color: NAVY, borderRadius: '2px', background: '#fff' }}
      >
        Купить ещё один билет
      </button>
    </div>
  )
}
