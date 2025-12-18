// src/pages/Contact.jsx
import React from "react";
import HireDancers from "../components/HireDancers";
import BookAClass from "../components/BookAClass";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import contactHero from "../assets/contact-hero.jpg";
import { MapPin, Phone, Mail, Instagram, Facebook, Music } from "lucide-react";
import WhatsApp from "../components/Whatsapp";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import SEOMeta from "../components/SEOMeta";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Contact = () => {
  return (
    <main className="contact-page">
      <SEOMeta
        title="Book Dance Classes or Hire Dancers in Dubai | DXB Entertainment"
        description="Contact DXB Entertainment to book dance classes or hire professional dancers in Dubai. Fast response and tailored entertainment"
      />
      {/* ================= HERO ================= */}
      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${contactHero})` }}
      >
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <h1>Contact DXB STARS</h1>
          <p>
            Book professional dancers, performance shows, or join our dance
            academy. Our team operates across Dubai and beyond.
          </p>
        </div>
      </section>

      {/* ================= FORMS ================= */}
      <section>
        <HireDancers />
        <BookAClass />
      </section>

      {/* ================= INFO ================= */}
      <section className="contact-info">
        <div className="contact-info-grid">
          {/* LOCATION */}
          <div className="contact-card">
            <MapPin className="contact-icon" />
            <h3>Our Location</h3>
            <p>
              Dubai Marina
              <br />
              Dubai, UAE
            </p>
          </div>

          {/* CONTACT */}
          <div className="contact-card">
            <Phone className="contact-icon" />
            <h3>Call Us</h3>
            <p>
              <a href="tel:+971544603587">+971 54 460 3587</a>
              <br />
              <a href="tel:+971558758934">+971 55 875 8934</a>
            </p>

            <div className="contact-divider" />

            <Mail className="contact-icon small" />
            <a href="mailto:info@dxbstarsetm.com">info@dxbstarsetm.com</a>
          </div>

          {/* SOCIALS */}
          <div className="contact-card">
            <h3>Follow Us</h3>

            <div className="contact-socials-modern">
              <a href="#" aria-label="Instagram">
                <Instagram />
                <span>Instagram</span>
              </a>

              <a href="#" aria-label="Facebook">
                <Facebook />
                <span>Facebook</span>
              </a>

              <a href="#" aria-label="TikTok">
                <Music />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="contact-map">
        <MapContainer
          center={[25.0806, 55.1403]} // Dubai Marina
          zoom={14}
          scrollWheelZoom={false}
          className="leaflet-map"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[25.0806, 55.1403]}>
            <Popup>DXB STARS — Dubai Marina</Popup>
          </Marker>
        </MapContainer>
      </section>
      <div>
        <WhatsApp />
      </div>
    </main>
  );
};

export default Contact;
