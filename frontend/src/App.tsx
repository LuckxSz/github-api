import { GitHubProfile } from "./components/GitHubProfile";

import { useTheme } from "./context/ThemeContext";

export const App = () => {
  const { selectedTheme } = useTheme();

  //`  console.log("Classes aplicadas:", selectedTheme.background);

  return (
    <>
      <div
        className={`${selectedTheme.background} flex min-h-screen items-center`}
      >
        <GitHubProfile />
      </div>
    </>
  );
};
