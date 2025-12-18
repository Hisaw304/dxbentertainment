import React from "react";
import { motion } from "framer-motion";

const VIDEOS = [
  {
    label: "Afro Beat Dance Class",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/cc025096-7015-46fd-bcd6-c87b7016e7e3_fmubvc.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/cc025096-7015-46fd-bcd6-c87b7016e7e3_fmubvc.jpg",
    description:
      "High-energy Afrobeat rhythms designed to get you moving and grooving.",
  },
  {
    label: "Amapiano Dance",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/IMG_9351_wmlqs5.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/IMG_9351_wmlqs5.jpg",
    description: "Smooth South African beats with flowing footwork and rhythm.",
  },
  {
    label: "Show Performance",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/samba_carnival_3_ac29l1.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/samba_carnival_3_ac29l1.jpg",
    description:
      "Exciting live performance showcasing energy and stage presence.",
  },
  {
    label: "Gogo Dance",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/eko_dancers_gogo_qalp7m.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/eko_dancers_gogo_qalp7m.jpg",
    description: "Fun, lively dance style perfect for parties and events.",
  },
  {
    label: "Brunch Performance",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/201b95ec-0ecb-4976-8074-06920ca0437f_odavbn.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/201b95ec-0ecb-4976-8074-06920ca0437f_odavbn.jpg",
    description: "Relaxed dance performance perfect for brunch events.",
  },
  {
    label: "Afro Heels",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/bcff59b8-009d-47ec-a271-c60a459d8868_g8wq6c.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/bcff59b8-009d-47ec-a271-c60a459d8868_g8wq6c.jpg",
    description: "Confidence-building dance with sexy, graceful movements.",
  },
  {
    label: "Dance Music / Video Vixen",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/faith_ani_final_video_izbmjz.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/faith_ani_final_video_izbmjz.jpg",
    description:
      "Performance blending dance and music for high-energy visuals.",
  },
  {
    label: "Club Performance",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/1c1089ce-2981-4b08-a9b2-0a4dc3eaeb34_jk3jwe.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/1c1089ce-2981-4b08-a9b2-0a4dc3eaeb34_jk3jwe.jpg",
    description: "Nightlife-inspired dance performances for club settings.",
  },
  {
    label: "Mix Dance (Contemporary & Hip Hop)",
    src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/51f05403-71ae-4395-810b-f95de5c190dc_tu51lj.mp4",
    poster:
      "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/51f05403-71ae-4395-810b-f95de5c190dc_tu51lj.jpg",
    description:
      "Fusion of contemporary and hip hop styles for advanced dancers.",
  },
];

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
// };
const containerVariants = {};
const cardVariants = {};

const PortfolioVideos = () => {
  return (
    <section className="portfolio-section">
      <div className=" text-center">
        <h2 className="about-preview-heading text-center">Portfolio</h2>

        <p>
          Watch highlights from our recent events, dance classes, and live
          performances.
        </p>
      </div>

      <motion.div
        className="portfolio-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {VIDEOS.map(({ label, src, poster, description }) => (
          <motion.div
            className="portfolio-card"
            key={label}
            variants={cardVariants}
          >
            <div className="video-wrapper">
              <video
                src={src}
                poster={poster}
                controls
                muted
                preload="metadata"
                className="portfolio-video"
              />
            </div>

            <div className="portfolio-text">
              <h3>{label}</h3>
              <p>{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PortfolioVideos;
