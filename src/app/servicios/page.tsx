// Página de servicios detallados
import React from "react";

const ServiciosPage = () => {
  return (
    <main className="py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 px-5 py-4 shadow flex flex-col items-start w-full transition-all hover:scale-[1.03] cursor-pointer">
          <h3 className="text-xl font-bold text-[#232a3a] dark:text-white mb-2">Desarrollo Web a Medida</h3>
          <p className="text-[#232a3a] dark:text-neutral-200 mb-2">Sitios y aplicaciones web modernos, rápidos y seguros, adaptados a tus necesidades.</p>
        </div>
        <div className="rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 px-5 py-4 shadow flex flex-col items-start w-full transition-all hover:scale-[1.03] cursor-pointer">
          <h3 className="text-xl font-bold text-[#232a3a] dark:text-white mb-2">Consultoría y Automatización</h3>
          <p className="text-[#232a3a] dark:text-neutral-200 mb-2">Optimización de procesos, integración de sistemas y automatización para empresas.</p>
        </div>
        <div className="rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 px-5 py-4 shadow flex flex-col items-start w-full transition-all hover:scale-[1.03] cursor-pointer">
          <h3 className="text-xl font-bold text-[#232a3a] dark:text-white mb-2">Mentoría y Formación</h3>
          <p className="text-[#232a3a] dark:text-neutral-200 mb-2">Capacitación personalizada en desarrollo web, buenas prácticas y nuevas tecnologías.</p>
        </div>
      </div>
    </main>
  );
};

export default ServiciosPage;
