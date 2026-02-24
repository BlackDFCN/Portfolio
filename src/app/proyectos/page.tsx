
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type ProjectMeta = {
  slug: string;
  title: string;
  destacado?: boolean;
  role: string;
  stack: string;
  badge: string;
  badgeColor: string;
  image: string;
  description: string;
};

const PROJECTS_PATH = path.join(process.cwd(), 'src', 'content', 'projects');

function getAllProjectsMeta(): ProjectMeta[] {
  const files = fs.readdirSync(PROJECTS_PATH).filter(f => f.endsWith('.mdx') && !f.startsWith('_base'));
  return files.map(file => {
    const filePath = path.join(PROJECTS_PATH, file);
    const { data } = matter(fs.readFileSync(filePath, 'utf8'));
    return {
      slug: file.replace(/\.mdx$/, ''),
      title: data.title ?? '',
      destacado: data.destacado ?? false,
      role: data.role ?? '',
      stack: data.stack ?? '',
      badge: data.badge ?? '',
      badgeColor: data.badgeColor ?? '',
      image: data.image ?? '',
      description: data.description ?? '',
    };
  });
}

const EmptyCard = () => (
  <div className="rounded-xl shadow-lg border border-[#2563eb] flex flex-col overflow-hidden bg-white dark:bg-neutral-900 opacity-60 animate-pulse min-h-[340px]">
    <div className="w-full h-48 bg-[#e5e7eb] dark:bg-neutral-800" />
    <div className="flex-1 flex flex-col p-6 items-center justify-center">
      <div className="h-6 w-2/3 bg-[#e5e7eb] dark:bg-neutral-800 rounded mb-3" />
      <div className="h-4 w-1/2 bg-[#e5e7eb] dark:bg-neutral-800 rounded mb-2" />
      <div className="h-3 w-full bg-[#e5e7eb] dark:bg-neutral-800 rounded mb-2" />
      <div className="h-3 w-2/3 bg-[#e5e7eb] dark:bg-neutral-800 rounded" />
    </div>
  </div>
);

export default function CatalogoProyectosPage() {
  const projects = getAllProjectsMeta();
  const emptyCards = Array.from({ length: 3 - projects.length }, (_, i) => <EmptyCard key={`empty-${i}`} />);
  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-[#232a3a] dark:text-white">Catálogo Completo de Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/proyectos/${project.slug}`}
            className="rounded-xl shadow-lg border border-[#2563eb] flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer bg-white dark:bg-neutral-900"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover object-top"
            />
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-lg font-extrabold text-[#232a3a] dark:text-white mb-1">{project.title}</h2>
              <div className="text-xs font-bold text-[#2563eb] mb-2 uppercase">{project.role} • {project.stack}</div>
              <p className="text-sm text-[#232a3a] dark:text-white mb-4 flex-1">{project.description}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow" style={{background: project.badgeColor}}>{project.badge}</span>
            </div>
          </Link>
        ))}
        {projects.length < 3 && emptyCards}
      </div>
    </section>
  );
}
