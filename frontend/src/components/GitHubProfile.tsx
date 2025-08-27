import { useState } from "react";
import type { GitHubUser, GitHubRepo } from "../types";
import { variants } from "../theme";

export const GitHubProfile = () => {
  const [username, setUsername] = useState("octocat");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const selectedTheme = variants[darkMode ? "dark" : "light"];

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && username) {
      setLoading(true);
      <button onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "DarkMode"}
      </button>;
      try {
        const userRes = await fetch(
          `http://localhost:3001/api/github/users/${username}`
        );

        const userData: GitHubUser = await userRes.json();
        setUser(userData);

        const reposRes = await fetch(
          `http://localhost:3001/api/github/users/${username}/repos`
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
    <div
      className={`flex min-h-screen flex-col items-center ${selectedTheme.background} w-full`}
    >
      <button
        className={`top-4 right-4 rounded-lg px-4 py-2 ${selectedTheme.button}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? "Light Mode" : "DarkMode"}
      </button>
      <input
        type="text"
        placeholder="GitHub username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        onKeyDown={handleKeyDown}
        className={`w-full max-w-sm rounded-lg border border-[#046E8F] px-4 py-2 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#38AECC] focus:outline-none`}
      />

      {loading && (
        <p className="animate-pulse text-[#0090C1]">
          Please wait, fetching data...
        </p>
      )}

      {user && (
        <div
          className={`rounded-xl$ mt-6 flex w-full max-w-sm flex-col items-center p-6 shadow-md`}
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-32 w-32 rounded-full border-2 border-[#0090C1]"
          />
          <h2 className="mt-4 text-2xl font-bold text-[#38AECC]">
            {user.login}
          </h2>
          <div className="mt-2 flex gap-4 text-[#046E8F]">
            <p>Repos: {user.public_repos}</p>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="mb-4 text-center text-xl font-semibold text-[#38AECC]">
            Repositories
          </h3>
          <ul className="flex w-auto flex-col gap-3 text-center">
            {repos.map((repo) => (
              <li
                key={repo.name}
                className="rounded-lg border border-[#046E8F] bg-[#183446] p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-[#0090C1] hover:underline"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="mt-1 text-[#E0E0E0]">{repo.description}</p>
                )}
                <p className="mt-2 text-[#38AECC]">
                  ⭐ {repo.stargazers_count}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
