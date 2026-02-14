"use client";

import Link from "next/link";
import type { ProjectSummary } from "@/types/project";

const iconByCategory: Record<string, string> = {
  "Full Stack": "architecture",
  Backend: "dns",
  Frontend: "palette",
  DevOps: "cloud_sync",
  Mobile: "smartphone"
};

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const icon = iconByCategory[project.category] ?? "work";
  const hasImage = Boolean(project.image);

  return (
    <article className="project-card reveal border-t-4 border-t-gray-400" data-reveal>
      {/* Image Section */}
      <div className="aspect-[2/1] overflow-hidden border-b border-gray-100 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5">
        {hasImage ? (
          <img
            alt={`${project.title}`}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            loading="lazy"
            src={project.image}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100/60 dark:bg-white/10">
            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-gray-500">
              {icon}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="project-card-content">
        {/* Category Badge */}
        <span className="project-card-category">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="project-card-title dark:text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="project-card-description dark:text-gray-300">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span className="project-tag dark:border-white/10 dark:bg-white/5 dark:text-gray-400" key={tag}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="project-tag dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* CTA Link */}
        <Link
          className="project-card-link dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          href={`/proyectos/${project.slug}`}
        >
          <span>VER PROYECTO</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}
