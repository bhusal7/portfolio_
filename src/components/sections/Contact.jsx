import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiFacebook, FiInstagram } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading.jsx";
import MagneticButton from "../ui/MagneticButton.jsx";
import { SOCIALS, IDENTITY } from "../../data/config.js";

const ICONS = { github: FiGithub, facebook: FiFacebook, instagram: FiInstagram };

export default function Contact() {
  const [note, setNote] = useState(
    '// this form is a static demo — wire it to Formspree, EmailJS, or your own backend to receive messages.'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setNote("// message queued locally — connect a backend to actually deliver it.");
    e.target.reset();
  };

  return (
    <section id="contact" className="border-t border-line/70 py-24">
      <SectionHeading eyebrow="connect" title="Contact" path={'~$ mail -s "let\'s build something"'} />

      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="max-w-md text-[14px] leading-relaxed text-muted">
            Open to internships, freelance collaborations, and interesting AI / full-stack problems. Drop a message,
            or reach out directly on any channel below.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <MagneticButton
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  strength={8}
                  className="flex items-center gap-3 rounded-lg border border-line px-4 py-3 text-[13px] transition-colors hover:border-phosphor hover:text-phosphor-bright"
                >
                  <Icon className="shrink-0 text-base" /> {s.label}
                </MagneticButton>
              );
            })}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wide text-muted">from</label>
            <input required placeholder="your name" className="w-full rounded-md border border-line bg-panel px-4 py-2.5 text-sm text-phosphor-bright outline-none focus:border-phosphor" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wide text-muted">reply-to</label>
            <input required type="email" placeholder="your@email.com" className="w-full rounded-md border border-line bg-panel px-4 py-2.5 text-sm text-phosphor-bright outline-none focus:border-phosphor" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wide text-muted">body</label>
            <textarea required placeholder="type your message..." rows={4} className="w-full resize-y rounded-md border border-line bg-panel px-4 py-2.5 text-sm text-phosphor-bright outline-none focus:border-phosphor" />
          </div>
          <MagneticButton
            as="button"
            type="submit"
            strength={10}
            className="mt-1 inline-flex w-fit items-center gap-2 border border-phosphor bg-phosphor/5 px-5 py-2.5 text-[13px] text-phosphor-bright transition-shadow hover:shadow-glow-sm"
          >
            send_message() <span>→</span>
          </MagneticButton>
          <p className="text-[11px] text-muted">{note}</p>
        </motion.form>
      </div>
    </section>
  );
}
