import { useEffect, useRef, useState } from "react";
import SectionHeading from "../ui/SectionHeading.jsx";
import { TERMINAL_HELP, SOCIALS } from "../../data/config.js";

export default function Terminal({ repos, resync }) {
  const [lines, setLines] = useState([
    { text: "Welcome to bhusal7's shell. Type <span class='text-wire'>help</span> to get started.", type: "out" },
  ]);
  const [value, setValue] = useState("");
  const historyRef = useRef([]);
  const hIdxRef = useRef(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const push = (text, type = "out") => setLines((l) => [...l, { text, type }]);

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push(cmd, "cmd");
    historyRef.current.push(cmd);
    hIdxRef.current = historyRef.current.length;

    const key = cmd.toLowerCase();
    const repoNames = repos.map((r) => `<span class="text-wire">${r.name}</span>`).join(", ");

    const table = {
      help: () => TERMINAL_HELP.replace(/\n/g, "<br/>"),
      whoami: () => `Vashudev Bhusal — aka <span class="text-wire">bhusal7</span> — Aspiring AI Engineer · Kapilvastu, Nepal`,
      about: () => (scrollTo("about"), "Loading about.md ..."),
      skills: () => (scrollTo("skills"), "Attaching to process monitor ..."),
      projects: () => (scrollTo("projects"), repos.length ? `Repositories (live): ${repoNames}` : "Fetching from GitHub ..."),
      ls: () => (repos.length ? repos.map((r) => `<span class="text-wire">${r.name}</span>  <span class="text-muted">${r.language || ""}</span>`).join("<br/>") : "no repos loaded yet"),
      sync: () => (resync(), "Re-syncing with api.github.com/users/bhusal7/repos ..."),
      contact: () => (scrollTo("contact"), "Opening secure channel ..."),
      contributions: () => (scrollTo("activity"), "Rendering contribution calendar ..."),
      social: () => SOCIALS.map((s) => `${s.icon}: <span class="text-wire">${s.href.replace("https://", "")}</span>`).join("<br/>"),
      date: () => new Date().toString(),
      clear: () => (setLines([]), null),
      "sudo hire-me": () => (scrollTo("contact"), "Permission granted. Redirecting to /contact ... good call."),
      exit: () => "nice try — this isn't vim. type 'clear' instead.",
      ":q": () => "nice try — this isn't vim. type 'clear' instead.",
    };

    let output;
    if (table[key]) output = table[key]();
    else if (key.startsWith("echo ")) output = cmd.slice(5);
    else output = `command not found: <span class="text-wire">${cmd}</span> — type 'help' for a list of commands.`;

    if (output) push(output, "out");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdxRef.current > 0) {
        hIdxRef.current -= 1;
        setValue(historyRef.current[hIdxRef.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdxRef.current < historyRef.current.length - 1) {
        hIdxRef.current += 1;
        setValue(historyRef.current[hIdxRef.current]);
      } else {
        hIdxRef.current = historyRef.current.length;
        setValue("");
      }
    }
  };

  return (
    <section className="border-t border-line/70 py-24">
      <SectionHeading eyebrow="interactive" title="Talk to the machine" path="~/portfolio/bin/shell" />

      <div
        onClick={() => inputRef.current?.focus()}
        className="overflow-hidden rounded-xl border border-line/80 bg-panel shadow-glow"
      >
        <div className="flex items-center gap-2 border-b border-line/80 bg-panel2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-fault/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-phosphor/80" />
          <span className="ml-2 text-xs text-muted">sh — 80x24 — live data</span>
        </div>

        <div ref={bodyRef} className="h-64 overflow-y-auto px-5 py-4 text-[13px]">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`mb-1.5 whitespace-pre-wrap break-words ${l.type === "cmd" ? "text-phosphor-bright" : "text-muted"}`}
              dangerouslySetInnerHTML={{
                __html: l.type === "cmd" ? `<span class="text-phosphor">visitor@bhusal7:~$</span> ${l.text}` : l.text,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-line/80 bg-panel2 px-4 py-2.5">
          <span className="whitespace-nowrap text-[13px] text-phosphor">visitor@bhusal7:~$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            placeholder="type 'help' and press enter"
            className="w-full bg-transparent text-[13px] text-phosphor-bright outline-none placeholder:text-muted/60"
          />
        </div>
      </div>
      <p className="mt-3 text-[11px] text-muted">
        try: <kbd className="rounded border border-line px-1.5 py-0.5 text-signal">help</kbd>{" "}
        <kbd className="rounded border border-line px-1.5 py-0.5 text-signal">ls</kbd>{" "}
        <kbd className="rounded border border-line px-1.5 py-0.5 text-signal">sync</kbd>{" "}
        <kbd className="rounded border border-line px-1.5 py-0.5 text-signal">sudo hire-me</kbd> — ↑ / ↓ for history
      </p>
    </section>
  );
}
