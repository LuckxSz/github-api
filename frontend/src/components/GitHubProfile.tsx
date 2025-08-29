import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { GitHubUser, GitHubRepo } from "../types";
import { useTheme } from "../context/ThemeContext";
import noImage from "../assets/noImage.png";
import { FiSearch } from "react-icons/fi";

export const GitHubProfile = () => {
  const { selectedTheme, toggleDarkMode, darkMode } = useTheme();
  const [username, setUsername] = useState("");
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
      className={`center mt-36 flex min-h-screen w-full flex-col items-center`}
    >
      <motion.button
        className={`mb-12 p-40 ${selectedTheme.button}`}
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </motion.button>
      <div className="relative mt-6 w-full max-w-sm">
        <motion.input
          type="text"
          placeholder="GitHub username:  "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full max-w-sm ${selectedTheme.input}`}
          whileFocus={{ scale: 1.02, borderColor: "#38AECC" }} //
          transition={{ type: "spring", stiffness: 200 }}
        />

        <FiSearch
          onClick={() =>
            handleKeyDown({
              key: "Enter",
            } as React.KeyboardEvent<HTMLInputElement>)
          }
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition hover:scale-[1.5]"
        />
      </div>

      <AnimatePresence>
        {loading && (
          <motion.p
            className="mt-4 animate-pulse text-[#0090C1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Please wait, fetching data...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {user && (
          <motion.div
            key={user.login}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 flex w-full max-w-sm flex-col items-center rounded-xl p-6 shadow-md`}
          >
            <motion.img
              src={user.avatar_url || noImage}
              alt={user.login}
              className="h-32 w-32 rounded-full border-2 border-[#0090C1]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
            <motion.h2
              className="mt-4 text-2xl font-bold text-[#38AECC]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {user.login}
            </motion.h2>
            <motion.div
              className={`mt-2 flex gap-4 ${selectedTheme.info}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>Repos: {user.public_repos}</p>
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {repos.length > 0 && (
          <motion.div
            key="repos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 w-full max-w-md"
          >
            <h3 className="mb-4 text-center text-xl font-semibold text-[#38AECC]">
              Repositories
            </h3>
            <ul className="flex w-auto flex-col gap-3 text-center">
              {repos.map((repo, i) => (
                <motion.li
                  key={repo.name}
                  className={` ${selectedTheme.repository}`}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 150,
                  }}
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
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
