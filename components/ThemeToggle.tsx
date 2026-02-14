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
  const icon = resolvedTheme === "dark" ? "light_mode" : "dark_mode";
  const ariaLabel = `Cambiar a tema ${resolvedTheme === "dark" ? "claro" : "oscuro"}`;

  return (
    <button
      aria-label={ariaLabel}
      className="text-gray-400 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white"
      onClick={toggleTheme}
      title={ariaLabel}
      type="button"
    >
      <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
    </button>
  );
}
