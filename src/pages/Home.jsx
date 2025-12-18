import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import WhatsApp from "../components/Whatsapp";
import BookAClass from "../components/BookAClass";
import HireDancers from "../components/HireDancers";
import WhyChooseUs from "../components/WhyChooseUs";
import Services from "../components/Services";
import FAQ from "../components/FAQSection.jsx";
import Testimonials from "../components/Testimonials";
import AboutUs from "../components/AboutUs.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import DanceClasses from "../components/DanceClasses.jsx";
import PortfolioVideos from "../components/PortfolioVideos.jsx";

const Home = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  useEffect(() => {
    if (paymentStatus) {
      const timer = setTimeout(() => setPaymentStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("payment");

    if (status === "success" || status === "cancel") {
      setPaymentStatus(status);

      // clean URL after reading
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <div>
      {/* 🔔 PAYMENT MESSAGE */}
      {paymentStatus === "success" && (
        <div className="payment-banner success">
          Payment successful 🎉 We’ve received your booking and will contact you
          shortly.
        </div>
      )}

      {paymentStatus === "cancel" && (
        <div className="payment-banner cancel">
          Payment cancelled. You can book again anytime or contact us on
          WhatsApp.
        </div>
      )}

      <Hero />
      <HireDancers />
      <BookAClass />
      <HowItWorks />
      <WhyChooseUs />
      <AboutUs />
      <Services />
      <DanceClasses />
      <PortfolioVideos />
      <FAQ />
      <Testimonials />
      <WhatsApp />
      {/* CTA */}
      <section className="about-cta">
        <h1>Interested in Working With Us?</h1>
        <p className="about-cta-sub">
          Whether you’re looking to book professional dancers or join our dance
          classes, DXB STARS makes the process simple.
        </p>

        <div className="about-cta-buttons">
          <a href="#hire-dancers" className="about-btn-primary">
            Book Us for a Show
          </a>
          <a href="#book-dance-class" className="about-btn-outline">
            Join a Dance Class
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
