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

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
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
            className="relative ml-auto w-[84%] max-w-[340px] h-screen px-5 py-6 pt-5 flex flex-col animate-fade-in-right overflow-y-auto border-l border-[#2c2c34]/30 shadow-2xl"
          >
            {/* Fondo sólido según tema */}
            <div className="absolute inset-0 z-0 bg-white dark:bg-[#0c0c0c]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#2563eb]/[0.05] via-transparent to-transparent" />
            {/* Contenido del menú */}
            <div className="relative z-10 flex flex-col min-h-full">
              {/* Header menú */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-xl font-bold text-[#2563eb] dark:text-[#2563eb] tracking-tight">Menú</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full text-2xl text-[#2563eb] dark:text-[#2563eb] hover:bg-[#2563eb]/10"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center gap-3 mb-7">
                  <img src="/avatar.png" alt="Bastián Tapia" className="w-20 h-20 rounded-full shadow-lg object-cover border-2 border-[#2563eb] bg-white dark:bg-[#0c0c0c]" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bastian+Tapia&background=2563eb&color=fff'; }} />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-[#232a3a] dark:text-[#f8fafc] drop-shadow">Bastián Tapia</span>
                    <span className="text-xs text-[#2563eb] dark:text-[#2563eb] font-semibold drop-shadow">Full Stack Developer</span>
                  </div>
              </div>
              <hr className="mb-4 border-t border-[#2563eb]/10 dark:border-white/10" />

              <nav aria-label="Navegación móvil" className="flex flex-col">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={getHref(item.href)}
                      className="text-[1.28rem] font-bold text-[#232a3a] dark:text-[#f8fafc] hover:text-[#2563eb] dark:hover:text-[#2563eb] transition-colors px-2 py-3 rounded-lg border-b border-[#2563eb]/10 dark:border-white/10 active:bg-[#2563eb]/5"
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </nav>

              <div className="mt-auto pt-8">
              <hr className="mb-5 border-t border-[#2563eb]/10 dark:border-white/10" />
              <div className="flex items-center justify-center gap-4 mb-2">
                <a href="https://linkedin.com/in/bastiantapia07" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-10 w-10 rounded-full border border-[#2563eb]/40 inline-flex items-center justify-center text-[#2563eb] dark:text-[#2563eb] text-xl hover:bg-[#2563eb]/10">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/BlackDFCN" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="h-10 w-10 rounded-full border border-[#2563eb]/40 inline-flex items-center justify-center text-[#2563eb] dark:text-[#2563eb] text-xl hover:bg-[#2563eb]/10">
                  <FaGithub />
                </a>
                <a href="mailto:bastiantapia.dev@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="h-10 w-10 rounded-full border border-[#2563eb]/40 inline-flex items-center justify-center text-[#2563eb] dark:text-[#2563eb] text-xl hover:bg-[#2563eb]/10">
                  <FaEnvelope />
                </a>
                  <a href="https://wa.me/56959800748" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full border border-[#2563eb]/40 inline-flex items-center justify-center text-[#2563eb] text-xl hover:bg-[#2563eb]/10">
                    <FaWhatsapp />
                  </a>
              </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
