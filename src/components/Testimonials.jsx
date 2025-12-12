// src/components/Testimonials.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * DXB Testimonials
 * - Heading (pink), subheading (black)
 * - Uses root CSS variables: --dxb-pink, --dxb-yellow, --dxb-black
 * - Responsive: 1 / 2 / 3 slides per view
 */

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    quote:
      "We booked DXB Entertainment for our corporate gala — the dancers brought the whole room to life. Professional, dazzling and unforgettable.",
    tag: "Corporate Client",
    rating: 5,
  },
  {
    name: "Lina Ahmed",
    quote:
      "My daughter joined the hip-hop class and her confidence skyrocketed. The instructors are warm, talented and inspiring.",
    tag: "Parent / Student",
    rating: 5,
  },
  {
    name: "James Wright",
    quote:
      "Hands down the best performers we’ve hired in Dubai. They handled choreography, costumes and the theme perfectly.",
    tag: "Event Planner",
    rating: 5,
  },
  {
    name: "Ava Chen",
    quote:
      "Joined the adult beginner dance class and it was the highlight of my week. Fun, energetic and very beginner-friendly!",
    tag: "Student",
    rating: 5,
  },
  {
    name: "Rami Khaled",
    quote:
      "Booked a group performance last minute — they delivered a stunning show with zero stress on our side.",
    tag: "Wedding Client",
    rating: 5,
  },
];

const StarRow = ({ rating = 5 }) => {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <svg
      key={i}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={i < rating ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
      style={{ color: "var(--dxb-yellow)" }}
    >
      <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.56L19.335 24 12 19.897 4.665 24l1.636-8.69L.6 9.75l7.732-1.732z" />
    </svg>
  ));
  return (
    <div className="star-row" aria-hidden>
      {stars}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <header className="text-center mb-8">
          <h2 id="testimonials-heading" className="testimonials-heading">
            Sweet Words from Our Clients
            {/* <span className="clients-pill">Clients</span> */}
          </h2>
          <p className="testimonials-sub">
            Real feedback from clients, event planners and students —
            performance & class experiences.
          </p>
        </header>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            aria-label="DXB client testimonials carousel"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <article
                  className="testimonial-card"
                  aria-label={`Testimonial from ${t.name}`}
                >
                  <div className="client-name-pill">{t.name}</div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="avatar-initials" aria-hidden>
                      {t.name
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{ color: "var(--dxb-black)" }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(11,11,11,0.56)" }}
                      >
                        {t.tag}
                      </div>
                    </div>
                  </div>

                  <p className="testimonial-quote">“{t.quote}”</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <StarRow rating={t.rating} />
                      <span
                        className="text-xs"
                        style={{ color: "rgba(11,11,11,0.56)" }}
                      >
                        {t.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="quote-ornament" aria-hidden />
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
