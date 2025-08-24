import { GitHubProfile } from "./GitHubProfile";

export const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#022F40] to-[#011A28] p-6">
      <div className="animate-fadeIn w-full max-w-4xl">
        <GitHubProfile />
      </div>
    </div>
  );
};
