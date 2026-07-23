import { useEffect, useMemo, useState } from "react";
import { fetchRepos, pollRepos } from "../lib/github.js";
import { GITHUB_USERNAME, PINNED_FALLBACK } from "../data/config.js";

export default function useGithubRepos() {
  const [repos, setRepos] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [lastSynced, setLastSynced] = useState(null);

  const load = async () => {
    try {
      const data = await fetchRepos(GITHUB_USERNAME);
      setRepos(data);
      setStatus("ready");
      setLastSynced(new Date());
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
    const unsubscribe = pollRepos(GITHUB_USERNAME, (data) => {
      setRepos(data);
      setLastSynced(new Date());
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sorted = useMemo(() => {
    if (!repos) return [];
    return [...repos].sort((a, b) => {
      const pa = PINNED_FALLBACK.indexOf(a.name);
      const pb = PINNED_FALLBACK.indexOf(b.name);
      const aPinned = pa !== -1;
      const bPinned = pb !== -1;
      if (aPinned && bPinned) return pa - pb;
      if (aPinned) return -1;
      if (bPinned) return 1;
      return new Date(b.pushedAt) - new Date(a.pushedAt);
    });
  }, [repos]);

  return { repos: sorted, status, lastSynced, resync: load };
}
