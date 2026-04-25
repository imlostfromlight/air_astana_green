import { useState } from 'react'

const NAVY = '#1B2B4B'
const GOLD = '#B09040'
const KZT_PER_TONNE = 8750

const FLIGHTS = [
  { id: 1, date: '2026-01-12', route: 'ALA → NQZ', flight: 'KC 121', donated: 623 },
  { id: 2, date: '2026-01-28', route: 'NQZ → ALA', flight: 'KC 122', donated: 1000 },
  { id: 3, date: '2026-02-14', route: 'ALA → DXB', flight: 'KC 931', donated: 2500 },
  { id: 4, date: '2026-03-05', route: 'DXB → ALA', flight: 'KC 932', donated: 2500 },
  { id: 5, date: '2026-04-24', route: 'ALA → NQZ', flight: 'KC 121', donated: 623 },
]

const MONTHLY = [
  { month: 'Янв', kzt: 1623 },
  { month: 'Фев', kzt: 2500 },
  { month: 'Мар', kzt: 2500 },
  { month: 'Апр', kzt: 623 },
]

function fmt(n) { return n.toLocaleString('ru') }
function kgCO2(kzt) { return Math.round((kzt / KZT_PER_TONNE) * 1000) }

function ShareModal({ onClose, totalKg, totalKzt, trees, km }) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const text = `Мой вклад в природу с Air Astana:\n✅ ${totalKg} кг CO₂ компенсировано\n🌳 ${trees} деревьев на год\n🚗 ${fmt(km)} км без авто\n💚 ${fmt(totalKzt)} ₸ передано в Green Fund\n\n#AirAstana #GreenFlight #ClimateAction`
    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      onClick={onClose}
    >
      <div className="w-full" style={{ maxWidth: '480px', padding: '0 0' }} onClick={e => e.stopPropagation()}>
        {/* Story card */}
        <div className="overflow-hidden shadow-2xl" style={{ background: NAVY, borderRadius: '16px 16px 0 0' }}>
          {/* Header */}
          <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <path d="M18 4C10 4 5 10 5 18c0 2 1 4 2 6l7-8 6 8 6-8 4 6c2-2 3-3 3-4 0-8-7-14-15-14z" fill={GOLD}/>
              </svg>
              <span className="text-white font-bold text-base lowercase">air astana</span>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'rgba(196,154,60,0.2)', color: GOLD, border: `1px solid rgba(196,154,60,0.4)` }}
            >
              🌿 GreenFlight
            </span>
          </div>

          {/* Big number */}
          <div className="px-6 py-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
              Мой вклад в природу
            </p>
            <p className="text-5xl sm:text-7xl font-black text-white mt-2 leading-none">{totalKg}</p>
            <p className="text-lg font-medium mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>кг CO₂ компенсировано</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px mx-5 mb-5 overflow-hidden rounded" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {[
              { icon: '🌳', val: `${trees}`, label: 'деревьев / год' },
              { icon: '🚗', val: `${fmt(km)} км`, label: 'без авто' },
              { icon: '💚', val: `${fmt(totalKzt)} ₸`, label: 'в Green Fund' },
            ].map(s => (
              <div key={s.label} className="py-4 text-center" style={{ background: NAVY }}>
                <p className="text-xl">{s.icon}</p>
                <p className="text-white font-bold text-xs sm:text-sm mt-1 wrap-break-word">{s.val}</p>
                <p className="text-[10px] sm:text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="px-6 pb-4 text-center">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>#AirAstana #GreenFlight #ClimateAction</p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="w-full py-4 text-sm font-bold uppercase tracking-wide transition-opacity active:opacity-75"
          style={{ background: GOLD, color: '#fff', borderRadius: '0' }}
        >
          {copied ? '✓ Скопировано!' : navigator.share ? '📤 Поделиться' : '📋 Скопировать текст'}
        </button>
        <button
          onClick={onClose}
          className="w-full py-4 text-sm"
          style={{ background: NAVY, color: 'rgba(255,255,255,0.45)' }}
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default function ClimateImpactPage() {
  const [showShare, setShowShare] = useState(false)

  const totalKzt = FLIGHTS.reduce((s, f) => s + f.donated, 0)
  const totalKg = kgCO2(totalKzt)
  const totalTonnes = (totalKg / 1000).toFixed(2)
  const trees = Math.round(totalKg / 22)
  const km = Math.round(totalKg / 0.12)
  const maxMonthly = Math.max(...MONTHLY.map(m => m.kzt))
  const progressPct = Math.min(totalKg / 1000, 1)
  const r = 40
  const circ = 2 * Math.PI * r

  return (
    <div className="space-y-3 pb-4">
      {/* Hero card */}
      <div className="rounded overflow-hidden" style={{ background: NAVY }}>
        <div className="px-5 pt-5 pb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Личный кабинет
          </p>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ background: 'rgba(196,154,60,0.2)', color: GOLD, border: `1px solid rgba(196,154,60,0.35)` }}
          >
            🌿 GreenFlight
          </span>
        </div>

        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Всего компенсировано</p>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-white leading-none">{totalKg}</span>
              <span className="text-lg sm:text-xl font-bold mb-1" style={{ color: GOLD }}>кг</span>
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>CO₂ · ≈ {totalTonnes} т</p>
            <p className="text-xs mt-1 wrap-break-word" style={{ color: GOLD }}>{fmt(totalKzt)} ₸ → Green Fund</p>
          </div>

          {/* Progress ring */}
          <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
            <svg width="96" height="96" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
              <circle
                cx="50" cy="50" r={r} fill="none"
                stroke={GOLD} strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progressPct)}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-black text-lg text-white leading-none">{Math.round(progressPct * 100)}%</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>до 1 т</span>
            </div>
          </div>
        </div>

        {/* Mini stats strip */}
        <div className="grid grid-cols-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {[
            { icon: '🌳', val: trees, label: 'деревьев / год' },
            { icon: '🚗', val: `${fmt(km)} км`, label: 'без авто' },
            { icon: '✈️', val: Math.round(totalKg / 87), label: 'рейсов компенс.' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="py-3 text-center"
              style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
            >
              <p className="text-base">{s.icon}</p>
              <p className="font-bold text-xs sm:text-sm mt-0.5 text-white wrap-break-word">{s.val}</p>
              <p className="text-[10px] sm:text-xs leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly bar chart */}
      <div className="bg-white border rounded overflow-hidden" style={{ borderColor: '#e0e4eb' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#e0e4eb', background: '#f8f9fb' }}>
          <div>
            <p className="font-bold text-sm" style={{ color: NAVY }}>Вклад по месяцам</p>
            <p className="text-xs text-gray-400 mt-0.5">2026 · тенге / кг CO₂</p>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ background: '#f5edd6', color: GOLD, border: `1px solid #e8d5a0` }}
          >
            {MONTHLY.length} мес.
          </span>
        </div>
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-end gap-3" style={{ height: 110 }}>
            {MONTHLY.map(m => {
              const heightPct = Math.round((m.kzt / maxMonthly) * 100)
              const kg = kgCO2(m.kzt)
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <span className="text-[10px] sm:text-xs font-semibold text-center" style={{ color: GOLD }}>{kg} кг</span>
                  <div className="w-full flex items-end" style={{ height: 64 }}>
                    <div
                      className="w-full"
                      style={{
                        height: `${heightPct}%`,
                        background: `linear-gradient(to top, ${NAVY}, #2d4a7a)`,
                        borderRadius: '3px 3px 0 0',
                        minHeight: 4,
                      }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold" style={{ color: NAVY }}>{m.month}</span>
                  <span className="text-[10px] sm:text-xs text-center" style={{ color: '#9aa5b4' }}>{fmt(m.kzt)}₸</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Flight history */}
      <div className="bg-white border rounded overflow-hidden" style={{ borderColor: '#e0e4eb' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: '#e0e4eb', background: '#f8f9fb' }}>
          <p className="font-bold text-sm" style={{ color: NAVY }}>История рейсов</p>
          <p className="text-xs text-gray-400 mt-0.5">Каждый рейс — ваш вклад</p>
        </div>
        <div>
          {FLIGHTS.map((f, i) => {
            const kg = kgCO2(f.donated)
            const cumulative = kgCO2(FLIGHTS.slice(0, i + 1).reduce((s, x) => s + x.donated, 0))
            return (
              <div
                key={f.id}
                className="px-4 py-3 flex items-center gap-3"
                style={{ borderBottom: i < FLIGHTS.length - 1 ? '1px solid #e0e4eb' : 'none' }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 36, height: 36, borderRadius: '50%', background: '#f5edd6', border: `1px solid #e8d5a0`, fontSize: 16 }}
                >
                  ✈️
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-semibold text-sm" style={{ color: NAVY }}>{f.route}</span>
                    <span className="text-xs" style={{ color: '#9aa5b4' }}>{f.flight}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#9aa5b4' }}>
                    {new Date(f.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold" style={{ color: '#16a34a' }}>+{kg} кг</p>
                  <p className="text-xs" style={{ color: GOLD }}>{fmt(f.donated)} ₸</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Badge */}
      <div className="border rounded px-4 py-4 flex items-center gap-4" style={{ background: '#fdf8ee', borderColor: '#e8d5a0' }}>
        <div className="text-4xl shrink-0">🏅</div>
        <div>
          <p className="font-bold text-sm" style={{ color: NAVY }}>Зелёный путешественник</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Вы компенсировали {Math.round(totalKg / 87)} внутренних рейса. До следующего значка — {1000 - totalKg} кг CO₂
          </p>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: '#e8d5a0', width: '100%' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min((totalKg / 1000) * 100, 100)}%`, background: GOLD, transition: 'width 1s ease' }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: GOLD }}>{totalKg} / 1000 кг</p>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={() => setShowShare(true)}
        className="w-full py-3.5 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
        style={{ background: NAVY, color: '#fff', borderRadius: '2px' }}
      >
        <span>📤</span>
        <span>Поделиться своим вкладом</span>
      </button>

      {showShare && (
        <ShareModal
          onClose={() => setShowShare(false)}
          totalKg={totalKg}
          totalKzt={totalKzt}
          trees={trees}
          km={km}
        />
      )}
    </div>
  )
}
