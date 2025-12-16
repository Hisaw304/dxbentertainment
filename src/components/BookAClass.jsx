// src/components/BookAClass.jsx
import React, { useState, useMemo } from "react";
import classNames from "classnames";
import heroVideo from "../assets/herodc.mp4";

export function BookAClass() {
  /* ---------------- INITIAL STATE ---------------- */
  const INITIAL_FORM = {
    name: "",
    email: "",
    phone: "",
    danceStyle: "",
    classType: "",
    groupDay: "",
    privatePackage: "",
    preferredDay: "",
    preferredTime: "",
  };

  /* ---------------- STATE ---------------- */
  const [form, setForm] = useState(INITIAL_FORM);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* ---------------- CONSTANTS ---------------- */
  const DANCE_STYLES = [
    { label: "Afro", type: "both" },
    { label: "Hip Hop", type: "both" },
    { label: "Zumba", type: "both" },
    { label: "Amapiano", type: "both" },
    { label: "Afro Sexy Ladies Heels", type: "both" },
    { label: "Contemporary", type: "private" },
    { label: "Samba", type: "private" },
  ];

  /* ---------------- DERIVED STATE ---------------- */
  const selectedStyle = useMemo(
    () => DANCE_STYLES.find((d) => d.label === form.danceStyle),
    [form.danceStyle]
  );

  const isPrivateOnly = selectedStyle?.type === "private";

  /* ---------------- HANDLERS ---------------- */
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "danceStyle") {
        const style = DANCE_STYLES.find((d) => d.label === value);

        if (style?.type === "private") {
          next.classType = "Private";
        }
      }

      if (name === "classType") {
        next.groupDay = "";
        next.privatePackage = "";
        next.preferredDay = "";
        next.preferredTime = "";
      }

      return next;
    });
  }

  /* ---------------- DISPLAY PRICE (UI ONLY) ---------------- */
  const displayPrice = useMemo(() => {
    if (!form.danceStyle || !form.classType) return null;

    // GROUP CLASS PRICING
    if (form.classType === "Group") {
      if (form.danceStyle === "Afro Sexy Ladies Heels") {
        return "90 AED";
      }
      return "80 AED";
    }

    // PRIVATE CLASS PRICING
    if (form.classType === "Private" && form.privatePackage) {
      const premiumStyles = ["Contemporary", "Samba"];
      const isPremium = premiumStyles.includes(form.danceStyle);

      const pricing = {
        "1 Class": isPremium ? "350 AED" : "350 AED",
        "3 Classes": isPremium ? "960 AED" : "840 AED",
        "Monthly (6 Classes)": isPremium ? "1800 AED" : "1500 AED",
      };

      return pricing[form.privatePackage];
    }

    return null;
  }, [form]);
  /* ---------------- LOCATION (DISPLAY ONLY) ---------------- */
  const displayLocation = useMemo(() => {
    if (form.classType === "Group") {
      if (form.groupDay.includes("Sunday")) {
        return "Dubai Marina";
      }
      if (
        form.groupDay.includes("Monday") ||
        form.groupDay.includes("Thursday")
      ) {
        return "Dubai JVC";
      }
    }

    if (form.classType === "Private") {
      return "JLT, Cluster C, Dubai";
    }

    return null;
  }, [form]);
  const isFormValid = useMemo(() => {
    if (!form.name || !form.email || !form.phone) return false;
    if (!form.danceStyle || !form.classType) return false;

    if (form.classType === "Group") {
      return Boolean(form.groupDay);
    }

    if (form.classType === "Private") {
      return Boolean(
        form.privatePackage && form.preferredDay && form.preferredTime
      );
    }

    return false;
  }, [form]);

  /* ---------------- OPEN CONFIRM MODAL ---------------- */
  function openConfirmModal(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) return;
    if (!form.danceStyle || !form.classType) return;

    if (form.classType === "Group" && !form.groupDay) return;

    if (
      form.classType === "Private" &&
      (!form.privatePackage || !form.preferredDay || !form.preferredTime)
    )
      return;

    setShowConfirm(true);
  }

  /* ---------------- FINAL SUBMIT ---------------- */
  async function handleSubmit() {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const data = await res.json();

      if (!data.url) {
        throw new Error("No checkout URL returned");
      }

      // 🔥 REDIRECT TO STRIPE
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Payment could not be started. Please try again or contact us on WhatsApp.",
      });
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
            {/* BOOKING FORM */}
            <form onSubmit={openConfirmModal} className="space-y-5" noValidate>
              {/* BASIC INFO */}
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="input-field w-full"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="input-field"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                  className="input-field"
                />
              </div>

              {/* DANCE STYLE */}
              <select
                name="danceStyle"
                value={form.danceStyle}
                onChange={handleChange}
                required
                className="input-field select-field w-full"
              >
                <option value="">Select dance style</option>
                {DANCE_STYLES.map((d) => (
                  <option key={d.label} value={d.label}>
                    {d.label}
                  </option>
                ))}
              </select>

              {/* CLASS TYPE */}
              {form.danceStyle && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Class type</p>
                  <div className="flex gap-4">
                    {!isPrivateOnly && (
                      <label className="radio-item">
                        <input
                          type="radio"
                          name="classType"
                          value="Group"
                          checked={form.classType === "Group"}
                          onChange={handleChange}
                        />
                        Group Class
                      </label>
                    )}

                    <label className="radio-item">
                      <input
                        type="radio"
                        name="classType"
                        value="Private"
                        checked={form.classType === "Private"}
                        onChange={handleChange}
                      />
                      Private Class
                    </label>
                  </div>
                </div>
              )}

              {/* GROUP CLASS */}
              {form.classType === "Group" && (
                <div className="space-y-3 border-t pt-4">
                  <select
                    name="groupDay"
                    value={form.groupDay}
                    onChange={handleChange}
                    required
                    className="input-field select-field w-full"
                  >
                    <option value="">Select group class day</option>
                    <option value="Sunday — 3:00 PM to 4:00 PM">
                      Sunday — 3:00 PM to 4:00 PM (UAE TIME)
                    </option>
                    <option value="Monday — 8:00 PM to 9:00 PM">
                      Monday — 8:00 PM to 9:00 PM (UAE TIME)
                    </option>
                    <option value="Thursday — 8:00 PM to 9:00 PM">
                      Thursday — 8:00 PM to 9:00 PM (UAE TIME)
                    </option>
                  </select>

                  {/* ✅ HELPERS */}
                  {displayPrice && (
                    <p className="helper-price">
                      Price: <strong>{displayPrice}</strong>
                    </p>
                  )}

                  {displayLocation && (
                    <p className="helper-text">Location: {displayLocation}</p>
                  )}

                  <p className="helper-text">
                    Group class times are fixed. Please arrive 10 minutes early.
                  </p>
                </div>
              )}

              {/* PRIVATE CLASS */}
              {form.classType === "Private" && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <p className="text-sm font-semibold mb-2">Package</p>
                    <div className="flex flex-wrap gap-4">
                      {["1 Class", "3 Classes", "Monthly (6 Classes)"].map(
                        (pkg) => (
                          <label key={pkg} className="radio-item">
                            <input
                              type="radio"
                              name="privatePackage"
                              value={pkg}
                              checked={form.privatePackage === pkg}
                              onChange={handleChange}
                              required
                            />
                            {pkg}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="preferredDay"
                      value={form.preferredDay}
                      onChange={handleChange}
                      placeholder="Preferred day"
                      required
                      className="input-field"
                    />
                    <input
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      placeholder="Preferred time"
                      required
                      className="input-field"
                    />
                  </div>

                  {/* ✅ HELPERS */}
                  {displayPrice && (
                    <p className="helper-price">
                      Price: <strong>{displayPrice}</strong>
                    </p>
                  )}

                  <p className="helper-text">
                    Location: JLT, Cluster C, Dubai
                    <br />
                    Final confirmation will be sent by email.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid}
                className={`btn btn-gradient w-full py-3 rounded-xl font-semibold ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Continue
              </button>
            </form>
          </div>

          {/* CONFIRMATION MODAL */}
          {showConfirm && (
            <div className="confirm-modal-overlay">
              <div className="confirm-modal">
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setShowConfirm(false)}
                  aria-label="Close"
                >
                  ×
                </button>

                <h3>Confirm Your Booking</h3>

                <ul>
                  <li>
                    <strong>Name:</strong> {form.name}
                  </li>
                  <li>
                    <strong>Email:</strong> {form.email}
                  </li>
                  <li>
                    <strong>Phone:</strong> {form.phone}
                  </li>
                  <li>
                    <strong>Dance Style:</strong> {form.danceStyle}
                  </li>
                  <li>
                    <strong>Class Type:</strong> {form.classType}
                  </li>

                  {form.classType === "Group" && (
                    <>
                      <li>
                        <strong>Day & Time:</strong> {form.groupDay}
                      </li>
                      <li>
                        <strong>Location:</strong> {displayLocation}
                      </li>
                    </>
                  )}

                  {form.classType === "Private" && (
                    <>
                      <li>
                        <strong>Package:</strong> {form.privatePackage}
                      </li>
                      <li>
                        <strong>Preferred Time:</strong> {form.preferredDay} –{" "}
                        {form.preferredTime}
                      </li>
                      <li>
                        <strong>Location:</strong> {displayLocation}
                      </li>
                    </>
                  )}

                  <li className="price-line">
                    <strong>Total Price:</strong> {displayPrice}
                  </li>
                </ul>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-btn modal-btn-outline"
                    onClick={() => setShowConfirm(false)}
                  >
                    Edit Booking
                  </button>

                  <button
                    type="button"
                    className="modal-btn modal-btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookAClass;
