import { GitHubProfile } from "./components/GitHubProfile";
export const App = () => {
  return (
    <div className={`flex min-h-screen items-center justify-center p-6`}>
      <div className="animate-fadeIn w-full max-w-4xl">
        <GitHubProfile />
      </div>
    </div>
  );
};
