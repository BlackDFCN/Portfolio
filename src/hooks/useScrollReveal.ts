"use client";
import { useEffect, useRef } from "react";

/**
 * Hook para revelar un elemento con fade-in al hacer scroll (Intersection Observer)
 * Uso: const ref = useScrollReveal(); <div ref={ref} className="opacity-0 transition-opacity duration-700">...</div>
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100");
          el.classList.remove("opacity-0");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    el.classList.add("opacity-0");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}
