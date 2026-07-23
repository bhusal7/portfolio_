# bhusal7 — portfolio

React (Vite) portfolio for Vashudev Bhusal. Dark hacker/terminal aesthetic,
GSAP + Framer Motion + Lenis for motion, and **GitHub as the CMS** — repos
and the contribution graph are never hardcoded, they're fetched live.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the build locally
```

## Project structure

```
src/
  data/config.js          identity, socials, skills, nav — edit copy here
  lib/github.js            GitHub API client + cache + poll logic
  hooks/
    useGithubRepos.js       live repo list, sorting, resync
    useGithubContributions.js  contribution calendar
    useLenis.js              smooth scroll
  components/
    layout/   Navbar, Footer, Backdrop (canvas rain/scanlines), CustomCursor
    ui/       MagneticButton, SectionHeading — shared primitives
    sections/ Hero, Terminal, About, Skills, Projects, ProjectCard, Activity, Contact
  App.jsx
  main.jsx
```

## How the "auto-update when I push to GitHub" part works

There's no build step involved in keeping content fresh — the browser talks
to the GitHub API directly:

1. **On every page load**, `src/lib/github.js` calls
   `GET https://api.github.com/users/bhusal7/repos` and
   `github-contributions-api.jogruber.de` for the contribution calendar.
   Whatever is on your GitHub *right now* is what renders.
2. Results are cached in `sessionStorage` for 5 minutes
   (`CACHE_TTL_MS` in `lib/github.js`) purely to stay under the
   unauthenticated rate limit (60 requests/hour/IP) — not to hide new pushes.
3. While someone is already on the page, `pollRepos()` re-fetches every
   5 minutes in the background, so a repo pushed *while a visitor is
   browsing* still shows up without a reload.
4. There's also a `resync` button (and a `sync` command in the terminal)
   for an on-demand force refresh.

**Net effect:** push a new repo today → it's already visible the next time
anyone (including you) loads the site. Tomorrow, next month, next year —
no redeploy required, because the data was never baked into the build.

### Fine-tuning what shows up

- `PINNED_FALLBACK` in `src/data/config.js` is a manual "pin" order (the
  unauthenticated REST API can't read your actual GitHub pins). Anything
  not listed there just sorts by most-recently-pushed.
- Forked repos are filtered out automatically in `lib/github.js`.
- Rate limit: 60 req/hr unauthenticated is plenty for a personal site's
  traffic given the 5-minute cache. If you outgrow it, swap
  `fetch(...)` in `lib/github.js` for a call through your own
  serverless function using a GitHub PAT (5,000 req/hr), or move to the
  GraphQL API for pinned-repo + contribution data in one request.

## Deploying

Any static host works (Vercel, Netlify, GitHub Pages, Cloudflare Pages) —
`npm run build` outputs a plain `dist/` folder, and since content is
fetched client-side, **you don't need to redeploy when you push new
repos.** Redeploy only when you actually change the site's code or copy.

## Editing content

- Bio, roles, skills, quote, socials → `src/data/config.js`
- Terminal commands/help text → `src/data/config.js` (`TERMINAL_HELP`) and
  `src/components/sections/Terminal.jsx` (the command table itself)
- Colors/fonts/spacing tokens → `tailwind.config.js`
