// src/components/BookAClass.jsx
import React, { useState } from "react";
import classNames from "classnames";
import heroVideo from "../assets/hero.mp4";

export function BookAClass() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    classType: "Contemporary",
    price: "50 AED",
    schedule: "Mon - 6:00 PM",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const classOptions = [
    "Contemporary",
    "Hip-Hop",
    "Afrobeat",
    "Ballet",
    "Commercial",
  ];
  const priceOptions = ["50 AED", "75 AED", "100 AED", "Per Hour Pricing"];
  const scheduleOptions = [
    "Mon - 6:00 PM",
    "Tue - 7:00 PM",
    "Wed - 5:00 PM",
    "Sat - 10:00 AM",
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setMessage({
        type: "success",
        text: "Thanks — we received your booking. We will contact you soon.",
      });
      setForm({
        name: "",
        phone: "",
        email: "",
        classType: "Contemporary",
        price: "50 AED",
        schedule: "Mon - 6:00 PM",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again or contact us on WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="hire-dancers-section w-full py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="hd text-4xl lg:text-5xl font-extrabold">Book a Class</h2>
        <p className="subhd mt-3 text-lg text-white max-w-2xl mx-auto">
          Join classes taught by industry professionals — group and private
          lessons available. Pick a style, schedule and we’ll reserve your spot.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        <div className="media-wrap rounded-xl overflow-hidden shadow-lg flex items-stretch">
          <div className="w-full">
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Class showreel"
              className="w-full h-[420px] lg:h-[520px] object-cover"
              style={{ objectPosition: "center 22%" }}
            />
          </div>
        </div>

        <div className="form-wrap flex items-stretch">
          <div
            className="form-card bg-[var(--dxb-yellow)] rounded-2xl p-6 shadow-xl w-full flex flex-col justify-center min-h-[420px] lg:min-h-[520px]"
            id="book-a-class"
          >
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="sr-only">
                  Student name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Student name"
                  required
                  className="input-field w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Contact number"
                  required
                  className="input-field"
                />
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Student email"
                  required
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  id="classType"
                  name="classType"
                  value={form.classType}
                  onChange={handleChange}
                  className="input-field select-field"
                >
                  {classOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="input-field select-field"
                >
                  {priceOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  id="schedule"
                  name="schedule"
                  value={form.schedule}
                  onChange={handleChange}
                  className="input-field select-field w-full"
                >
                  {scheduleOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={classNames(
                    "btn btn-gradient w-full py-3 rounded-xl font-semibold",
                    { "opacity-60": loading }
                  )}
                >
                  {loading ? "Sending..." : "Submit Booking"}
                </button>
              </div>

              {message && (
                <div
                  role="status"
                  className={classNames("p-3 rounded-md text-sm", {
                    "bg-white/90 text-black": message.type === "success",
                    "bg-red-100 text-red-700": message.type === "error",
                  })}
                >
                  {message.text}
                </div>
              )}

              <div className="pt-2">
                <a
                  href={`https://wa.me/18608213853?text=Hi!%20I%27d%20like%20to%20book%20a%20class`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold"
                >
                  Quick enquiry on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookAClass;
