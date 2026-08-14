import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { education } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="relative bg-slate-950 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(34,211,238,0.12),transparent_45%)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Academic Background"
          title="Education"
          subtitle="A consistent academic track record building the foundation for a career in software engineering."
          light
        />

        <div className="relative mt-4">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-indigo-500/40 to-transparent sm:left-1/2" />

          <div className="space-y-10">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col gap-6 sm:flex-row ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-6 top-1 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-4 border-slate-950 bg-cyan-400 sm:left-1/2" />

                <div className="pl-14 sm:w-1/2 sm:pl-0 sm:pr-10 sm:text-right sm:[.reverse]:pl-10">
                  {i % 2 === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:ml-auto">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                        <FiBookOpen /> {item.period}
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.degree}</h3>
                      <p className="mt-1 text-sm text-slate-400">{item.institution}</p>
                      {item.details.length > 0 && (
                        <ul className="mt-3 space-y-1 text-sm text-slate-300 sm:text-right">
                          {item.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <div className="pl-14 sm:w-1/2 sm:pl-10">
                  {i % 2 === 1 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                        <FiBookOpen /> {item.period}
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.degree}</h3>
                      <p className="mt-1 text-sm text-slate-400">{item.institution}</p>
                      {item.details.length > 0 && (
                        <ul className="mt-3 space-y-1 text-sm text-slate-300">
                          {item.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
