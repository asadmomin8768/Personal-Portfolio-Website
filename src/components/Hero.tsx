import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiGithub, FiArrowDown, FiDownload } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";

function useTypewriter(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(personalInfo.roles);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-start overflow-hidden bg-slate-950 pt-20 lg:items-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />

      {/* Animated blobs */}
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-indigo-600/30 blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-4 lg:grid-cols-5 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Open to Internships & Full-Time Roles
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Asad Sameer Momin
            </span>
          </h1>

          <div className="mt-4 h-10 text-xl font-semibold text-slate-300 sm:text-2xl">
            <span>{typed}</span>
            <span className="animate-pulse text-cyan-400">|</span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            {personalInfo.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => handleScroll("projects")}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105"
            >
              View My Projects
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Get In Touch
            </button>
            <button
              onClick={() => handleScroll("about")}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <FiDownload /> View Summary
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:text-cyan-300">
              <FiPhone className="text-cyan-400" /> {personalInfo.phone}
            </a>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-cyan-300">
              <FiMail className="text-cyan-400" /> {personalInfo.email}
            </a>
            <span className="flex items-center gap-2">
              <FiMapPin className="text-cyan-400" /> {personalInfo.location}
            </span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-cyan-300"
            >
              <FiGithub className="text-cyan-400" /> {personalInfo.githubHandle}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:col-span-2"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-[2.5rem] border border-dashed border-cyan-400/30"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-indigo-900/50">
              <img
                src="/images/avatar.jpg"
                alt="Asad Sameer Momin illustration"
                className="h-[420px] w-[340px] object-cover sm:h-[460px] sm:w-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-8 top-8 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-cyan-300 shadow-xl backdrop-blur"
            >
              {"</>"} Full-Stack Dev
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -right-6 bottom-16 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-indigo-300 shadow-xl backdrop-blur"
            >
              🎓 8.46 CGPA
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => handleScroll("about")}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-400 hover:text-cyan-300"
        aria-label="Scroll down"
      >
        <FiArrowDown size={22} />
      </motion.button>
    </section>
  );
}
