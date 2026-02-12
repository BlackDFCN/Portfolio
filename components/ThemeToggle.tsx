"use client";

import { useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";
type ThemePreference = "system" | ThemeMode;

const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialPreference = (): ThemePreference => {
  if (typeof window === "undefined") {
    return "system";
  }
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return "system";
};

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<ThemeMode>("light");

  const resolvedTheme = useMemo<ThemeMode>(
    () => (preference === "system" ? systemTheme : preference),
    [preference, systemTheme]
  );

  useEffect(() => {
    const initialPreference = getInitialPreference();
    const initialSystem = getSystemTheme();
    setPreference(initialPreference);
    setSystemTheme(initialSystem);
    window.localStorage.removeItem("themePreference");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (preference !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
    } else {
      media.addListener(handleChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, [preference]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const isDark = resolvedTheme === "dark";

    root.classList.toggle("dark", isDark);
    body?.classList.toggle("dark", isDark);
    root.dataset.theme = resolvedTheme;
    if (body) {
      body.dataset.theme = resolvedTheme;
    }
    root.style.colorScheme = resolvedTheme;

    if (preference === "system") {
      window.localStorage.removeItem("theme");
      return;
    }

    window.localStorage.setItem("theme", preference);
  }, [preference, resolvedTheme]);

  const toggleTheme = () => {
    setPreference((current) => {
      const currentTheme = current === "system" ? resolvedTheme : current;
      return currentTheme === "dark" ? "light" : "dark";
    });
  };

  const label = resolvedTheme === "dark" ? "Oscuro" : "Claro";
  const icon = resolvedTheme === "dark" ? "light_mode" : "dark_mode";

  return (
    <button
      aria-label={`Tema: ${label}`}
      className="text-gray-400 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
      onClick={toggleTheme}
      title={`Tema: ${label}`}
      type="button"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
