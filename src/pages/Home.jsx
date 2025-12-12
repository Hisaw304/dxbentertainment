import React from "react";
import Hero from "../components/Hero";
import WhatsApp from "../components/Whatsapp";
import BookAClass from "../components/BookAClass";
import HireDancers from "../components/HireDancers";
import WhyChooseUs from "../components/WhyChooseUs";
import Services from "../components/Services";
import FAQ from "../components/FAQSection.jsx";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <HireDancers />
      <BookAClass />
      <WhyChooseUs />
      <Services />
      <FAQ />
      <Testimonials />
      <WhatsApp />
    </div>
  );
};

export default Home;
