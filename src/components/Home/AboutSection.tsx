"use client";
import { Award } from "lucide-react";

const AboutSection = () => {
  return (
    <section
      id="sobre-mi"
      className="min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div
        className="w-full max-w-6xl mx-auto transition-all duration-700 ease-out py-16 md:py-24"
      >
        <div className="flex flex-col md:flex-row items-center md:items-center gap-8 w-full min-h-[500px]">
          {/* Columna izquierda: texto principal */}
          <div className="flex-1 flex flex-col justify-center items-start text-left h-full">
            <span className="uppercase tracking-widest text-[#2563eb] text-sm md:text-base font-semibold mb-2">SOBRE MÍ</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
              Sobre <span className="text-[#2563eb]">mí</span>
            </h2>
            <p className="text-[#232a3a] dark:text-neutral-300 max-w-2xl font-medium text-xl md:text-2xl mb-6 mt-2">
              Soy un apasionado de la tecnología y la innovación. Me encanta transformar ideas en soluciones digitales que realmente marcan la diferencia para las personas y los negocios. Disfruto enfrentar <span className="text-[#2563eb] font-bold">retos técnicos</span> y colaborar con equipos <span className="text-[#2563eb] font-bold">diversos</span>, siempre buscando la <span className="text-[#2563eb] font-bold">excelencia</span> y la <span className="text-[#2563eb] font-bold">innovación</span>.
            </p>
            <p className="text-[#232a3a] dark:text-neutral-300 max-w-2xl font-medium text-lg md:text-xl mb-2">
              Mi enfoque combina <span className="text-[#2563eb] font-bold">automatización</span>, <span className="text-[#2563eb] font-bold">arquitectura limpia</span> y <span className="text-[#2563eb] font-bold">buenas prácticas</span> para crear productos <span className="text-[#2563eb] font-bold">robustos</span>, <span className="text-[#2563eb] font-bold">escalables</span> y <span className="text-[#2563eb] font-bold">seguros</span>. Creo en el <span className="text-[#2563eb] font-bold">aprendizaje continuo</span> y en aportar <span className="text-[#2563eb] font-bold">valor real</span> en cada proyecto.
            </p>
            <hr className="my-5 border-[#2563eb]/20 w-full max-w-2xl" />
            <h4 className="mb-2 text-[#232a3a] dark:text-white font-bold text-base">Tecnologías principales</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">TypeScript</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">JavaScript</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">React</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">Next.js</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">Node.js</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition">Docker</span>
            </div>
          </div>
          {/* Columna derecha: cards de certificaciones y títulos */}
          <div className="flex-1 flex flex-col justify-center items-center gap-3 w-full max-w-xs min-w-[260px] h-full">
            {/* Card Títulos profesionales */}
            <div className="rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 px-5 py-4 shadow flex flex-col items-start w-full transition-all hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
              <h3 className="text-base font-bold text-[#232a3a] dark:text-white mb-1 flex items-center gap-2"><Award className="w-5 h-5 text-[#2563eb]" /> Títulos profesionales</h3>
              <div className="w-full h-[1px] bg-[#2563eb]/10 mb-2" />
              <ul className="text-[#232a3a] dark:text-neutral-200 text-xs font-semibold w-full list-disc list-inside">
                <li className="pb-1">Ingeniero en Computación e Informática</li>
                <li className="pb-1">Técnico Profesional en Telecomunicaciones</li>
              </ul>
            </div>
            {/* Card Certificaciones */}
            <div className="rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 px-5 py-4 shadow flex flex-col items-start w-full transition-all hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer">
              <h3 className="text-base font-bold text-[#232a3a] dark:text-white mb-1 flex items-center gap-2"><Award className="w-5 h-5 text-[#2563eb]" /> Certificaciones</h3>
              <div className="w-full h-[1px] bg-[#2563eb]/10 mb-2" />
              <ul className="text-[#232a3a] dark:text-neutral-200 text-xs font-semibold w-full list-disc list-inside">
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
