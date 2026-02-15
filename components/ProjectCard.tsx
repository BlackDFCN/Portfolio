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
    <article className="project-card reveal h-full" data-reveal>
      {/* Image Section */}
      <div className="aspect-[2/1] overflow-hidden border-b border-gray-200 bg-gray-50 p-3 dark:bg-white/5 mt-2">
        {hasImage ? (
          <img
            alt={`Imagen del proyecto ${project.title}`}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            loading="lazy"
            src={project.image}
            width={600}
            height={300}
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
      <div className="project-card-content flex-grow">
        {/* Category Badge */}
        <span className="project-card-category">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="project-card-title">
          {project.title}
        </h3>

        {/* Description */}
        <p className="project-card-description">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-6 flex flex-grow flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span className="project-tag" key={tag}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="project-tag">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* CTA Link */}
        <Link
          className="project-card-link mt-auto"
          href={`/proyectos/${project.slug}`}
        >
          <span className="material-symbols-outlined text-base">search</span>
          <span>VER PROYECTO</span>
        </Link>
      </div>
    </article>
  );
}
