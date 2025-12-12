// ------------------------------
// File: src/components/HireDancers.jsx
// ------------------------------
import React, { useState } from "react";
import showVideo from "../assets/hero.mp4";

export function HireDancers() {
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    location: "",
    datetime: "",
    dancers: "1",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/contactshow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setMessage({
        type: "success",
        text: "Request received — our bookings team will reach out.",
      });
      setForm({
        clientName: "",
        email: "",
        phone: "",
        location: "",
        datetime: "",
        dancers: "1",
        message: "",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to send request. Try WhatsApp or try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="hire-dancers-section w-full py-16 bg-[var(--dxb-pink)] text-white">
      {/* Top heading block (full-width, centered) */}
      <div className="max-w-5xl mx-auto mt-8 px-6 text-center">
        <h2 className="hd text-4xl lg:text-5xl font-extrabold">Hire Dancers</h2>
        <p className="subhd mt-3 text-lg text-white max-w-2xl mx-auto">
          Tell us about your event, and we’ll match talented performers to your
          brief — from corporate shows and concerts to weddings, festivals, and
          beyond.
        </p>
      </div>

      {/* Content: video + form */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Left: video */}
        <div className="media-wrap rounded-xl overflow-hidden shadow-lg flex items-stretch">
          <div className="w-full">
            <video
              src={showVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Showreel"
              className="w-full h-[420px] lg:h-[520px] object-cover"
              style={{ objectPosition: "center 22%" }} // prioritize upper area (dancers' heads)
            />
          </div>
        </div>

        {/* Right: form card */}
        <div className="form-wrap flex items-stretch">
          <div
            className="form-card bg-[var(--dxb-yellow)] rounded-2xl p-6 shadow-xl w-full flex flex-col justify-center min-h-[420px] lg:min-h-[520px]"
            id="hire-dancers"
          >
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* name */}
              <div>
                <label htmlFor="clientName" className="sr-only">
                  Client name
                </label>
                <input
                  id="clientName"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  placeholder="Client name"
                  required
                  className="input-field w-full"
                />
              </div>

              {/* email + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  required
                  className="input-field"
                />
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="input-field"
                />
              </div>

              {/* location */}
              <div>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Event location (city / venue)"
                  className="input-field w-full"
                />
              </div>

              {/* datetime + dancers count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  id="datetime"
                  name="datetime"
                  value={form.datetime}
                  onChange={handleChange}
                  type="datetime-local"
                  className="input-field"
                />
                <select
                  id="dancers"
                  name="dancers"
                  value={form.dancers}
                  onChange={handleChange}
                  className="input-field select-field"
                  required
                >
                  <option value="" disabled>
                    Number of dancers
                  </option>
                  <option value="1">1 dancer</option>
                  <option value="2">2 dancers</option>
                  <option value="3">3 dancers</option>
                  <option value="4">4 dancers</option>
                  <option value="5+">5+ dancers</option>
                </select>
              </div>

              {/* message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message / Requirements"
                  rows={4}
                  className="input-field w-full resize-y"
                />
              </div>

              {/* actions */}
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-gradient w-full sm:w-auto px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center"
                >
                  {loading ? "Sending..." : "Submit Request"}
                </button>

                <a
                  href={`https://wa.me/18608213853?text=Hi!%20I%27m%20looking%20to%20hire%20dancers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost inline-flex items-center justify-center px-4 py-2 rounded-lg border text-sm"
                >
                  Quick enquiry (WhatsApp)
                </a>
              </div>

              {/* message alert */}
              {message && (
                <div
                  role="status"
                  className={`p-3 rounded-md text-sm ${
                    message.type === "success"
                      ? "bg-white/90 text-black"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HireDancers;
