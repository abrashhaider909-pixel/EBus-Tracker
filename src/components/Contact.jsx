import React from 'react'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Get In Touch</h2>
          <p>Have feedback or want to report a schedule change?</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>We welcome feedback from commuters. If you notice a schedule error or want to suggest improvements, please reach out.</p>
            <div className="contact-item">
              <div className="contact-icon"><i className="fa-solid fa-envelope" /></div>
              <div className="contact-text">
                <strong>Email</strong>
                <span>abrashhaider6@gmail.com</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fa-brands fa-linkedin" /></div>
              <div className="contact-text">
                <strong>LinkedIn</strong>
                <span>linkedin.com/in/abrash-haider-495b4a401</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fa-solid fa-location-dot" /></div>
              <div className="contact-text">
                <strong>Location</strong>
                <span>Chakwal, Punjab, Pakistan</span>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Muhammad Ali" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Share your feedback or report a schedule issue..." />
            </div>
            <button
              className="form-btn"
              onClick={() => alert('Message sent! Thank you for your feedback.')}
            >
              Send Message <i className="fa-solid fa-paper-plane" style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
