import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import ProjectFilters from "@/components/ProjectFilters";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Catalogo completo de proyectos Full Stack, DevOps y arquitectura de software."
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <section className="section-snap border-t border-gray-50 bg-white py-8 lg:py-16">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-6 max-w-3xl" data-reveal>
            <span className="eyebrow">PROYECTOS</span>
            <h1 className="mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-black lg:text-7xl">
              Catálogo Completo
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-gray-500 lg:text-2xl">
              Una exploración detallada de soluciones end-to-end, desde sistemas
              empresariales hasta proyectos personales de alto impacto.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-32 lg:pb-48">
        <div className="section-container">
          <ProjectFilters projects={projects} />
        </div>
      </section>
    </>
  );
}
