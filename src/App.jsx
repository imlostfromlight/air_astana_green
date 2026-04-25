import { useState } from 'react'
import Logo from './components/Logo'
import SearchForm from './components/SearchForm'
import FlightCard from './components/FlightCard'
import BaggageStep from './components/BaggageStep'
import PaymentStep from './components/PaymentStep'
import SuccessStep from './components/SuccessStep'
import ClimateImpactPage from './components/ClimateImpactPage'

// step -1 = search, 0..3 = booking flow
const FLOW_STEPS = ['Рейс', 'Багаж', 'Оплата', 'Готово']
const NAVY = '#1B2B4B'
const GOLD = '#B09040'

export default function App() {
  const [tab,  setTab]  = useState('booking')
  const [step, setStep] = useState(-1)
  const [baggageKg,  setBaggageKg]  = useState(23)
  const [roundUp,    setRoundUp]    = useState(false)

  const basePrice    = 52377
  const baggageFee   = baggageKg > 23 ? (baggageKg - 23) * 900 : 0
  const subtotal     = basePrice + baggageFee
  const roundedTotal = Math.ceil(subtotal / 1000) * 1000
  const donation     = roundedTotal - subtotal
  const total        = roundUp ? roundedTotal : subtotal

  function handleSearch() {
    setStep(0)
  }

  return (
    <div className="min-h-screen" style={{ background: '#f2f4f7', paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>

      {/* ── Top header bar ── */}
      <header className="bg-white border-b sticky top-0 z-30" style={{ borderColor: '#e0e4eb' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => { setTab('booking'); setStep(-1) }} className="py-1.5 -my-1.5">
            <Logo height={36} />
          </button>
          <div
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5"
            style={{ background: '#f5edd6', color: GOLD, border: `1px solid #e0c97a`, borderRadius: '2px' }}
          >
            🌿 GreenFlight
          </div>
        </div>
      </header>

      {/* ── Step progress bar ── */}
      {tab === 'booking' && step >= 0 && (
        <div className="bg-white border-b" style={{ borderColor: '#e0e4eb' }}>
          <div className="max-w-3xl mx-auto px-4 py-2.5">
            <div className="flex items-center">
              {FLOW_STEPS.map((label, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="flex items-center justify-center rounded-full text-xs font-bold shrink-0"
                      style={{
                        width: 24, height: 24,
                        background: i < step ? GOLD : i === step ? NAVY : '#e0e4eb',
                        color: i <= step ? '#fff' : '#9aa5b4',
                      }}
                    >
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span
                      className="text-xs hidden sm:block"
                      style={{ color: i === step ? NAVY : i < step ? GOLD : '#9aa5b4', fontWeight: i === step ? 600 : 400 }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-1.5" style={{ background: i < step ? GOLD : '#e0e4eb' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 py-5">

        {/* ══ BOOKING TAB ══ */}
        {tab === 'booking' && (
          <>
            {/* Search screen */}
            {step === -1 && (
              <div className="space-y-0">
                {/* Hero banner */}
                <div
                  className="relative overflow-hidden flex items-end"
                  style={{
                    background: `linear-gradient(135deg, ${NAVY} 0%, #2d4a7a 60%, #3a5f9a 100%)`,
                    height: '110px',
                  }}
                >
                  <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full opacity-10" style={{ background: GOLD }} />
                  <div className="px-4 pb-4 z-10">
                    <p className="text-white text-lg sm:text-xl font-bold">Из Казахстана</p>
                    <div
                      className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold px-2 py-0.5"
                      style={{ background: 'rgba(176,144,64,0.25)', color: '#e8c96a', border: '1px solid rgba(176,144,64,0.4)', borderRadius: '2px' }}
                    >
                      🌿 Зелёные рейсы доступны
                    </div>
                  </div>
                </div>

                {/* Search form sits flush below hero */}
                <SearchForm onSearch={handleSearch} />
              </div>
            )}

            {step === 0 && <FlightCard onNext={() => setStep(1)} />}
            {step === 1 && (
              <BaggageStep
                baggageKg={baggageKg} setBaggageKg={setBaggageKg}
                baggageFee={baggageFee}
                onNext={() => setStep(2)} onBack={() => setStep(0)}
              />
            )}
            {step === 2 && (
              <PaymentStep
                basePrice={basePrice} baggageFee={baggageFee}
                subtotal={subtotal} roundUp={roundUp} setRoundUp={setRoundUp}
                donation={donation} total={total} roundedTotal={roundedTotal}
                onNext={() => setStep(3)} onBack={() => setStep(1)}
              />
            )}
            {step === 3 && <SuccessStep total={total} roundUp={roundUp} donation={donation} />}
          </>
        )}

        {/* ══ IMPACT TAB ══ */}
        {tab === 'impact' && <ClimateImpactPage />}
      </main>

      {/* ── Bottom tab bar ── */}
      <nav
        className="fixed bottom-0 inset-x-0 bg-white border-t z-30"
        style={{ borderColor: '#e0e4eb', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="max-w-3xl mx-auto flex">
          {[
            { id: 'booking', icon: '🎫', label: 'Бронирование' },
            { id: 'impact',  icon: '🌿', label: 'Мой вклад' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors"
              style={{ color: tab === t.id ? GOLD : '#9aa5b4' }}
            >
              {tab === t.id && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5" style={{ background: GOLD }} />
              )}
              <span className="text-xl leading-none">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
