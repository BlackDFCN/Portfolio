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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
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
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-[#0c0c0c]/80 backdrop-blur-md shadow-sm" 
          : "border-b border-transparent bg-white dark:bg-[#0c0c0c]"
      }`} 
      role="banner"
    >
      <nav 
        className={`max-w-6xl w-full mx-auto flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "h-16" : "h-16 sm:h-20"
        }`} 
        aria-label="Navegación principal"
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
          <Link className="group flex items-center gap-2.5 min-w-0" href="/" aria-label="Ir al inicio">
            <span className="relative h-9 w-9 sm:h-10 sm:w-10 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/icon-negro.svg"
                alt="Logo"
                width={40}
                height={40}
                className="block rounded-lg dark:hidden transition-all duration-300 group-hover:drop-shadow-sm"
                priority
              />
              <Image
                src="/icon-blanco.svg"
                alt="Logo"
                width={40}
                height={40}
                className="hidden rounded-lg dark:block transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                priority
              />
            </span>
            <span className="flex flex-col leading-tight min-w-0 transition-opacity duration-300 group-hover:opacity-80">
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-slate-900 dark:text-slate-50 truncate">Bastian Tapia</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase truncate font-mono mt-0.5">Full Stack Developer</span>
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
                className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
                style={{ textDecoration: "none" }}
                aria-current={isActive ? "page" : undefined}
                tabIndex={0}
              >
                <span className="transition-all duration-300">{item.label}</span>
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-blue-200/50 dark:border-blue-800/50 animate-pulse-slow"></span>
                )}
              </a>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-4 lg:gap-6 min-w-0" style={{marginLeft: '2.5rem'}}>
          <ThemeToggle size={20} />
          <a
            href="/#contacto"
            className={`
              ml-4 px-6 py-2.5 rounded-full font-bold transition-all duration-300 text-sm ring-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500
              ${scrolled 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-600/40" 
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5"
              }
            `}
            aria-label="Ir a contacto"
            tabIndex={0}
          >
            Hablemos
          </a>
        </div>
        <div className="md:hidden flex items-center gap-3 min-w-0">
          <ThemeToggle size={22} />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;
