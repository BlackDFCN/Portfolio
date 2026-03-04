import { getAllProjects } from '@/lib/projects';
import { ProjectCard, Project } from './ProjectCard';
import Link from 'next/link';

export default async function FeaturedProjects() {
  const projects: Project[] = (await getAllProjects()).slice(0, 3);
  const emptyCards = Array.from({ length: 3 - projects.length });
  return (
    <section
      id="proyectos"
      className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-2 sm:px-4 relative z-10"
      aria-labelledby="proyectos-destacados-title"
    >
      <div className="mb-6 md:mb-8 text-center">
        {/* Encabezado unificado, solo 'Proyectos Destacados' */}
        <span className="text-sm md:text-base text-[#2563eb] tracking-widest mb-3 uppercase font-semibold drop-shadow-sm">¡Portafolio!</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
          Proyectos <span className="text-[#2563eb]">Destacados</span>
        </h2>
        <p className="text-sm sm:text-lg md:text-xl text-[#232a3a] dark:text-neutral-300 max-w-3xl mx-auto mb-8 font-semibold leading-relaxed">
          Proyectos reales que reflejan mi experiencia creando <span className="text-[#2563eb] font-bold">soluciones innovadoras</span> y alineadas a los <span className="text-[#2563eb] font-bold">objetivos</span> de cada cliente.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
        {projects.map((project: Project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {emptyCards.map((_, idx) => (
          <div
            key={`empty-card-${idx}`}
            className="rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 shadow flex flex-col h-full min-h-[180px] sm:min-h-[320px] md:min-h-[440px] opacity-60 items-center justify-center p-4 sm:p-8"
            tabIndex={0}
            aria-label="Espacio disponible para proyecto"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className="text-gray-300 text-3xl sm:text-5xl mb-2 sm:mb-4">—</span>
              <span className="text-gray-400 text-xs sm:text-base">Espacio disponible</span>
            </div>
          </div>
        ))}
      </div>
      <hr className="mb-2 sm:mb-4 border-[#2563eb]/20 w-full max-w-2xl mx-auto" />
      <div className="flex justify-center max-w-2xl mx-auto mb-2 sm:mb-4">
        <Link
          href="/proyectos"
          className="font-bold underline underline-offset-4 text-[#2563eb] dark:text-[#2563eb] hover:text-[#1e40af] dark:hover:text-[#1e40af] transition-colors text-base sm:text-lg px-1 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded"
          aria-label="Ver catálogo completo de proyectos"
          tabIndex={0}
        >
          Ver catálogo completo
        </Link>
      </div>
    </section>
  );
}
