import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import { renderProjectMdx } from "@/lib/mdx";
import ProjectHero from "@/components/ProjectHero";
import ProjectMetrics from "@/components/ProjectMetrics";
import ProjectArchitecture from "@/components/ProjectArchitecture";
import MermaidDiagram from "@/components/MermaidDiagram";

export const dynamicParams = false;

type ProjectPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {};
  }

  return {
    title: { absolute: `BastianDev - ${project.title}` },
    description: project.description,
    openGraph: {
      title: `BastianDev - ${project.title}`,
      description: project.description,
      type: "article"
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const content = await renderProjectMdx(project.content);

  return (
    <>
      <ProjectHero project={project} />

      <section className="topo-section bg-gray-50/30 py-4 dark:bg-white/5">
        <div className="section-container max-w-6xl">
          <div className="flex flex-wrap items-center gap-6 lg:gap-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Tecnologias utilizadas
            </span>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <div className="tech-pill" key={tag}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="topo-section py-10 lg:py-12">
        <div className="section-container max-w-6xl">
          <div className="mb-8">
            <span className="eyebrow">Diagnostico</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl lg:text-4xl dark:text-white">
              Problema y solucion
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-sm border border-gray-100 bg-white p-6 shadow-[0_12px_30px_-26px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#101010]">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                El problema
              </p>
              <h3 className="mb-3 text-lg font-bold text-black dark:text-white">
                Dolor principal
              </h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                {project.problem ?? project.description}
              </p>
              {project.problemImpact ? (
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  {project.problemImpact}
                </p>
              ) : null}
            </article>
            <article className="rounded-sm border border-gray-100 bg-white p-6 shadow-[0_12px_30px_-26px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#101010]">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                La solucion
              </p>
              <h3 className="mb-3 text-lg font-bold text-black dark:text-white">
                Enfoque aplicado
              </h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                {project.solution ?? project.description}
              </p>
              {project.solutionImpact ? (
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  {project.solutionImpact}
                </p>
              ) : null}
            </article>
          </div>
        </div>
      </section>

      <section className="topo-section py-8 lg:py-10">
        <div className="section-container max-w-6xl">
          <span className="eyebrow">Resumen</span>
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-black sm:text-3xl lg:text-4xl dark:text-white">
            Contexto y alcance
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
            {project.description}
          </p>
        </div>
      </section>

      <section className="topo-section py-12 lg:py-16">
        <div className="section-container max-w-6xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#101010]">
            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
              01 / Contribuciones clave
            </h3>
            {project.solutionPoints?.length ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.solutionPoints.map((point) => (
                  <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300" key={point}>
                    <span className="material-symbols-outlined text-black dark:text-white">
                      check_circle
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Contribuciones en preparacion.
              </p>
            )}
          </div>
        </div>
      </section>

      {project.architecture ? (
        <ProjectArchitecture
          architecture={project.architecture}
          diagram={project.architectureDiagram}
        />
      ) : null}

      <section className="topo-section bg-gray-50/50 py-20 lg:py-32 dark:bg-white/5">
        <div className="section-container max-w-6xl text-center">
          <h2 className="mb-12 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
            05 / Flujo de uso
          </h2>
          {project.usageDiagram ? (
            <div className="mx-auto max-w-4xl">
              <MermaidDiagram diagram={project.usageDiagram} title="Secuencia de uso" />
            </div>
          ) : (
            <div className="mx-auto max-w-4xl rounded-sm border border-dashed border-gray-200 bg-white/70 px-6 py-10 text-[12px] uppercase tracking-[0.3em] text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500">
              Diagrama en preparación
            </div>
          )}
        </div>
      </section>

      <section className="topo-section py-20 lg:py-32">
        <div className="section-container max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="mb-8 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
                06 / Implementacion tecnica
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                Capas, integraciones y decisiones clave para mantener la plataforma segura y escalable.
              </p>
              <div className="space-y-12">
                {(project.documentation ?? []).map((item) => (
                  <div key={item.title}>
                    <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-gray-500 dark:text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#0f0f0f]">
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-gray-200 pb-2 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] font-sans text-gray-400">
                    {project.codeFile ?? "src/index.ts"}
                  </span>
                </div>
                <div className="mdx-content">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectMetrics metrics={project.metrics} />
    </>
  );
}
