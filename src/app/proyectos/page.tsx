
import React from 'react';
import { getAllProjects } from '@/lib/projects';
import { ProjectCard, Project } from '@/components/Home/ProjectCard';

export default async function ProyectosPage() {
  const projects = await getAllProjects();
  const CARDS_PER_ROW = 3;
  // Agrupar proyectos en filas de 3
  const rows = [];
  for (let i = 0; i < projects.length; i += CARDS_PER_ROW) {
    rows.push(projects.slice(i, i + CARDS_PER_ROW));
  }
  // Si no hay proyectos, mostrar una fila vacía
  if (rows.length === 0) rows.push([]);
  return (
    <main className="w-full max-w-6xl mx-auto py-12 sm:py-20 px-2 sm:px-4 relative z-10">
      <div className="mb-6 md:mb-8 text-center">
        <span className="uppercase tracking-widest text-[#2563eb] text-sm md:text-base font-semibold mb-2 inline-block letter-spacing-[0.2em]">
          PROYECTOS
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
          Todos los <span className="text-[#2563eb]">proyectos</span>
        </h1>
        <p className="text-[#232a3a] dark:text-white max-w-2xl mx-auto font-medium text-sm sm:text-base md:text-lg">
          Explora los proyectos desarrollados con tecnologías modernas y buenas prácticas.
        </p>
      </div>
      <section aria-label="Listado de proyectos">
        <div className="flex flex-col gap-6 sm:gap-8">
          {rows.map((row, rowIdx) => {
            const placeholders = Array.from({ length: CARDS_PER_ROW - row.length });
            return (
              <React.Fragment key={rowIdx}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
                  {row.map((project) => (
                    <li key={project.slug}>
                      <ProjectCard project={project as Project} />
                    </li>
                  ))}
                  {placeholders.map((_, idx) => (
                    <li
                      key={`placeholder-${rowIdx}-${idx}`}
                      className="rounded-xl border-2 border-[#2563eb] bg-white dark:bg-neutral-900 shadow flex flex-col h-full min-h-[180px] sm:min-h-[320px] md:min-h-[440px] opacity-60 items-center justify-center p-4 sm:p-8"
                      tabIndex={0}
                      aria-label="Espacio disponible para proyecto"
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <span className="text-gray-300 text-3xl sm:text-5xl mb-2 sm:mb-4">—</span>
                        <span className="text-gray-400 text-xs sm:text-base">Espacio disponible</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr className="mb-2 sm:mb-4 border-[#2563eb]/20 w-full max-w-2xl mx-auto" />
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </main>
  );
}
