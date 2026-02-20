"use client";
import { FaUtensils, FaChartBar, FaShoppingCart } from "react-icons/fa";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ProjectsSection() {
  const revealRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={revealRef} id="proyectos" className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4 pt-24 scroll-mt-24 opacity-0 transition-opacity duration-700">
      {/* Header */}
      <div className="mb-12 text-center relative z-10">
        <span className="uppercase tracking-widest text-[#2563eb] text-xs font-semibold">PORTFOLIO</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mt-2 mb-4">
          Proyectos <span className="text-[#2563eb]">Destacados</span>
        </h2>
        <p className="text-[#232a3a] dark:text-neutral-300 max-w-2xl mx-auto font-medium">
          Algunos de los proyectos más relevantes que he desarrollado, enfocados en resultados, escalabilidad y experiencia de usuario.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Proyecto 1 */}
          <ScrollReveal className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-8 shadow-lg flex flex-col items-start relative transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
            <div className="flex items-center mb-4">
              <span className="bg-[#232a3a] p-2 rounded-full mr-3">
                <FaUtensils className="text-[#3b82f6] text-xl" />
              </span>
              <h3 className="text-lg font-bold text-[#232a3a] dark:text-white">Sistema de Reservas para Restaurante</h3>
            </div>
            <p className="text-[#232a3a] dark:text-neutral-300 mb-4 text-sm">
              Automatización de reservas, gestión de mesas y notificaciones en tiempo real. +30% eficiencia operativa.
            </p>
            <ul className="text-[#232a3a] dark:text-neutral-400 text-sm space-y-2 mb-6">
              <li>• React, Node.js, Socket.io</li>
              <li>• Notificaciones en tiempo real</li>
              <li>• Integración con Google Calendar</li>
            </ul>
            <a href="#" className="w-full bg-blue-50 dark:bg-[#232a3a] hover:bg-[#2563eb] hover:text-white text-[#2563eb] font-semibold py-2 rounded-lg text-center transition">Ver más</a>
          </ScrollReveal>

          {/* Proyecto 2 */}
          <ScrollReveal className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-8 shadow-lg flex flex-col items-start relative transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
            <div className="flex items-center mb-4">
              <span className="bg-[#232a3a] p-2 rounded-full mr-3">
                <FaChartBar className="text-[#3b82f6] text-xl" />
              </span>
              <h3 className="text-lg font-bold text-[#232a3a] dark:text-white">Panel de Control para Pymes</h3>
            </div>
            <p className="text-[#232a3a] dark:text-neutral-300 mb-4 text-sm">
              Dashboard personalizado, integración de ventas y reportes automáticos. Escalable y seguro.
            </p>
            <ul className="text-[#232a3a] dark:text-neutral-400 text-sm space-y-2 mb-6">
              <li>• Next.js, Prisma, PostgreSQL</li>
              <li>• Reportes automáticos PDF/Excel</li>
              <li>• Autenticación y roles de usuario</li>
            </ul>
            <a href="#" className="w-full bg-blue-50 dark:bg-[#232a3a] hover:bg-[#2563eb] hover:text-white text-[#2563eb] font-semibold py-2 rounded-lg text-center transition">Ver más</a>
          </ScrollReveal>

          {/* Proyecto 3 */}
          <ScrollReveal className="bg-white dark:bg-neutral-900 border border-[#232a3a] rounded-2xl p-8 shadow-lg flex flex-col items-start relative transition-all animate-fade-in hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
            <div className="flex items-center mb-4">
              <span className="bg-[#232a3a] p-2 rounded-full mr-3">
                <FaShoppingCart className="text-[#3b82f6] text-xl" />
              </span>
              <h3 className="text-lg font-bold text-[#232a3a] dark:text-white">E-commerce Integrado</h3>
            </div>
            <p className="text-[#232a3a] dark:text-neutral-300 mb-4 text-sm">
              Tienda online con pasarela de pagos, automatización de inventario y analítica avanzada.
            </p>
            <ul className="text-[#232a3a] dark:text-neutral-400 text-sm space-y-2 mb-6">
              <li>• Next.js, Stripe, MongoDB</li>
              <li>• Automatización de inventario</li>
              <li>• Dashboard de analítica avanzada</li>
            </ul>
            <a href="#" className="w-full bg-blue-50 dark:bg-[#232a3a] hover:bg-[#2563eb] hover:text-white text-[#2563eb] font-semibold py-2 rounded-lg text-center transition">Ver más</a>
          </ScrollReveal>
        </ScrollReveal>
      </div>
    </section>
  );
}
