import React from "react";
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

const Home = () => {
  return (
    <div>
      <Hero />
      <HireDancers />
      <BookAClass />
      <HowItWorks />
      <WhyChooseUs />
      <AboutUs />
      <Services />
      <FAQ />
      <Testimonials />
      <WhatsApp />
    </div>
  );
};

export default Home;
