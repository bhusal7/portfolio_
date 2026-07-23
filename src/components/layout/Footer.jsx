import { IDENTITY } from "../../data/config.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/80 py-10 text-center text-xs text-muted">
      <p>Designed &amp; built by {IDENTITY.name} — synced live from GitHub, no CMS, no bloat.</p>
      <p className="mt-2 text-phosphor/70">// EOF — © {year} {IDENTITY.handle}</p>
    </footer>
  );
}
