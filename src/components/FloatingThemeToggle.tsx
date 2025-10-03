import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function FloatingThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full 
                 bg-gray-200 dark:bg-gray-700 shadow-lg 
                 hover:scale-110 transition-transform duration-300"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <Sun className="text-yellow-400 w-6 h-6 transition-transform duration-500 rotate-0" />
      ) : (
        <Moon className="text-gray-800 w-6 h-6 transition-transform duration-500 rotate-0" />
      )}
    </button>
  );
}
