import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { personalInfo } from "../data/portfolioData";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        scrolled || open
          ? "bg-slate-950/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="relative z-[110] mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={() => handleClick("home")}
          className="flex items-center gap-3 text-lg font-bold tracking-tight text-white"
        >
          <img
            src="/logo-cropped.png"
            alt="Asad Sameer Momin Logo"
            className="h-8 w-8 rounded-lg object-contain shadow-md shadow-indigo-500/20"
          />
          <span className="hidden text-slate-200 sm:inline">{personalInfo.name}</span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleClick(link.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === link.id ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="ml-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105"
          >
            GitHub
          </a>
        </div>

        <button
          type="button"
          className="relative z-[120] inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-2xl text-white lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="absolute left-0 right-0 top-full z-[105] border-b border-white/10 bg-slate-950 px-5 pb-6 pt-2 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleClick(link.id)}
                  className={`rounded-xl px-4 py-3.5 text-left text-base font-medium ${
                    active === link.id
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="mt-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-3.5 text-center text-sm font-semibold text-white"
              >
                Visit GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
