"use client";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaFilePdf, FaArrowRight, FaThLarge } from 'react-icons/fa';

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
    icon: <FaEnvelope size={24} className="text-[#c7c7c7]" />,
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
    <section className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 px-4 md:px-12 py-12 md:py-24 max-w-7xl mx-auto animate-fade-in">
      {/* Columna izquierda: texto */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
        <span className="text-xs md:text-sm text-neutral-400 tracking-widest mb-2 uppercase">¡Hola! Soy</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-2">
          <span className="text-neutral-900 dark:text-white">Bastián</span> <span className="text-[#2196f3] relative">Tapia
            <span className="block h-1 w-20 bg-[#2196f3] rounded-full absolute left-0 -bottom-2 md:-bottom-3"></span>
          </span>
        </h1>
        <span className="inline-flex items-center gap-2 border border-[#2196f3] text-[#2196f3] px-4 py-1.5 rounded-full text-xs font-semibold mb-4 mt-2 bg-white/70 dark:bg-neutral-900/70">
          <FaThLarge className="text-[#2196f3] text-base" /> Full Stack Developer
        </span>
        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-200 max-w-md mb-6">
          Arquitecto de experiencias digitales. Transformo visiones en <span className="font-bold underline underline-offset-2 decoration-[#2196f3]">soluciones robustas</span> y escalables de alto rendimiento.
        </p>
        {/* Stack cards */}
        <div className="flex flex-row md:flex-row gap-2 md:gap-4 mb-8 w-full max-w-xl overflow-x-auto">
          <div className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 shadow border border-neutral-100 dark:border-neutral-800 min-w-[120px]">
            <FaThLarge className="text-[#2196f3] text-2xl mb-1" />
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Client Side</span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-white">Frontend</span>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 shadow border border-neutral-100 dark:border-neutral-800 min-w-[120px]">
            <FaThLarge className="text-[#2196f3] text-2xl mb-1" />
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Server Side</span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-white">Backend</span>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-xl px-4 py-3 shadow border border-neutral-100 dark:border-neutral-800 min-w-[120px]">
            <FaThLarge className="text-[#2196f3] text-2xl mb-1" />
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Deployment</span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-white">Cloud</span>
          </div>
        </div>
        {/* Botones CTA */}
        <div className="flex flex-col gap-2 w-full max-w-xl">
          {/* Botón CTA principal */}
          <a
            href="#contacto"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2196f3] text-white font-bold shadow-md hover:scale-[1.03] active:scale-95 transition-all text-sm py-3 px-5 focus:outline-none focus:ring-2 focus:ring-[#2196f3]/40 group"
          >
            <span className="truncate">Hablemos</span>
            <FaArrowRight className="ml-1 text-base transition-transform group-hover:translate-x-1" />
          </a>
          {/* Botón secundario outline */}
          <a
            href="#proyectos"
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white font-semibold shadow hover:border-[#2196f3] hover:text-[#2196f3] transition-all text-sm py-3 px-5 group"
          >
            <span className="truncate">Ver Proyectos</span>
            <FaThLarge className="ml-1 text-base text-neutral-300 group-hover:text-[#2196f3] transition-colors" />
          </a>
          {/* Botón descargar CV */}
          <a
            href="/bastiantapia_cv.pdf"
            download="Bastian_Tapia_CV.pdf"
            className="w-full flex items-center justify-center gap-2 rounded-xl text-neutral-400 font-bold transition-all text-sm py-3 px-5 group"
          >
            <span className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-neutral-100 group-hover:bg-[#2196f3]/10 transition-colors overflow-hidden">
              <FaFilePdf className="text-lg" />
            </span>
            <span className="uppercase tracking-widest text-xs border-b-2 border-transparent group-hover:border-neutral-800 dark:group-hover:border-white transition-all flex-grow whitespace-nowrap">Descargar CV</span>
          </a>
        </div>
        {/* Redes sociales */}
        <div className="flex gap-3 mt-5 justify-center md:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all text-xl p-2 rounded-full bg-neutral-900/80 dark:bg-white/10 text-neutral-200 hover:text-[#2196f3] hover:-translate-y-1 focus:-translate-y-1 focus:text-[#2196f3] shadow-sm border border-neutral-800 dark:border-white/10`}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      {/* Columna derecha: avatar */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-12 md:mt-0">
        <div className="relative flex items-center justify-center">
          {/* Aura circular azul animada, centrada y más grande */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-[#2196f3]/30 via-[#2196f3]/10 to-transparent blur-2xl opacity-70 animate-pulse" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px] md:w-[250px] md:h-[250px] rounded-full bg-gradient-to-br from-[#2196f3]/20 via-[#2196f3]/10 to-transparent blur-lg opacity-40 animate-spin-slow" />
          <img src="/avatar.png" alt="Bastián Tapia" className="relative w-36 h-36 md:w-56 md:h-56 rounded-full shadow-2xl object-cover border-4 border-[#2196f3] z-10" />
          {/* Badge de disponibilidad mejorado */}
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-1 rounded-full shadow border border-neutral-800 dark:border-neutral-200 flex items-center gap-2 text-xs font-bold whitespace-nowrap z-20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>Disponible para proyectos
          </span>
        </div>
      </div>
    </section>
  );
}

