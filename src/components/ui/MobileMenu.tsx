"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Conóceme", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("/");

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const trackSection = () => {
      const offsets = navItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => {
          const id = item.href.replace("#", "");
          const el = document.getElementById(id);
          if (!el) return { href: item.href, top: Infinity };
          const rect = el.getBoundingClientRect();
          return { href: item.href, top: Math.abs(rect.top - 90) };
        });

      const closest = offsets.reduce(
        (a, b) => (a.top < b.top ? a : b),
        { href: "/", top: Infinity }
      );

      if (window.scrollY < 100) setActiveSection("/");
      else setActiveSection(closest.href);
    };

    trackSection();
    window.addEventListener("scroll", trackSection, { passive: true });
    return () => window.removeEventListener("scroll", trackSection);
  }, [pathname]);

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  };

  const isActiveItem = (label: string, href: string) => {
    // Misma lógica del header de escritorio.
    if (label === "Proyectos") {
      return pathname.startsWith("/proyectos") || (pathname === "/" && activeSection === "#proyectos");
    }

    if (href === "/") {
      return pathname === "/" && activeSection === "/";
    }

    return pathname === "/" && activeSection === href;
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("#")) {
      event.preventDefault();
      const id = href.replace("#", "");
      const section = document.getElementById(id);

      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    if (pathname === "/" && href === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        className="h-10 w-10 inline-flex items-center justify-center rounded-full text-[#2563eb] hover:bg-[#2563eb]/10 active:bg-[#2563eb]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      {open && (
        <div className="fixed inset-0 z-[9999] flex">
          <button
            aria-label="Cerrar menú"
            className="flex-1 bg-black/25 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
          {/* Panel lateral */}
          <aside
            id="mobile-menu-panel"
            className="relative ml-auto w-[84%] max-w-[340px] h-[100dvh] px-5 py-4 flex flex-col animate-fade-in-right overflow-hidden border-l border-[#2c2c34]/30 shadow-2xl"
          >
            {/* Fondo sólido según tema */}
            <div className="absolute inset-0 z-0 bg-white dark:bg-[#0c0c0c]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#2563eb]/[0.05] via-transparent to-transparent" />
            {/* Contenido del menú */}
            <div className="relative z-10 flex flex-col h-full min-h-0">
              {/* Header menú */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-[#2563eb] dark:text-[#2563eb] tracking-tight">Menú</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full text-2xl text-[#2563eb] dark:text-[#2563eb] hover:bg-[#2563eb]/10"
                >
                  ×
                </button>
              </div>
              <div className="flex flex-col items-center text-center gap-2 mb-5">
                  <img src="/avatar.png" alt="Bastián Tapia" className="w-24 h-24 rounded-full shadow-lg object-cover border-2 border-[#2563eb] bg-white dark:bg-[#0c0c0c]" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bastian+Tapia&background=2563eb&color=fff'; }} />
                  <div className="flex flex-col items-center">
                    <span className="text-base font-semibold text-[#232a3a] dark:text-[#f8fafc] drop-shadow">Bastián Tapia</span>
                    <span className="text-[11px] text-[#2563eb]/85 dark:text-[#2563eb]/90 font-medium tracking-wide">Full Stack Developer</span>
                  </div>
              </div>
              <hr className="mb-2 border-t border-[#2563eb]/8 dark:border-white/8" />

              <nav aria-label="Navegación móvil" className="flex-1 min-h-0 overflow-y-auto pr-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={getHref(item.href)}
                      className={`block text-[1.1rem] font-semibold transition-all px-2 py-2 rounded-lg border-b active:bg-[#2563eb]/5 ${
                        isActiveItem(item.label, item.href)
                          ? "text-[#2563eb] dark:text-[#60a5fa] border-[#2563eb]/25 dark:border-[#60a5fa]/25 bg-[#2563eb]/[0.08]"
                          : "text-[#232a3a] dark:text-[#f8fafc] hover:text-[#2563eb] dark:hover:text-[#2563eb] border-[#2563eb]/8 dark:border-white/8"
                      }`}
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </nav>

              <div className="pt-2">
              <hr className="mb-2 border-t border-[#2563eb]/8 dark:border-white/8" />
              <div className="rounded-2xl border border-[#2563eb]/15 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm px-2 py-2">
              <div className="flex items-center justify-center gap-3 pb-[max(0.15rem,env(safe-area-inset-bottom))]">
                <a href="https://linkedin.com/in/bastiantapia07" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-10 w-10 rounded-full border border-[#2563eb]/35 inline-flex items-center justify-center text-[#2563eb] dark:text-[#2563eb] text-lg hover:bg-[#2563eb]/10 transition-colors">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/BlackDFCN" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="h-10 w-10 rounded-full border border-[#2563eb]/35 inline-flex items-center justify-center text-[#2563eb] dark:text-[#2563eb] text-lg hover:bg-[#2563eb]/10 transition-colors">
                  <FaGithub />
                </a>
                <a href="mailto:bastiantapia.dev@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="h-10 w-10 rounded-full border border-[#2563eb]/35 inline-flex items-center justify-center text-[#2563eb] dark:text-[#2563eb] text-lg hover:bg-[#2563eb]/10 transition-colors">
                  <FaEnvelope />
                </a>
                  <a href="https://wa.me/56959800748" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full border border-[#2563eb]/35 inline-flex items-center justify-center text-[#2563eb] text-lg hover:bg-[#2563eb]/10 transition-colors">
                    <FaWhatsapp />
                  </a>
              </div>
              </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
