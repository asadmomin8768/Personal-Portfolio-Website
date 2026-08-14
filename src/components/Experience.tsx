import { motion } from "framer-motion";
import { FiBriefcase, FiTarget } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { experience, personalInfo } from "../data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Beyond Academics"
          title="Experience & Activities"
          subtitle="Practical exposure to real-world coordination and collaborative environments."
        />

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-7 shadow-sm sm:flex-row"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                <FiBriefcase size={20} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-sm font-semibold text-indigo-600">{exp.org}</p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-500">
                    {exp.tag}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {exp.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-cyan-50 p-7 sm:flex-row"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
              <FiTarget size={20} />
            </span>
            <div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Career Objective</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {personalInfo.careerObjective}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
