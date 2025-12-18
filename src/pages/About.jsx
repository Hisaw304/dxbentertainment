// src/pages/AboutPage.jsx
import React from "react";
import { useEffect, useState } from "react";
import imgAboutHero from "../assets/about-herosec.jpg";
import imgTeam from "../assets/team.jpg";
import imgTeam2 from "../assets/aboutinfo.jpg";
import WhatsApp from "../components/Whatsapp";
import PortfolioVideos from "../components/PortfolioVideos";
import img2 from "../assets/group-classes1.jpg";
import img3 from "../assets/hero1.png";
import img4 from "../assets/club-dancers.jpg";
import img5 from "../assets/afro.jpg";
import SEOMeta from "../components/SEOMeta";

const images = [imgTeam2, img2, img3, img4, img5];
export default function About() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="about-page">
      <SEOMeta
        title="Professional Dance Studio in Dubai | DXB Entertainment"
        description="DXB Entertainment is a leading dance studio in Dubai offering expert instructors, premium classes, and professional event performances."
      />
      {/* HERO */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${imgAboutHero})` }}
      >
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <h1>About DXB STARS</h1>
          <p>
            Dubai’s premier collective of professional dancers, performers, and
            dance educators.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <div className="about-pr">
        <section className="about-preview">
          {/* Heading */}
          <h2 className="about-preview-headingg text-center">Who We Are</h2>

          {/* Content */}
          <div className="about-preview-grid">
            <div className="about-preview-text">
              <p>
                DXB STARS is a Dubai-based collective of professional dancers,
                choreographers, and coaches operating at the intersection of
                performance, precision, and culture. Since 2018, we have
                delivered world-class entertainment for stages, brands, venues,
                and private clients across Dubai and beyond.
              </p>

              <p>
                From high-energy stage productions to intimate brand
                activations, we curate elite talent that understands timing,
                presence, and professionalism — not just movement.
              </p>

              <p>
                Our dancers don’t simply perform. They represent brands, elevate
                venues, and create moments that remain long after the music
                stops.
              </p>
            </div>

            <div className="about-preview-image">
              <img
                src={images[index]}
                alt="DXB Stars Team"
                className={`fade-image ${isFading ? "fade-out" : ""}`}
              />
            </div>
          </div>
        </section>
      </div>

      {/* STATS */}
      <section className="about-stats">
        <div>
          <strong>2018</strong>
          <span>Established</span>
        </div>
        <div>
          <strong>1000+</strong>
          <span>Performances</span>
        </div>
        <div>
          <strong>Dubai Marina</strong>
          <span>Based In</span>
        </div>
        <div>
          <strong>Worldwide</strong>
          <span>Available</span>
        </div>
      </section>

      {/* MISSION */}
      {/* <section className="about-section">
        <h2 className="about-preview-heading text-center">Our Mission</h2>
        <p>
          Our mission is to deliver exceptional dance experiences that combine
          artistic excellence with professional execution. We aim to raise the
          standard of live performance in Dubai by providing reliable,
          disciplined, and visually striking talent for every type of event.
        </p>
      </section> */}

      {/* WHAT WE OFFER */}
      {/* <section className="about-section">
        <h2 className="about-preview-heading text-center">What We Offer</h2>

        <p>
          DXB STARS provides both professional performance services and
          structured dance education. Our offerings are designed for clients who
          value quality, consistency, and impact.
        </p>

        <div className="about-columns">
          <div>
            <h3>Performance & Event Services</h3>
            <ul>
              <li>Music Video Vixens</li>
              <li>Go-Go Dancers</li>
              <li>Club Dancers</li>
              <li>African Dancers</li>
              <li>African Drummers</li>
              <li>Weddings & Corporate Shows</li>
              <li>Brand Activations</li>
              <li>Nightlife & Lounge Performances</li>
              <li>International Shows & Tours</li>
            </ul>
          </div>

          <div>
            <h3>Dance Academy & Training</h3>
            <ul>
              <li>Afro Dance</li>
              <li>Hip-Hop</li>
              <li>Commercial / Heels</li>
              <li>Contemporary</li>
              <li>Dancehall</li>
              <li>Group Dance Classes</li>
              <li>Private Dance Classes</li>
              <li>Kids & Teens Programs</li>
            </ul>
          </div>
        </div>
      </section> */}
      {/* WHERE WE OPERATE */}
      {/* <section className="about-section">
        <h2 className="about-preview-heading text-center">Where We Perform</h2>
        <p>
          Based in Dubai Marina, DXB STARS performs across all areas of Dubai
          and the UAE. We are also available for regional and international
          bookings, bringing Dubai-level performance standards wherever we go.
        </p>
      </section> */}

      {/* TEAM */}
      {/* <section className="about-section about-team">
        <h2 className="about-preview-heading text-center">Our Team</h2>

        <div className="about-team-content">
          
          <div className="about-team-text">
            <p>
              Our team is made up of carefully selected professional dancers,
              choreographers, and instructors with international experience.
            </p>

            <p>
              We pride ourselves on teamwork, discipline, and a shared
              commitment to excellence — on and off the stage.
            </p>
          </div>

   
          <div className="about-team-image">
            <img src={imgTeam} alt="DXB Stars Team" />
          </div>
        </div>
      </section> */}

      <div>
        {/* <PortfolioVideos /> */}
        {/* CTA */}
        <section className="about-cta">
          <h2>Interested in Working With Us?</h2>
          <p className="about-cta-sub">
            Whether you’re looking to book professional dancers or join our
            dance classes, DXB STARS makes the process simple.
          </p>

          <div className="about-cta-buttons">
            <a href="/contact" className="about-btn-primary">
              Book Us for a Show
            </a>
            <a href="/contact" className="about-btn-outline">
              Join a Dance Class
            </a>
          </div>
        </section>
        <WhatsApp />
      </div>
    </main>
  );
}
