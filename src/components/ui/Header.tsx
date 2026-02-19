"use client";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Stack", href: "#stack" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2c2c34] bg-white dark:bg-[#0c0c0c]">
      <nav className="max-w-6xl mx-auto section-container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3 md:gap-4">
          <Link className="group flex items-center gap-2.5" href="/">
            <span className="relative h-9 w-9 md:h-10 md:w-10">
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
              <span className="text-lg font-extrabold tracking-tight md:text-xl">
                <span className="text-[#18181b] dark:text-[#ffffff]">Bastian</span>
                <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] dark:from-[#2563eb] dark:to-[#3b82f6] bg-clip-text text-transparent font-extrabold">Dev.</span>
              </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            // Solo marcar activo por pathname para evitar hydration mismatch
            const isActive =
              (item.href === "/" && pathname === "/") ||
              (item.href !== "/" && pathname.startsWith(item.href.replace('#', '')));
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-base font-semibold px-2 py-1 rounded transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[#3b82f6] ${
                  isActive
                    ? "text-[#2563eb] dark:text-[#3b82f6]"
                    : "text-[#23232e] dark:text-[#c7c7c7] hover:text-[#2563eb] dark:hover:text-[#60a5fa]"
                }`}
                style={{ marginTop: 2, marginBottom: 2, textDecoration: "none" }}
              >
                <span className="transition-all duration-200">{item.label}</span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
                    isActive
                      ? "w-full bg-[#2563eb] dark:bg-[#3b82f6]"
                      : "w-0 group-hover:w-full bg-[#2563eb] dark:bg-[#60a5fa]"
                  }`}
                ></span>
              </a>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-6" style={{marginLeft: '2.5rem'}}>
          <ThemeToggle />
            <a
              href="#contacto"
              className="ml-6 px-6 py-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold shadow-md hover:from-[#3b82f6] hover:to-[#2563eb] transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-[#3b82f6] scale-100 hover:scale-105 active:scale-95"
              style={{boxShadow: '0 2px 16px 0 #3b82f644'}}
            >
              Hablemos
            </a>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle size={32} />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;
