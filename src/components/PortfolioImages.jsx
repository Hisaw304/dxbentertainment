import React, { useState } from "react";

// IMPORT YOUR IMAGES
import img1 from "../assets/portfolio/event-1.jpg";
import img2 from "../assets/portfolio/event-2.jpg";
import img3 from "../assets/portfolio/class-1.jpg";
import img4 from "../assets/portfolio/show-1.jpg";
import img5 from "../assets/portfolio/event-3.jpg";
import img6 from "../assets/portfolio/class-2.jpg";
import img7 from "../assets/portfolio/show-2.jpg";
import img8 from "../assets/portfolio/event-4.jpg";
import img9 from "../assets/portfolio/class-3.jpg";

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const PortfolioImages = () => {
  const [visible, setVisible] = useState(6);

  return (
    <section className="portfolio-images">
      <div className="portfolio-image-grid">
        {IMAGES.slice(0, visible).map((img, index) => (
          <div className="portfolio-image-card" key={index}>
            <img src={img} alt="DXB Stars Performance" loading="lazy" />
          </div>
        ))}
      </div>

      {visible < IMAGES.length && (
        <div className="portfolio-load-more">
          <button onClick={() => setVisible((v) => v + 6)}>Load More</button>
        </div>
      )}
    </section>
  );
};

export default PortfolioImages;
