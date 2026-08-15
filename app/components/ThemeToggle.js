"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Self-contained dark/light toggle. Reads the class already set by the
// pre-paint script in layout.js, then lets the user flip it and persists
// the choice to localStorage.
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("medibondhu-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition active:scale-90"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}