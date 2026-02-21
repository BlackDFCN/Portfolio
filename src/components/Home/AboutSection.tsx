"use client";
import { Star, Award, Cloud, User, TrendingUp, Code, Heart, Mountain } from "lucide-react";


const AboutSection = () => {
  return (
    <section id="sobre-mi" className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-24 mb-32 pt-28 scroll-mt-24">
      <div className="flex flex-col items-center mb-8 md:mb-10 md:mt-2 w-full">
        <span className="w-6 h-1 bg-[#2563eb] rounded-full mb-2"></span>
          <span className="uppercase text-[#2563eb] tracking-widest text-sm mb-2">EXPERTISE</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2">
            <span>Sobre&nbsp;</span>
            <span className="text-[#2563eb]">Mí</span>
          </h2>
          <p className="text-base md:text-lg text-[#b6c9e1] text-center max-w-3xl mx-auto">
            Ingeniero en computación e informática, desarrollador <span className="text-[#2563eb] font-bold">Full Stack</span> especializado en <span className="text-[#2563eb] font-bold">TypeScript</span>, <span className="text-[#2563eb] font-bold">Node.js</span> y <span className="text-[#2563eb] font-bold">React</span>. Mi enfoque combina excelencia técnica, calidad y seguridad, orientado a resultados de alto impacto.
          </p>
          <span className="block text-xs md:text-sm text-[#b6c9e1] mt-6 text-center italic">Transformo ideas en productos digitales robustos y <span className="text-[#2563eb]">escalables</span>.</span>
      </div>
      {/* ...existing code... */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-x-6 gap-y-4 w-full max-w-6xl mx-auto">
              <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
                <Mountain className="w-6 h-6 text-[#60a5fa] mb-2" />
                <span className="font-bold text-[#60a5fa]">Pasiones</span>
                <span className="text-xs text-[#b6c9e1] mt-1">Trekking y fotografía</span>
              </div>
            <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
              <Award className="w-6 h-6 text-[#60a5fa] mb-2" />
              <span className="font-bold text-[#60a5fa]">2025</span>
              <span className="text-xs text-[#b6c9e1] mt-1">Egresado</span>
            </div>
            <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
              <TrendingUp className="w-6 h-6 text-[#60a5fa] mb-2" />
              <span className="font-bold text-[#60a5fa]">Empresa</span>
              <span className="text-xs text-[#b6c9e1] mt-1">Proyecto real</span>
            </div>
            <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
              <Cloud className="w-6 h-6 text-[#60a5fa] mb-2" />
              <span className="font-bold text-[#60a5fa]">Cloud</span>
              <span className="text-xs text-[#b6c9e1] mt-1">AWS/Google</span>
            </div>
            <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
              <Star className="w-6 h-6 text-[#60a5fa] mb-2" />
              <span className="font-bold text-[#60a5fa]">Aprendizaje</span>
              <span className="text-xs text-[#b6c9e1] mt-1">Siempre actualizándome</span>
            </div>
            <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
              <Heart className="w-6 h-6 text-[#60a5fa] mb-2" />
              <span className="font-bold text-[#60a5fa]">Calidad</span>
              <span className="text-xs text-[#b6c9e1] mt-1">Excelencia técnica</span>
            </div>
            <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
              <User className="w-6 h-6 text-[#60a5fa] mb-2" />
              <span className="font-bold text-[#60a5fa]">Innovación</span>
              <span className="text-xs text-[#b6c9e1] mt-1">Creatividad aplicada</span>
            </div>
            <div className="bg-[#181f2a] border border-[#2563eb]/30 rounded-xl p-3 md:p-4 shadow-md flex flex-col items-center transition-all hover:bg-[#2563eb]/10 hover:shadow-lg focus:scale-[1.03] cursor-pointer">
              <Award className="w-6 h-6 text-[#60a5fa] mb-2" />
              <span className="font-bold text-[#60a5fa]">Usuario</span>
              <span className="text-xs text-[#b6c9e1] mt-1">Experiencia final</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl mx-auto my-3 border-t border-[#2563eb]/20"></div>
          <p className="text-base md:text-lg text-[#b6c9e1] mt-8 text-center max-w-4xl mx-auto">
            Me apasiona aprender buenas prácticas, seguridad, automatización y escalabilidad. Cuido los detalles y la experiencia del usuario final.
          </p>
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">TypeScript</span>
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">Node.js</span>
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">React</span>
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">Next.js</span>
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">Tailwind CSS</span>
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">PostgreSQL</span>
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">MongoDB</span>
            <span className="bg-[#2563eb]/20 text-[#2563eb] font-semibold px-3 py-1 rounded-full text-sm border border-[#2563eb]/30 transition-all hover:scale-105 hover:bg-[#2563eb]/40">Prisma</span>
          </div>
        
          <div className="mt-8 flex items-center gap-2 justify-center">
            <Mountain className="w-5 h-5 text-[#2563eb]" />
            <span className="text-[#2563eb] text-base font-medium">Trekking, ciencia ficción y fotografía.</span>
          </div>
      </section>
  );
}

export default AboutSection;
