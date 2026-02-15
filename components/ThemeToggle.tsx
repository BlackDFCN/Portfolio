"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export default function ThemeToggle() {
  const [resolvedTheme, setResolvedTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setResolvedTheme(stored);
    } else {
      const isDark = document.documentElement.classList.contains("dark");
      setResolvedTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setResolvedTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.body?.classList.toggle("dark", newTheme === "dark");
    document.documentElement.style.colorScheme = newTheme;
  };

  const label = resolvedTheme === "dark" ? "Oscuro" : "Claro";
  const ariaLabel = `Cambiar a tema ${resolvedTheme === "dark" ? "claro" : "oscuro"}`;

  return (
    <button
      aria-label={ariaLabel}
      className="group text-gray-400 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      onClick={toggleTheme}
      title={ariaLabel}
      type="button"
    >
      <span className="relative block w-7 h-7">
        {/* Sun icon */}
        <svg
          className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${resolvedTheme === "dark" ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="5" fill="#eab308" className="transition-colors duration-300" />
          <g stroke="#eab308">
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
          </g>
        </svg>
        {/* Moon icon */}
        <svg
          className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${resolvedTheme === "dark" ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          viewBox="0 0 24 24"
          fill="none"
        >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
              fill="#52525b"
              className="transition-colors duration-300"
            />
        </svg>
      </span>
    </button>
  );
}
