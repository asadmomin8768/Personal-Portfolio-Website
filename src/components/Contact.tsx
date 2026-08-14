import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { personalInfo } from "../data/portfolioData";

/**
 * EmailJS credentials (public — safe to expose in the browser).
 * Reads from Vite env vars first, falls back to placeholders you can replace
 * inline if you don't want to use environment variables.
 *
 * Setup: https://www.emailjs.com/
 *   1. Create a free EmailJS account
 *   2. Add an Email Service (Gmail) and connect mohdasadmomin766@gmail.com
 *   3. Create an Email Template with template variables:
 *        {{from_name}}, {{from_email}}, {{subject}}, {{message}}, {{reply_to}}
 *   4. Copy Service ID, Template ID and Public Key below (or into .env)
 */
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

// Direct contact cards shown alongside the form
const contactCards = [
  { icon: FiPhone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: FiMail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: FiMapPin, label: "Location", value: personalInfo.location, href: undefined },
  {
    icon: FiGithub,
    label: "GitHub",
    value: personalInfo.githubHandle,
    href: personalInfo.github,
  },
];

// Simple RFC-compliant email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot — hidden field that real users leave empty
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  // Validate every field client-side before we spend an API call
  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!EMAIL_REGEX.test(form.email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!form.subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    else if (form.message.trim().length < 10)
      nextErrors.message = "Message should be at least 10 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot — silently discard bot submissions
    if (form.website) return;

    if (!validate()) return;

    setStatus("sending");
    setFeedback("");

    try {
      // Payload keys must match the {{variables}} defined in your EmailJS template
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        reply_to: form.email,
        subject: form.subject,
        message: form.message,
        to_email: personalInfo.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus("success");
      setFeedback("Thanks for reaching out! Your message has been delivered — I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setFeedback(
        "Something went wrong while sending your message. Please try again or email me directly at " +
          personalInfo.email
      );
    }
  };

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 ${
      errors[field] ? "border-rose-500/60" : "border-white/10"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.15),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Let's Connect"
          title="Get In Touch"
          subtitle="Open to Full-Stack Web Development internships, full-time job opportunities, collaborations, and interesting conversations about software."
          light
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Direct contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1"
          >
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.06]">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 text-white">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
                    <p className="truncate text-sm font-semibold text-white">{card.value}</p>
                  </div>
                </div>
              );
              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={card.label}>{content}</div>
              );
            })}
          </motion.div>

          {/* Contact form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
          >
            {/* Honeypot — hidden from real users, catches bots */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={update("website")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  className={inputClass("name")}
                  placeholder="Enter your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className={inputClass("email")}
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={update("subject")}
                className={inputClass("subject")}
                placeholder="What is this about?"
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <p className="mt-1.5 text-xs text-rose-400">{errors.subject}</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={update("message")}
                className={`${inputClass("message")} resize-none`}
                placeholder="Enter your message"
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>}
            </div>

            {/* Submit button with loading, success and error states */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === "sending" && (
                <>
                  <FiLoader className="animate-spin" /> Sending...
                </>
              )}
              {status !== "sending" && (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>

            {/* Feedback message */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
              >
                <FiCheckCircle className="mt-0.5 flex-shrink-0" />
                <span>{feedback}</span>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
              >
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                <span>{feedback}</span>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
