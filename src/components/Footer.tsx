import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold tracking-tight text-white">
              {personalInfo.name}
            </span>
            <p className="mt-1 text-sm text-slate-400">{personalInfo.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <button
              onClick={() => scrollToSection("home")}
              className="transition hover:text-cyan-400"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="transition hover:text-cyan-400"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="transition hover:text-cyan-400"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="transition hover:text-cyan-400"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="transition hover:text-cyan-400"
            >
              Contact
            </button>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Crafted for Full-Stack Opportunities
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/40 transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <FiArrowUp />
      </button>
    </footer>
  );
}
