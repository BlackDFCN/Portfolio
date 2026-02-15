import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import ProjectFilters from "@/components/ProjectFilters";

export const metadata: Metadata = {
  title: { absolute: "BastianDev - Proyectos" },
  description:
    "Catalogo completo de proyectos Full Stack, DevOps y arquitectura de software."
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-transparent py-6 lg:py-12 dark:bg-transparent">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-4 max-w-3xl" data-reveal>
            <span className="eyebrow">PROYECTOS</span>
            <h1 className="mb-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-7xl dark:text-white">
              Catálogo Completo
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl lg:text-2xl dark:text-gray-300">
              Una exploración detallada de soluciones end-to-end, desde sistemas
              empresariales hasta proyectos personales de alto impacto.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col pb-0 w-full">
        <ProjectFilters projects={projects} />
      </section>
    </div>
  );
}
