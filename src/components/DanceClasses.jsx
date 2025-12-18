import React from "react";

// Import your images
import afroImg from "../assets/afro.jpg";
import hiphopImg from "../assets/hiphop.jpg";
import zumbaImg from "../assets/zumba.jpg";
import amapianoImg from "../assets/amapiano.jpg";
import heelsImg from "../assets/afro-sexy.jpg";
import contemporaryImg from "../assets/contemporary.jpg";
import sambaImg from "../assets/weddings1.jpg";

const DANCE_STYLES = [
  {
    label: "Afro",
    img: afroImg,
    description: "High-energy Afrobeat rhythms to get you moving and grooving.",
  },
  {
    label: "Hip Hop",
    img: hiphopImg,
    description:
      "Urban street style dancing focusing on groove, style, and fun.",
  },
  {
    label: "Zumba",
    img: zumbaImg,
    description: "Cardio-fun workout combining dance moves with fitness.",
  },
  {
    label: "Amapiano",
    img: amapianoImg,
    description: "South African beats with smooth footwork and rhythm.",
  },
  {
    label: "Afro Sexy Ladies Heels",
    img: heelsImg,
    description: "Confidence-building dance with sexy, graceful movements.",
  },
  {
    label: "Contemporary",
    img: contemporaryImg,
    description:
      "Fluid, expressive movements combining ballet and modern dance.",
  },
  {
    label: "Samba",
    img: sambaImg,
    description: "Energetic Brazilian dance focusing on rhythm and flair.",
  },
];

const DanceClasses = () => {
  return (
    <section className="dance-classes-section">
      {/* Heading */}
      <div className=" text-center">
        <h2 className="about-preview-heading text-center">
          Explore Our Dance Classes
        </h2>

        <p>
          From Afro to Hip Hop, Zumba to Contemporary — experience the ultimate
          dance journey with our premium classes.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="dance-cards">
        {DANCE_STYLES.map(({ label, img, description }) => (
          <div className="dance-card" key={label}>
            <img src={img} alt={label} />
            {/* Overlay on hover */}
            <div className="dance-card-overlay">
              <h3>{label}</h3>
              <p>{description}</p>
              <a href="#book-a-class">Book Now</a>
            </div>
            {/* Static label at bottom */}
            <div className="dance-card-label">
              <h3>{label}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DanceClasses;
