import React from 'react'

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="#" className="nav-logo">
        <i className="fa-solid fa-location-dot" /> Chakwal Bus Tracker
      </a>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#tracker">Tracker</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <a href="#tracker" className="nav-cta">Track Now</a>
    </nav>
  )
}
