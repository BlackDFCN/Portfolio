"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Inicio", href: "/#inicio", sectionId: "inicio" },
  { label: "Metodología", href: "/#metodologia", sectionId: "metodologia" },
  { label: "Stack", href: "/#stack", sectionId: "stack" },
  { label: "Proyectos", href: "/#proyectos", sectionId: "proyectos" },
  { label: "Servicios", href: "/#servicios", sectionId: "servicios" }
];

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      const pathnameToSection: Record<string, string> = {
        "/proyectos": "proyectos"
      };
      setActiveSection(pathnameToSection[pathname] ?? null);
      return;
    }

    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }

    const setFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
      }
    };

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const target = visible[0]?.target as HTMLElement | undefined;
        const sectionId = target?.dataset.section;
        if (sectionId) {
          setActiveSection(sectionId);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.15, 0.35, 0.55]
      }
    );

    sections.forEach((section) => observer.observe(section));
    setFromHash();
    window.addEventListener("hashchange", setFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", setFromHash);
    };
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] dark:border-white/10 dark:bg-[#0c0c0c]/80">
      <nav className="section-container flex h-16 items-center justify-between md:h-20">
        <div className="flex items-center gap-3 md:gap-4">
          <Link className="group flex items-center gap-2.5" href="/">
            {/* Icon */}
            <span className="relative h-9 w-9 md:h-10 md:w-10">
              <Image
                src="/icon-negro.svg"
                alt="BastianDev"
                width={40}
                height={40}
                className="block rounded-lg dark:hidden"
                priority
              />
              <Image
                src="/icon-blanco.svg"
                alt="BastianDev"
                width={40}
                height={40}
                className="hidden rounded-lg dark:block"
                priority
              />
            </span>
            {/* Logo Text */}
            <span className="text-lg font-extrabold tracking-tight md:text-xl">
              <span className="text-black dark:text-white">Bastian</span>
              <span className="text-gray-500 dark:text-gray-400">Dev</span>
              <span className="font-light text-black dark:text-white">.</span>
            </span>
          </Link>
        </div>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              className={`nav-link ${
                activeSection && item.sectionId === activeSection ? "active" : ""
              }`}
              key={item.label}
              href={item.href}
              aria-current={
                activeSection && item.sectionId === activeSection
                  ? "page"
                  : undefined
              }
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(item.sectionId);
                if (el) {
                  const header = document.querySelector('header');
                  let yOffset = header ? header.getBoundingClientRect().height + 16 : 110;
                  let y;
                  if (window.innerWidth < 1024) {
                    // En móvil: offset sobre el section-container
                    let anchor = el.querySelector('.section-container') || el;
                    y = anchor.getBoundingClientRect().top + window.pageYOffset - yOffset;
                  } else {
                    // En desktop: offset sobre la propia sección
                    y = el.getBoundingClientRect().top + window.pageYOffset - yOffset;
                  }
                  window.scrollTo({ top: y, left: 0, behavior: "smooth" });
                }
                if (item.sectionId) {
                  setActiveSection(item.sectionId);
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link className="btn-talk hidden lg:block" href="/contacto">
            Hablemos
          </Link>
          <button
            className="text-black dark:text-white lg:hidden"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>
      <div
        className={`lg:hidden overflow-hidden border-t border-gray-100 bg-white/95 transition-[max-height,opacity] duration-300 dark:border-white/10 dark:bg-[#0c0c0c] ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        id="mobile-nav"
      >
        <div className={`section-container flex flex-col items-center justify-center gap-4 ${isMenuOpen ? "py-5" : "py-0"}`}> 
          {navItems.map((item) => (
            <a
              className={`text-sm font-semibold uppercase tracking-[0.2em] transition-colors text-center w-full ${
                activeSection && item.sectionId === activeSection
                  ? "text-black dark:text-white"
                  : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
              }`}
              key={item.label}
              href={item.href}
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(item.sectionId);
                if (el) {
                  let anchor = el.querySelector('.section-container') || el;
                  const header = document.querySelector('header');
                  let yOffset = header ? header.getBoundingClientRect().height + 16 : 110;
                  const y = anchor.getBoundingClientRect().top + window.pageYOffset - yOffset;
                  window.scrollTo({ top: y, left: 0, behavior: "smooth" });
                }
                if (item.sectionId) {
                  setActiveSection(item.sectionId);
                }
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <Link className="btn-talk mx-auto text-center" href="/contacto">
            Hablemos
          </Link>
        </div>
      </div>
    </header>
  );
}
