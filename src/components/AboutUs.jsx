// src/components/AboutUs.jsx
import React from "react";
import imgTeam2 from "../assets/aboutinfo.jpg";

export default function AboutUs() {
  return (
    <section className="about-preview">
      {/* Heading */}
      {/* <h2 className="about-preview-heading text-center">About us</h2> */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="wc-heading text-3xl sm:text-4xl font-extrabold">
          About DXB STARS
        </h2>
        <p className="wc-sub mt-3 mb-3 text-base">
          Dubai’s premier collective of professional dancers, performers, and
          dance educators.
        </p>
      </div>
      {/* Content */}
      <div className="about-preview-grid">
        <div className="about-preview-text">
          <p>
            DXB STARS is a Dubai-based collective of professional dancers,
            choreographers, and coaches operating at the intersection of
            performance, precision, and culture. Since 2018, we have delivered
            world-class entertainment for stages, brands, venues, and private
            clients across Dubai and beyond.
          </p>

          <p>
            From high-energy stage productions to intimate brand activations, we
            curate elite talent that understands timing, presence, and
            professionalism — not just movement.
          </p>

          <p>
            Our dancers don’t simply perform. They represent brands, elevate
            venues, and create moments that remain long after the music stops.
          </p>
        </div>

        <div className="about-preview-image">
          <img src={imgTeam2} alt="DXB Stars Team" />
        </div>
      </div>
      {/* CENTERED CTA */}
      <div className="about-preview-cta">
        <a href="/about" className="about-preview-btn">
          Learn More About Us
        </a>
      </div>
    </section>
  );
}
