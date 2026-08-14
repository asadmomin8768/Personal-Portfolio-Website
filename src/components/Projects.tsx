import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFolder, FiCheckCircle } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { projects, additionalProjects } from "../data/portfolioData";

const filters = ["All", "Frontend", "Productivity", "Utility"] as const;

export default function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative bg-slate-950 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="My Work"
          title="Featured Projects"
          subtitle="Hands-on applications built to practice and demonstrate frontend, backend, and problem-solving skills."
          light
        />

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === f
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                  : "border border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg">
                    <FiFolder size={20} />
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    {project.category}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-white transition group-hover:text-cyan-300">
                  {project.title}
                </h3>

                <ul className="mb-4 space-y-2 text-sm text-slate-400">
                  {project.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <FiCheckCircle className="mt-0.5 flex-shrink-0 text-cyan-400" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
        >
          <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-widest text-slate-300">
            Additional Mini Projects
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalProjects.map((proj) => (
              <span
                key={proj}
                className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                {proj}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
