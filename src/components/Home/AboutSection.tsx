"use client";
import React, { useRef, useEffect } from "react";

export default function AboutSection() {
  // Animación de barras de skills
  const tsBar = useRef<HTMLDivElement>(null);
  const nodeBar = useRef<HTMLDivElement>(null);
  const reactBar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const animate = (ref: React.RefObject<HTMLDivElement | null>, width: string) => {
      if (ref.current) {
        ref.current.style.width = '0%';
        setTimeout(() => {
          ref.current!.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
          ref.current!.style.width = width;
        }, 200);
      }
    };
    animate(tsBar, '100%');
    animate(nodeBar, '80%');
    animate(reactBar, '90%');
  }, []);
  return (
    <section id="sobre-mi" className="relative z-10 w-full max-w-7xl mx-auto px-2 md:px-0 mt-16 mb-28">
      <h2 className="text-xl font-bold text-[#2196f3] flex items-center gap-2 mb-2 md:mb-4 md:mt-2 w-full">
        <span className="w-6 h-1 bg-[#2196f3] rounded-full inline-block"></span> Sobre mí
      </h2>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-10 w-full">Desarrollador Senior enfocado en resultados de alto impacto para el negocio.</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-start mt-4 pb-4">
        {/* Columna izquierda: Impacto y resultados */}
        <div className="flex flex-col gap-4 justify-center w-full max-w-2xl mx-auto h-full">
          <span className="text-[#2196f3] font-semibold text-sm mb-2 flex items-center gap-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-[#2196f3]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> IMPACTO Y RESULTADOS</span>
          <div className="flex flex-col gap-2 md:gap-3 mt-0">
            <div className="bg-[#101926] dark:bg-[#101926] rounded-xl px-5 py-4 flex items-start gap-3 border border-[#2196f3]/60">
              <span className="text-[#2196f3] mt-1"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 01-8 0' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3v4' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 17v4' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 21h8' /></svg></span>
              <div>
                <span className="font-bold text-white">Reducción de Deuda Técnica</span>
                <div className="text-[#b6c9e1] text-sm">Implementación de Clean Architecture que redujo los tiempos de mantenimiento en un 40%.</div>
              </div>
            </div>
            <div className="bg-[#101926] dark:bg-[#101926] rounded-xl px-5 py-4 flex items-start gap-3 border border-[#2196f3]/60">
              <span className="text-[#2196f3] mt-1"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg></span>
              <div>
                <span className="font-bold text-white">Liderazgo y Mentoría</span>
                <div className="text-[#b6c9e1] text-sm">Escalado de equipos técnicos bajo estándares de CI/CD y revisiones de código rigurosas.</div>
              </div>
            </div>
            <div className="bg-[#101926] dark:bg-[#101926] rounded-xl px-5 py-4 flex items-start gap-3 border border-[#2196f3]/60">
              <span className="text-[#2196f3] mt-1"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2' /><circle cx='9' cy='7' r='4' /></svg></span>
              <div>
                <span className="font-bold text-white">Optimización de Performance</span>
                <div className="text-[#b6c9e1] text-sm">Mejora del LCP y tiempo de carga en aplicaciones React enterprise-level.</div>
              </div>
            </div>
          </div>
            {/* Botón de descargar CV eliminado por solicitud */}
        </div>
        {/* Columna derecha: Stack Tecnológico */}
        <div className="flex-1 flex flex-col gap-4 justify-start">
          <span className="text-[#2196f3] font-semibold text-sm mb-2 flex items-center gap-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-[#2196f3]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> STACK TECNOLÓGICO</span>
          <div className="bg-[#101926] dark:bg-[#101926] rounded-2xl shadow-lg p-6 border border-[#2196f3]/60 h-full flex flex-col justify-center mt-0">
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-white mb-2 text-sm">Frontend</div>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>TS</span>TypeScript</span>
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>R</span>React</span>
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>NJ</span>Next.js</span>
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>TW</span>Tailwind</span>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-2 text-sm">Backend</div>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-green-400 text-xs font-bold"><span>JS</span>Node.js</span>
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>EX</span>Express</span>
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>PS</span>Prisma/SQL</span>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-2 text-sm">Herramientas</div>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>GH</span>GitHub</span>
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>CI</span>CI/CD</span>
                  <span className="flex items-center gap-2 bg-[#181e2a] rounded px-2 py-1 text-[#2196f3] text-xs font-bold"><span>PM</span>Project Management</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-[#b6c9e1] mt-6 italic text-center">*Stack actualizado y enfocado en desarrollo de software de alta calidad.*</div>
          </div>
        </div>
      </div>
      {/* Cards de valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4 border-t border-[#1e293b]/60 pt-4">
        <div className="bg-[#101926] dark:bg-[#101926] rounded-2xl shadow-lg p-6 border border-[#2196f3]/60">
          <h4 className="text-[#2196f3] font-bold text-lg flex items-center gap-2 mb-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> Escalabilidad</h4>
          <p className="text-[#b6c9e1] text-sm mb-2">Diseño sistemas modulares bajo <span className="font-bold text-white">Clean Architecture</span>, permitiendo que el software crezca sin comprometer la velocidad.</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 rounded-full text-xs font-semibold">SOLID</span>
            <span className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 rounded-full text-xs font-semibold">DRY</span>
          </div>
        </div>
        <div className="bg-[#101926] dark:bg-[#101926] rounded-2xl shadow-lg p-6 border border-[#2196f3]/60">
          <h4 className="text-[#2196f3] font-bold text-lg flex items-center gap-2 mb-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> Innovación</h4>
          <p className="text-[#b6c9e1] text-sm mb-2">Uso de pipelines de <span className="font-bold text-white">CI/CD</span> y automatización de procesos para garantizar entregas continuas de alta calidad.</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 rounded-full text-xs font-semibold">GITHUB ACTIONS</span>
            <span className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 rounded-full text-xs font-semibold">DOCKER</span>
          </div>
        </div>
        <div className="bg-[#101926] dark:bg-[#101926] rounded-2xl shadow-lg p-6 border border-[#2196f3]/60">
          <h4 className="text-[#2196f3] font-bold text-lg flex items-center gap-2 mb-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> Seguridad</h4>
          <p className="text-[#b6c9e1] text-sm mb-2">Prioridad absoluta en la protección de datos mediante <span className="font-bold text-white">criptografía</span> y prácticas de seguridad en el ciclo de vida del desarrollo.</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 rounded-full text-xs font-semibold">JWT</span>
            <span className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 rounded-full text-xs font-semibold">OWASP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
