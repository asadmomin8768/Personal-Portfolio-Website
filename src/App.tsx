import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const storageKey = "asad-portfolio-scroll-position";
    const savedPosition = sessionStorage.getItem(storageKey);

    // Restore the last reading position after the page has rendered its sections.
    if (savedPosition) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: Number(savedPosition), behavior: "auto" });
      });
    }

    let frameId: number | undefined;
    const saveScrollPosition = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        sessionStorage.setItem(storageKey, String(window.scrollY));
        frameId = undefined;
      });
    };

    window.addEventListener("scroll", saveScrollPosition, { passive: true });
    window.addEventListener("pagehide", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
      window.removeEventListener("pagehide", saveScrollPosition);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
