import Link from "next/link";
import type { ProjectSummary } from "@/types/project";

const formatProjectLabel = (date: string) => {
  const year = new Date(date).getFullYear();
  return `PROYECTO 01 / ${Number.isNaN(year) ? "2024" : year}`;
};

export default function ProjectHero({ project }: { project: ProjectSummary }) {
  return (
    <section className="border-b border-gray-100 pb-12 pt-20 lg:pb-24 lg:pt-32 dark:border-white/10">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="eyebrow mb-0">{formatProjectLabel(project.date)}</span>
              <span className="h-[1px] w-8 bg-gray-200 dark:bg-white/10" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                {project.role}
              </span>
            </div>
            <h1 className="mb-6 text-3xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-4xl lg:text-7xl dark:text-white">
              {project.title}
            </h1>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {project.repoUrl ? (
                <Link className="btn-secondary" href={project.repoUrl} target="_blank">
                  <span className="material-symbols-outlined text-base">code</span>
                  Código Fuente
                </Link>
              ) : null}
              <Link className="btn-primary" href="/contacto">
                Hablemos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
