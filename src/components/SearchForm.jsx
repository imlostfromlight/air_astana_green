import { useState, useRef, useEffect } from 'react'

const NAVY = '#1B2B4B'
const GOLD = '#B09040'

const AIRPORTS = [
  { city: 'Алматы',    code: 'ALA', country: 'Казахстан' },
  { city: 'Астана',    code: 'TSE', country: 'Казахстан' },
  { city: 'Актау',     code: 'SCO', country: 'Казахстан' },
  { city: 'Актобе',    code: 'AKX', country: 'Казахстан' },
  { city: 'Атырау',    code: 'GUW', country: 'Казахстан' },
  { city: 'Шымкент',   code: 'CIT', country: 'Казахстан' },
  { city: 'Усть-Каменогорск', code: 'UKK', country: 'Казахстан' },
  { city: 'Дубай',     code: 'DXB', country: 'ОАЭ' },
  { city: 'Абу-Даби',  code: 'AUH', country: 'ОАЭ' },
  { city: 'Стамбул',   code: 'IST', country: 'Турция' },
  { city: 'Москва',    code: 'SVO', country: 'Россия' },
  { city: 'Лондон',    code: 'LHR', country: 'Великобритания' },
  { city: 'Франкфурт', code: 'FRA', country: 'Германия' },
  { city: 'Пекин',     code: 'PEK', country: 'Китай' },
  { city: 'Сеул',      code: 'ICN', country: 'Южная Корея' },
  { city: 'Бангкок',   code: 'BKK', country: 'Таиланд' },
]

function AirportDropdown({ airports, onSelect, onClose }) {
  return (
    <div
      className="absolute top-full left-0 right-0 bg-white z-50 overflow-y-auto"
      style={{ border: `1px solid #e0e4eb`, borderTop: 'none', maxHeight: '260px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
    >
      <div className="px-4 py-2 border-b sticky top-0 bg-white" style={{ borderColor: '#f0f0f0' }}>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#9aa5b4' }}>
          ВСЕ АЭРОПОРТЫ
        </span>
      </div>
      {airports.map((a, i) => (
        <button
          key={a.code}
          onMouseDown={e => { e.preventDefault(); onSelect(a); onClose() }}
          className="w-full px-4 flex items-center justify-between text-left transition-colors active:bg-[#fdf8ee]"
          style={{
            minHeight: '52px',
            borderBottom: i < airports.length - 1 ? '1px solid #f5f5f5' : 'none',
          }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: NAVY }}>{a.city}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9aa5b4' }}>{a.country}</p>
          </div>
          <span className="text-sm font-bold ml-3 shrink-0" style={{ color: NAVY }}>{a.code}</span>
        </button>
      ))}
    </div>
  )
}

function PassengerSheet({ passengers, setPassengers, onClose }) {
  function change(key, delta) {
    setPassengers(prev => ({
      ...prev,
      [key]: Math.max(key === 'adult' ? 1 : 0, prev[key] + delta),
    }))
  }
  const rows = [
    { key: 'adult',  label: 'Взрослый',  desc: '15+' },
    { key: 'child',  label: 'Ребенок',   desc: '2–14 лет на момент вылета' },
    { key: 'infant', label: 'Младенец',  desc: 'До 2 лет на момент прилета' },
  ]
  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        className="w-full bg-white"
        style={{ borderRadius: '16px 16px 0 0', paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: '#d0d0d0' }} />
        </div>
        <div className="px-5 pb-2 pt-2">
          <p className="font-bold text-base" style={{ color: NAVY }}>Выберите количество</p>
        </div>
        <div className="px-5">
          {rows.map(r => (
            <div key={r.key} className="flex items-center justify-between py-4 border-b last:border-0" style={{ borderColor: '#f0f0f0' }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: NAVY }}>{r.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#9aa5b4' }}>{r.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => change(r.key, -1)}
                  className="flex items-center justify-center rounded-full border-2 font-bold text-xl leading-none"
                  style={{ width: 44, height: 44, borderColor: GOLD, color: GOLD, flexShrink: 0 }}
                >
                  −
                </button>
                <span className="w-5 text-center font-bold text-base" style={{ color: NAVY }}>
                  {passengers[r.key]}
                </span>
                <button
                  onClick={() => change(r.key, +1)}
                  className="flex items-center justify-center rounded-full border-2 font-bold text-xl leading-none"
                  style={{ width: 44, height: 44, borderColor: GOLD, color: GOLD, flexShrink: 0 }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 pt-4 pb-5">
          <button
            onClick={onClose}
            className="w-full py-4 font-bold text-sm uppercase tracking-widest transition-opacity active:opacity-75"
            style={{ background: GOLD, color: '#fff', borderRadius: '2px' }}
          >
            ГОТОВО
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SearchForm({ onSearch }) {
  const [tripType, setTripType] = useState('oneway')
  const [fromVal, setFromVal] = useState('')
  const [toVal,   setToVal]   = useState('')
  const [fromSelected, setFromSelected] = useState(null)
  const [toSelected,   setToSelected]   = useState(null)
  const [showFrom, setShowFrom] = useState(false)
  const [showTo,   setShowTo]   = useState(false)
  const [showPax,  setShowPax]  = useState(false)
  const [dateVal,  setDateVal]  = useState('')
  const [passengers, setPassengers] = useState({ adult: 1, child: 0, infant: 0 })

  const fromRef = useRef()
  const toRef   = useRef()

  useEffect(() => {
    function onBlur(e) {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFrom(false)
      if (toRef.current   && !toRef.current.contains(e.target))   setShowTo(false)
    }
    document.addEventListener('mousedown', onBlur)
    return () => document.removeEventListener('mousedown', onBlur)
  }, [])

  const filteredFrom = AIRPORTS.filter(a =>
    !fromVal || a.city.toLowerCase().includes(fromVal.toLowerCase()) || a.code.toLowerCase().includes(fromVal.toLowerCase())
  )
  const filteredTo = AIRPORTS.filter(a =>
    !toVal || a.city.toLowerCase().includes(toVal.toLowerCase()) || a.code.toLowerCase().includes(toVal.toLowerCase())
  )

  function swap() {
    const [fc, fv, tc, tv] = [fromSelected, fromVal, toSelected, toVal]
    setFromSelected(tc); setFromVal(tv)
    setToSelected(fc);   setToVal(fv)
  }

  const totalPax = passengers.adult + passengers.child + passengers.infant
  function paxLabel() {
    if (totalPax === 1) return '1 Пассажир'
    if (totalPax < 5)  return `${totalPax} Пассажира`
    return `${totalPax} Пассажиров`
  }

  const TABS = [
    { full: 'Купить',                  short: 'Купить' },
    { full: 'Моя бронь/Регистрация',   short: 'Бронь' },
    { full: 'Статус рейса',            short: 'Статус' },
  ]
  const [activeTab, setActiveTab] = useState(0)

  const fieldStyle = {
    border: 'none', outline: 'none', background: 'transparent',
    fontFamily: 'inherit', fontSize: '16px', color: NAVY, width: '100%',
  }

  return (
    <div className="bg-white" style={{ border: `1px solid #e0e4eb`, borderTop: 'none' }}>

      {/* ── Tabs ── */}
      <div className="border-b flex overflow-x-auto" style={{ borderColor: '#e0e4eb', scrollbarWidth: 'none' }}>
        {TABS.map((t, i) => (
          <button
            key={t.full}
            onClick={() => setActiveTab(i)}
            className="px-4 py-3.5 text-sm whitespace-nowrap shrink-0 relative"
            style={{
              color: i === activeTab ? GOLD : '#666',
              fontWeight: i === activeTab ? 600 : 400,
              borderBottom: i === activeTab ? `2px solid ${GOLD}` : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            <span className="hidden sm:inline">{t.full}</span>
            <span className="sm:hidden">{t.short}</span>
          </button>
        ))}
      </div>

      <div className="p-3 sm:p-5">
        {/* ── Trip type ── */}
        <div className="flex items-center gap-4 mb-3">
          {[['oneway', 'В одну сторону'], ['roundtrip', 'Туда и обратно']].map(([val, label]) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setTripType(val)}
                className="flex items-center justify-center rounded-full border-2 shrink-0"
                style={{ width: 18, height: 18, borderColor: tripType === val ? GOLD : '#c0c0c0' }}
              >
                {tripType === val && (
                  <div className="rounded-full" style={{ width: 8, height: 8, background: GOLD }} />
                )}
              </div>
              <span className="text-sm" style={{ color: NAVY }}>{label}</span>
            </label>
          ))}
        </div>

        {/* ── Inputs (stacked on mobile) ── */}
        <div style={{ border: `1px solid #e0e4eb` }}>

          {/* FROM */}
          <div ref={fromRef} className="relative border-b" style={{ borderColor: '#e0e4eb' }}>
            <div className="flex items-center">
              <div className="flex-1 px-4 py-1">
                {fromSelected && (
                  <p className="text-xs" style={{ color: GOLD }}>Откуда</p>
                )}
                <input
                  style={fieldStyle}
                  placeholder="Откуда"
                  value={fromVal}
                  onChange={e => { setFromVal(e.target.value); setFromSelected(null); setShowFrom(true) }}
                  onFocus={() => setShowFrom(true)}
                  className="py-2.5"
                />
              </div>
              {/* Swap button — visible on mobile */}
              <button
                onClick={swap}
                className="flex items-center justify-center border-l shrink-0"
                style={{ width: 48, alignSelf: 'stretch', borderColor: '#e0e4eb' }}
                aria-label="Поменять города"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M6 3v10M6 13l-3-3m3 3l3-3M14 17V7m0 0l3 3m-3-3l-3 3"
                    stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            {showFrom && filteredFrom.length > 0 && (
              <AirportDropdown airports={filteredFrom}
                onSelect={a => { setFromSelected(a); setFromVal(a.city) }}
                onClose={() => setShowFrom(false)} />
            )}
          </div>

          {/* TO */}
          <div ref={toRef} className="relative border-b" style={{ borderColor: '#e0e4eb' }}>
            <div className="px-4 py-1">
              {toSelected && (
                <p className="text-xs" style={{ color: GOLD }}>Куда</p>
              )}
              <input
                style={fieldStyle}
                placeholder="Куда"
                value={toVal}
                onChange={e => { setToVal(e.target.value); setToSelected(null); setShowTo(true) }}
                onFocus={() => setShowTo(true)}
                className="py-2.5"
              />
            </div>
            {showTo && filteredTo.length > 0 && (
              <AirportDropdown airports={filteredTo}
                onSelect={a => { setToSelected(a); setToVal(a.city) }}
                onClose={() => setShowTo(false)} />
            )}
          </div>

          {/* DATE ROW */}
          <div className="flex border-b" style={{ borderColor: '#e0e4eb' }}>
            <div className="flex-1 px-4 py-1 border-r" style={{ borderColor: '#e0e4eb' }}>
              <p className="text-xs" style={{ color: GOLD }}>Когда</p>
              <input
                type="date"
                value={dateVal}
                onChange={e => setDateVal(e.target.value)}
                style={{ ...fieldStyle, paddingTop: '6px', paddingBottom: '10px', color: dateVal ? NAVY : '#aaa' }}
              />
            </div>
            <button
              className="flex-1 px-4 py-3 text-left"
              style={{ opacity: tripType === 'roundtrip' ? 1 : 0.4 }}
              onClick={() => tripType === 'oneway' && setTripType('roundtrip')}
            >
              <p className="text-xs" style={{ color: GOLD }}>Обратно</p>
              <p className="text-sm mt-1.5" style={{ color: '#9aa5b4' }}>+ Добавить</p>
            </button>
          </div>

          {/* PASSENGERS */}
          <button
            className="w-full px-4 py-3 text-left flex items-center justify-between"
            style={{ minHeight: 56 }}
            onClick={() => setShowPax(true)}
          >
            <div>
              <p className="text-xs" style={{ color: GOLD }}>Пассажиры</p>
              <p className="text-sm font-medium mt-0.5" style={{ color: NAVY }}>{paxLabel()}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="#9aa5b4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Search button ── */}
        <button
          onClick={onSearch}
          className="w-full mt-3 font-bold text-sm uppercase tracking-widest transition-opacity active:opacity-80"
          style={{ background: GOLD, color: '#fff', height: 52, borderRadius: '2px' }}
        >
          ПОИСК
        </button>
      </div>

      {/* ── Passengers bottom sheet ── */}
      {showPax && (
        <PassengerSheet
          passengers={passengers}
          setPassengers={setPassengers}
          onClose={() => setShowPax(false)}
        />
      )}
    </div>
  )
}
