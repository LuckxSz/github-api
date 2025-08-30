import type { GitHubUser, GitHubRepo } from "../types";

const API_BASE = "http://localhost:3001/api/github";

export async function fetchUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`${API_BASE}/users/${username}`);

  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`${API_BASE}/users/${username}/repos`);
  if (!res.ok) throw new Error("Erro ao buscar repositórios");
  return res.json();
}
