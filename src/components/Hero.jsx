import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Music2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroVideo from "../assets/herodc.mp4";
import heroImg1 from "../assets/hero1.png";
import heroImg2 from "../assets/hero2.png";

/**
 * Hero.jsx (updated)
 * - Keeps video -> image -> image cycle
 * - Ensures media object-position is shifted up on large screens so dancers' heads are visible
 * - Constrains text column width on large screens so background media shows on the right
 * - Props: videoSrc, imageSrcs, slides, durations
 */

export default function Hero({
  videoSrc = heroVideo,
  imageSrcs = [heroImg1, heroImg2],
  slides = [
    {
      sub: "Dancers for Every Stage.",
      para: "From events and festivals to clubs, weddings, and brand activations — our performers deliver energy, precision, and unforgettable impact.",
    },
    {
      sub: "Your Event. Our Talent.",
      para: "Hip-hop, afro, contemporary, commercial, ballroom — whatever your vision, we supply the dancers, choreography, and show-ready performance.",
    },
    {
      sub: "Train With the Pros. Perform Like One.",
      para: "Join our dance classes to build skill, confidence, and stage presence — whether you're starting out or levelling up.",
    },
  ],

  durations = { video: 6000, image: 5000 },
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const videoRef = useRef(null);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (prefersReduced.current) return;
    const duration = index === 0 ? durations.video : durations.image;
    timerRef.current = setTimeout(() => {
      setIndex((p) => (p + 1) % (1 + imageSrcs.length));
    }, duration);
    return () => clearTimeout(timerRef.current);
  }, [index, imageSrcs.length, durations.video, durations.image]);

  useEffect(() => {
    if (index === 0 && videoRef.current) {
      const p = videoRef.current.play?.();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [index]);

  const bgVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const textVariants = {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  };

  return (
    <section className="hero relative w-full min-h-screen overflow-visible flex items-center">
      {/* background media stack */}
      <div className="absolute inset-0 z-0 hero-media">
        <AnimatePresence exitBeforeEnter>
          {index === 0 && (
            <motion.div
              key="img1"
              variants={bgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img src={imageSrcs[0]} alt="hero 1" className="w-full h-full" />
              <div className="hero-overlay absolute inset-0 pointer-events-none" />
            </motion.div>
          )}
          {index === 2 && (
            <motion.div
              key="video"
              variants={bgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full"
                autoPlay
                muted
                playsInline
              />
              <div className="hero-overlay absolute inset-0 pointer-events-none" />
            </motion.div>
          )}

          {index === 1 && (
            <motion.div
              key="img2"
              variants={bgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img src={imageSrcs[1]} alt="hero 2" className="w-full h-full" />
              <div className="hero-overlay absolute inset-0 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* foreground content (constrained width on large screens so media visible to the right) */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="hero-content pt-2 md:pt-20 lg:pt-28">
          <motion.p
            variants={textVariants}
            className="inline-block bg-[var(--dxb-pink)] text-white px-5 py-2 rounded-md text-xs font-bold uppercase tracking-widest shadow-md"
          >
            Shows | Events | Classes | Entertainment
          </motion.p>

          <h1 className="hero-heading text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-white">DXB STARS</span>
          </h1>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-3"
              >
                <h2 className="hero-sub text-4xl sm:text-4xl font-semibold text-white">
                  {slides[index]?.sub}
                </h2>
                <p className="hero-para text-2xl sm:text-2xl text-white max-w-2xl">
                  {slides[index]?.para}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#hire-dancers"
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold"
            >
              Hire Dancers
            </a>
            <a
              href="#book-a-class"
              className="btn-outline border inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold"
            >
              Book a Class
            </a>
          </div>

          {/* hero meta row */}
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Follow us</span>

              <a
                href="#"
                className="hero-social"
                aria-label="Follow DXB STARS on Instagram"
              >
                <Instagram size={18} />
                <span>Instagram</span>
              </a>

              <a
                href="#"
                className="hero-social"
                aria-label="Follow DXB STARS on TikTok"
              >
                <Music2 size={18} />
                <span>TikTok</span>
              </a>
            </div>

            <span className="hero-meta-separator" />

            <div className="hero-meta-item">
              <span className="hero-meta-icon">📍</span>
              <span>Dubai Marina, Dubai, UAE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right-side floating card (desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 md:pt-20 lg:pt-28 z-20 mx-auto px-6 lg:px-12"
      >
        <div
          className="rounded-2xl shadow-2xl p-6 w-[320px] border"
          style={{
            background: "var(--dxb-white)",
            borderColor: "rgba(0,0,0,0.08)",
            color: "var(--dxb-black)",
          }}
        >
          <h3
            className="text-xl font-extrabold leading-tight"
            style={{ color: "var(--dxb-black)" }}
          >
            Need dancers for your event?
          </h3>
          <p
            className="text-sm mt-3 leading-relaxed"
            style={{ color: "rgba(0,0,0,0.7)" }}
          >
            Shows • Clubs • Brand Activations • Weddings
            <br />
            Want to join our dance class today?
            <br />
            Contact us now.
          </p>
          <Link
            to="/contact"
            className="mt-5 w-full py-3 rounded-xl font-semibold transition text-center block"
            style={{
              background: "var(--dxb-pink)",
              color: "var(--dxb-white)",
            }}
          >
            Contact Us Now
          </Link>
          ;
        </div>
      </motion.div>

      {/* overlapping stats card */}
      <div className="hero-stats z-20">
        <div className="hero-stats-inner">
          <div className="stat">
            <div className="stat-num">100+</div>
            <div className="stat-label">Professional Dancers</div>
          </div>
          <div className="stat">
            <div className="stat-num">1000+</div>
            <div className="stat-label">Events & Shows</div>
          </div>
          <div className="stat">
            <div className="stat-num">14</div>
            <div className="stat-label">Expert Coaches</div>
          </div>
          <div className="stat">
            <div className="stat-num">5</div>
            <div className="stat-label">Awards</div>
          </div>
        </div>
      </div>
    </section>
  );
}
