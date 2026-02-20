"use client";
import React, { useRef, useEffect } from "react";
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  const revealRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={revealRef} id="sobre-mi" className="relative z-10 w-full max-w-7xl mx-auto px-2 md:px-0 mt-16 mb-28 pt-24 scroll-mt-24 opacity-0 transition-opacity duration-700">
      <h2 className="text-xl font-bold text-[#2563eb] flex items-center gap-2 mb-2 md:mb-4 md:mt-2 w-full">
        <span className="w-6 h-1 bg-[#2563eb] rounded-full inline-block"></span> Sobre mí
      </h2>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#232a3a] dark:text-white mb-8 md:mb-12 w-full tracking-tight">Listo para llevar tu empresa al siguiente nivel con tecnología, liderazgo y resultados.</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-stretch mt-4 pb-0 animate-fade-in">
        {/* Columna izquierda: Impacto y resultados */}
        <div className="flex flex-col gap-4 justify-center w-full max-w-2xl mx-auto h-full">
          <span className="text-[#2563eb] font-semibold text-sm mb-2 flex items-center gap-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-[#2563eb]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> IMPACTO Y RESULTADOS</span>
            <div className="flex flex-col gap-6 md:gap-7 mt-0">
            {/* Card 1 */}
              <div className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-6 shadow-md flex items-start gap-4 transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
              <span className="text-[#2563eb] mt-1"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 01-8 0' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3v4' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 17v4' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 21h8' /></svg></span>
              <div>
                <span className="font-bold text-[#232a3a] dark:text-white">Reducción de Deuda Técnica</span>
                <div className="text-[#232a3a] dark:text-neutral-300 text-sm">Implementación de Clean Architecture que redujo los tiempos de mantenimiento en un 40%.</div>
              </div>
            </div>
            {/* Card 2 */}
              <div className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-6 shadow-md flex items-start gap-4 transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
              <span className="text-[#2563eb] mt-1"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg></span>
              <div>
                <span className="font-bold text-[#232a3a] dark:text-white">Liderazgo y Mentoría</span>
                <div className="text-[#232a3a] dark:text-neutral-300 text-sm">Escalado de equipos técnicos bajo estándares de CI/CD y revisiones de código rigurosas.</div>
              </div>
            </div>
            {/* Card 3 */}
              <div className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-6 shadow-md flex items-start gap-4 transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
              <span className="text-[#2563eb] mt-1"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2' /><circle cx='9' cy='7' r='4' /></svg></span>
              <div>
                <span className="font-bold text-[#232a3a] dark:text-white">Optimización de Performance</span>
                <div className="text-[#232a3a] dark:text-neutral-300 text-sm">Mejora del LCP y tiempo de carga en aplicaciones React enterprise-level.</div>
              </div>
            </div>
          </div>
            {/* Botón de descargar CV eliminado por solicitud */}
        </div>
        {/* Columna derecha: Stack Tecnológico */}
        <div className="flex-1 flex flex-col gap-4 justify-start">
          <span className="text-[#2563eb] font-semibold text-sm mb-2 flex items-center gap-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-[#2563eb]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> STACK TECNOLÓGICO</span>
            <div className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-6 shadow-md h-full flex flex-col justify-center mt-0 animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer transition-all">
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-[#232a3a] dark:text-white mb-2 text-sm">Frontend</div>
                <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">TypeScript</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">React</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">Next.js</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">Tailwind</span>
                </div>
              </div>
              <div>
                <div className="font-semibold text-[#232a3a] dark:text-white mb-2 text-sm">Backend</div>
                <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">JS Node.js</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">Express</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">Prisma/SQL</span>
                </div>
                </div>
                <div>
                <div className="font-semibold text-[#232a3a] dark:text-white mb-2 text-sm">Bases de Datos</div>
                <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">PostgreSQL</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">MongoDB</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">MySQL</span>
                </div>
              </div>
              <div>
                <div className="font-semibold text-[#232a3a] dark:text-white mb-2 text-sm">Herramientas</div>
                <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">GitHub</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">CI/CD</span>
                    <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-blue-700 dark:text-gray-100 text-xs font-semibold transition-colors">Project Management</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-[#b6c9e1] mt-6 italic text-center">*Stack actualizado y enfocado en desarrollo de software de alta calidad.*</div>
          </div>
        </div>
      </div>
      {/* Cards de valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8 border-t-2 border-[#232a3a]/80 dark:border-[#232a3a] pt-8 transition-all">
        <div className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-6 shadow-lg animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
          <h4 className="text-[#2563eb] font-bold text-lg flex items-center gap-2 mb-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> Escalabilidad</h4>
          <p className="text-[#232a3a] dark:text-neutral-300 text-sm mb-2">Diseño sistemas modulares bajo <span className="font-bold text-[#232a3a] dark:text-white">Clean Architecture</span>, permitiendo que el software crezca sin comprometer la velocidad.</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-[#2563eb] dark:text-blue-200 text-xs font-semibold transition-colors">SOLID</span>
            <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-[#2563eb] dark:text-blue-200 text-xs font-semibold transition-colors">DRY</span>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-6 shadow-lg animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer transition-all">
          <h4 className="text-[#2563eb] font-bold text-lg flex items-center gap-2 mb-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> Innovación</h4>
          <p className="text-[#232a3a] dark:text-neutral-300 text-sm mb-2">Uso de pipelines de <span className="font-bold text-[#232a3a] dark:text-white">CI/CD</span> y automatización de procesos para garantizar entregas continuas de alta calidad.</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-[#2563eb] dark:text-blue-200 text-xs font-semibold transition-colors">GITHUB ACTIONS</span>
            <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-[#2563eb] dark:text-blue-200 text-xs font-semibold transition-colors">DOCKER</span>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-6 shadow-lg animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer transition-all">
          <h4 className="text-[#2563eb] font-bold text-lg flex items-center gap-2 mb-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1' /></svg> Seguridad</h4>
          <p className="text-[#232a3a] dark:text-neutral-300 text-sm mb-2">Prioridad absoluta en la protección de datos mediante <span className="font-bold text-[#232a3a] dark:text-white">criptografía</span> y prácticas de seguridad en el ciclo de vida del desarrollo.</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-[#2563eb] dark:text-blue-200 text-xs font-semibold transition-colors">JWT</span>
            <span className="flex items-center gap-2 bg-blue-50 dark:bg-[#232a3a] rounded-full px-2.5 py-0.5 text-[#2563eb] dark:text-blue-200 text-xs font-semibold transition-colors">OWASP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
