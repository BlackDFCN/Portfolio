"use client";
import { useState } from "react";
import Link from "next/link";
// import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Stack", href: "#stack" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        aria-label="Abrir menú"
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block w-6 h-0.5 bg-[#3b82f6] mb-1 rounded transition-all" style={{transform: open ? 'rotate(45deg) translateY(7px)' : 'none'}}></span>
        <span className={`block w-6 h-0.5 bg-[#3b82f6] mb-1 rounded transition-all ${open ? 'opacity-0' : ''}`}></span>
        <span className="block w-6 h-0.5 bg-[#3b82f6] rounded transition-all" style={{transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none'}}></span>
      </button>
      {open && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Fondo igual al header, modo claro y oscuro */}
          <div className="fixed inset-0 bg-white/90 dark:bg-[#0c0c0c]/90 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]"></div>
          {/* Panel lateral */}
          <div className="relative ml-auto w-3/4 max-w-xs bg-white/90 dark:bg-[#0c0c0c]/90 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] border-l border-[#2c2c34] h-screen p-6 flex flex-col gap-8 animate-fade-in-right">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-[#3b82f6]">Menú</span>
              <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="text-2xl text-[#3b82f6]">×</button>
            </div>
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-lg font-semibold text-[#c7c7c7] hover:text-[#3b82f6] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* ThemeToggle se moverá al lado del botón hamburguesa en el header */}
          </div>
        </div>
      )}
      {/* Animación movida a globals.css */}
    </div>
  );
}
