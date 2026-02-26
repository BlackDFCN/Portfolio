
import { getAllProjects } from '@/lib/projects';
import Link from 'next/link';

export default async function ProyectosPage() {
  const projects = await getAllProjects();
  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">Todos los Proyectos</h1>
      <section aria-label="Listado de proyectos">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <li key={project.slug} className="rounded-lg border shadow p-6 bg-white dark:bg-neutral-900">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/proyectos/${project.slug}`}>{project.title}</Link>
              </h2>
              <p className="mb-2 text-gray-700 dark:text-gray-300">{project.description}</p>
              {project.image && (
                <img
                  src={project.image.startsWith('/') ? project.image : `/projects/${project.image}`}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded mb-2"
                  loading="lazy"
                  width={400}
                  height={160}
                  decoding="async"
                />
              )}
              <Link href={`/proyectos/${project.slug}`} className="text-blue-600 hover:underline">Ver más</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
