"use client";
import { Award, Heart, Mountain } from "lucide-react";


const AboutSection = () => {
  return (
    <section
      id="sobre-mi"
      className="w-full max-w-6xl mx-auto min-h-[70vh] py-20 px-4 scroll-mt-24 relative z-10"
    >
      <div className="flex flex-col md:flex-row items-center md:items-center gap-12 w-full">
        {/* Columna izquierda: texto principal */}
        <div className="flex-1 flex flex-col justify-center items-start text-left">
          <span className="uppercase tracking-widest text-[#2563eb] text-sm md:text-base font-semibold mb-2">SOBRE MÍ</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
            Perfil <span className="text-[#2563eb]">Profesional</span>
          </h2>
          <p className="text-[#232a3a] dark:text-neutral-300 max-w-xl font-medium text-xl md:text-2xl mb-3 mt-2">
            Ingeniero en computación e informática, especializado en el desarrollo de soluciones digitales <span className="text-[#2563eb] font-semibold">innovadoras</span> y <span className="text-[#2563eb] font-semibold">seguras</span>. Mi enfoque combina <span className="text-[#2563eb] font-semibold">excelencia técnica</span> y atención al detalle para crear experiencias de usuario sobresalientes.
          </p>
          <span className="block text-sm md:text-base text-[#3b82f6] dark:text-[#60a5fa] mt-2 mb-6 italic">
            Transformo ideas en productos digitales robustos y escalables.
          </span>
          <div className="w-full max-w-xl my-3 border-t border-[#2563eb]/20"></div>
          <p className="text-[#232a3a] dark:text-neutral-300 max-w-xl font-medium text-xl md:text-2xl mt-4">
            Comprometido con la calidad y la innovación.
          </p>
        </div>
        {/* Columna derecha: certificaciones */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start mt-8 md:mt-0 md:self-center">
          <div
            className="w-full max-w-md rounded-[2rem] border border-[#2563eb]/60 bg-white/90 dark:bg-neutral-900/90 px-10 py-10 flex flex-col items-start shadow-[0_8px_32px_0_rgba(37,99,235,0.10)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#2563eb]/10 rounded-full p-3 flex items-center justify-center border border-[#2563eb]/60">
                <Award className="w-8 h-8 text-[#2563eb]" />
              </span>
              <h3 className="text-xl font-bold text-[#2563eb] tracking-tight">Título profesional</h3>
            </div>
            <ul className="text-[#232a3a] dark:text-neutral-200 text-sm font-semibold w-full mb-4">
              <li className="border-b border-neutral-200 dark:border-neutral-700 pb-2 pl-2">Ingeniero en Computación e Informática</li>
              <li className="pb-2 pt-2 pl-2">Técnico Profesional en Telecomunicaciones</li>
            </ul>
            <div className="flex items-center gap-3 mb-3 mt-4">
              <span className="bg-[#2563eb]/10 rounded-full p-2 flex items-center justify-center border border-[#2563eb]/60">
                <Award className="w-5 h-5 text-[#2563eb]" />
              </span>
              <h3 className="text-base font-bold text-[#2563eb] tracking-tight">Certificaciones</h3>
            </div>
            <ul className="text-[#232a3a] dark:text-neutral-200 text-sm font-medium w-full mb-1">
              <li className="border-b border-neutral-200 dark:border-neutral-700 pb-2">AWS Cloud Practitioner</li>
              <li className="border-b border-neutral-200 dark:border-neutral-700 pb-2 pt-2">Google Cloud</li>
              <li className="pb-2 pt-2">DevOps y Automatización</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
