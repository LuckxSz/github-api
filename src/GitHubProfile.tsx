import { useEffect, useState } from "react";
import type { GitHubUser, GitHubRepo } from "./types";
export const GitHubProfile = () => {
  const [username, setUsername] = useState("octocat");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  console.log(user);
  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]); // update on change

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="text"
        placeholder="GitHub username: "
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="px=3 rounded border py-2"
      />
      {loading && <p>Please wait a moment, api fetching </p>}

      {user && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 rounded-full"
          />
          <h2 className="text-xl font-bold">{user.login}</h2>
          <p>Repos: {user.public_repos}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
        </div>
      )}

      {repos.length > 0 && (
        <div className="mt-4 w-full max-w-md">
          <h3 className="mb-2 text-lg font-semibold">Repositories:</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.name} className="mb-2 rounded border p-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="font-bold text-blue-500"
                >
                  {repo.name}
                </a>
                <p>{repo.description}</p>
                <p>⭐ {repo.stargazers_count}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
