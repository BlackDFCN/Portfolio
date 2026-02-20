"use client";
import { FaCode, FaCogs, FaCloud } from "react-icons/fa";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ServicesSection() {
  const revealRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={revealRef} id="servicios" className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4 pt-24 scroll-mt-24 opacity-0 transition-opacity duration-700">
      {/* Header */}
      <div className="mb-12 text-center relative z-10">
        <span className="uppercase tracking-widest text-[#2563eb] text-xs font-semibold">EXPERTISE</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mt-2 mb-4">
          Servicios <span className="text-[#2563eb]">Principales</span>
        </h2>
        <p className="text-[#232a3a] dark:text-neutral-300 max-w-2xl mx-auto font-medium">
          Ofrezco soluciones tecnológicas integrales diseñadas para escalar. Mi enfoque combina la excelencia técnica con una visión orientada a resultados de alto impacto.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Full Stack */}
        <ScrollReveal className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-8 shadow-lg flex flex-col items-start relative transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
          <div className="flex items-center mb-4">
            <span className="bg-[#232a3a] p-2 rounded-full mr-3">
              <FaCode className="text-[#3b82f6] text-xl" />
            </span>
            <h3 className="text-xl font-bold text-[#232a3a] dark:text-white">Desarrollo Full Stack</h3>
          </div>
          <p className="text-[#232a3a] dark:text-neutral-300 mb-4 text-sm">
            Construcción de aplicaciones web complejas y robustas. Desarrollo de interfaces reactivas con <a href="#" className="text-[#2563eb] underline">React</a> y APIs de alto rendimiento con <a href="#" className="text-[#2563eb] underline">Node.js</a>.
          </p>
          <ul className="text-[#232a3a] dark:text-neutral-400 text-sm space-y-2 mb-6">
            <li>• React, Next.js & Tailwind CSS</li>
            <li>• Node.js, Express & NestJS</li>
            <li>• PostgreSQL, MongoDB & Prisma</li>
          </ul>
          <a href="#" className="w-full bg-blue-50 dark:bg-[#232a3a] hover:bg-[#2563eb] hover:text-white text-[#2563eb] font-semibold py-2 rounded-lg text-center transition">Saber más</a>
        </ScrollReveal>

        {/* Arquitectura */}
        <ScrollReveal className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-8 shadow-lg flex flex-col items-start relative transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
          <div className="flex items-center mb-4">
            <span className="bg-[#232a3a] p-2 rounded-full mr-3">
              <FaCogs className="text-[#3b82f6] text-xl" />
            </span>
            <h3 className="text-xl font-bold text-[#232a3a] dark:text-white">Arquitectura de Software</h3>
          </div>
          <p className="text-[#232a3a] dark:text-neutral-300 mb-4 text-sm">
            Diseño de sistemas escalables bajo principios de <a href="#" className="text-[#2563eb] underline">Clean Architecture</a>. Enfoque en mantenibilidad, seguridad y optimización de recursos técnicos.
          </p>
          <ul className="text-[#232a3a] dark:text-neutral-400 text-sm space-y-2 mb-6">
            <li>• SOLID, DRY & Design Patterns</li>
            <li>• Microservicios & API Design</li>
            <li>• Optimización de Performance (LCP)</li>
          </ul>
          <a href="#" className="w-full bg-blue-50 dark:bg-[#232a3a] hover:bg-[#2563eb] hover:text-white text-[#2563eb] font-semibold py-2 rounded-lg text-center transition">Saber más</a>
        </ScrollReveal>

        {/* CI/CD */}
        <ScrollReveal className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-8 shadow-lg flex flex-col items-start relative transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
          <div className="flex items-center mb-4">
            <span className="bg-[#232a3a] p-2 rounded-full mr-3">
              <FaCloud className="text-[#3b82f6] text-xl" />
            </span>
            <h3 className="text-xl font-bold text-[#232a3a] dark:text-white">Automatización & CI/CD</h3>
          </div>
          <p className="text-[#232a3a] dark:text-neutral-300 mb-4 text-sm">
            Implementación de pipelines de despliegue eficientes. Automatización de flujos de trabajo con <a href="#" className="text-[#2563eb] underline">GitHub Actions</a> y contenedores <a href="#" className="text-[#2563eb] underline">Docker</a>.
          </p>
          <ul className="text-[#232a3a] dark:text-neutral-400 text-sm space-y-2 mb-6">
            <li>• CI/CD Pipelines con GitHub Actions</li>
            <li>• Docker & Contenerización</li>
            <li>• Infraestructura como Código</li>
          </ul>
          <a href="#" className="w-full bg-blue-50 dark:bg-[#232a3a] hover:bg-[#2563eb] hover:text-white text-[#2563eb] font-semibold py-2 rounded-lg text-center transition">Saber más</a>
        </ScrollReveal>
      </div>
    </section>
  );
}
