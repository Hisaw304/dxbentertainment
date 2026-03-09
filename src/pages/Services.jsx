// src/pages/ServicesPage.jsx
import React from "react";

import imgVixen from "../assets/music-video-vixen.jpg";
import imgGogo from "../assets/gogo-dancers.jpg";
import imgAfrican from "../assets/african-dancers.jpg";
import imgDrummers from "../assets/africa-drummers.jpg";
import imgPrivate from "../assets/private-coaching1.jpg";
import imgGroup from "../assets/group-classes1.jpg";
import imgClub from "../assets/club-dancers.jpg";
import imgCostume from "../assets/dance-costume-rental.jpg";
import Services from "../components/Services";
import imgServicesHero from "../assets/services-hero.jpg";
import imgBelly from "../assets/belly-dancers.jpg";
import imgAerial from "../assets/aerial-dancers.jpg";
import imgFire from "../assets/fire-dancers1.jpg";
import imgBollywood from "../assets/bollywood-dancers3.jpg";
import WhatsApp from "../components/Whatsapp";
import DanceClasses from "../components/DanceClasses";
import SEOMeta from "../components/SEOMeta";

const ServiceFeature = ({ title, text, img, cta, reverse }) => {
  return (
    <section className={`svc-feature ${reverse ? "reverse" : ""}`}>
      <div className="svc-image-wrap">
        <img src={img} alt={title} />
        <div className="svc-image-overlay">
          <h3>{title}</h3>
        </div>
      </div>

      <div className="svc-content">
        <h2>{title}</h2>
        <p>{text}</p>
        <a href="/contact" className="svc-btn">
          {cta}
        </a>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  return (
    <main className="services-page">
      <SEOMeta
        title="Dance Classes & Event Entertainment in Dubai | DXB Entertainment"
        description="Explore dance classes, private training, and professional dancers for weddings, corporate events, parties, and shows in Dubai."
      />
      {/* HERO */}
      <section
        className="svc-hero"
        style={{ backgroundImage: `url(${imgServicesHero})` }}
      >
        <div className="svc-hero-overlay" />
        <h1>Our Services</h1>
        <p>
          From high-energy performances to professional dance training, we bring
          culture, movement, and unforgettable experiences to every stage.
        </p>
      </section>

      {/* PERFORMANCE SERVICES */}
      <ServiceFeature
        title="Music Video Vixens"
        img={imgVixen}
        cta="Hire Dancers"
        text="Professional, camera-ready dancers for music videos, commercials,
        and creative productions. Confident performers with strong presence,
        precision choreography, and visual impact."
      />
      <ServiceFeature
        title="Club Dancers"
        img={imgClub}
        cta="Book Club Dancers"
        text="Professional club dancers designed to elevate nightlife experiences.
  Perfect for nightclubs, DJ events, lounges, and VIP parties with
  high-energy movement, style, and crowd interaction."
      />

      <ServiceFeature
        title="Go-Go Dancers"
        img={imgGogo}
        cta="Book Go-Go Dancers"
        reverse
        text="High-energy go-go dancers for clubs, nightlife events, brand
        activations, and private parties. Crowd engagement specialists with
        bold stage presence."
      />
      <ServiceFeature
        title="Dance Costume Rental"
        img={imgCostume}
        cta="Rent Dance Costumes"
        reverse
        text="Professional dance costume rentals for performances, music videos,
  events, competitions, and photoshoots. Choose from a wide range of
  African, nightlife, themed, and custom-designed costumes to elevate
  your visual impact."
      />

      <ServiceFeature
        title="African Dancers"
        img={imgAfrican}
        cta="Hire African Dancers"
        text="Authentic African dance performances blending tradition and
        contemporary movement. Perfect for weddings, festivals, cultural
        showcases, and corporate events."
      />

      <ServiceFeature
        title="African Drummers"
        img={imgDrummers}
        cta="Hire Drummers"
        reverse
        text="Live African drumming that brings rhythm, power, and energy to any
        event. A full sensory experience that connects culture and celebration."
      />
      <ServiceFeature
        title="Belly Dancers"
        img={imgBelly}
        cta="Hire Belly Dancers"
        text="Elegant belly dance performances featuring fluid movements,
  captivating costumes, and mesmerizing rhythms. Perfect for weddings,
  luxury events, themed parties, and cultural celebrations."
      />

      <ServiceFeature
        title="Aerial Dancers"
        img={imgAerial}
        cta="Hire Aerial Dancers"
        reverse
        text="Spectacular aerial dance performances combining acrobatics,
  strength, and artistry. Performers soar above the audience using
  silks, hoops, or harnesses to create unforgettable visual moments."
      />

      <ServiceFeature
        title="Fire Dancers"
        img={imgFire}
        cta="Hire Fire Dancers"
        text="Thrilling fire dance shows featuring skilled performers spinning,
  juggling, and controlling flames. Perfect for outdoor events, night
  shows, beach parties, and high-impact entertainment."
      />

      <ServiceFeature
        title="Bollywood Dancers"
        img={imgBollywood}
        cta="Hire Bollywood Dancers"
        reverse
        text="Vibrant Bollywood dance performances filled with colorful costumes,
  expressive storytelling, and energetic choreography that bring the
  spirit of Indian celebrations to weddings, festivals, and themed events."
      />

      {/* ACADEMY SERVICES */}
      <ServiceFeature
        title="Private Dance Classes"
        img={imgPrivate}
        cta="Book Private Class"
        text="One-on-one dance coaching tailored to your goals. Ideal for
        beginners, professionals, performance prep, and confidence building."
      />

      <ServiceFeature
        title="Group Dance Classes"
        img={imgGroup}
        cta="View Class Schedule"
        reverse
        text="Fun, energetic group dance classes in a supportive environment.
        Learn technique, choreography, and performance skills across styles."
      />
      <div>
        <DanceClasses />
        <Services />
        <WhatsApp />
        {/* CTA */}
        <section className="about-cta">
          <h1>Interested in Working With Us?</h1>
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
      </div>
    </main>
  );
}
