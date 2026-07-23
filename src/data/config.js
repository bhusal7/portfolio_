// ────────────────────────────────────────────────────────────
// Everything content-related lives here so sections stay dumb
// and this file stays the one place to edit copy/config.
// ────────────────────────────────────────────────────────────

export const GITHUB_USERNAME = "bhusal7";

export const IDENTITY = {
  name: "Vashudev Bhusal",
  handle: "bhusal7",
  location: "Kapilvastu, Birpur, Nepal",
  roles: [
    "AI Engineer",
    "GenAI / RAG Builder",
    "Full-Stack Developer",
    "Computer Vision Tinkerer",
  ],
  tagline:
    "I build software that reasons — LLM pipelines, retrieval systems and the full-stack scaffolding that ships them.",
  bio: [
    "I'm Vashudev — most people who work with me know me as bhusal7. I got into engineering the usual way: breaking things in Python, then wanting to know why they broke. That curiosity turned into a habit of shipping — small tools, ML experiments, half-finished ideas that occasionally turn into finished ones.",
    "Most of my time right now goes into generative AI — retrieval-augmented pipelines, agent scaffolding, and the unglamorous plumbing (evals, latency, cost) that decides whether an LLM demo survives contact with real users. The rest goes into full-stack work: FastAPI on the backend, React on the front, and enough DevOps to deploy it without holding my breath.",
    "This page isn't a static résumé. It reads my GitHub directly, so what you see below is whatever I actually shipped last — not what I remembered to update.",
  ],
  quote: "Consistency beats talent when talent doesn't stay consistent.",
  status: "open to internships / collaborations",
};

export const SOCIALS = [
  { label: "github.com/bhusal7", href: `https://github.com/${GITHUB_USERNAME}`, icon: "github" },
  { label: "facebook.com/bashudev07", href: "https://www.facebook.com/bashudev07", icon: "facebook" },
  { label: "@bashudev_bhusal7", href: "https://www.instagram.com/bashudev_bhusal7", icon: "instagram" },
];

export const NAV_LINKS = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "activity", label: "activity" },
  { id: "contact", label: "contact" },
];

// Order here = priority order when pinned repos aren't distinguishable
// via the API (unauthenticated REST can't read pins), so this acts as
// a manual "pin" fallback. Anything not listed just sorts by push date.
export const PINNED_FALLBACK = ["GenAI", "Portfolio", "Data_Science", "CardioSift-Diagnostic"];

export const PROJECT_FILTERS = [
  { key: "all", label: "all" },
  { key: "ai", label: "AI / ML", match: ["python", "jupyter notebook"] },
  { key: "web", label: "web", match: ["javascript", "typescript", "html", "css"] },
];

export const SKILL_GROUPS = [
  {
    group: "languages",
    items: [
      { name: "python", level: 92 },
      { name: "javascript", level: 85 },
      { name: "typescript", level: 70 },
      { name: "c / c++", level: 60 },
      { name: "php", level: 55 },
    ],
  },
  {
    group: "ai / ml",
    items: [
      { name: "pytorch", level: 88 },
      { name: "scikit-learn", level: 84 },
      { name: "opencv", level: 78 },
      { name: "pandas / numpy", level: 90 },
      { name: "matplotlib / plotly", level: 72 },
    ],
  },
  {
    group: "web / backend",
    items: [
      { name: "react", level: 86 },
      { name: "fastapi", level: 82 },
      { name: "django", level: 65 },
      { name: "express / node", level: 68 },
    ],
  },
  {
    group: "data / tools",
    items: [
      { name: "mongodb / mysql", level: 75 },
      { name: "git / github", level: 95 },
      { name: "vercel / anaconda", level: 60 },
      { name: "postman / power bi", level: 58 },
    ],
  },
];

export const TERMINAL_HELP = `Available commands:
  whoami          identity
  about           jump to about
  skills          jump to skills
  projects        list + jump to repositories
  contact         jump to contact
  social          list social links
  contributions   show activity stats
  ls              list repositories (live from GitHub)
  sync            force a GitHub re-sync
  date            print current date
  sudo hire-me    ;)
  clear           clear the terminal`;
