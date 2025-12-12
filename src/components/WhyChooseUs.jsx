// WhyChooseUs.jsx
import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "World-Class Dance Talent",
    text: "Hand-picked professional dancers trained for stage, TV, festivals, and brand activations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8v8a6 6 0 0 0 12 0V8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="11"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Any Event. Any Country.",
    text: "Our performers travel worldwide for shows, clubs, corporate events and private celebrations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12h20"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "High-Energy, Custom Choreography",
    text: "From Afrobeats to Hip-Hop and Contemporary — we create routines tailored to your brief.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 12h18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8v8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 8v8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Professional & Reliable Team",
    text: "We manage logistics, schedules and on-site production so your show runs flawlessly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="7"
          r="4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Versatile Dance Styles",
    text: "A diverse roster skilled across multiple genres — great for mixed-genre shows and bespoke concepts.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Training That Builds Stars",
    text: "Structured classes and coaching to build skill, confidence and stage presence for performers.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 12h12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 20h12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="why-choose-us bg-[var(--dxb-white)] text-[var(--dxb-black)] py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="wc-heading text-3xl sm:text-4xl font-extrabold">
            Why Choose DXB Stars
          </h2>
          <p className="wc-sub mt-3 text-base">
            Professional dancers for events, shows and weddings — plus academy
            classes to train the next generation.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              variants={card}
              className="feature-card bg-[var(--dxb-white)] border rounded-2xl p-5 shadow-sm flex gap-4 items-start hover:shadow-lg transition transform will-change-transform"
            >
              <div
                className="icon-wrap flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, var(--dxb-yellow) 0%, rgba(255,212,0,0.95) 100%)",
                  color: "var(--dxb-black)",
                }}
                aria-hidden
              >
                <span className="icon" style={{ display: "inline-flex" }}>
                  {f.icon}
                </span>
              </div>

              <div className="flex-1">
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--dxb-black)" }}
                >
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{f.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
