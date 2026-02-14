"use client";

import { useMemo, useState } from "react";
import type { ProjectSummary } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";

const buildCategories = (projects: ProjectSummary[]) => {
  const categories = new Set<string>();
  projects.forEach((project) => categories.add(project.category));
  return ["Todos", ...Array.from(categories)];
};

export default function ProjectFilters({ projects }: { projects: ProjectSummary[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = useMemo(() => buildCategories(projects), [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="section-container w-full max-w-6xl flex flex-1 flex-col space-y-10 px-0">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            className={`filter-btn ${
              activeCategory === category ? "active" : ""
            }`}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
