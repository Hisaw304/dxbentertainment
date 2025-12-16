import React from "react";
import { CalendarCheck, Users, Music, PartyPopper } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-container">
        {/* HEADER */}
        <header className="how-header">
          <h2>How It Works</h2>
          <p>Booking a class or a show is quick, simple, and secure</p>
        </header>

        {/* GRID */}
        <div className="how-grid">
          {/* BOOK A CLASS */}
          <div className="how-card">
            <span className="how-tag">Dance Classes</span>

            <div className="how-icon">
              <CalendarCheck size={28} />
            </div>

            <h3>Book a Dance Class</h3>

            <ol>
              <li>
                <Users size={16} />
                Choose your dance style
              </li>
              <li>
                <Music size={16} />
                Select group or private class
              </li>
              <li>
                <CalendarCheck size={16} />
                Pick your schedule or package
              </li>
              <li>
                <PartyPopper size={16} />
                Confirm details and pay securely
              </li>
            </ol>
          </div>

          {/* BOOK A SHOW */}
          <div className="how-card">
            <span className="how-tag">Performances</span>

            <div className="how-icon">
              <PartyPopper size={28} />
            </div>

            <h3>Book a Show</h3>

            <ol>
              <li>
                <Users size={16} />
                Contact us with event details
              </li>
              <li>
                <Music size={16} />
                Tell us the date, location & vibe
              </li>
              <li>
                <CalendarCheck size={16} />
                Receive a custom quote
              </li>
              <li>
                <PartyPopper size={16} />
                Confirm booking and enjoy the show
              </li>
            </ol>
          </div>
        </div>

        {/* CTA */}
        <div className="how-cta">
          <a href="#book-a-class" className="how-btn-primary">
            Book a Class
          </a>
          <a href="/contact" className="how-btn-outline">
            Book a Show
          </a>
        </div>
      </div>
    </section>
  );
}
