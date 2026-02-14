import Link from "next/link";
import type { ProjectSummary } from "@/types/project";

const formatProjectLabel = (date: string) => {
  const year = new Date(date).getFullYear();
  return `PROYECTO 01 / ${Number.isNaN(year) ? "2024" : year}`;
};

export default function ProjectHero({ project }: { project: ProjectSummary }) {
  return (
    <section className="border-b border-gray-100 pb-6 pt-8 lg:pb-12 lg:pt-16 dark:border-white/10">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="eyebrow mb-0 whitespace-normal sm:whitespace-nowrap">
                {formatProjectLabel(project.date)} · {project.role}
              </span>
            </div>
            <h1 className="mb-6 break-words text-[clamp(28px,4.5vw,60px)] font-extrabold leading-[1.05] tracking-tight text-black dark:text-white">
              {project.title}
            </h1>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {project.repoUrl ? (
                <Link
                  className="btn-lift flex items-center gap-2.5 rounded-sm border border-black px-6 py-2 text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.2em] text-black shadow-lg shadow-black/10"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base">code</span>
                  Código Fuente
                </Link>
              ) : (
                <button
                  className="flex items-center gap-2.5 rounded-sm border border-black px-6 py-2 text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.2em] text-black opacity-50"
                  disabled
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">lock</span>
                  Código Fuente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
