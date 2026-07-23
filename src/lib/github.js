// ────────────────────────────────────────────────────────────
// GitHub is the CMS. No repo data is hardcoded anywhere.
//
// Strategy:
//  - Fetch straight from the public REST API client-side, so every
//    visitor's browser pulls whatever is on GitHub *right now*.
//  - Cache in sessionStorage with a short TTL purely to avoid
//    hammering the unauthenticated rate limit (60 req/hr/IP) when a
//    visitor scrolls the page or re-renders — NOT to hide new pushes.
//  - A background interval silently re-validates so a repo pushed
//    while someone is already on the page shows up without reload.
//
// Net effect: push a new repo today -> it's live on the site the
// next time anyone loads it (or within CACHE_TTL_MS if they're
// already browsing). No rebuild, no redeploy, no manual edit.
// ────────────────────────────────────────────────────────────

const API = "https://api.github.com";
const CONTRIB_API = "https://github-contributions-api.jogruber.de/v4";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min — fine for the repo list
const CONTRIB_CACHE_TTL_MS = 60 * 1000; // 1 min — contributions should feel fresher
const POLL_MS = 5 * 60 * 1000;
const CONTRIB_POLL_MS = 60 * 1000; // 1 min

function cacheGet(key, ttl = CACHE_TTL_MS) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    if (Date.now() - at > ttl) return null;
    return data;
  } catch {
    return null;
  }
}

function cacheSet(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable — degrade silently, still works uncached */
  }
}

async function safeJson(res) {
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

export async function fetchUser(username) {
  const key = `gh:user:${username}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const data = await safeJson(await fetch(`${API}/users/${username}`));
  cacheSet(key, data);
  return data;
}

export async function fetchRepos(username) {
  const key = `gh:repos:${username}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const data = await safeJson(
    await fetch(`${API}/users/${username}/repos?per_page=100&sort=pushed&direction=desc`)
  );
  const cleaned = data
    .filter((r) => !r.fork)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      topics: r.topics || [],
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
      updatedAt: r.updated_at,
      isPrivate: r.private,
    }));
  cacheSet(key, cleaned);
  return cleaned;
}

export async function fetchContributions(username, { force = false } = {}) {
  const key = `gh:contrib:${username}`;
  if (!force) {
    const cached = cacheGet(key, CONTRIB_CACHE_TTL_MS);
    if (cached) return cached;
  }
  try {
    // cache-bust: stops the browser/any CDN in front of the third-party
    // API from handing back a stale response for "today"
    const data = await safeJson(
      await fetch(`${CONTRIB_API}/${username}?y=last&_=${Date.now()}`, { cache: "no-store" })
    );
    cacheSet(key, data);
    return data;
  } catch {
    return null; // graph falls back to a static skeleton, page keeps working
  }
}

export function relativeTime(iso) {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

/** Subscribe to a periodic re-sync; returns an unsubscribe fn. */
export function pollRepos(username, onData) {
  let stopped = false;
  const tick = async () => {
    try {
      sessionStorage.removeItem(`gh:repos:${username}`); // force fresh
      const repos = await fetchRepos(username);
      if (!stopped) onData(repos);
    } catch {
      /* keep last known good data on failure */
    }
  };
  const id = setInterval(tick, POLL_MS);
  return () => {
    stopped = true;
    clearInterval(id);
  };
}

/** Same idea as pollRepos, but on the faster CONTRIB_POLL_MS cadence. */
export function pollContributions(username, onData) {
  let stopped = false;
  const tick = async () => {
    try {
      const data = await fetchContributions(username, { force: true });
      if (!stopped && data) onData(data);
    } catch {
      /* keep last known good data on failure */
    }
  };
  const id = setInterval(tick, CONTRIB_POLL_MS);
  return () => {
    stopped = true;
    clearInterval(id);
  };
}
