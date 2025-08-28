import { createContext, useContext, useState, type ReactNode } from "react";
import { variants, type Variant } from "../theme";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedTheme: Variant;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const selectedTheme = variants[darkMode ? "dark" : "light"];
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, selectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }
  return context;
};
