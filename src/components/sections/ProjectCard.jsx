import { motion } from "framer-motion";
import { FiStar, FiGitBranch, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { relativeTime } from "../../lib/github.js";

const LANG_COLORS = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#DA5B0B",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
};

export default function ProjectCard({ repo, featured, index }) {
  const color = LANG_COLORS[repo.language] || "#5c7268";

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener"
      data-cursor="hover"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-xl border border-line/80 bg-panel p-6 transition-colors hover:border-phosphor/60 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      {/* glow sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-phosphor/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-phosphor-bright">
          {repo.name}
          {featured && (
            <span className="rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 text-[10px] font-normal uppercase tracking-wide text-signal">
              featured
            </span>
          )}
        </h3>
        <FiArrowUpRight className="mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-phosphor-bright" />
      </div>

      <p className="relative mt-2 min-h-[38px] text-[13px] leading-relaxed text-muted">
        {repo.description || "No description provided."}
      </p>

      {repo.topics?.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[10px] text-wire">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="relative mt-5 flex items-center justify-between text-[11px] text-muted">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FiStar /> {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <FiGitBranch /> {repo.forks}
          </span>
        </div>
        <span>updated {relativeTime(repo.pushedAt)}</span>
      </div>

      {repo.homepage && (
        <span className="relative mt-3 inline-flex items-center gap-1 text-[11px] text-phosphor">
          <FiExternalLink /> live demo
        </span>
      )}
    </motion.a>
  );
}
