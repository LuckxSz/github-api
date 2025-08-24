import { useEffect, useState } from "react";
import type { GitHubUser, GitHubRepo } from "./types";
export const GitHubProfile = () => {
  const [username, setUsername] = useState("octocat");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && username) {
      setLoading(true);

      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData: GitHubUser = await userRes.json();
        setUser(userData);

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const reposData: GitHubRepo[] = await reposRes.json();
        setRepos(reposData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-gray-50 p-6">
      <input
        type="text"
        placeholder="GitHub username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      {loading && (
        <p className="animate-pulse text-gray-500">
          Please wait, fetching data...
        </p>
      )}

      {user && (
        <div className="mt-6 flex w-full max-w-sm flex-col items-center rounded-xl bg-white p-6 shadow-md">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-32 w-32 rounded-full border-2 border-blue-400"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user.login}
          </h2>
          <div className="mt-2 flex gap-4 text-gray-600">
            <p>Repos: {user.public_repos}</p>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">
            Repositories
          </h3>
          <ul className="flex flex-col gap-3">
            {repos.map((repo) => (
              <li
                key={repo.name}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-lg font-bold text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="mt-1 text-gray-600">{repo.description}</p>
                )}
                <p className="mt-2 text-gray-500">⭐ {repo.stargazers_count}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
