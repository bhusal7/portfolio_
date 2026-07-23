import { useCallback, useEffect, useState } from "react";
import { fetchContributions, pollContributions } from "../lib/github.js";
import { GITHUB_USERNAME } from "../data/config.js";

export default function useGithubContributions() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [lastSynced, setLastSynced] = useState(null);

  const load = useCallback((force = false) => {
    fetchContributions(GITHUB_USERNAME, { force })
      .then((res) => {
        setData(res);
        setStatus(res ? "ready" : "error");
        setLastSynced(new Date());
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
    // re-checks every 60s in the background so today's square appears
    // as soon as GitHub + the contributions API have it, no reload needed
    const unsubscribe = pollContributions(GITHUB_USERNAME, (res) => {
      setData(res);
      setLastSynced(new Date());
    });
    return unsubscribe;
  }, [load]);

  const resync = useCallback(() => load(true), [load]);

  return { data, status, lastSynced, resync };
}
