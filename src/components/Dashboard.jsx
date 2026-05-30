import React, { useState, useEffect } from 'react'
import { ROUTES, URDU } from '../data/busData.js'
import {
  getUpcoming, getNextForStop, getAllTimesForStop,
  findStopIndex, getNowMins, minToStr, parseTime, getRouteTime
} from '../utils/timeUtils.js'

const u = (name) => URDU[name] || name

export default function Dashboard() {
  const [routeKey, setRouteKey] = useState('balkasar')
  const [selFwdIdx, setSelFwdIdx] = useState(null)
  const [selBwdIdx, setSelBwdIdx] = useState(null)
  const [view, setView] = useState('fwd')
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 30000)
    return () => clearInterval(id)
  }, [])

  const route = ROUTES[routeKey]
  const nm = getNowMins()
  const stops = view === 'fwd' ? route.fwdStops : route.bwdStops
  const selIdx = view === 'fwd' ? selFwdIdx : selBwdIdx
  const setSelIdx = view === 'fwd' ? setSelFwdIdx : setSelBwdIdx

  const globalUpcoming = getUpcoming(route, view, 0, nm, 4)
  const masterNext = selIdx === null
    ? (globalUpcoming[0] || null)
    : getNextForStop(route, view, selIdx, nm)

  const changeRoute = (key) => {
    setRouteKey(key)
    setSelFwdIdx(null)
    setSelBwdIdx(null)
    setView('fwd')
  }

  const selectStop = (idx) => {
    setSelIdx(idx)
    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        document.querySelector('.t-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  return (
    <div className="tracker-layout">
      {/* SIDEBAR */}
      <aside className="t-sidebar">
        <div className="t-brand"><i className="fa-solid fa-bus-simple" /> Bus Tracker</div>
        {Object.entries(ROUTES).map(([key, r]) => (
          <button key={key} className={`route-btn ${routeKey === key ? 'active' : ''}`} onClick={() => changeRoute(key)}>
            {r.shortName}
            <small>{r.fwdLabel.replace(' →', '')}</small>
          </button>
        ))}
        <div style={{ marginTop: 24, fontSize: '.78rem', color: '#94a3b8', lineHeight: 1.6 }}>
          <strong style={{ display: 'block', marginBottom: 6, color: '#64748b' }}>Operating Hours</strong>
          First: {minToStr(parseTime(getRouteTime(route, view, 'firstBus')))}<br />
          Last: {minToStr(parseTime(getRouteTime(route, view, 'lastBus')))}<br />
          Interval: every {route.interval} min
        </div>
      </aside>

      {/* MAIN */}
      <div className="t-main">
        {/* Mobile Tabs */}
        <div className="mobile-tabs">
          {Object.entries(ROUTES).map(([key, r]) => (
            <button key={key} className={`mob-tab ${routeKey === key ? 'active' : ''}`} onClick={() => changeRoute(key)}>
              {r.shortName}
            </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="t-status">
          <div className="t-status-left">
            <div className="t-status-label">
              {selIdx !== null
                ? `Next at ${stops[selIdx]}`
                : `Next from ${view === 'fwd' ? route.fwdStops[0] : route.bwdStops[0]}`}
            </div>
            <div className="t-status-time">{masterNext ? masterNext.time : 'No Service'}</div>
            <div className="t-status-sub">{route.name}</div>
          </div>
          <div className="upcoming-box">
            <div className="upcoming-title">Next departures</div>
            <div className="upcoming-grid">
              {globalUpcoming.length
                ? globalUpcoming.map((b, i) => (
                  <div key={i} className="upcoming-item">
                    <div className="upcoming-item-label">{i === 0 ? 'Next' : i === 1 ? 'Then' : i === 2 ? '+2' : '+3'}</div>
                    <div className="upcoming-item-time">{b.time}</div>
                  </div>
                ))
                : <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.8rem' }}>No more buses today</div>}
            </div>
          </div>
        </div>

        {/* Direction Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#fff' }}>
          {['fwd', 'bwd'].map(d => (
            <button key={d} onClick={() => setView(d)} style={{ flex: 1, padding: '13px', border: 'none', background: 'transparent', fontFamily: 'Inter', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer', borderBottom: `3px solid ${view === d ? 'var(--green)' : 'transparent'}`, color: view === d ? 'var(--green)' : 'var(--sub)', transition: '.2s' }}>
              <i className={`fa-solid fa-arrow-${d === 'fwd' ? 'right' : 'left'}`} style={{ marginRight: 8 }} />
              {d === 'fwd' ? route.fwdLabel : route.bwdLabel}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="t-body">
          {/* Stop List */}
          <div className="stop-list">
            {stops.map((stop, idx) => {
              const next = getNextForStop(route, view, idx, nm)
              const arriving = next && (next.mins - nm) < 8
              const badgeText = next ? (arriving ? 'Arriving' : next.time) : 'Ended'
              const badgeClass = !next ? 'badge-ended' : arriving ? 'badge-arriving' : 'badge-soon'
              return (
                <div key={idx} className={`stop-item ${selIdx === idx ? 'active' : ''}`} onClick={() => selectStop(idx)}>
                  <div className="stop-num">{idx + 1}</div>
                  <div className="stop-info">
                    <span className="stop-name-urdu">{u(stop)}</span>
                    <span className="stop-name-eng">{stop}</span>
                  </div>
                  <span className={`stop-badge ${badgeClass}`}>{badgeText}</span>
                </div>
              )
            })}
          </div>

          {/* Details */}
          <div className="t-details">
            {selIdx === null ? (
              <div className="no-stop">
                <i className="fa-solid fa-hand-pointer" style={{ fontSize: '2rem', color: '#cbd5e1', marginBottom: 14, display: 'block' }} />
                Select a stop to view full schedule
              </div>
            ) : (() => {
              const stop = stops[selIdx]
              const fwdIdx = view === 'fwd' ? selIdx : findStopIndex(route, 'fwd', stop)
              const bwdIdx = view === 'bwd' ? selIdx : findStopIndex(route, 'bwd', stop)
              const fwdNext = getNextForStop(route, 'fwd', fwdIdx, nm)
              const bwdNext = getNextForStop(route, 'bwd', bwdIdx, nm)
              const fwdAll = getUpcoming(route, 'fwd', fwdIdx, nm, 12)
              const bwdAll = getUpcoming(route, 'bwd', bwdIdx, nm, 12)
              const fwdFull = getAllTimesForStop(route, 'fwd', fwdIdx)
              const bwdFull = getAllTimesForStop(route, 'bwd', bwdIdx)
              const maxRows = Math.max(fwdAll.length, bwdAll.length)

              return (
                <>
                  <div className="detail-header">
                    <div className="detail-urdu">{u(stop)}</div>
                    <div className="detail-eng">{stop}</div>
                  </div>
                  <div className="detail-cards">
                    <div className="detail-card">
                      <div className="detail-card-label">Next — {route.fwdLabel}</div>
                      <div className="detail-card-time">{fwdNext ? fwdNext.time : '—'}</div>
                      <div className="detail-card-direction">{fwdNext ? `Dep. ${minToStr(fwdNext.dep)} from origin` : 'No more today'}</div>
                    </div>
                    <div className="detail-card">
                      <div className="detail-card-label">Next — {route.bwdLabel}</div>
                      <div className="detail-card-time">{bwdNext ? bwdNext.time : '—'}</div>
                      <div className="detail-card-direction">{bwdNext ? `Dep. ${minToStr(bwdNext.dep)} from origin` : 'No more today'}</div>
                    </div>
                  </div>
                  <div className="tbl-wrap">
                    <h5>Upcoming Arrivals at this Stop</h5>
                    <table>
                      <thead><tr><th>{route.fwdLabel}</th><th>{route.bwdLabel}</th></tr></thead>
                      <tbody>
                        {Array.from({ length: maxRows }).map((_, i) => {
                          const f = fwdAll[i]
                          const b = bwdAll[i]
                          const fNext = f && fwdNext && f.mins === fwdNext.mins
                          const bNext = b && bwdNext && b.mins === bwdNext.mins
                          return (
                            <tr key={i} className={(fNext || bNext) ? 'next-row' : ''}>
                              <td>{f ? f.time : '—'}</td>
                              <td>{b ? b.time : '—'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="full-schedule">
                    <h5>Full Daily Timetable at this Stop</h5>
                    <div className="full-grid">
                      <div className="full-panel">
                        <div className="full-panel-title">{route.fwdLabel}</div>
                        {fwdFull.length ? (
                          <div className="time-list">
                            {fwdFull.map((bus, i) => (
                              <div key={i} className={`time-chip ${fwdNext && bus.mins === fwdNext.mins ? 'next' : ''}`}>{bus.time}</div>
                            ))}
                          </div>
                        ) : <div className="empty-times">No schedule found</div>}
                      </div>
                      <div className="full-panel">
                        <div className="full-panel-title">{route.bwdLabel}</div>
                        {bwdFull.length ? (
                          <div className="time-list">
                            {bwdFull.map((bus, i) => (
                              <div key={i} className={`time-chip ${bwdNext && bus.mins === bwdNext.mins ? 'next' : ''}`}>{bus.time}</div>
                            ))}
                          </div>
                        ) : <div className="empty-times">No schedule found</div>}
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
