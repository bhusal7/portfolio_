import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IDENTITY } from "../../data/config.js";
import MagneticButton from "../ui/MagneticButton.jsx";

function useTypewriter(words, { typeMs = 62, deleteMs = 32, holdMs = 1300 } = {}) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      const word = words[wordIdx];
      if (!deleting) {
        charIdx++;
        setText(word.slice(0, charIdx));
        if (charIdx === word.length) {
          deleting = true;
          timeout = setTimeout(tick, holdMs);
          return;
        }
      } else {
        charIdx--;
        setText(word.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      timeout = setTimeout(tick, deleting ? deleteMs : typeMs);
    };
    timeout = setTimeout(tick, typeMs);
    return () => clearTimeout(timeout);
  }, [words, typeMs, deleteMs, holdMs]);
  return text;
}

export default function Hero({ repoCount, contribCount }) {
  const roleText = useTypewriter(IDENTITY.roles);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-tag", { opacity: 0, y: 10, duration: 0.5 })
        .from(".hero-line", { opacity: 0, y: 26, duration: 0.7, stagger: 0.08 }, "-=0.2")
        .from(".hero-desc", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
        .from(".hero-cta > *", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from(".hero-meta > *", { opacity: 0, y: 10, duration: 0.5, stagger: 0.06 }, "-=0.25");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const headline = "VASHUDEV BHUSAL";

  return (
    <section ref={rootRef} id="top" className="relative flex min-h-[92vh] flex-col justify-center pb-16 pt-40">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-phosphor/10 blur-[120px]" />

      <p className="hero-tag mb-5 text-sm text-muted">
        $ ssh visitor@bhusal7.dev<span className="ml-1 inline-block h-3.5 w-2 animate-blink bg-phosphor align-middle" />
      </p>

      <h1 className="font-display text-[clamp(2.4rem,7.5vw,5.4rem)] font-bold leading-[1.02] tracking-tight text-phosphor-bright">
        {headline.split(" ").map((word, i) => (
          <span key={i} className="hero-line mr-4 inline-block drop-shadow-[0_0_28px_rgba(57,224,122,0.25)]">
            {word}
          </span>
        ))}
      </h1>

      <div className="mt-4 min-h-[1.6em] text-[clamp(1rem,2.3vw,1.4rem)] text-signal">
        {roleText}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-blink bg-signal align-middle" />
      </div>

      <p className="hero-desc mt-6 max-w-xl text-[15px] leading-relaxed text-muted">{IDENTITY.tagline}</p>

      <div className="hero-cta mt-9 flex flex-wrap gap-4">
        <MagneticButton
          href="#projects"
          className="inline-flex items-center gap-2 border border-phosphor bg-phosphor/5 px-5 py-3 text-[13px] text-phosphor-bright transition-shadow hover:shadow-glow-sm"
        >
          ./view-projects.sh <span>→</span>
        </MagneticButton>
        <MagneticButton
          href="#contact"
          className="inline-flex items-center gap-2 border border-line px-5 py-3 text-[13px] text-muted transition-colors hover:border-signal hover:text-signal"
        >
          curl --request CONNECT
        </MagneticButton>
        <MagneticButton
          href="https://github.com/bhusal7"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 border border-line px-5 py-3 text-[13px] text-muted transition-colors hover:border-wire hover:text-wire"
        >
          git clone github.com/bhusal7
        </MagneticButton>
      </div>

      <div className="hero-meta mt-14 flex flex-wrap gap-10 text-xs text-muted">
        <div>
          <b className="block font-display text-xl font-bold text-phosphor-bright">{repoCount ?? "—"}</b>
          repositories
        </div>
        <div>
          <b className="block font-display text-xl font-bold text-phosphor-bright">{contribCount ?? "—"}</b>
          contributions / yr
        </div>
        <div>
          <b className="block font-display text-xl font-bold text-phosphor-bright">live</b>
          synced with GitHub
        </div>
      </div>
    </section>
  );
}
