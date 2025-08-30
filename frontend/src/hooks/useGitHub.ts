import { useState } from "react";
import type { GitHubUser, GitHubRepo } from "../types";
import { fetchUser, fetchRepos } from "../services/githubApi";

export function useGitHub() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUserData = async (username: string) => {
    setLoading(true);
    try {
      const userData = await fetchUser(username);
      setUser(userData);

      const reposData = await fetchRepos(username);
      setRepos(reposData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { user, repos, loading, loadUserData };
}
