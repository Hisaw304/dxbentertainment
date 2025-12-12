import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

/**
 * FAQ.jsx
 * - Accessible accordion for FAQ
 * - Open state: pink bg / white text
 * - Closed state: white bg / black text
 * - Right-side support card with Email + WhatsApp CTAs
 * - Uses root CSS variables: --dxb-pink, --dxb-yellow, --dxb-white, --dxb-black
 */

const WA_NUMBER = "18608213853"; // keep your number (used earlier). Change if needed.
const EMAIL = "info@dxbentertainment.com";

const FAQ_ITEMS = [
  // Performance / Events
  {
    q: "Do you perform outside Dubai or the UAE?",
    a: "Yes — we accept international bookings. Our team has experience touring and coordinating travel logistics for shows, corporate events and festivals. Contact us early for availability and travel arrangements.",
  },
  {
    q: "Can you provide dancers for any type of event?",
    a: "Absolutely — we supply dancers for corporate launches, concerts, weddings, private parties, club events and more. We tailor performer style and staging to fit the event’s vibe and production needs.",
  },
  {
    q: "How much do you charge for performances or event bookings?",
    a: "Pricing depends on the number of performers, length of performance, travel, production requirements and rehearsal time. For a fast quote, email us or message on WhatsApp with event date, location, duration and number of performers.",
  },
  {
    q: "How far in advance should I book your dancers?",
    a: "For local events in Dubai we recommend booking at least 4–6 weeks in advance. For larger productions or international bookings, reserve as early as possible to secure talent and manage logistics.",
  },
  {
    q: "Do you customize performances based on event themes?",
    a: "Yes. We offer custom choreography, costume direction and show concepts aligned to your brief. Tell us your theme and goals and our creative team will draft options.",
  },
  {
    q: "Can you handle large-scale events or full-stage productions?",
    a: "Yes — we have experience supporting full-stage shows, production crews, lighting and choreography teams. For large-scale productions we work closely with your production manager to integrate performers smoothly.",
  },

  // Classes / Training
  {
    q: "Do you offer dance classes for beginners?",
    a: "Yes — we run beginner-friendly classes across multiple styles. Our coaches structure lessons to build technique, confidence and musicality from day one.",
  },
  {
    q: "What styles of dance do you teach?",
    a: "We teach contemporary, hip-hop, afrobeat, commercial, ballet foundations and more. Check our class schedule or contact us to find the best class for you.",
  },
  {
    q: "Do you offer private coaching or one-on-one sessions?",
    a: "Yes. Private coaching is available for skill development, audition prep and performance polishing. Rates are available per hour — contact us for options.",
  },
  {
    q: "How long is each dance class and how do I book?",
    a: "Most classes are 60–90 minutes. You can book via our Book a Class page or email/WhatsApp us with your preferred time and class type.",
  },
  {
    q: "Can I reschedule or cancel a class?",
    a: "Rescheduling is possible up to 24 hours before class depending on availability. Cancellations less than 24 hours may incur a fee — check our booking terms for details.",
  },
  {
    q: "Do you offer classes for kids and teens?",
    a: "Yes — we offer age-appropriate programs for kids and teens with experienced instructors and safe class sizes.",
  },

  // General
  {
    q: "What payment methods do you accept?",
    a: "We accept card payments, bank transfers and cash payment at the studio. For events we can issue invoices — please request payment terms in advance.",
  },
  {
    q: "Can I contact you on WhatsApp for quick bookings?",
    a: "Yes — use the WhatsApp button in the support box. Provide the event date, location, and a short brief and we'll respond quickly to confirm availability.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section className="faq-root" aria-labelledby="faq-heading">
      <div className="faq-inner max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <header className="faq-header text-center mb-8">
          <h2 id="faq-heading" className="faq-title">
            Question? <span className="faq-highlight">Look here.</span>
          </h2>
          <p className="faq-sub">
            Answers to the most common performance & class questions.
          </p>
        </header>

        <div className="faq-grid">
          {/* left: accordion list */}
          <div className="faq-list" role="list">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`faq-item ${isOpen ? "open" : "closed"}`}
                  role="listitem"
                >
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-q-icon" aria-hidden>
                      {isOpen ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 15L12 9L6 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="faq-a"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* right: support card */}
          <aside className="faq-support" aria-label="Need more help">
            <div className="support-card">
              {/* message icon */}
              <div className="support-icon text-center" aria-hidden>
                <MessageCircle size={40} strokeWidth={1.3} />
              </div>
              <h3 className="support-title">Have more questions?</h3>
              <p className="support-text">
                Our team can help with bookings, custom shows and class
                scheduling — get in touch via email or WhatsApp.
              </p>
              <div className="support-ctas">
                <a className="btn-email" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
                <a
                  className="btn-wa"
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
