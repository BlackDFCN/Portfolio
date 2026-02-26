
import { getAllProjects } from '@/lib/projects';
import Link from 'next/link';

type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
};

export default async function FeaturedProjects() {
  const projects: Project[] = (await getAllProjects()).slice(0, 3);
  return (
    <section
      id="proyectos-destacados"
      className="w-full max-w-6xl mx-auto py-20 px-4 relative z-10"
      aria-labelledby="proyectos-destacados-title"
    >
      <div className="mb-6 md:mb-8 text-center">
        <span className="uppercase tracking-widest text-[#2563eb] text-sm md:text-base font-semibold mb-2 inline-block letter-spacing-[0.2em]">
          PROYECTOS DESTACADOS
        </span>
        <h2 id="proyectos-destacados-title" className="text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
          Algunos <span className="text-[#2563eb]">proyectos clave</span>
        </h2>
        <p className="text-[#232a3a] dark:text-white max-w-2xl mx-auto font-medium text-base md:text-lg">
          Selección de proyectos recientes que reflejan mi experiencia en desarrollo, arquitectura y tecnología.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project: Project) => (
          <article
            key={project.slug}
            className="rounded-2xl border-2 border-[#2563eb]/10 bg-white dark:bg-neutral-900 shadow-lg flex flex-col h-full transition-all hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-2xl mb-0 border-b-2 border-[#2563eb]/10"
                loading="lazy"
              />
            )}
            <div className="flex-1 flex flex-col p-6">
              <h3 className="text-xl font-bold mb-2 text-[#232a3a] dark:text-white">
                <Link href={`/proyectos/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="mb-3 text-[#232a3a] dark:text-neutral-300 text-base font-medium flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] font-bold text-xs shadow hover:bg-[#2563eb]/10 dark:hover:bg-[#2563eb]/20 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/proyectos/${project.slug}`}
                className="inline-block mt-auto px-4 py-2 rounded-lg bg-[#2563eb] text-white font-semibold shadow hover:bg-[#1e40af] transition"
              >
                Ver más
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/proyectos"
          className="inline-block px-6 py-3 rounded-xl bg-[#2563eb] text-white font-bold text-lg shadow hover:bg-[#1e40af] transition"
        >
          Ver todos los proyectos
        </Link>
      </div>
    </section>
  );
}
