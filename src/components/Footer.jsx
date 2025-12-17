import React from "react";

/**
 * Footer.jsx
 * - Uses md breakpoint (>=768px) for multi-column layout.
 * - Footer text and headings use var(--dxb-pink).
 * - Social icons displayed in white circular backgrounds (SVGs inherit color if needed).
 * - Ensures responsive stacking and proper spacing so elements don't appear blocky on larger screens.
 */

export function Footer({ logoPath = "/logo.png" }) {
  return (
    <footer className="bg-white text-black ">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & blurb */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={logoPath}
              alt="DXB STARS logo"
              className="w-12 h-12 object-contain rounded-md"
            />
            <div>
              <div
                className="font-bold text-lg"
                style={{ color: "var(--dxb-pink)" }}
              >
                DXB STARS
              </div>
              <div className="text-sm text-gray-600">
                eko entertainment • Dubai
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 max-w-sm">
            Professional dance studio & bookings. Contemporary, hip-hop,
            afrobeat and more — based in Dubai and available worldwide.
          </p>

          <div className="flex items-center gap-3 mt-2">
            {/* Social icons in white circles (SVG stroke uses currentColor) */}
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full bg-white shadow-sm hover:scale-105 transition-transform inline-flex items-center justify-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="social-svg"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 6.5h.01"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full bg-white shadow-sm hover:scale-105 transition-transform inline-flex items-center justify-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="social-svg"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M18 2h-3a4 4 0 00-4 4v3H8v3h3v7h3v-7h2.5l.5-3H14V6a1 1 0 011-1h3V2z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-full bg-white shadow-sm hover:scale-105 transition-transform inline-flex items-center justify-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="social-svg"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5 3c-2.66 0-4.5 2.24-4 4.78A12.94 12.94 0 013 4s-4 9 5 13a13 13 0 01-8 2c12 7 27 0 27-16v-1A9 9 0 0023 3z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="p-2 rounded-full bg-white shadow-sm hover:scale-105 transition-transform inline-flex items-center justify-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="social-svg"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.75 15.02l5.5-3.02L9.75 9.0v6.02z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick links + Newsletter area */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--dxb-pink)" }}
            >
              Quick links
            </h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "var(--dxb-pink)" }}
            >
              <li>
                <a href="/" className="inline-block hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="inline-block hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="inline-block hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="inline-block hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/book-a-show" className="inline-block hover:underline">
                  Book a Show
                </a>
              </li>
              <li>
                <a
                  href="/book-a-class"
                  className="inline-block hover:underline"
                >
                  Book a Class
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold mb-3"
              style={{ color: "var(--dxb-pink)" }}
            >
              Join our newsletter
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Get class drops, early bookings and event invites — straight to
              your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your email"
                className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
              />
              <button
                type="submit"
                className="rounded-lg px-4 py-2 font-semibold"
                style={{
                  background: "var(--dxb-black)",
                  color: "var(--dxb-white)",
                }}
              >
                Subscribe
              </button>
            </form>
            <div className="mt-4 text-xs text-gray-500">
              We respect your privacy. Unsubscribe anytime.
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} DXB STARS — Eko Entertainment. All
            rights reserved.
          </div>
          <div className="mt-3 md:mt-0">
            Designed for Dubai • Available worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
