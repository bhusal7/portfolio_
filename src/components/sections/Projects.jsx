import { useMemo, useState } from "react";
import SectionHeading from "../ui/SectionHeading.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { PROJECT_FILTERS, PINNED_FALLBACK } from "../../data/config.js";

export default function Projects({ repos, status, lastSynced, resync }) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return repos;
    const def = PROJECT_FILTERS.find((f) => f.key === filter);
    return repos.filter((r) => def.match.includes((r.language || "").toLowerCase()));
  }, [repos, filter]);

  return (
    <section id="projects" className="border-t border-line/70 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="repositories" title="Projects" path="~$ ls -la --sort=recent" />
        <button
          onClick={resync}
          className="mb-12 flex items-center gap-2 border border-line px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-phosphor hover:text-phosphor-bright"
          title="Re-fetch from GitHub"
        >
          ↻ resync {lastSynced ? `· ${lastSynced.toLocaleTimeString()}` : ""}
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded border px-3.5 py-1.5 text-xs transition-colors ${
              filter === f.key
                ? "border-phosphor text-phosphor-bright"
                : "border-line text-muted hover:border-phosphor/50 hover:text-phosphor-bright"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {status === "loading" && (
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl border border-line/60 bg-panel/60" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-fault/40 bg-fault/5 p-6 text-sm text-fault">
          Couldn't reach the GitHub API right now — this is usually a rate limit or a network hiccup, not a broken
          site. Refresh in a minute, or browse repos directly on{" "}
          <a href="https://github.com/bhusal7" className="underline" target="_blank" rel="noopener">
            github.com/bhusal7
          </a>
          .
        </div>
      )}

      {status === "ready" && (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} featured={PINNED_FALLBACK[0] === repo.name} index={i} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-[11px] text-muted">
        This grid isn't hand-maintained — it reads {`{`}api.github.com/users/bhusal7/repos{`}`} on every visit, so a
        repo pushed five minutes ago shows up here, not just at the next deploy.
      </p>
    </section>
  );
}
