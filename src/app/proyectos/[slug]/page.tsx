import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import React from 'react';

const PROJECTS_PATH = path.join(process.cwd(), 'src', 'content', 'projects');

function getProjectBySlug(slug: string) {
  const filePath = path.join(PROJECTS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  return { ...data, slug, content };
}

export default function ProyectoDetallePage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <section className="w-full max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-6">
        {project.title}
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow" style={{background: project.badgeColor}}>{project.badge}</span>
        <span className="text-xs font-bold text-[#2563eb] uppercase">{project.role} • {project.stack}</span>
      </div>
      <div className="flex items-center justify-center w-full h-64 bg-[#f3f4f6] dark:bg-neutral-800 p-4 rounded-lg mb-8">
        <img
          src={project.image}
          alt={project.title}
          className="max-h-full max-w-full object-contain rounded-md shadow-sm"
        />
      </div>
      <p className="text-lg text-[#232a3a] dark:text-white mb-8">{project.description}</p>
      <article className="prose dark:prose-invert max-w-none">
        {/* Aquí podrías renderizar el contenido MDX si lo deseas */}
        <pre className="whitespace-pre-wrap text-sm">{project.content}</pre>
      </article>
    </section>
  );
}
