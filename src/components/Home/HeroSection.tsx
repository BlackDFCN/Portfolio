"use client";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaLayerGroup, FaRegComments, FaFolderOpen, FaRegFileAlt } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://linkedin.com/in/bastiantapia07',
    label: 'LinkedIn',
    icon: <FaLinkedin size={22} />,
    brand: 'linkedin'
  },
  {
    href: 'https://github.com/BlackDFCN',
    label: 'GitHub',
    icon: <FaGithub size={22} />,
    brand: 'github'
  },
  {
    href: 'mailto:bastiantapia.dev@gmail.com',
    label: 'Email',
    icon: <FaEnvelope size={22} />,
    brand: 'email'
  },
  {
    href: 'https://wa.me/56959800748',
    label: 'WhatsApp',
    icon: <FaWhatsapp size={22} />,
    brand: 'whatsapp'
  }
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 px-4 md:px-12 py-12 md:py-24 max-w-7xl mx-auto opacity-100 transition-opacity duration-700">
      {/* Columna izquierda: presentación, descripción y acciones */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
        {/* Saludo y nombre */}
        <span className="text-xs md:text-sm text-[#2563eb] tracking-widest mb-3 mt-8 md:mt-0 uppercase font-bold drop-shadow-sm">¡Hola! Soy</span>
        {/* Título principal */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl font-black leading-tight mb-3 drop-shadow-xl tracking-tight break-keep max-w-full"
        >
          <span className="text-[#232a3a] dark:text-white">Bastián</span> <span className="text-[#2563eb]">Tapia</span>
        </h1>
        {/* Rol principal */}
        <span className="inline-flex items-center gap-2 border-2 border-[#2563eb] text-[#2563eb] px-5 py-2 rounded-full text-sm font-bold mb-10 mt-8 md:mt-3 bg-white dark:bg-neutral-900 shadow-md">
          <FaLayerGroup className="text-[#2563eb] text-xl" /> Full Stack Developer
        </span>
        {/* Descripción profesional */}
        <p className="text-lg md:text-xl text-[#232a3a] dark:text-neutral-100 max-w-2xl mb-2 font-semibold leading-relaxed">
          Desarrollo productos digitales <span className="text-[#2563eb] font-bold">robustos</span>, <span className="text-[#2563eb] font-bold">escalables</span> y <span className="text-[#2563eb] font-bold">seguros</span> que optimizan procesos y generan valor real.
        </p>
        {/* Intereses y enfoque */}
        <p className="text-lg md:text-xl text-[#232a3a] dark:text-neutral-200 max-w-2xl mb-2 leading-relaxed">
          Apasionado por la <span className="font-bold text-[#2563eb]">automatización</span>, la <span className="font-bold text-[#2563eb]">escalabilidad</span> y la <span className="font-bold text-[#2563eb]">seguridad</span>, aplico arquitectura limpia y buenas prácticas en cada proyecto.
        </p>
        {/* Especialidad */}
        <p className="text-base md:text-lg text-[#3b82f6] dark:text-[#60a5fa] max-w-2xl mb-10 italic">
          Especialista en TypeScript, Node.js y React.
        </p>
        {/* Botones de llamada a la acción (CTA) */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center mt-2 w-full">
          {/* Botón Contacto */}
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563eb] text-white font-extrabold shadow hover:bg-[#3b82f6] hover:scale-105 active:scale-95 transition-all text-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 group min-w-[160px] h-14 md:h-14"
            style={{alignSelf: 'stretch'}}
          >
            <FaRegComments className="text-xl group-hover:animate-bounce transition-transform" />
            <span className="truncate">Contacto</span>
          </a>
          {/* Botón Proyectos */}
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 text-[#2563eb] font-extrabold shadow hover:bg-[#2563eb]/10 hover:text-[#3b82f6] hover:shadow-blue-400/40 transition-all text-lg py-3 px-10 group min-w-[160px] h-14 md:h-14 relative overflow-hidden"
            style={{alignSelf: 'stretch'}}
          >
            <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:shadow-[0_0_16px_2px_rgba(33,150,243,0.4)] transition-all pointer-events-none" />
            <FaFolderOpen className="text-xl group-hover:animate-bounce transition-transform" />
            <span className="truncate">Proyectos</span>
          </a>
          {/* Botón CV */}
          <a
            href="/bastiantapia_cv.pdf"
            download="Bastian_Tapia_CV.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 text-[#2563eb] font-extrabold shadow hover:bg-[#2563eb]/10 hover:text-[#3b82f6] hover:shadow-blue-400/40 transition-all text-lg py-3 px-8 group min-w-[120px] h-14 md:h-14 relative overflow-hidden uppercase tracking-[0.2em]"
            style={{alignSelf: 'stretch'}}
            aria-label="Descargar CV en PDF"
          >
            <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:shadow-[0_0_16px_2px_rgba(33,150,243,0.4)] transition-all pointer-events-none" />
            <FaRegFileAlt className="text-xl group-hover:animate-bounce transition-transform" />
            CV
          </a>
        </div>
        {/* Redes sociales */}
        <div className="flex gap-6 mt-10 justify-center md:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
              className={
                `transition-all duration-200 flex items-center justify-center rounded-full border-2 border-[#2563eb] bg-white dark:bg-neutral-900 w-[44px] h-[44px] text-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:scale-110 focus:scale-110`}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      {/* Columna derecha: avatar y badge de disponibilidad */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-0 md:-mt-16 md:pl-12">
        <div className="relative flex items-center justify-center">
          {/* Aura circular azul animada */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full bg-gradient-to-tr from-[#2196f3]/30 via-[#2196f3]/10 to-transparent blur-2xl opacity-80 animate-pulse" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-full bg-gradient-to-br from-[#2196f3]/20 via-[#2196f3]/10 to-transparent blur-lg opacity-50 animate-spin-slow" />
          {/* Avatar principal */}
          <img src="/avatar.png" alt="Bastián Tapia" className="relative w-52 h-52 md:w-80 md:h-80 rounded-full object-cover border-4 border-[#2563eb] z-10 shadow-[0_12px_64px_0_rgba(37,99,235,0.30)] dark:shadow-[0_12px_64px_0_rgba(59,130,246,0.30)]" />
          {/* Badge de disponibilidad */}
          <span
            className="absolute left-1/2 -translate-x-1/2 -bottom-8 px-10 py-3 rounded-[2rem] flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] border-2 border-[#2563eb] bg-white dark:bg-neutral-900 text-[#2563eb] z-20 whitespace-nowrap shadow mt-8 md:mt-0"
          >
            <span className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
              <span className="absolute inset-0 w-3 h-3 rounded-full bg-[#22c55e] animate-ping opacity-75"></span>
            </span>
            Disponible
          </span>
        </div>
      </div>
    </section>
  );
}

