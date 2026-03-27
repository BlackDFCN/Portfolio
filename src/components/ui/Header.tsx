"use client";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Conóceme", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
];

function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("/");

  useEffect(() => {
    const handleScroll = () => {
      // Incluye #proyectos como sección scrollable
      const offsets = navItems
        .filter(item => item.href.startsWith('#'))
        .map(item => {
          const id = item.href.replace('#', '');
          const el = document.getElementById(id);
          if (!el) return { href: item.href, top: Infinity };
          const rect = el.getBoundingClientRect();
          return { href: item.href, top: Math.abs(rect.top - 90) };
        });
      // Detecta la sección más cercana
      const min = offsets.reduce((a, b) => (a.top < b.top ? a : b), { href: '/', top: Infinity });
      if (window.scrollY < 100) setActiveSection("/");
      else if (min.href === "#proyectos") setActiveSection("#proyectos");
      else setActiveSection(min.href);
    };
    if (typeof window !== 'undefined' && window.location.pathname === "/") {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll suave con offset para header sticky
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80; // 80px offset
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveSection(href);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#232a3a]/10 dark:border-[#232a3a]/30 bg-white dark:bg-[#0c0c0c]" role="banner">
      <nav className="max-w-6xl w-full mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6" aria-label="Navegación principal">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
          <Link className="group flex items-center gap-2.5 min-w-0" href="/" aria-label="Ir al inicio">
            <span className="relative h-9 w-9 sm:h-10 sm:w-10">
              <Image
                src="/icon-negro.svg"
                alt="Logo"
                width={40}
                height={40}
                className="block rounded-lg dark:hidden"
                priority
              />
              <Image
                src="/icon-blanco.svg"
                alt="Logo"
                width={40}
                height={40}
                className="hidden rounded-lg dark:block"
                priority
              />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-[#232a3a] dark:text-[#f8fafc] truncate">Bastian Tapia</span>
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase truncate">Full Stack Developer</span>
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4 lg:gap-6 min-w-0">
          {navItems.map((item) => {
            let isActive = false;
            if (item.label === "Proyectos") {
              // Activo si estamos en /proyectos o si estamos en home y la sección activa es #proyectos
              isActive = pathname.startsWith("/proyectos") || (pathname === "/" && (activeSection === "#proyectos" || activeSection === "/proyectos"));
            } else if (item.href === "/") {
              isActive = pathname === "/" && (activeSection === "/" || activeSection === undefined);
            } else {
              isActive = pathname === "/" && activeSection === item.href;
            }
            // Para "Proyectos", el href real debe ser #proyectos si estamos en home, /proyectos si no
            // Si no estamos en home y el link es a una sección (#), redirigir a /#seccion
            const href = (pathname !== "/" && item.href.startsWith("#"))
              ? `/${item.href}`
              : (item.label === "Proyectos" ? (pathname === "/" ? "#proyectos" : "/proyectos") : item.href);
            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              // Si estamos en home y el link es a una sección (#), hacer scroll suave
              if (pathname === "/" && href.startsWith("#")) {
                e.preventDefault();
                const id = href.replace('#', '');
                const el = document.getElementById(id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  setActiveSection(href);
                }
              } else if (item.label === "Inicio" && pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("/");
              } else if (item.label === "Proyectos" && pathname === "/") {
                e.preventDefault();
                const el = document.getElementById("proyectos");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  setActiveSection("#proyectos");
                }
              } else {
                handleNavClick(e, href);
              }
            };
            return (
              <a
                key={item.label}
                href={href}
                onClick={handleClick}
                className={`text-base font-semibold px-2 py-1 rounded transition-all duration-200 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0c0c0c] ${
                  isActive
                    ? "text-[#2563eb] dark:text-[#2563eb]"
                    : "text-[#232a3a] dark:text-[#c7c7c7] hover:text-[#2563eb] dark:hover:text-[#2563eb]"
                }`}
                style={{ marginTop: 2, marginBottom: 2, textDecoration: "none" }}
                aria-current={isActive ? "page" : undefined}
                tabIndex={0}
              >
                <span className="transition-all duration-200 truncate">{item.label}</span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
                      isActive
                        ? "w-full bg-[#2563eb] dark:bg-[#2563eb]"
                        : "w-0 group-hover:w-full bg-[#2563eb] dark:bg-[#2563eb]"
                  }`}
                ></span>
              </a>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-4 lg:gap-6 min-w-0" style={{marginLeft: '2.5rem'}}>
          <ThemeToggle size={20} />
          <a
            href="/#contacto"
            className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold shadow-md hover:from-[#3b82f6] hover:to-[#2563eb] transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-[#3b82f6] scale-100 hover:scale-105 active:scale-95"
            style={{boxShadow: '0 2px 16px 0 #3b82f644'}}
            aria-label="Ir a contacto"
            tabIndex={0}
          >
            Hablemos
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2 min-w-0">
          <ThemeToggle size={20} />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;
