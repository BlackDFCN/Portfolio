
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
    <section aria-labelledby="proyectos-destacados" className="my-12">
      <h2 id="proyectos-destacados" className="text-2xl font-bold mb-6">Proyectos Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <article key={project.slug} className="rounded-lg border shadow p-6 bg-white dark:bg-neutral-900">
            <h3 className="text-lg font-semibold mb-2">
              <Link href={`/proyectos/${project.slug}`}>{project.title}</Link>
            </h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">{project.description}</p>
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-32 object-cover rounded mb-2" loading="lazy" />
            )}
            <Link href={`/proyectos/${project.slug}`} className="text-blue-600 hover:underline">Ver más</Link>
          </article>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/proyectos" className="text-blue-700 font-semibold hover:underline">Ver todos los proyectos</Link>
      </div>
    </section>
  );
}
