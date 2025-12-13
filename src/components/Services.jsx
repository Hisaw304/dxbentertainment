// src/components/Services.jsx
import React from "react";

import imgEvent from "../assets/event-dancers1.jpg";
import imgNightlife from "../assets/club-shows1.jpg";
import imgWeddings from "../assets/weddings1.jpg";
import imgGroup from "../assets/group-classes1.jpg";
import imgPrivate from "../assets/private-coaching1.jpg";
import imgKids from "../assets/kids-teens.jpg";
import imgDrummers from "../assets/africa-drummers.jpg";

/**
 * Services.jsx
 * - Two blocks: Performance Services & Dance Academy Services
 * - Responsive: lg=3 / md=2 / sm=1
 * - Headings: pink, subheading: black
 * - Images used from assets (top of card) - object-position: top center
 * - Primary CTA (Hire / Book) and secondary "Learn more" -> /services
 */

const ServiceCard = ({
  img,
  title,
  text,
  primaryText,
  primaryHref,
  delay = 0,
}) => {
  return (
    <article
      className="svc-card"
      style={{ animationDelay: `${delay}ms`, backgroundImage: `url(${img})` }}
      aria-labelledby={`svc-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="svc-overlay" />
      <div className="svc-body">
        <h3
          className="svc-title"
          id={`svc-${title.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {title}
        </h3>
        <p className="svc-text">{text}</p>
        <div className="svc-actions">
          <a href={primaryHref} className="btn-primaryyy">
            {primaryText}
          </a>
        </div>
      </div>
    </article>
  );
};

export default function Services() {
  const performance = [
    {
      img: imgEvent,
      title: "Event Dancers",
      text: "Versatile performers for product launches, festivals and live brand events.",
      cta: "Hire Dancers",
      href: "/hire-dancers",
    },
    {
      img: imgNightlife,
      title: "Club & Nightlife Shows",
      text: "High-energy specialty acts and production-ready performers for nightlife venues.",
      cta: "Hire Dancers",
      href: "/hire-dancers",
    },
    {
      img: imgWeddings,
      title: "Weddings & Corporate",
      text: "Polished choreography and bespoke entertainment for premium ceremonies and corporate evenings.",
      cta: "Hire Dancers",
      href: "/hire-dancers",
    },
    {
      img: imgDrummers,
      title: "African Drummers",
      text: "Authentic African drumming performances bringing rhythm, energy and cultural flair to any event.",
      cta: "Hire Drummers",
      href: "/hire-drummers",
    },
  ];

  const academy = [
    {
      img: imgGroup,
      title: "Group Classes",
      text: "Weekly technique and choreography sessions across contemporary, hip-hop and more.",
      cta: "Book a Class",
      href: "/book-a-class",
    },
    {
      img: imgPrivate,
      title: "Private Coaching",
      text: "One-on-one coaching tailored to goals — technique, performance polish and audition prep.",
      cta: "Book a Class",
      href: "/book-a-class",
    },
    {
      img: imgKids,
      title: "Kids & Teens Programs",
      text: "Structured, safe and fun training for young dancers at every level.",
      cta: "Book a Class",
      href: "/book-a-class",
    },
  ];

  return (
    <section className="services-root" aria-labelledby="services-heading">
      <div className="services-inner max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Performance Services */}
        <header className="services-block-header">
          <h2 id="services-heading" className="services-heading">
            Performance Services
          </h2>
          <p className="services-sub">
            Premium professional performers for events, clubs, corporate
            functions and international shows.
          </p>
        </header>

        <div
          className="services-grid"
          role="list"
          aria-label="Performance services"
        >
          {performance.map((p, i) => (
            <ServiceCard
              key={p.title}
              img={p.img}
              title={p.title}
              text={p.text}
              primaryText={p.cta}
              primaryHref={p.href}
              delay={i * 100}
            />
          ))}
        </div>

        <div className="section-cta text-center mt-8">
          <a href="/academy" className="btn-primaryy large">
            Learn More
          </a>
        </div>

        {/* Academy Services */}
        <header className="services-block-header mt-16">
          <h2 className="services-heading">Dance Academy Services</h2>
          <p className="services-sub">
            Training programs for dancers of all levels — group classes, private
            coaching and performance teams.
          </p>
        </header>

        <div
          className="services-grid"
          role="list"
          aria-label="Academy services"
        >
          {academy.map((a, i) => (
            <ServiceCard
              key={a.title}
              img={a.img}
              title={a.title}
              text={a.text}
              primaryText={a.cta}
              primaryHref={a.href}
              delay={i * 100}
            />
          ))}
        </div>

        <div className="section-cta text-center mt-8">
          <a href="/academy" className="btn-primaryy large">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
