"use client";
import { useState } from "react";
import Link from "next/link";
import GlobalBackground from '@/components/ui/GlobalBackground';
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa";
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
        <span className="block w-6 h-0.5 bg-[#2563eb] mb-1 rounded transition-all" style={{transform: open ? 'rotate(45deg) translateY(7px)' : 'none'}}></span>
        <span className={`block w-6 h-0.5 bg-[#2563eb] mb-1 rounded transition-all ${open ? 'opacity-0' : ''}`}></span>
        <span className="block w-6 h-0.5 bg-[#2563eb] rounded transition-all" style={{transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none'}}></span>
      </button>
      {open && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Panel lateral con fondo global animado */}
          <div className="relative ml-auto w-3/4 max-w-xs h-screen p-6 flex flex-col animate-fade-in-right overflow-hidden border-l border-[#2c2c34]">
            {/* Fondo sólido según tema */}
            <div className="absolute inset-0 z-0 bg-white dark:bg-[#0c0c0c]" />
            {/* Contenido del menú */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Header menú */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-[#2563eb] dark:text-[#2563eb]">Menú</span>
                <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="text-2xl text-[#2563eb] dark:text-[#2563eb]">×</button>
              </div>
                  <img src="/avatar.png" alt="Bastián Tapia" className="w-20 h-20 rounded-full shadow-lg object-cover border-2 border-[#2563eb] bg-white dark:bg-[#0c0c0c]" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bastian+Tapia&background=2563eb&color=fff'; }} />
                  <span className="mt-2 text-lg font-bold text-[#232a3a] dark:text-[#f8fafc] drop-shadow">Bastián Tapia</span>
                  <span className="text-xs text-[#2563eb] dark:text-[#2563eb] font-semibold drop-shadow">Full Stack Developer</span>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-semibold text-[#232a3a] dark:text-[#f8fafc] hover:text-[#2563eb] dark:hover:text-[#2563eb] transition-colors text-center"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
              <div className="flex items-center justify-center gap-4 mb-2">
                <a href="https://linkedin.com/in/bastiantapia07" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#2563eb] dark:text-[#2563eb] text-2xl">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/BlackDFCN" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#2563eb] dark:text-[#2563eb] text-2xl">
                  <FaGithub />
                </a>
                <a href="mailto:bastiantapia.dev@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="text-[#2563eb] dark:text-[#2563eb] text-2xl">
                  <FaEnvelope />
                </a>
                  <a href="https://wa.me/56959800748" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#2563eb] text-2xl">
                    <FaWhatsapp />
                  </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
