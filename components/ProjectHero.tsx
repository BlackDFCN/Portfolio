import Link from "next/link";
import type { ProjectSummary } from "@/types/project";

const formatProjectLabel = (date: string) => {
  const year = new Date(date).getFullYear();
  return `PROYECTO 01 / ${Number.isNaN(year) ? "2024" : year}`;
};

export default function ProjectHero({ project }: { project: ProjectSummary }) {
  return (
    <section className="border-b border-gray-100 pb-16 pt-24 lg:pb-24 lg:pt-32">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="eyebrow mb-0">{formatProjectLabel(project.date)}</span>
              <span className="h-[1px] w-8 bg-gray-200" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {project.role}
              </span>
            </div>
            <h1 className="mb-8 text-5xl font-extrabold leading-[1] tracking-tight text-black lg:text-8xl">
              {project.title}
            </h1>
            <div className="mt-12 flex items-center gap-4">
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
