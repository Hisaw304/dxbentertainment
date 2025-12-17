// ------------------------------
// File: src/components/HireDancers.jsx
// ------------------------------
import React, { useState } from "react";
import showVideo from "../assets/herod.mp4";
// const showVideo = {
//   src: "https://res.cloudinary.com/dfo4k5eel/video/upload/v1690000000/cc025096-7015-46fd-bcd6-c87b7016e7e3_fmubvc.mp4",
//   poster:
//     "https://res.cloudinary.com/dfo4k5eel/video/upload/so_0/v1690000000/cc025096-7015-46fd-bcd6-c87b7016e7e3_fmubvc.jpg",
// };
export function HireDancers() {
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    location: "",
    datetime: "",
    services: [], // dancers | costumes | drummers
    quantity: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }
  function handleCheckboxChange(e) {
    const { value, checked } = e.target;

    setForm((s) => ({
      ...s,
      services: checked
        ? [...s.services, value]
        : s.services.filter((v) => v !== value),
    }));
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

      if (!res.ok) throw new Error("Request failed");

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
        services: [],
        quantity: "",
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
              {/* services */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black/70">
                  Services required
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value="dancers"
                      checked={form.services.includes("dancers")}
                      onChange={handleCheckboxChange}
                    />
                    Dancers
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value="costumes"
                      checked={form.services.includes("costumes")}
                      onChange={handleCheckboxChange}
                    />
                    Costumes
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value="drummers"
                      checked={form.services.includes("drummers")}
                      onChange={handleCheckboxChange}
                    />
                    Drummers
                  </label>
                </div>
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
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="datetime"
                    className="text-sm font-medium text-black/70"
                  >
                    Event date & time
                  </label>

                  <input
                    id="datetime"
                    name="datetime"
                    type="datetime-local"
                    value={form.datetime}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-black/70">
                    Quantity / performers
                  </label>

                  <select
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="input-field select-field"
                  >
                    <option value="">Select quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>
              </div>

              {/* message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more (event type, costumes needed, performance duration, etc.)"
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
                  href={`https://wa.me/18608213853?text=Hi!%20I%27m%20interested%20in%20booking%20performers%20or%20costumes`}
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
