import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  Settings,
  Phone,
  CalendarDays,
  GraduationCap,
  X,
} from "lucide-react";

export default function Navbar({ logoPath = "/logo.png" }) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", Icon: Home },
    { name: "About", href: "/about", Icon: Info },
    { name: "Services", href: "/services", Icon: Settings },
    { name: "Contact", href: "/contact", Icon: Phone },
  ];

  const bookingActions = [
    { name: "Hire Dancers", href: "#hire-dancers", Icon: CalendarDays },
    { name: "Book a Class", href: "#book-a-class", Icon: GraduationCap },
  ];

  // lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // motion variants for slide-in overlay
  const overlayVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <header className="fixed inset-x-4 top-4 z-50 md:inset-x-8">
      <nav
        className="rounded-2xl border border-black/5 shadow-lg px-4 md:px-6 py-3 flex items-center justify-between gap-4 backdrop-blur-xl"
        style={{ background: "rgba(255,255,255,0.95)" }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <a href="/" className="flex items-center gap-3">
          <img
            src={logoPath}
            alt="DXB STARS logo"
            className="h-10 w-10 object-contain rounded-md"
          />
          <div className="leading-tight">
            <div
              className="text-sm font-bold"
              style={{ color: "var(--dxb-pink)" }}
            >
              DXB STARS
            </div>
            <div className="text-xs" style={{ color: "var(--dxb-black)" }}>
              eko entertainment • Dubai
            </div>
          </div>
        </a>

        {/* Desktop Nav (>= md) */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                className="text-sm font-medium flex items-center gap-2 nav-link"
                style={{ color: "var(--dxb-pink)" }}
              >
                <Icon size={16} />
                <span
                  className="inline-block border-b-2 border-transparent  transition-all duration-150"
                  style={{ paddingBottom: 2 }}
                >
                  {name}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right: desktop booking buttons + mobile hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop booking buttons */}
          <div className="hidden md:flex items-center gap-2">
            {bookingActions.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                className="px-4 py-2 rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-sm"
                style={{
                  background: "var(--dxb-pink)",
                  color: "var(--dxb-white)",
                }}
              >
                <Icon size={16} />
                <span>{name}</span>
              </a>
            ))}
          </div>

          {/* Hamburger: visible below md */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 rounded-lg flex items-center justify-center"
            type="button"
          >
            {/* simple animated hamburger -> X done by changing icon */}
            {open ? (
              <X size={20} color="var(--dxb-pink)" />
            ) : (
              // three bars
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="2" rx="1" fill="var(--dxb-pink)" />
                <rect
                  y="6"
                  width="20"
                  height="2"
                  rx="1"
                  fill="var(--dxb-pink)"
                />
                <rect
                  y="12"
                  width="20"
                  height="2"
                  rx="1"
                  fill="var(--dxb-pink)"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Fullscreen sliding panel for mobile */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="mobile-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-60 md:hidden"
            aria-modal="true"
            role="dialog"
          >
            {/* backdrop (optional subtle dark overlay behind panel) */}
            <div
              aria-hidden
              className="absolute inset-0 bg-black/20"
              onClick={() => setOpen(false)}
            />

            {/* sliding panel that covers full screen (we place it fixed on the right and stretch) */}
            <div className="absolute inset-0 flex">
              <motion.div
                className="ml-auto w-full max-w-full bg-white h-full flex flex-col"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "tween",
                  duration: 0.28,
                  ease: "easeInOut",
                }}
                style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
              >
                {/* top bar with close button */}
                <div className="flex items-center justify-end p-4">
                  <button
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-md"
                    type="button"
                  >
                    <X size={24} color="var(--dxb-pink)" />
                  </button>
                </div>

                {/* centered nav links */}
                <div className="flex-1 flex items-center justify-center">
                  <nav aria-label="Mobile main">
                    <ul className="flex flex-col items-center gap-6">
                      {navLinks.map(({ name, href, Icon }) => (
                        <li key={name}>
                          <a
                            href={href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 text-2xl font-semibold"
                            style={{ color: "var(--dxb-pink)" }}
                          >
                            <Icon size={20} />
                            <span>{name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* booking buttons at bottom (centered) */}
                <div className="p-6 pb-10">
                  <div className="flex flex-col gap-3">
                    {bookingActions.map(({ name, href, Icon }) => (
                      <a
                        key={name}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg font-semibold"
                        style={{
                          background: "var(--dxb-pink)",
                          color: "var(--dxb-white)",
                        }}
                      >
                        <Icon size={18} />
                        <span>{name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
