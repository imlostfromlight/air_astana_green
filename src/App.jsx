import { useState } from 'react'
import FlightCard from './components/FlightCard'
import BaggageStep from './components/BaggageStep'
import PaymentStep from './components/PaymentStep'
import SuccessStep from './components/SuccessStep'
import ClimateImpactPage from './components/ClimateImpactPage'

const STEPS = ['Рейс', 'Багаж', 'Оплата', 'Готово']

export default function App() {
  const [tab, setTab] = useState('booking')
  const [step, setStep] = useState(0)
  const [baggageKg, setBaggageKg] = useState(23)
  const [roundUp, setRoundUp] = useState(false)

  const basePrice = 52377
  const baggageFee = baggageKg > 23 ? (baggageKg - 23) * 900 : 0
  const subtotal = basePrice + baggageFee
  const roundedTotal = Math.ceil(subtotal / 1000) * 1000
  const donation = roundedTotal - subtotal
  const total = roundUp ? roundedTotal : subtotal

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-100 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-sky-700 font-bold text-xl tracking-tight">Air</span>
            <span className="text-slate-800 font-bold text-xl tracking-tight">Astana</span>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
            <span>🌿</span>
            <span>GreenFlight</span>
          </div>
        </div>
      </header>

      {/* Booking steps bar — only visible on booking tab */}
      {tab === 'booking' && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                      ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span className={`text-sm hidden sm:block ${i === step ? 'text-sky-700 font-medium' : i < step ? 'text-green-600' : 'text-slate-400'}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-green-400' : 'bg-slate-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-6">
        {tab === 'booking' && (
          <>
            {step === 0 && <FlightCard onNext={() => setStep(1)} />}
            {step === 1 && (
              <BaggageStep
                baggageKg={baggageKg}
                setBaggageKg={setBaggageKg}
                baggageFee={baggageFee}
                onNext={() => setStep(2)}
                onBack={() => setStep(0)}
              />
            )}
            {step === 2 && (
              <PaymentStep
                basePrice={basePrice}
                baggageFee={baggageFee}
                subtotal={subtotal}
                roundUp={roundUp}
                setRoundUp={setRoundUp}
                donation={donation}
                total={total}
                roundedTotal={roundedTotal}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && <SuccessStep total={total} roundUp={roundUp} donation={donation} />}
          </>
        )}

        {tab === 'impact' && <ClimateImpactPage />}
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30">
        <div className="max-w-2xl mx-auto flex">
          {[
            { id: 'booking', icon: '🎫', label: 'Билеты' },
            { id: 'impact', icon: '🌿', label: 'Мой вклад' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors
                ${tab === t.id ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="text-xl leading-none">{t.icon}</span>
              <span>{t.label}</span>
              {tab === t.id && <div className="absolute bottom-0 w-12 h-0.5 bg-green-500 rounded-full" />}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
