import { GitHubProfile } from "./components/GitHubProfile";
import { useTheme } from "./context/ThemeContext";

export const App = () => {
  const { selectedTheme, toggleDarkMode } = useTheme();

  console.log("Classes aplicadas:", selectedTheme.background);

  return (
    <div
      className={`${selectedTheme.background} flex min-h-screen items-center justify-center p-6`}
    >
      <div className="animate-fadeIn w-full max-w-4xl">
        <GitHubProfile />
      </div>
    </div>
  );
};
