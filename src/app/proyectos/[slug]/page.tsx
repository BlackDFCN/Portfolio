import type { Metadata } from 'next';
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content/projects', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return { title: 'Proyecto no encontrado', metadataBase: new URL('http://localhost:3000') };
  }
  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    return {
      title: data.title || 'Proyecto',
      description: data.description || '',
      openGraph: {
        title: data.title || 'Proyecto',
        description: data.description || '',
        images: data.image ? [{ url: data.image }] : [],
      },
      metadataBase: new URL('http://localhost:3000'),
    };
  } catch {
    return { title: 'Proyecto', metadataBase: new URL('http://localhost:3000') };
  }
}



import path from 'path';
import fs from 'fs';
import { notFound } from 'next/navigation';

import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import dynamic from 'next/dynamic';

export default async function ProjectPage({ params }: { params: any }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content/projects', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  let source = '';
  let content = '';
  let data: any = {};
  try {
    source = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(source);
    content = parsed.content;
    data = parsed.data;
  } catch (e) {
    return <article><h1>Error al leer el archivo del proyecto.</h1></article>;
  }
  if (!data.title || !data.description) {
    return <article><h1>Error: El archivo MDX carece de metadatos obligatorios.</h1></article>;
  }

  // Renderizar los campos del frontmatter
  return (
    <main>
      <article aria-labelledby="project-title" className="prose dark:prose-invert mx-auto">
        <header>
          <h1 id="project-title" className="text-3xl font-bold mb-4">{data.title}</h1>
          {data.company && <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><strong>Empresa:</strong> {data.company}</p>}
          {data.role && <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><strong>Rol:</strong> {data.role}</p>}
          {data.date && <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><strong>Fecha:</strong> {data.date}</p>}
          {data.duration && <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><strong>Duración:</strong> {data.duration}</p>}
          {data.location && <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><strong>Ubicación:</strong> {data.location}</p>}
          {data.image && (
            <img
              src={data.image.startsWith('/') ? data.image : `/projects/${data.image}`}
              alt={data.title}
              className="w-full h-56 object-cover rounded mb-4"
              loading="lazy"
              width={600}
              height={224}
              decoding="async"
            />
          )}
        </header>
        <section>
          {data.description && <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{data.description}</p>}
          {data.problem && <p className="mb-2"><strong>Problema:</strong> {data.problem}</p>}
          {data.solution && <p className="mb-2"><strong>Solución:</strong> {data.solution}</p>}
          {data.results && <p className="mb-2"><strong>Resultados:</strong> {data.results}</p>}
          {data.technologies && data.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <strong className="w-full mb-1">Tecnologías:</strong>
              {data.technologies.map((tech: string) => (
                <span key={tech} className="whitespace-nowrap px-2 py-0.5 rounded bg-[#eaf1fd] border border-[#dbeafe] text-[#2563eb] font-medium text-xs hover:bg-[#dbeafe] transition">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </section>
      </article>
    </main>
  );
}
