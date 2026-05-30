import React from 'react'

export default function Features() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Why Chakwal Bus Tracker?</h2>
          <p>Designed specifically for the people of Chakwal</p>
        </div>
        <div className="features-grid">
          <div className="feat">
            <div className="feat-icon"><i className="fa-solid fa-clock" /></div>
            <h4>Accurate Scheduled Arrivals</h4>
            <p>Stop-level arrival times are calculated from route schedules so commuters can plan trips with confidence.</p>
          </div>
          <div className="feat">
            <div className="feat-icon"><i className="fa-solid fa-language" /></div>
            <h4>Bilingual Stop Information</h4>
            <p>English and Urdu stop names improve accessibility for students, workers, families, and daily passengers.</p>
          </div>
          <div className="feat">
            <div className="feat-icon"><i className="fa-solid fa-route" /></div>
            <h4>Complete Route Coverage</h4>
            <p>Balkassar, Dhudial, and Mulhal Mughlan routes include both forward and return direction timetables.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
