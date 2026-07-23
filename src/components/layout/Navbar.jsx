import { useEffect, useState } from "react";
import { NAV_LINKS, IDENTITY } from "../../data/config.js";

export default function Navbar({ syncStatus }) {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-fault/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-phosphor/80" />
          </div>
          <span className="hidden text-xs text-muted sm:inline">{IDENTITY.handle}@portfolio:~</span>
        </div>

        <nav className="hidden gap-6 text-[13px] md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative py-1 transition-colors before:mr-0.5 before:text-phosphor/60 before:content-['./'] ${
                active === l.id ? "text-phosphor-bright" : "text-muted hover:text-phosphor-bright"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-[11px] text-muted sm:flex" title="Live GitHub sync status">
            <span
              className={`h-2 w-2 rounded-full ${
                syncStatus === "ready" ? "bg-phosphor animate-pulse" : syncStatus === "error" ? "bg-fault" : "bg-signal animate-pulse"
              }`}
            />
            {syncStatus === "ready" ? "synced" : syncStatus === "error" ? "sync failed" : "syncing"}
          </div>
          <button
            className="border border-line px-2.5 py-1 text-xs text-phosphor md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            [ menu ]
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-3 border-t border-line px-6 py-4 text-sm md:hidden">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="text-muted">
              ./{l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
