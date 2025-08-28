import { useState } from "react";
import type { GitHubUser, GitHubRepo } from "../types";
import { useTheme } from "../context/ThemeContext";

export const GitHubProfile = () => {
  const { selectedTheme, toggleDarkMode, darkMode } = useTheme();
  const [username, setUsername] = useState("LuckxSz");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && username) {
      setLoading(true);

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
      className={`mt-20 flex min-h-screen flex-col items-center px-4 ${selectedTheme.background}`}
    >
      {/* Botão de tema */}
      <button
        className={`mb-6 rounded-lg px-4 py-2 font-semibold shadow-lg transition ${selectedTheme.button}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <input
        type="text"
        placeholder="Digite o usuário do GitHub..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`w-2/6 max-w-sm rounded-lg ${selectedTheme.input}`}
      />

      {loading && (
        <p className="mt-4 animate-pulse font-medium text-[#38AECC]">
          🔍 Buscando dados...
        </p>
      )}
      {/* Card do Usuário */}
      {user && (
        <div
          className={`mt-6 w-full max-w-sm rounded-xl p-6 shadow-md ${selectedTheme.repository}`}
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="mx-auto h-32 w-32 rounded-full border-2 border-[#38AECC]"
          />
          <h2 className="mt-4 justify-around text-center text-lg font-bold text-[#38AECC]">
            {user.login}
          </h2>
          <div className={`mt-4 flex justify-around ${selectedTheme.info}`}>
            <p>📂 {user.public_repos}</p>
            <p>👥 {user.followers}</p>
            <p>➡ {user.following}</p>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="mt-12 w-full max-w-5xl">
          <h3 className="mb-4 p-8 text-center text-xl font-semibold text-[#38AECC]">
            📚 Repositórios
          </h3>
          <ul className="flex flex-col gap-4">
            {repos.map((repo) => (
              <li
                key={repo.name}
                className={`rounded-x1 p-6 shadow-lg hover:scale-[1.02] ${selectedTheme.repository}`}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg font-bold text-[#0090C1] hover:underline"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-[#E0E0E0]">
                    {repo.description}
                  </p>
                )}
                <p className="mt-3 font-medium text-[#38AECC]">
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
