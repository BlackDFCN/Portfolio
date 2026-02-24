
"use client";
import { FaCode, FaCloud, FaLock } from 'react-icons/fa';

const SERVICES = [
  {
    icon: <FaCode className="text-4xl text-[#2563eb] animate-bounce-slow mb-2" />,
    badge: "Desarrollo",
    title: "Desarrollo a Medida",
    description:
      "Aplicaciones web y móviles robustas, escalables y modernas, adaptadas a las necesidades de tu negocio. Stack: Next.js, React, Node.js, TypeScript, Tailwind, etc.",
  },
  {
    icon: <FaCloud className="text-4xl text-[#2563eb] animate-bounce-slow mb-2" />,
    badge: "Cloud & DevOps",
    title: "Cloud & DevOps",
    description:
      "Automatización, despliegue y optimización en la nube (Azure, AWS, GCP). CI/CD, contenedores, infraestructura como código y buenas prácticas para escalar seguro.",
  },
  {
    icon: <FaLock className="text-4xl text-[#2563eb] animate-bounce-slow mb-2" />,
    badge: "Arquitectura",
    title: "Arquitectura & Seguridad",
    description:
      "Diseño de arquitecturas limpias, seguras y eficientes. Auditoría, refactorización, integración de buenas prácticas y protección de datos en cada capa.",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="w-full max-w-6xl mx-auto py-20 px-4 relative z-10">
      <div className="mb-6 md:mb-8 text-center">
        <span className="uppercase tracking-widest text-[#2563eb] text-sm md:text-base font-semibold mb-2 inline-block letter-spacing-[0.2em]">
          SERVICIOS
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
          ¿Cómo puedo <span className="text-[#2563eb]">ayudarte</span>?
        </h2>
        <p className="text-[#232a3a] dark:text-white max-w-2xl mx-auto font-medium text-base md:text-lg">
          Servicios profesionales para potenciar tu negocio con tecnología de alto nivel, automatización y seguridad.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => (
          <div
            key={service.title}
            className="relative rounded-2xl shadow-lg border border-[#2563eb]/30 flex flex-col items-center text-center bg-white dark:bg-neutral-900 p-8 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_0_8px_rgba(37,99,235,0.10)] focus:scale-[1.04] group"
          >
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#2563eb] shadow-md animate-fade-in">
              {service.badge}
            </span>
            {service.icon}
            <h3 className="text-lg font-extrabold text-[#232a3a] dark:text-white mb-2 mt-2">
              {service.title}
            </h3>
            <p className="text-sm text-[#232a3a] dark:text-white mb-0">
              {service.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <a
          href="#contacto"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563eb] text-white font-extrabold shadow-lg hover:bg-[#3b82f6] hover:scale-105 active:scale-95 transition-all text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 group w-full max-w-xs md:max-w-sm"
          style={{ boxShadow: '0 4px 24px 0 #2563eb22' }}
        >
          ¿Tienes un reto? ¡Hablemos!
        </a>
      </div>
    </section>
  );
}
