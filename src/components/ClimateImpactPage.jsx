import { useState, useRef } from 'react'

// Rate: 1 tonne CO2 = $17.50 avg = ~8750 KZT (at 500 KZT/$)
const KZT_PER_TONNE = 8750

const FLIGHTS = [
  { id: 1, date: '2026-01-12', route: 'ALA → TSE', flight: 'KC 121', donated: 623 },
  { id: 2, date: '2026-01-28', route: 'TSE → ALA', flight: 'KC 122', donated: 1000 },
  { id: 3, date: '2026-02-14', route: 'ALA → DXB', flight: 'KC 931', donated: 2500 },
  { id: 4, date: '2026-03-05', route: 'DXB → ALA', flight: 'KC 932', donated: 2500 },
  { id: 5, date: '2026-04-24', route: 'ALA → TSE', flight: 'KC 121', donated: 623 },
]

const MONTHLY = [
  { month: 'Янв', kzt: 1623 },
  { month: 'Фев', kzt: 2500 },
  { month: 'Мар', kzt: 2500 },
  { month: 'Апр', kzt: 623 },
]

function fmt(n) { return n.toLocaleString('ru') }

function kgCO2(kzt) {
  return Math.round((kzt / KZT_PER_TONNE) * 1000)
}

function ShareModal({ onClose, totalKg, totalKzt, trees, km }) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const text = `🌿 Мой вклад в природу с Air Astana:\n✅ ${totalKg} кг CO₂ компенсировано\n🌳 ${trees} деревьев на год\n🚗 ${fmt(km)} км без авто\n💚 ${fmt(totalKzt)} ₸ передано в Green Fund\n\n#AirAstana #GreenFlight #ClimateAction`
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-sm" onClick={e => e.stopPropagation()}>
        {/* Share card — looks like a story card */}
        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #059669 100%)' }}>
          <div className="px-6 pt-6 pb-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-lg">Air</span>
              <span className="text-green-300 font-bold text-lg">Astana</span>
            </div>
            <span className="ml-auto text-green-300 text-xs bg-green-900/40 px-2 py-0.5 rounded-full">🌿 GreenFlight</span>
          </div>

          <div className="px-6 py-4 text-center">
            <p className="text-green-300 text-sm font-medium uppercase tracking-widest">Мой вклад в природу</p>
            <p className="text-white text-6xl font-black mt-2">{totalKg}</p>
            <p className="text-green-200 text-lg font-medium -mt-1">кг CO₂ компенсировано</p>
          </div>

          <div className="grid grid-cols-3 gap-2 px-5 pb-5">
            {[
              { icon: '🌳', val: `${trees}`, label: 'деревьев на год' },
              { icon: '🚗', val: `${fmt(km)} км`, label: 'без авто' },
              { icon: '💚', val: `${fmt(totalKzt)} ₸`, label: 'в Green Fund' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center">
                <p className="text-xl">{s.icon}</p>
                <p className="text-white font-bold text-sm mt-1">{s.val}</p>
                <p className="text-green-300 text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-6 py-3 text-center">
            <p className="text-green-400 text-xs">#AirAstana #GreenFlight #ClimateAction</p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors text-base"
        >
          {copied ? '✓ Скопировано!' : navigator.share ? '📤 Поделиться' : '📋 Скопировать текст'}
        </button>
        <button onClick={onClose} className="mt-2 w-full text-white/70 text-sm py-2">
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

  return (
    <div className="space-y-4 pb-4">
      {/* Hero card */}
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)' }}>
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <p className="text-green-300 text-xs font-medium uppercase tracking-widest">Личный кабинет</p>
          <span className="text-green-300 text-xs bg-green-900/30 px-2 py-0.5 rounded-full">🌿 GreenFlight</span>
        </div>
        <div className="px-6 py-4 text-center">
          <p className="text-green-300 text-sm">Всего компенсировано</p>
          <div className="flex items-end justify-center gap-1 mt-1">
            <span className="text-white text-7xl font-black leading-none">{totalKg}</span>
            <span className="text-green-300 text-2xl font-bold mb-2">кг</span>
          </div>
          <p className="text-green-200 text-base">CO₂ из атмосферы</p>
          <p className="text-green-400 text-sm mt-1">≈ {totalTonnes} тонны · {fmt(totalKzt)} ₸ передано</p>
        </div>

        {/* Progress ring (CSS) */}
        <div className="px-6 pb-6 flex justify-center">
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#34d399" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.min(totalKg / 1000, 1))}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-black text-lg leading-none">{Math.round(totalKg / 10)}%</span>
              <span className="text-green-300 text-xs">до 1 т</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact equivalents */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-5 pt-4 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Что это значит?</h3>
          <p className="text-xs text-slate-400 mt-0.5">Эквиваленты вашего вклада</p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
          {[
            { icon: '🌳', val: trees, unit: 'деревьев', desc: 'поглощают столько CO₂ за год' },
            { icon: '🚗', val: fmt(km), unit: 'км', desc: 'проехать на авто без выбросов' },
            { icon: '✈️', val: Math.round(totalKg / 87), unit: 'рейсов', desc: 'ALA–TSE полностью компенсировано' },
            { icon: '🌍', val: Math.round(totalKg / 4), unit: 'дней', desc: 'среднего следа казахстанца' },
          ].map(s => (
            <div key={s.desc} className="p-4 flex gap-3 items-start">
              <span className="text-3xl leading-none">{s.icon}</span>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-800">{s.val}</span>
                  <span className="text-sm text-slate-500">{s.unit}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-tight">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly bar chart */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">Вклад по месяцам</h3>
            <p className="text-xs text-slate-400 mt-0.5">2026 год · в тенге</p>
          </div>
          <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
            {MONTHLY.length} мес.
          </span>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-end gap-3 h-28">
            {MONTHLY.map(m => {
              const heightPct = Math.round((m.kzt / maxMonthly) * 100)
              const kg = kgCO2(m.kzt)
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-green-600 font-medium">{kg}кг</span>
                  <div className="w-full flex items-end" style={{ height: '72px' }}>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-green-600 to-green-400 transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{m.month}</span>
                  <span className="text-xs text-slate-400">{fmt(m.kzt)}₸</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CO2 accumulation timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">История рейсов</h3>
          <p className="text-xs text-slate-400 mt-0.5">Каждый рейс — ваш вклад</p>
        </div>
        <div className="divide-y divide-slate-100">
          {FLIGHTS.map((f, i) => {
            const kg = kgCO2(f.donated)
            const cumulative = kgCO2(FLIGHTS.slice(0, i + 1).reduce((s, x) => s + x.donated, 0))
            return (
              <div key={f.id} className="px-5 py-3 flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">✈️</div>
                  {i < FLIGHTS.length - 1 && <div className="w-0.5 h-4 bg-slate-100 mt-1" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-800">{f.route}</span>
                    <span className="text-xs text-slate-400">{f.flight}</span>
                  </div>
                  <p className="text-xs text-slate-400">{new Date(f.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold text-sm">+{kg} кг CO₂</p>
                  <p className="text-xs text-slate-400">итого {cumulative} кг</p>
                </div>
                <div className="w-12 text-right">
                  <p className="text-xs text-slate-500 font-medium">{fmt(f.donated)} ₸</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Badge */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-4">
        <div className="text-4xl">🏅</div>
        <div>
          <p className="font-bold text-amber-800">Зелёный путешественник</p>
          <p className="text-sm text-amber-700 mt-0.5">Вы компенсировали {Math.round(totalKg / 87)} внутренних рейса. Продолжайте — следующий значок через {1000 - totalKg} кг CO₂!</p>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={() => setShowShare(true)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors text-base flex items-center justify-center gap-2"
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
