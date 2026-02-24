import React from "react";
import { FaRegComments, FaFolderOpen } from 'react-icons/fa';
import { Button } from "@/components/ui/Button";
import { getFeaturedProjects } from '@/lib/projects';

const PROJECTS = getFeaturedProjects();


function EmptyShowcaseCard() {
  return (
    <div className="rounded-xl border-2 border-dashed border-[#2563eb]/40 flex flex-col items-center justify-center min-h-[340px] bg-white dark:bg-neutral-900 text-center p-8 opacity-80">
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#2563eb" className="mx-auto mb-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a5 5 0 00-10 0v2a5 5 0 00-1 9.9V19a2 2 0 002 2h8a2 2 0 002-2v-.1A5 5 0 0017 9z" /></svg>
      <h4 className="text-[#2563eb] font-bold text-lg mb-2">Próximamente</h4>
      <p className="text-[#232a3a] dark:text-white text-sm">Aquí aparecerá un proyecto destacado.<br />¡Sigue explorando!</p>
    </div>
  );
}

export default function ProjectsShowcase() {
  const emptyCards = Array.from({ length: 3 - PROJECTS.length }, (_, i) => <EmptyShowcaseCard key={`empty-showcase-${i}`} />);
  return (
    <section id="proyectos" className="w-full max-w-6xl mx-auto py-20 px-4 relative z-10">
      <div className="mb-6 md:mb-8 text-center">
        <span className="uppercase tracking-widest text-[#2563eb] text-sm md:text-base font-semibold mb-2 inline-block">
          PORTAFOLIO
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
          Proyectos <span className="text-[#2563eb]">Destacados</span>
        </h2>
        <p className="text-[#232a3a] dark:text-white max-w-2xl mx-auto font-medium">
          Proyectos donde combino tecnología, innovación y buenas prácticas para transformar ideas en soluciones digitales robustas, escalables y de alto impacto real.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.slug}
            className="rounded-xl shadow-lg border border-[#2563eb] flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_0_6px_rgba(37,99,235,0.10)] focus:scale-[1.03] cursor-pointer"
          >
            <div className="relative bg-white dark:bg-neutral-900">
              <div className="flex items-center justify-center w-full h-32 md:h-40 bg-[#f3f4f6] dark:bg-neutral-800 p-3 md:p-4 rounded-lg transition-all">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain rounded-md shadow-sm"
                />
              </div>
              <span
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow"
                style={{ background: project.badgeColor }}
              >
                {project.badge}
              </span>
              <div className="w-full h-[2px] bg-[#2563eb]/10" />
            </div>
            <div className="flex-1 flex flex-col p-6">
              <h3 className="text-lg font-extrabold text-[#232a3a] dark:text-white mb-1">
                {project.title}
              </h3>
              <div className="text-xs font-bold text-[#2563eb] mb-2 uppercase">
                {project.role} • {project.stack}
              </div>
              <p className="text-sm text-[#232a3a] dark:text-white mb-6 flex-1">
                {project.description}
              </p>
                <div className="flex gap-2 mt-auto">
                  <Button href={`/proyectos/${project.slug}`} size="md" className="w-full md:w-auto flex items-center justify-center gap-2">
                    Ver Detalles
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
            </div>
          </div>
        ))}
        {PROJECTS.length < 3 && emptyCards}
      </div>
      <div className="flex justify-center mt-8 md:mt-10">
        <a
          href="/proyectos"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563eb] text-white font-extrabold shadow-lg hover:bg-[#3b82f6] hover:scale-105 active:scale-95 transition-all text-lg py-3 px-8 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 group w-full max-w-xs md:max-w-sm"
          style={{ boxShadow: '0 4px 24px 0 #2563eb22' }}
        >
          <FaFolderOpen className="text-xl group-hover:animate-bounce transition-transform" />
          <span className="truncate">Catálogo Completo</span>
        </a>
      </div>
    </section>
  );
}
