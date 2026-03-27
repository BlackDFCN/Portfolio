"use client";
import { Award } from "lucide-react";

const AboutSection = () => {
  return (
    <section
      id="sobre-mi"
      className="min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center px-2 sm:px-4 lg:px-8"
    >
      <div
        className="w-full max-w-6xl mx-auto transition-all duration-700 ease-out py-8 sm:py-16 md:py-24"
      >
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-8 w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          {/* Columna izquierda: texto principal */}
          <div className="flex-1 flex flex-col justify-center items-start text-left h-full">
            <span className="uppercase tracking-widest text-[#2563eb] text-xs sm:text-sm md:text-base font-semibold mb-2">SOBRE MÍ</span>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
              Perfil <span className="text-[#2563eb]">Profesional</span>
            </h2>
            <p className="text-[#232a3a] dark:text-neutral-300 max-w-2xl font-medium text-base sm:text-xl md:text-2xl mb-4 sm:mb-6 mt-2">
              Soy un Ingeniero en Computación enfocado en construir herramientas que resuelven dolores reales de mercado. Ayudo tanto a <span className="text-[#2563eb] font-bold">Pymes y profesionales</span> a escalar sus ventas con E-Commerce y Sitios Corporativos, como a empresas a estructurar <span className="text-[#2563eb] font-bold">sistemas SaaS</span> y automatizaciones complejas.
            </p>
            <p className="text-[#232a3a] dark:text-neutral-300 max-w-2xl font-medium text-xs sm:text-lg md:text-xl mb-2">
              Mi carrera abarca desde la creación de landings comerciales y plataformas de agendamiento, hasta la orquestación de APIs corporativas. Diseño entregando siempre la mejor <strong>experiencia visual (UX/UI)</strong> en el frente, y el motor más eficiente gracias al <span className="text-[#2563eb] font-bold">clean code</span> bajo el capó.
            </p>
            <hr className="my-3 sm:my-5 border-[#2563eb]/20 w-full max-w-2xl" />
            <h4 className="mb-2 text-[#232a3a] dark:text-white font-bold text-xs sm:text-base">Stack Tecnológico</h4>
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">TypeScript</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">Next.js / React</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">NestJS / Node</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">PostgreSQL</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">GCP & Docker</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">CI/CD</span>
            </div>
          </div>
          {/* Columna derecha: cards de certificaciones y títulos */}
          <div className="flex-1 flex flex-col justify-center items-center gap-2 sm:gap-3 w-full max-w-sm min-w-[180px] sm:min-w-[260px] h-full">
            {/* Card Títulos profesionales */}
            <div className="flex-1 rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 px-3 sm:px-5 py-3 sm:py-4 shadow flex flex-col items-start w-full transition-all hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer" tabIndex={0} aria-label="Títulos profesionales">
              <h3 className="text-xs sm:text-base font-bold text-[#232a3a] dark:text-white mb-1 flex items-center gap-2"><Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb]" /> Títulos profesionales</h3>
              <div className="w-full h-[1px] bg-[#2563eb]/10 mb-2" />
              <ul className="text-[#232a3a] dark:text-white text-xs sm:text-sm w-full list-disc list-inside">
                <li className="pb-1">Ingeniero en Computación e Informática</li>
                <li className="pb-1">Técnico Profesional en Telecomunicaciones</li>
              </ul>
            </div>
            {/* Card Certificaciones */}
            <div className="flex-1 rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 px-3 sm:px-5 py-3 sm:py-4 shadow flex flex-col items-start w-full transition-all hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer" tabIndex={0} aria-label="Certificaciones">
              <h3 className="text-xs sm:text-base font-bold text-[#232a3a] dark:text-white mb-1 flex items-center gap-2"><Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb]" /> Certificaciones</h3>
              <div className="w-full h-[1px] bg-[#2563eb]/10 mb-2" />
              <ul className="text-[#232a3a] dark:text-white text-xs sm:text-sm w-full list-disc list-inside">
                <li className="pb-1">Google Cloud Computing Foundations</li>
                <li className="pb-1">Kubernetes in Google Cloud</li>
                <li className="pb-1">Introduction to Cloud 101</li>
                <li className="pb-1">Inteligencia Artificial y Productividad</li>
                <li className="pb-1">Transformación Digital</li>
                <li className="pb-1">Scrum Foundation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
