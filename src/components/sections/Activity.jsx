import { useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading.jsx";
import useGithubContributions from "../../hooks/useGithubContributions.js";

const SHADES = ["#141f19", "#123322", "#1d5c3c", "#2c9a5d", "#39e07a"];

export default function Activity() {
  const { data, status, lastSynced, resync } = useGithubContributions();

  const { weeks, total } = useMemo(() => {
    if (!data?.contributions) return { weeks: [], total: 0 };
    const days = data.contributions;
    const total = days.reduce((s, d) => s + d.count, 0);
    const w = [];
    for (let i = 0; i < days.length; i += 7) w.push(days.slice(i, i + 7));
    return { weeks: w, total };
  }, [data]);

  return (
    <section id="activity" className="border-t border-line/70 py-24">
      <SectionHeading
        eyebrow="contribution graph"
        title="Activity"
        path='~$ git log --all --since="1 year ago" | wc -l'
      />

      <div className="glass rounded-xl p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-sm text-phosphor-bright">
            {status === "ready" ? total : "—"} contributions in the last year
          </span>
          <button
            onClick={resync}
            className="flex items-center gap-2 border border-line px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-phosphor hover:text-phosphor-bright"
            title="Force a fresh pull from GitHub"
          >
            ↻ resync {lastSynced ? `· ${lastSynced.toLocaleTimeString()}` : ""}
          </button>
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px]">
            {Array.from({ length: 371 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-[2px] bg-line/60" />
            ))}
          </div>
        )}

        {status === "ready" && (
          <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-2">
            {weeks.flat().map((day, i) => (
              <motion.div
                key={day.date + i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i, 120) * 0.0025 }}
                title={`${day.count} contributions on ${day.date}`}
                className="h-[11px] w-[11px] rounded-[2px]"
                style={{ background: SHADES[day.level] ?? SHADES[0] }}
              />
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-muted">
            Contribution graph is temporarily unavailable — see the live version on{" "}
            <a href="https://github.com/bhusal7" className="text-phosphor underline" target="_blank" rel="noopener">
              github.com/bhusal7
            </a>
            .
          </p>
        )}

        <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-muted">
          <span>less</span>
          {SHADES.map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: c }} />
          ))}
          <span>more</span>
        </div>

        <p className="mt-5 text-[11px] text-muted">
          This re-checks GitHub every 60 seconds on its own, and the button above forces an instant pull. If a
          same-day push still isn't showing, that's GitHub's own contribution graph catching up — it can lag behind
          the actual push by anywhere from a few minutes to a few hours, even on github.com itself.
        </p>
      </div>
    </section>
  );
}
