import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import noImage from "../assets/noImage.png";
import { FiSearch } from "react-icons/fi";
import { useGitHub } from "../hooks/useGitHub";
import { Sidebar } from "./Sidebar";
import { Card } from "./Card";

export const GitHubProfile = () => {
  const { selectedTheme, toggleDarkMode, darkMode } = useTheme();
  const [username, setUsername] = useState("");
  const { user, repos, loading, loadUserData } = useGitHub();
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const notify = () => toast("Wow so easy !");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && username) {
      loadUserData(username);
    }
  };

  const handleOpenCard = (repo: any) => {
    setSelectedRepo(repo);
    setOpenCard(true);
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    setSelectedRepo(null);
  };
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex flex-1 flex-col items-center">
        <motion.button
          className={`mt-12 mb-12 p-4 ${selectedTheme.button}`}
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
            placeholder="GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full max-w-sm ${selectedTheme.input}`}
            whileFocus={{ scale: 1.02, borderColor: "#38AECC" }}
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
              className="mt-6 flex w-full max-w-sm flex-col items-center rounded-xl p-6 shadow-md"
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
                <p>Following : {user.following}</p>
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
              className="mt-1 w-full max-w-md"
            >
              <h3 className="mb-4 text-center text-xl font-semibold text-[#38AECC]">
                Repositories
              </h3>
              <ul className="flex w-auto flex-col gap-3 text-center">
                <div className="mt-6 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
                  {repos.map((repo, i) => (
                    <motion.div
                      key={repo.name}
                      className={`${selectedTheme.repository} cursor-pointer rounded-xl border border-gray-700 p-4 shadow-md`}
                      onClick={() => handleOpenCard(repo)}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.25)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 150,
                      }}
                    >
                      <h4 className="mb-2 text-sm font-bold text-[#38AECC]">
                        {repo.name}
                      </h4>

                      {repo.description && (
                        <p className="mb-3 text-sm text-gray-300">
                          {repo.description}
                        </p>
                      )}

                      <div className="flex justify-between border-t border-gray-600 pt-2 text-sm text-gray-400">
                        <span>⭐ {repo.stargazers_count}</span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#0090C1] hover:underline"
                        >
                          Open
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ul>
            </motion.div>
          )}
          {openCard && selectedRepo && (
            <Card repo={selectedRepo} onClose={handleCloseCard} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
