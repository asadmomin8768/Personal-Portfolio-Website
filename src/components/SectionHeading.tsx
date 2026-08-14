import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, subtitle, light }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 flex flex-col items-center text-center"
    >
      <span
        className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
          light
            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
            : "border-indigo-500/30 bg-indigo-500/10 text-indigo-600"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm sm:text-base ${
            light ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
