import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, path }) {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-signal"
      >
        <span className="text-phosphor">$</span> {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-3xl font-semibold text-phosphor-bright sm:text-4xl"
      >
        {title}
        {path && <span className="mt-1 block font-mono text-sm font-normal text-muted">{path}</span>}
      </motion.h2>
    </div>
  );
}
