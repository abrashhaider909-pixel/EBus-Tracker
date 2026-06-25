import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import Features from './components/Features.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />

      <Hero />

      {/* TRACKER */}
      <section id="tracker" className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Live Bus Tracker</h2>
            <p>Select your route and stop to see exact arrival times</p>
          </div>
          <div className="widget-wrap">
            <Dashboard />
          </div>
          <div className="traveller-note">
            <i className="fa-solid fa-circle-info" />
            مسافروں سے گزارش ہے کہ بس اسٹاپ پر مقررہ وقت سے کم از کم 10 منٹ پہلے پہنچیں، کیونکہ ٹریفک، موسم، سڑک کی حالت یا دیگر عوامل کی وجہ سے بس 10 منٹ پہلے یا 10 منٹ تاخیر سے پہنچ سکتی ہے۔
          </div>
        </div>
      </section>

      <Features />

      <About />

      <Contact />

      <Footer />

      <Analytics />
    </>
  )
}
