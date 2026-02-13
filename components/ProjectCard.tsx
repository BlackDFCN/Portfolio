"use client";

import Link from "next/link";
import type { ProjectSummary } from "@/types/project";

const iconByCategory: Record<string, string> = {
  "Full Stack": "payments",
  Backend: "admin_panel_settings",
  Frontend: "monitoring",
  DevOps: "cloud_done",
  Mobile: "devices"
};

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const icon = iconByCategory[project.category] ?? "analytics";

  return (
    <article className="project-card reveal" data-reveal>
      <div className="aspect-[16/7] border-b border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
        <div className="flex h-full w-full items-center justify-center rounded bg-gray-100 grayscale opacity-60 dark:bg-white/10">
          <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-500">
            {icon}
          </span>
        </div>
      </div>
      <div className="flex h-full flex-col p-8">
        <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
          {project.title}
        </h3>
        <p className="mb-4 flex-grow text-[13px] leading-relaxed text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span className="project-tag" key={tag}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 ? (
            <span className="project-tag">+{project.tags.length - 3}</span>
          ) : null}
        </div>
        <Link
          className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all dark:text-white"
          href={`/proyectos/${project.slug}`}
        >
          Ver detalle
          <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}
