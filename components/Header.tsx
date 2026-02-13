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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <nav className="section-container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link className="group flex items-center gap-2.5" href="/">
            {/* Icon */}
            <Image
              src="/icon.svg"
              alt="BastianDev"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            {/* Logo Text */}
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-[#395a8b]">Bastian</span>
              <span className="text-gray-400">Dev</span>
              <span className="font-light text-black">.</span>
            </span>
          </Link>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
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
              onClick={() => {
                if (item.sectionId) {
                  setActiveSection(item.sectionId);
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link className="btn-talk hidden sm:block" href="/contacto">
            Hablemos
          </Link>
          <button className="text-black md:hidden" type="button">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
