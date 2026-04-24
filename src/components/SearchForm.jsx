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
      className="absolute top-full left-0 bg-white shadow-xl z-50 overflow-y-auto"
      style={{ border: `1px solid #e0e4eb`, minWidth: '280px', maxHeight: '320px' }}
    >
      <div className="px-4 py-2.5 border-b" style={{ borderColor: '#e0e4eb' }}>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#9aa5b4' }}>
          ВСЕ АЭРОПОРТЫ
        </span>
      </div>
      {airports.map((a, i) => (
        <button
          key={a.code}
          onClick={() => { onSelect(a); onClose() }}
          className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-[#fdf8ee]"
          style={{ borderBottom: i < airports.length - 1 ? '1px solid #f0f0f0' : 'none' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: NAVY }}>{a.city}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9aa5b4' }}>{a.country}</p>
          </div>
          <span className="text-sm font-bold ml-4" style={{ color: NAVY }}>{a.code}</span>
        </button>
      ))}
    </div>
  )
}

function PassengerCounter({ label, desc, value, min, onChange }) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0" style={{ borderColor: '#e0e4eb' }}>
      <div>
        <p className="font-semibold text-sm" style={{ color: NAVY }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: '#9aa5b4' }}>{desc}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg font-bold leading-none transition-opacity hover:opacity-70"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          −
        </button>
        <span className="w-4 text-center font-bold text-base" style={{ color: NAVY }}>{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg font-bold leading-none transition-opacity hover:opacity-70"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function SearchForm({ onSearch }) {
  const [tripType, setTripType] = useState('oneway')
  const [fromVal, setFromVal] = useState('')
  const [toVal, setToVal]     = useState('')
  const [fromSelected, setFromSelected] = useState(null)
  const [toSelected,   setToSelected]   = useState(null)
  const [showFrom, setShowFrom]   = useState(false)
  const [showTo,   setShowTo]     = useState(false)
  const [showPax,  setShowPax]    = useState(false)
  const [dateVal,  setDateVal]    = useState('')
  const [passengers, setPassengers] = useState({ adult: 1, child: 0, infant: 0 })

  const fromRef = useRef()
  const toRef   = useRef()
  const paxRef  = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFrom(false)
      if (toRef.current   && !toRef.current.contains(e.target))   setShowTo(false)
      if (paxRef.current  && !paxRef.current.contains(e.target))  setShowPax(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filteredFrom = AIRPORTS.filter(a =>
    !fromVal || a.city.toLowerCase().includes(fromVal.toLowerCase()) || a.code.toLowerCase().includes(fromVal.toLowerCase())
  )
  const filteredTo = AIRPORTS.filter(a =>
    !toVal || a.city.toLowerCase().includes(toVal.toLowerCase()) || a.code.toLowerCase().includes(toVal.toLowerCase())
  )

  function swap() {
    setFromVal(toVal);   setToVal(fromVal)
    setFromSelected(toSelected); setToSelected(fromSelected)
  }

  const totalPax = passengers.adult + passengers.child + passengers.infant
  function paxLabel() {
    if (totalPax === 1) return '1 Пассажир'
    if (totalPax < 5)  return `${totalPax} Пассажира`
    return `${totalPax} Пассажиров`
  }

  const TABS = ['Купить', 'Моя бронь/Регистрация', 'Статус рейса']
  const [activeTab, setActiveTab] = useState(0)

  const inputBase = {
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '14px',
    color: NAVY,
  }

  return (
    <div className="bg-white shadow-md" style={{ border: `1px solid #e0e4eb` }}>
      {/* Tabs */}
      <div className="border-b flex" style={{ borderColor: '#e0e4eb' }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className="relative px-5 py-3.5 text-sm transition-colors"
            style={{
              color: i === activeTab ? GOLD : '#555',
              fontWeight: i === activeTab ? 600 : 400,
              borderBottom: i === activeTab ? `2px solid ${GOLD}` : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-5 pt-4 pb-5">
        {/* Trip type + checkboxes */}
        <div className="flex items-center gap-5 mb-4 flex-wrap">
          {[['roundtrip', 'Туда и обратно'], ['oneway', 'В одну сторону']].map(([val, label]) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setTripType(val)}
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: tripType === val ? GOLD : '#c0c0c0' }}
              >
                {tripType === val && <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />}
              </div>
              <span className="text-sm" style={{ color: NAVY }}>{label}</span>
            </label>
          ))}

          <div className="ml-auto flex items-center gap-5 flex-wrap">
            {['Купить в тенге', 'Только возвратные билеты', 'Купить за баллы Nomad'].map(cb => (
              <label key={cb} className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  className="w-4 h-4 border-2 flex-shrink-0"
                  style={{ borderColor: '#c0c0c0', borderRadius: '2px' }}
                />
                <span className="text-sm" style={{ color: '#555' }}>{cb}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Input row */}
        <div className="flex" style={{ border: `1px solid #e0e4eb` }}>

          {/* FROM */}
          <div ref={fromRef} className="flex-1 relative border-r" style={{ borderColor: '#e0e4eb' }}>
            <div className="relative h-full">
              {fromSelected && (
                <span className="absolute top-2 left-3 text-xs" style={{ color: GOLD }}>Откуда</span>
              )}
              <input
                style={{ ...inputBase, paddingTop: fromSelected ? '22px' : '14px', paddingBottom: '14px', paddingLeft: '12px', paddingRight: '12px', width: '100%', background: 'transparent' }}
                placeholder={fromSelected ? '' : 'Откуда'}
                value={fromVal}
                onChange={e => { setFromVal(e.target.value); setFromSelected(null); setShowFrom(true) }}
                onFocus={() => setShowFrom(true)}
              />
            </div>
            {showFrom && filteredFrom.length > 0 && (
              <AirportDropdown airports={filteredFrom} onSelect={a => { setFromSelected(a); setFromVal(a.city) }} onClose={() => setShowFrom(false)} />
            )}
          </div>

          {/* Swap button */}
          <button
            onClick={swap}
            className="flex items-center justify-center flex-shrink-0 border-r transition-colors hover:bg-gray-50"
            style={{ width: '44px', borderColor: '#e0e4eb' }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 3v10M6 13l-3-3m3 3l3-3M14 17V7m0 0l3 3m-3-3l-3 3" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* TO */}
          <div ref={toRef} className="flex-1 relative border-r" style={{ borderColor: '#e0e4eb' }}>
            <div className="relative h-full">
              {toSelected && (
                <span className="absolute top-2 left-3 text-xs" style={{ color: GOLD }}>Куда</span>
              )}
              <input
                style={{ ...inputBase, paddingTop: toSelected ? '22px' : '14px', paddingBottom: '14px', paddingLeft: '12px', paddingRight: '12px', width: '100%', background: 'transparent' }}
                placeholder={toSelected ? '' : 'Куда'}
                value={toVal}
                onChange={e => { setToVal(e.target.value); setToSelected(null); setShowTo(true) }}
                onFocus={() => setShowTo(true)}
              />
            </div>
            {showTo && filteredTo.length > 0 && (
              <AirportDropdown airports={filteredTo} onSelect={a => { setToSelected(a); setToVal(a.city) }} onClose={() => setShowTo(false)} />
            )}
          </div>

          {/* DATE */}
          <div className="border-r relative flex-shrink-0" style={{ borderColor: '#e0e4eb', width: '120px', background: '#fafafa' }}>
            <span className="absolute top-2 left-3 text-xs" style={{ color: GOLD }}>Когда</span>
            <input
              type="date"
              value={dateVal}
              onChange={e => setDateVal(e.target.value)}
              style={{ ...inputBase, paddingTop: '22px', paddingBottom: '14px', paddingLeft: '12px', paddingRight: '8px', width: '100%', background: 'transparent', color: dateVal ? NAVY : '#aaa' }}
            />
          </div>

          {/* RETURN DATE */}
          <div
            className="border-r flex-shrink-0 flex items-center gap-1.5 px-3"
            style={{ borderColor: '#e0e4eb', width: '120px', background: '#fafafa', opacity: tripType === 'roundtrip' ? 1 : 0.4 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke={tripType === 'roundtrip' ? GOLD : '#c0c0c0'} strokeWidth="1.4"/>
              <path d="M7 4v3l2 2" stroke={tripType === 'roundtrip' ? GOLD : '#c0c0c0'} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span className="text-sm" style={{ color: '#9aa5b4' }}>Обратно</span>
          </div>

          {/* PASSENGERS */}
          <div ref={paxRef} className="relative border-r flex-shrink-0" style={{ borderColor: '#e0e4eb', width: '160px', background: '#fafafa' }}>
            <button
              onClick={() => setShowPax(!showPax)}
              className="w-full h-full px-3 text-left flex flex-col justify-center"
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
            >
              <span className="text-xs" style={{ color: GOLD }}>Пассажиры</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-sm font-medium" style={{ color: NAVY }}>{paxLabel()}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="#9aa5b4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            {showPax && (
              <div
                className="absolute top-full right-0 bg-white shadow-xl z-50 p-5"
                style={{ border: `1px solid #e0e4eb`, width: '320px' }}
              >
                <p className="font-bold text-base mb-1" style={{ color: NAVY }}>Выберите количество</p>
                <PassengerCounter label="Взрослый"  desc="15+"               value={passengers.adult}  min={1} onChange={v => setPassengers(p => ({ ...p, adult: v }))} />
                <PassengerCounter label="Ребенок"   desc="2–14 лет на момент вылета"  value={passengers.child}  min={0} onChange={v => setPassengers(p => ({ ...p, child: v }))} />
                <PassengerCounter label="Младенец"  desc="До 2 лет на момент прилета" value={passengers.infant} min={0} onChange={v => setPassengers(p => ({ ...p, infant: v }))} />
                <p className="text-xs mt-3" style={{ color: '#9aa5b4', lineHeight: 1.5 }}>
                  Дети должны сопровождаться взрослым старше 18 лет (включительно) на момент вылета.
                </p>
                <button
                  onClick={() => setShowPax(false)}
                  className="mt-4 w-full py-2.5 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                  style={{ background: GOLD, color: '#fff', borderRadius: '1px' }}
                >
                  ГОТОВО
                </button>
              </div>
            )}
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={onSearch}
            className="flex-shrink-0 font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-90"
            style={{ background: GOLD, color: '#fff', padding: '0 28px', minWidth: '100px', borderRadius: '0' }}
          >
            ПОИСК
          </button>
        </div>
      </div>
    </div>
  )
}
