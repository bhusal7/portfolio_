import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading.jsx";
import { IDENTITY } from "../../data/config.js";

export default function About() {
  return (
    <section id="about" className="border-t border-line/70 py-24">
      <SectionHeading eyebrow="whoami" title="About" path="~/about.md" />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-xl p-6 text-[14px] leading-relaxed sm:p-8"
        >
          {IDENTITY.bio.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4 text-fg" : "text-fg"}>
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <dl className="divide-y divide-line/70 border-y border-line/70 text-[13px]">
            {[
              ["role", "AI Engineer (aspiring)"],
              ["location", IDENTITY.location],
              ["open to", IDENTITY.status],
              ["stack", "FastAPI · React · PyTorch"],
              ["currently", "shipping GenAI tools"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-phosphor-bright">{v}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="mt-6 border-l-2 border-signal bg-signal/5 px-5 py-4 text-[13px] italic text-signal">
            “{IDENTITY.quote}”
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
