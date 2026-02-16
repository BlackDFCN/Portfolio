"use client";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaFilePdf } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
// ...existing code...
import React from 'react';

const socialLinks = [
  {
    href: 'https://linkedin.com/in/bastiantapia07',
    label: 'LinkedIn',
    icon: <FaLinkedin size={24} className="text-[#c7c7c7]" />,
    color: 'hover:text-[#0A66C2] focus:text-[#0A66C2]'
  },
  {
    href: 'https://github.com/BlackDFCN',
    label: 'GitHub',
    icon: <FaGithub size={24} className="text-[#c7c7c7]" />,
    color: 'hover:text-[#0A66C2] focus:text-[#0A66C2]'
  },
  {
    href: 'mailto:bastiantapia.dev@gmail.com',
    label: 'Email',
    icon: <MdEmail size={26} className="text-[#c7c7c7]" />,
    color: 'hover:text-[#0A66C2] focus:text-[#0A66C2]'
  },
  {
    href: 'https://wa.me/56959800748',
    label: 'WhatsApp',
    icon: <FaWhatsapp size={24} className="text-[#c7c7c7]" />,
    color: 'hover:text-[#0A66C2] focus:text-[#0A66C2]'
  }
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center py-24 px-4 overflow-x-hidden overflow-y-visible animate-fade-in">
      {/* Fondo animado: aura centrada, gradiente original en bordes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Aura animada centrada, sin cortar el fondo original */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#3b82f6]/30 via-[#0A66C2]/20 to-transparent blur-3xl opacity-60 animate-pulse" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#0A66C2]/20 via-[#3b82f6]/10 to-transparent blur-2xl opacity-40 animate-spin-slow" />
      </div>

      {/* Avatar con glow y badge */}
      <div className="relative z-10 mb-6 flex flex-col items-center">
        {/* Badge alineado arriba del avatar */}
        <span id="badge-disponible" className="mb-3 px-6 py-1.5 rounded-full font-bold bg-[#3b82f6]/80 text-white shadow-lg text-sm tracking-wide">
          Estoy disponible para proyectos
        </span>
        <div className="relative">
          <img src="/avatar.png" alt="Bastián Tapia" className="w-40 h-40 rounded-full shadow-2xl object-cover border-4 border-[#3b82f6] animate-glow ring-4 ring-[#3b82f6]/30" />
        </div>
      </div>

      {/* Nombre y separador */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-2 text-white tracking-tight drop-shadow-lg z-10">
        <span className="text-white">Bastián</span> <span className="text-[#3b82f6]">Tapia</span>
      </h1>
      <div className="w-20 h-0.5 mx-auto my-2 bg-[#3b82f6] rounded-full opacity-80 z-10" />

      {/* Rol destacado */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#3b82f6] tracking-widest uppercase z-10">Desarrollador Full Stack</h2>

      {/* Descripción breve y alineada */}
      <p className="max-w-lg mx-auto text-base text-neutral-300 mb-10 font-medium leading-normal text-center drop-shadow z-10">
        Desarrollo <span className="text-[#3b82f6] font-bold">soluciones digitales robustas</span> y <span className="text-[#3b82f6] font-bold">seguras</span>. Apasionado por el <span className="text-[#3b82f6] font-bold">frontend</span>, <span className="text-[#3b82f6] font-bold">backend</span> y <span className="text-[#3b82f6] font-bold">cloud</span>. Enfocado en <span className="font-bold text-white">rendimiento</span>, <span className="font-bold text-white">UX</span> y <span className="font-bold text-white">calidad</span>.
      </p>

      {/* Botones CTA animados */}
      <div className="flex flex-wrap gap-4 justify-center mb-10 z-10">
        <a href="#contacto" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#3b82f6] text-white font-bold shadow-xl hover:bg-[#2563eb] focus:bg-[#2563eb] transition-all text-lg animate-fade-in-up">
          <FaEnvelope className="text-2xl" /> Hablemos
        </a>
        <a href="#proyectos" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-neutral-800 text-[#3b82f6] font-bold shadow-xl hover:bg-neutral-700 hover:text-[#2563eb] focus:text-[#2563eb] transition-all text-lg border border-[#3b82f6] animate-fade-in-up">
          <FaGithub className="text-2xl" /> Ver Proyectos
        </a>
        <a href="/bastiantapia_cv.pdf" download="Bastian_Tapia_CV.pdf" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0A66C2] text-white font-bold shadow-xl hover:bg-[#004182] focus:bg-[#004182] transition-all text-lg animate-fade-in-up">
          <FaFilePdf className="text-2xl" /> Descargar CV
          <span className="ml-1 bg-white/10 text-xs px-2 py-0.5 rounded-full border border-white/20">PDF</span>
        </a>
      </div>

      {/* Redes sociales grandes y animadas */}
      <div className="flex gap-7 justify-center mb-4 z-10">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all text-3xl ${link.color} hover:scale-125 focus:scale-125 drop-shadow-lg`} 
            title={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>

    </section>
  );
}

