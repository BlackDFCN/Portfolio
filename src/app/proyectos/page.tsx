
import { getAllProjects } from '@/lib/projects';
import Link from 'next/link';

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
    <main className="w-full max-w-6xl mx-auto py-20 px-4 relative z-10">
      <div className="mb-6 md:mb-8 text-center">
        <span className="uppercase tracking-widest text-[#2563eb] text-sm md:text-base font-semibold mb-2 inline-block letter-spacing-[0.2em]">
          PROYECTOS
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
          Todos los <span className="text-[#2563eb]">proyectos</span>
        </h1>
        <p className="text-[#232a3a] dark:text-white max-w-2xl mx-auto font-medium text-base md:text-lg">
          Explora los proyectos desarrollados con tecnologías modernas y buenas prácticas.
        </p>
      </div>
      <section aria-label="Listado de proyectos">
        <div className="flex flex-col gap-8">
          {rows.map((row, rowIdx) => {
            const placeholders = Array.from({ length: CARDS_PER_ROW - row.length });
            return (
              <ul key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {row.map((project) => (
                  <li
                    key={project.slug}
                    className="rounded-2xl border-2 border-[#2563eb]/10 bg-white dark:bg-neutral-900 shadow-lg flex flex-col h-full transition-all hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer overflow-hidden"
                  >
                    {/* Imagen con aspect ratio fijo y fondo */}
                    <div className="relative w-full aspect-[16/7] bg-[#f3f4f6] dark:bg-neutral-800 flex items-center justify-center border-b-2 border-[#2563eb]/10">
                      {project.image ? (
                        <img
                          src={project.image.startsWith('/') ? project.image : `/projects/${project.image}`}
                          alt={project.title}
                          className="object-cover w-full h-full"
                          loading="lazy"
                          width={400}
                          height={125}
                          decoding="async"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">Sin imagen</span>
                      )}
                    </div>
                    {/* Contenido */}
                    <div className="flex-1 flex flex-col p-6 gap-2">
                      <div className="flex flex-col flex-1 justify-between min-h-[180px] max-h-[180px]">
                        <div>
                          <h2 className="text-lg font-extrabold text-[#232a3a] dark:text-white mb-1 line-clamp-2">
                            <Link href={`/proyectos/${project.slug}`}>{project.title}</Link>
                          </h2>
                          <hr className="my-2 border-t border-[#2563eb]/10 dark:border-white/10" />
                          <p className="mb-4 text-sm text-[#232a3a] dark:text-white line-clamp-3 min-h-[56px]">
                            {project.description}
                          </p>
                          <hr className="my-2 border-t border-[#2563eb]/10 dark:border-white/10" />
                        </div>
                        <div className="mt-2 mb-2">
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-nowrap gap-2 overflow-hidden pr-2">
                              {project.tags.slice(0, 2).map((tag: string) => (
                                <span
                                  key={tag}
                                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 2 && (
                                <span className="whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition ml-1">+{project.tags.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-[#2563eb] text-white font-semibold shadow hover:bg-[#1e40af] transition mt-2 gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h3.28a2 2 0 011.42.59l1.42 1.42A2 2 0 0012.72 5H19a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
                        <span>Detalles del proyecto</span>
                      </Link>
                    </div>
                  </li>
                ))}
                {placeholders.map((_, idx) => (
                  <li
                    key={`placeholder-${rowIdx}-${idx}`}
                    className="rounded-2xl border-2 border-[#2563eb]/10 bg-white dark:bg-neutral-900 shadow-lg flex flex-col h-full opacity-60"
                  >
                    <div className="relative w-full aspect-[16/9] bg-[#f3f4f6] dark:bg-neutral-800 flex items-center justify-center border-b-2 border-[#2563eb]/10">
                      <span className="text-gray-300 text-3xl">—</span>
                    </div>
                    <div className="flex-1 flex flex-col p-6 gap-2 items-center justify-center">
                      <div className="h-6 w-2/3 bg-gray-200 dark:bg-neutral-700 rounded mb-2" />
                      <div className="h-4 w-1/2 bg-gray-100 dark:bg-neutral-800 rounded mb-4" />
                      <div className="flex gap-2 mb-4">
                        <span className="h-6 w-12 bg-gray-100 dark:bg-neutral-800 rounded-full" />
                        <span className="h-6 w-12 bg-gray-100 dark:bg-neutral-800 rounded-full" />
                      </div>
                      <div className="h-10 w-full bg-[#2563eb]/20 rounded-lg mt-2" />
                    </div>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </section>
    </main>
  );
}
