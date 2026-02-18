"use client";
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaFilePdf, FaArrowRight, FaThLarge, FaReact, FaNodeJs, FaCloud, FaLayerGroup, FaRegComments, FaFolderOpen, FaRegFileAlt } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://linkedin.com/in/bastiantapia07',
    label: 'LinkedIn',
    icon: <FaLinkedin size={22} />, // color neutro, se aplica abajo
    brand: 'linkedin'
  },
  {
    href: 'https://github.com/BlackDFCN',
    label: 'GitHub',
    icon: <FaGithub size={22} />, // color neutro, se aplica abajo
    brand: 'github'
  },
  {
    href: 'mailto:bastiantapia.dev@gmail.com',
    label: 'Email',
    icon: <FaEnvelope size={22} />, // color neutro, se aplica abajo
    brand: 'email'
  },
  {
    href: 'https://wa.me/56959800748',
    label: 'WhatsApp',
    icon: <FaWhatsapp size={22} />, // color neutro, se aplica abajo
    brand: 'whatsapp'
  }
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 px-4 md:px-12 py-12 md:py-24 max-w-7xl mx-auto animate-fade-in">
      {/* Columna izquierda: texto */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
        <span className="text-xs md:text-sm text-neutral-400 tracking-widest mb-2 uppercase">¡Hola! Soy</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-2">
          <span className="text-neutral-900 dark:text-white">Bastián</span> <span className="text-[#2196f3]">Tapia</span>
        </h1>
        <span className="inline-flex items-center gap-2 border border-[#2196f3] text-[#2196f3] px-4 py-1.5 rounded-full text-xs font-semibold mb-8 mt-2 bg-white/70 dark:bg-neutral-900/70">
          <FaLayerGroup className="text-[#2196f3] text-lg" /> Full Stack Developer
        </span>
        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-200 max-w-xl mb-2 font-semibold">
          Desarrollo productos digitales robustos, escalables y seguros que optimizan procesos y generan valor real.
        </p>
        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-200 max-w-xl mb-2">
          Apasionado por la automatización, la escalabilidad y la seguridad, aplico arquitectura limpia y buenas prácticas en cada proyecto.
        </p>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mb-8">
          Especialista en TypeScript, Node.js y React.
        </p>
        {/* Botones CTA mejorados */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center mt-2">
          {/* Botón Contacto (principal) */}
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow-lg hover:shadow-blue-400/40 hover:scale-105 active:scale-95 transition-all text-base py-3 px-8 focus:outline-none focus:ring-2 focus:ring-blue-400/40 group min-w-[140px] h-12 md:h-12"
            style={{alignSelf: 'stretch'}}
          >

            <FaRegComments className="text-lg group-hover:animate-bounce transition-transform" />
            <span className="truncate">Contacto</span>
          </a>
          {/* Botón Proyectos */}
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-400 bg-transparent text-blue-400 font-semibold shadow hover:bg-[#2196f3]/10 hover:text-blue-500 hover:shadow-blue-400/40 transition-all text-base py-3 px-8 group min-w-[140px] h-12 md:h-12 relative overflow-hidden"
            style={{alignSelf: 'stretch'}}
          >
            <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:shadow-[0_0_16px_2px_rgba(33,150,243,0.4)] transition-all pointer-events-none" />
            <FaFolderOpen className="text-lg group-hover:animate-bounce transition-transform" />
            <span className="truncate">Proyectos</span>
          </a>
          {/* Botón CV */}
          <a
            href="/bastiantapia_cv.pdf"
            download="Bastian_Tapia_CV.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-400 bg-transparent text-blue-400 font-bold shadow hover:bg-[#2196f3]/10 hover:text-blue-500 hover:shadow-blue-400/40 transition-all text-base py-3 px-8 group min-w-[100px] h-12 md:h-12 relative overflow-hidden uppercase tracking-[0.2em]"
            style={{alignSelf: 'stretch'}}
            aria-label="Descargar CV en PDF"
          >
            <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:shadow-[0_0_16px_2px_rgba(33,150,243,0.4)] transition-all pointer-events-none" />
            <FaRegFileAlt className="text-lg group-hover:animate-bounce transition-transform" />
            CV
          </a>
        </div>
        {/* Redes sociales */}
        <div className="flex gap-6 mt-8 justify-center md:justify-start">
          {(() => {
            const brandColors: Record<string, string> = {
              linkedin: '#0A66C2',
              github: '#181717',
              email: '#EA4335',
              whatsapp: '#25D366',
            };
            const { theme } = useTheme();
            const baseColor = theme === 'dark' ? '#c7c7c7' : '#222';
            return socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  `transition-all duration-200 flex items-center justify-center rounded-full shadow-lg ` +
                  `bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 hover:scale-110 focus:scale-110 ` +
                  `hover:shadow-[0_0_0_4px_rgba(33,150,243,0.10)]`
                }
                style={{
                  width: 44,
                  height: 44,
                  color: baseColor,
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                  transition: 'all 0.2s',
                }}
                title={link.label}
                onMouseEnter={e => {
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.color = brandColors[link.brand] || '#2196f3';
                }}
                onMouseLeave={e => {
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.color = baseColor;
                }}
              >
                {React.cloneElement(link.icon, {
                  style: { color: baseColor, transition: 'color 0.2s' },
                })}
              </a>
            ));
          })()}
        </div>
      </div>
      {/* Columna derecha: avatar */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-0 md:-mt-16 md:pl-12">
        <div className="relative flex items-center justify-center">
          {/* Aura circular azul animada, centrada y más grande */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-[#2196f3]/30 via-[#2196f3]/10 to-transparent blur-2xl opacity-70 animate-pulse" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-br from-[#2196f3]/20 via-[#2196f3]/10 to-transparent blur-lg opacity-40 animate-spin-slow" />
          <img src="/avatar.png" alt="Bastián Tapia" className="relative w-48 h-48 md:w-72 md:h-72 rounded-full shadow-2xl object-cover border-4 border-[#2196f3] z-10" />
          {/* Badge de disponibilidad mejorado */}
          <span
            className="absolute left-1/2 -translate-x-1/2 -bottom-6 px-8 py-3 rounded-[2rem] flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] glass-pill shadow-2xl border border-white/10 backdrop-blur-md bg-white/10 dark:bg-white/10 text-white z-20 whitespace-nowrap"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 32px 0 rgba(0,102,255,0.10)'
            }}
          >
            <span className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#22c55e] dark:bg-[#2196f3]"></span>
              <span className="absolute inset-0 w-3 h-3 rounded-full bg-[#22c55e] dark:bg-[#2196f3] animate-ping opacity-75"></span>
            </span>
            Disponible
          </span>
        </div>
      </div>
    </section>
  );
}

