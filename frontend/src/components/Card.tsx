import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

interface CardProps {
  repo: any;
  onClose: () => void;
}

export const Card = ({ repo, onClose }: CardProps) => {
  const { selectedTheme } = useTheme();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} //
    >
      <motion.div
        className={`w-full max-w-md rounded-2xl ${selectedTheme.card}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()} //
      >
        <h2 className="text-xl font-bold">{repo.name}</h2>
        <p className="mt-2">{repo.description}</p>

        <div className="mt-4 flex justify-between text-sm">
          <span>⭐ {repo.stargazers_count}</span>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Abrir no GitHub
          </a>
        </div>

        <button
          onClick={onClose}
          className={`mt-6 w-full px-4 py-2 ${selectedTheme.button}`}
        >
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
};
