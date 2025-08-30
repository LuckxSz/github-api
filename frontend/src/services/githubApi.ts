import type { GitHubRepo, GitHubUser } from "../types";

const API_BASE = "http://localhost:3001/api/github";

export const fetchUser = async (username: string): Promise<GitHubUser> => {
  const res = await fetch(`${API_BASE}/users/${username}`);
  if (!res.ok) throw new Error("Error while looking for user.");
  return res.json();
};

export const fetchRepos = async (username: string): Promise<GitHubRepo[]> => {
  const res = await fetch(`${API_BASE}/users/${username}/repos`);
  if (!res.ok) throw new Error("Erro ao buscar repositórios");
  return res.json();
};
