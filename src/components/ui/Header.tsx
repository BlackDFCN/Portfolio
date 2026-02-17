"use client";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2c2c34] bg-[#0c0c0c]/90 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] dark:border-[#2c2c34] dark:bg-[#0c0c0c]/90">
      <nav className="max-w-5xl mx-auto section-container flex h-16 items-center justify-between md:h-20 px-4">
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
              <span className="text-[#ffffff] dark:text-[#ffffff]">Bastian</span>
              <span className="text-[#3b82f6] dark:text-[#3b82f6]">Dev</span>
              <span className="font-light text-[#60a5fa] dark:text-[#60a5fa]">.</span>
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-[#c7c7c7] hover:text-[#3b82f6] dark:text-[#c7c7c7] dark:hover:text-[#60a5fa] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;
