import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading.jsx";
import { SKILL_GROUPS } from "../../data/config.js";

let pidCounter = 0;

export default function Skills() {
  pidCounter = 0;
  return (
    <section id="skills" className="border-t border-line/70 py-24">
      <SectionHeading eyebrow="system monitor" title="Skills" path="~$ htop --user=bhusal7" />

      <div className="overflow-hidden rounded-xl border border-line/80">
        <div className="grid grid-cols-[50px_1.3fr_3fr_60px] bg-panel2 px-5 py-3 text-[11px] uppercase tracking-wider text-muted sm:grid-cols-[60px_1.2fr_3fr_70px]">
          <span>pid</span>
          <span>process</span>
          <span>load</span>
          <span className="text-right">mem%</span>
        </div>

        {SKILL_GROUPS.map((g) => (
          <div key={g.group}>
            <div className="border-t border-line/70 bg-panel px-5 py-2 text-[11px] uppercase tracking-wider text-signal">
              {g.group}
            </div>
            {g.items.map((item) => {
              pidCounter += 1;
              const pid = String(pidCounter).padStart(3, "0");
              return (
                <div
                  key={item.name}
                  className="grid grid-cols-[50px_1.3fr_3fr_60px] items-center border-t border-dotted border-line/60 px-5 py-2.5 text-[13px] sm:grid-cols-[60px_1.2fr_3fr_70px]"
                >
                  <span className="text-muted">{pid}</span>
                  <span className="truncate pr-2">{item.name}</span>
                  <div className="h-2 overflow-hidden rounded-sm border border-line bg-void">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-phosphor to-wire"
                    />
                  </div>
                  <span className="pl-3 text-right text-phosphor-bright">{item.level}%</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
