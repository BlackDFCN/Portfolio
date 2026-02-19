
export default function AboutSection() {
  return (
    <section id="sobre-mi" className="relative z-10 bg-white/80 dark:bg-[#18181b]/80 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-10 max-w-4xl w-full mx-auto backdrop-blur-md border border-[#2c2c34]/20 mb-32 mt-12 animate-fade-in">
      {/* Avatar y datos básicos */}
      <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/3">
        <img
          src="/avatar.png"
          alt="Bastián Tapia"
          className="w-32 h-32 rounded-2xl object-cover border-4 border-[#3b82f6] bg-white dark:bg-[#0c0c0c] shadow-lg"
        />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-2 bg-[#18181b] dark:bg-[#23232e] text-white rounded-xl px-4 py-2 text-sm font-semibold shadow border border-[#23232e]">
            <span className="text-[#3b82f6]">📍</span> Ubicación: <span className="ml-auto">Santiago, Chile</span>
          </div>
          <div className="flex items-center gap-2 bg-[#18181b] dark:bg-[#23232e] text-white rounded-xl px-4 py-2 text-sm font-semibold shadow border border-[#23232e]">
            <span className="text-[#3b82f6]">🌐</span> Idiomas: <span className="ml-auto">Español / Inglés</span>
          </div>
          <div className="flex items-center gap-2 bg-[#18181b] dark:bg-[#23232e] text-white rounded-xl px-4 py-2 text-sm font-semibold shadow border border-[#23232e]">
            <span className="text-[#3b82f6]">🟢</span> Estado: <span className="ml-auto">Disponible</span>
          </div>
        </div>
      </div>
      {/* Info principal */}
      <div className="flex-1 text-left flex flex-col gap-4">
        <h2 className="uppercase tracking-widest text-[#3b82f6] text-sm font-bold mb-1">Sobre mí</h2>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
          Arquitecto de experiencias digitales y <span className="text-[#3b82f6]">soluciones escalables.</span>
        </h1>
        <p className="text-base text-neutral-300 mb-2 max-w-2xl">
          Con más de 5 años de experiencia en el ecosistema tecnológico, me especializo en transformar ideas complejas en productos digitales fluidos. Mi enfoque no se limita a escribir código: busco generar valor real para el negocio a través de una ingeniería de software sólida.<br className="hidden md:block" />
          He liderado el desarrollo de plataformas fintech, sistemas de gestión logística y aplicaciones de alto tráfico, priorizando siempre la <span className="font-semibold text-white">mantenibilidad</span> y la <span className="font-semibold text-white">experiencia del usuario</span>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="flex items-start gap-2">
            <span className="text-[#3b82f6] font-bold">◆</span>
            <span className="text-neutral-200">Filosofía Técnica</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#3b82f6] font-bold">◆</span>
            <span className="text-neutral-200">Mentalidad Ágil</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#3b82f6] font-bold">◆</span>
            <span className="text-neutral-200">Resolución Crítica</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#3b82f6] font-bold">◆</span>
            <span className="text-neutral-200">Visión de Negocio</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-[#23232e] text-[#3b82f6] px-3 py-1 rounded-full text-xs font-semibold">React.js</span>
          <span className="bg-[#23232e] text-[#3b82f6] px-3 py-1 rounded-full text-xs font-semibold">Node.js</span>
          <span className="bg-[#23232e] text-[#3b82f6] px-3 py-1 rounded-full text-xs font-semibold">TypeScript</span>
          <span className="bg-[#23232e] text-[#3b82f6] px-3 py-1 rounded-full text-xs font-semibold">AWS</span>
          <span className="bg-[#23232e] text-[#3b82f6] px-3 py-1 rounded-full text-xs font-semibold">Kubernetes</span>
          <span className="bg-[#23232e] text-[#3b82f6] px-3 py-1 rounded-full text-xs font-semibold">PostgreSQL</span>
        </div>
      </div>
    </section>
  );
}
