import React from 'react'

export default function Hero() {
  return (
    <section className="hero">
      <h1>Smart Transit for<br />Chakwal City</h1>
      <p>Real-time bus tracking for Balkassar, Dhudial, and Mulhal Mughlan routes — built with exact schedule data for every stop.</p>
      <a href="#tracker" className="hero-btn">
        Start Tracking <i className="fa-solid fa-arrow-right" />
      </a>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">3</div>
          <div className="hero-stat-label">Routes</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">60+</div>
          <div className="hero-stat-label">Stops</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">Live</div>
          <div className="hero-stat-label">Arrivals</div>
        </div>
      </div>
    </section>
  )
}
