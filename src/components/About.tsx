import { motion } from "framer-motion";
import { FiTarget, FiAward } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import AnimatedCounter from "./AnimatedCounter";
import { personalInfo, stats, strengths, careerInterests } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title="Get to know me"
          subtitle="Passionate about crafting practical, user-friendly web applications while continuously strengthening my full-stack development foundation."
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-base leading-relaxed text-slate-600">{personalInfo.aboutSummary}</p>

            <div className="flex items-start gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                <FiTarget size={20} />
              </span>
              <div>
                <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-indigo-700">
                  Career Objective
                </h4>
                <p className="text-sm leading-relaxed text-slate-600">
                  {personalInfo.careerObjective}
                </p>
              </div>
            </div>

            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-800">
                <FiAward className="text-indigo-500" /> Strengths
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {strengths.map((s) => (
                  <div
                    key={s}
                    className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-800">
                Career Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {careerInterests.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700"
                  >
                    ✦ {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-900 to-indigo-950 p-8 text-center shadow-xl shadow-slate-200"
              >
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
