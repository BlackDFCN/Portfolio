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

  // Compilar el MDX a función exportada como string para el client
  let compiledCode = '';
  try {
    const compiled = await compile(content, { outputFormat: 'function', jsx: true, jsxImportSource: 'react' });
    compiledCode = String(compiled.value);
  } catch (e) {
    return <article><h1>Error al compilar el contenido MDX.</h1></article>;
  }

  // Usar el Client Component wrapper para MDXRenderer
  const ClientMDXRenderer = (await import("@/components/ui/ClientMDXRenderer")).default;

  return (
    <main>
      <article aria-labelledby="project-title" className="prose dark:prose-invert mx-auto">
        <header>
          <h1 id="project-title" className="text-3xl font-bold mb-4">{data.title}</h1>
          {data.description && <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{data.description}</p>}
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
        <ClientMDXRenderer code={compiledCode} />
      </article>
    </main>
  );
}
