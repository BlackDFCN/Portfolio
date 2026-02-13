import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import { renderProjectMdx } from "@/lib/mdx";
import ProjectHero from "@/components/ProjectHero";
import ProjectMetrics from "@/components/ProjectMetrics";
import ProjectArchitecture from "@/components/ProjectArchitecture";

export const dynamicParams = false;

const tagIcons: Record<string, string> = {
  "Node.js": "terminal",
  PostgreSQL: "database",
  Redis: "bolt",
  AWS: "cloud",
  Auth0: "security",
  Docker: "layers"
};

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
      <section className="bg-gray-50/30 py-8 dark:bg-white/5">
        <div className="section-container">
          <div className="flex flex-wrap items-center gap-6 lg:gap-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Tecnologías Nucleares:
            </span>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <div className="tech-pill" key={tag}>
                  <span className="material-symbols-outlined text-base">
                    {tagIcons[tag] ?? "terminal"}
                  </span>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
                01 / El Problema
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-600 sm:text-2xl dark:text-gray-300">
                {project.problem ?? project.description}
              </p>
            </div>
            <div>
              <h2 className="mb-8 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
                02 / Solución Técnica
              </h2>
              <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                {project.solution ?? project.description}
              </p>
              <ul className="space-y-4">
                {(project.solutionPoints ?? []).map((point) => (
                  <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-300" key={point}>
                    <span className="material-symbols-outlined text-black dark:text-white">
                      check_circle
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {project.architecture ? (
        <ProjectArchitecture architecture={project.architecture} />
      ) : null}

      <section className="py-20 lg:py-32">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="mb-8 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
                04 / Documentación Técnica
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                Detalles específicos sobre la implementación de las capas más
                críticas del sistema.
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
              <div className="code-block">
                <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-4 text-[10px] font-sans text-gray-400">
                    {project.codeFile ?? "src/index.ts"}
                  </span>
                </div>
                <div className="mdx-content">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50/50 py-20 lg:py-32 dark:bg-white/5">
        <div className="section-container text-center">
          <h2 className="mb-12 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
            05 / Flujo de Uso
          </h2>
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 md:flex-row lg:gap-12">
            {[
              { icon: "person", label: "Usuario Autenticado" },
              { icon: "send_money", label: "Inicia Transferencia" },
              { icon: "security", label: "Validación en Tiempo Real", active: true },
              { icon: "task_alt", label: "Confirmación Final" }
            ].map((step) => (
              <div className="flex flex-col items-center gap-4" key={step.label}>
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border bg-white ${
                    step.active ? "border-2 border-black" : "border-gray-200"
                  } dark:border-white/20 dark:bg-[#0f0f0f] ${
                    step.active ? "dark:border-white" : ""
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${
                      step.active ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    step.active ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectMetrics metrics={project.metrics} />
    </>
  );
}
